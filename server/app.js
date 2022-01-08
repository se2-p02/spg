'use strict';

const express = require('express');
const morgan = require("morgan");
const { check, query, validationResult } = require("express-validator");
const path = require("path");
const fetch = require('node-fetch');

const spgDao = require("./spgDao");
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const userDao = require('./userDao'); // module for accessing the users in the DB
const dao = require('./db'); // module for accessing the users in the DB
const url = require('url');
const dayjs = require('dayjs');
const moment = require('moment');
const fileupload = require('express-fileupload')
const fs = require('fs');
const e = require('express');




/*** Set up Passport ***/
// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(new LocalStrategy(
  function (username, password, done) {
    userDao.getUser(username, password).then((user) => {
      if (!user)
        return done(null, false, { message: 'Incorrect username and/or password.' });

      return done(null, user);
    })
  }
));

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});

// init express
const app = new express();
app.use(morgan("dev"));
app.use(fileupload());
app.use(express.json()); // parse the body in JSON format => populate req.body attributes
app.use(express.static('public'));
app.use('/images', express.static('images'));

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'not authenticated' });
}

// set up the session
app.use(session({
  // by default, Passport uses a MemoryStore to keep track of the sessions
  secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
  resave: false,
  saveUninitialized: false
}));

// then, init passport
app.use(passport.initialize());
app.use(passport.session());

//offset for telegram updateId
let offset = 0;
let botToken;

//used to check time related tasks as sending the notification on telegram on saturday
async function checkTimeAndConstraints() {
  if (botToken) {
    const clock = await spgDao.getClock();
    const datetime = moment(clock.serverTime);
    if ((datetime.day() === 6 && datetime.hour() === 9 && datetime.minute() === 0)) {
      await sendNewProductNotification();
    }
  }
}

if (process.env.NODE_ENV !== 'test') setInterval(checkTimeAndConstraints, 60000);

async function subscribe() {
  if (process.env.NODE_ENV !== 'test') {
    if (botToken) {
      let response = await fetch("https://api.telegram.org/bot" + botToken + "/getUpdates",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ "offset": offset, "timeout": 30 }),
        });

      if (response.status == 502) {
        // Status 502 is a connection timeout error,
        // may happen when the connection was pending for too long,
        // and the remote server or a proxy closed it
        // let's reconnect
        await subscribe();
      } else if (response.status != 200) {
        // An error - let's show it
        // Reconnect in one second
        await new Promise(resolve => setTimeout(resolve, 1000));
        await subscribe();
      } else {
        // Get and show the message
        let message = await response.json();
        if (!(message.result.length === 0)) {
          offset = message.result[message.result.length - 1].update_id + 1;
          let updates = message.result;
          updates.forEach(u => {
            if (u.my_chat_member) {
              if (u.my_chat_member.new_chat_member.status === "member") {

                //create entry of telegramId where user.id = /start id
                spgDao.createTelegramSubscriber(u.my_chat_member.from.id, { id: u.my_chat_member.from.id });
              }
              else if (u.my_chat_member.new_chat_member.status === "kicked") {
                //delete entry of telegramId where telegramId = from.id
                spgDao.setTelegramId("", { telegramId: u.my_chat_member.from.id });
                spgDao.deleteTelegramSubscriber(u.my_chat_member.from.id);
              }
            }
            else if (u.message) {
              if (u.message.text) {
                let text = u.message.text;
                const myArray = text.split(" ");
                if (myArray[0] === "/start") {
                  let userId = parseInt(myArray[1]);
                  if (!isNaN(userId)) {
                    spgDao.setTelegramId(u.message.from.id, { id: userId });
                  }
                }
              }
            }
          })
        }
        // Call subscribe() again to get the next message
        await subscribe();
      }
    } else {
      const tempTelegram = await spgDao.getTelegram();
      botToken = tempTelegram.token;
      await new Promise(resolve => setTimeout(resolve, 1000));
      await subscribe();
    }
  }
}

//subscribe for long polling
subscribe();

async function sendNewProductNotification() {
  try {
    const subscribers = await spgDao.getTelegramSubscribers();
    if (subscribers.error) {
      return;
    }
    else {
      subscribers.forEach(async (s) => {
        let response = await fetch("https://api.telegram.org/bot" + botToken + "/sendMessage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ "chat_id": s.telegramId, "text": "Dear subscriber, a new product has been inserted or modified, you can find the updated list of products at http://localhost:3000/client/products" }),
          });
      })
    }
  } catch (err) {
    console.log(err);
  }
}

/*** APIs ***/
app.post('/api/farmer/image', (req, res) => {
  const fileName = req.files.myFile.name
  let image = req.files.myFile
  const path = __dirname + '/images/' + fileName

  image.mv(path, (error) => {
    if (error) {
      console.error(error)
      res.writeHead(500, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify({ status: 'error', message: error }))
      return
    }

    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({ status: 'success', path: '/images/' + fileName }))
  })
})

app.delete('/api/farmer/image', (req, res) => {
  const fileName = req.body.name
  const path = __dirname + fileName

  try {
    fs.unlinkSync(path)
    res.end(JSON.stringify({ status: 'success', path: path }))
  }
  catch (error) {
    res.end(JSON.stringify({ status: 'error', message: "File doesn't exists" }))
    return
  }
})

//GET logo
app.get('/images/solidarity.png', (req, res) => {
  res.sendFile(path.join(__dirname, "./images/solidarity.png"));
});

//GET logo
app.get('/images/:imageName', (req, res) => {
  res.sendFile(path.join(__dirname, "./images/" + req.params.imageName,));
});

// GET telegram name
app.get('/api/telegram', async (req, res) => {
  try {
    const telegram = await spgDao.getTelegram();
    if (telegram.error) {
      res.status(404).json(telegram);
    }
    else {
      res.json({ name: telegram.name });
    }
  } catch (err) {
    console.log(err)
    res.status(500).end();
  }
});

// GET products
app.get('/api/products', async (req, res) => {
  try {
    const products = await spgDao.getProducts();
    if (products.error) {
      res.status(404).json(products);
    }
    else {
      res.json(products);
    }
  } catch (err) {
    console.log(err)
    res.status(500).end();
  }
});

// POST /api/products/
//new product
app.post('/api/products', async (req, res) => {
  const clock = await spgDao.getClock();
  const datetime = moment(clock.serverTime);
  if (!(datetime.day() === 5 || (datetime.day() === 6 && datetime.hour() < 9))) {
    res.status(500).end('New products cannot be inserted in this timeslot.');
    return;
  }

  const product = req.body;
  try {
    if (req.user.role !== "farmer") {
      res.status(500).json({ error: `User cannot insert new products` });
      return;
    }
    const result = await spgDao.addProduct(product, req.user, datetime);
    if (result.err)
      res.status(404).json(result);
    else {
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ error: `${err}.` });
    return;
  }

});

// PUT /api/products/
//update product
app.put('/api/products/:id', async (req, res) => {
  const product = req.body;

  const clock = await spgDao.getClock();
  const datetime = moment(clock.serverTime);
  if (product.action.update && !(datetime.day() === 5 || (datetime.day() === 6 && datetime.hour() < 9))) {
    res.status(500).end('Products cannot be modified in this timeslot.');
    return;
  }
  if (product.action.confirm && !(datetime.day() === 1 && datetime.hour() < 9)) {
    res.status(500).end('Products cannot be confirmed in this timeslot.');
    return;
  }

  try {
    const oldImage = await spgDao.getImage(req.params.id)
    //remove from server old image
    if (product.product.delete) fs.unlinkSync("./images/" + oldImage)
    const result = await spgDao.updateProduct(product.product, req.params.id, product.action);
    if (result.err)
      res.status(404).json(result);
    else {

      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ error: `${err}.` });
    return;
  }

});

// DELETE product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const clock = await spgDao.getClock();
    const datetime = moment(clock.serverTime);
    if (!(datetime.day() === 5 || (datetime.day() === 6 && datetime.hour() < 9))) {
      res.status(500).end('Products cannot be deleted in this timeslot.');
      return;
    }
    const result = await spgDao.deleteProduct(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).end();
  }
});

// GET nextProducts
app.get('/api/nextProducts', async (req, res) => {
  try {
    const clock = await spgDao.getClock();
    const datetime = moment(clock.serverTime);
    if (!req.isAuthenticated()) res.status(401).end();
    else {
      const products = await spgDao.getNextProducts(req.query.role, req.user, datetime, req.query.week);
      if (products.error) {
        res.status(404).json(products);
      }
      else {
        res.json(products);
      }
    }
  } catch (err) {
    res.status(500).end();
  }
});

// GET clients
app.get('/api/clients', async (req, res) => {
  try {
    const clients = await spgDao.getClients();
    if (clients.error) {
      res.status(404).json(clients);
    }
    else {
      res.json(clients);
    }
  } catch (err) {
    console.log(err)
    res.status(500).end();
  }
});

// GET specific client
app.get('/api/clients/:id', async (req, res) => {
  try {
    const client = await spgDao.getClient(req.params.id);
    if (client.error) {
      res.status(404).json(client);
    }
    else {
      res.json(client);
    }
  } catch (err) {
    console.log(err)
    res.status(500).end();
  }
});

// GET Wallet amount of a user
app.get('/api/wallet/:id', async (req, res) => {
  try {
    const wallet = await spgDao.getWallet(req.params.id);
    const orders = await spgDao.getOrders(req.params.id);
    if (wallet.error) {
      res.status(404).json(wallet);
    }
    else {
      let flag = false;
      orders.forEach(o => { if(o.paid === 0 && o.amount > wallet[0].wallet) flag = true; });
      res.status(200).json(flag);
    }
  } catch (err) {
    console.log(err)
    res.status(500).end();
  }
});

//PUT update wallet client
app.put('/api/clients/:id/wallet', async (req, res) => {

  const info = req.body;

  let amount = info.wallet
  try {
    await spgDao.updateWallet(req.params.id, amount)
    res.status(200).end();
  }
  catch {
    res.status(500).json({ error: "cannot update wallet" });
  }


  //return;
});

//PUT update basket client
app.put('/api/clients/basket/:id', async (req, res) => {
  //console.log(req.body)
  const items = JSON.stringify(req.body);
  //console.log(items)
  try {
    await spgDao.updateBasket(items, req.params.id)
    res.status(200).end();
  }
  catch {
    res.status(500).json({ error: "cannot update basket" });
  }


  //return;
});

//PUT modify order
app.put("/api/orders/modify/:id", async (req, res) => {
  const order = req.body;
  try {
    //restoring old quantities
    let flag = false;
    order.oldQ.forEach(async (pr) => {
      const res_prod = await spgDao.updateProductQuantity(pr);
      if (res_prod.error) flag = true;
    })
    if (flag) return;
    //setting new quantities
    order.products.forEach(async (prod) => {
      const res_prod = await spgDao.orderPrep(prod);
      if (res_prod.error) flag = true;
    })
    if (flag) return;
    await spgDao.modifyOrder(JSON.stringify(order.products), JSON.stringify(order.address), order.amount, req.params.id);
    res.status(200).end();
  }
  catch(err) {
    res.status(500).json({ error: err });
  }
});

//PUT modify order
app.put("/api/orders/modify/quantity/:id", async (req, res) => {
  console.log('form app' + req.body.id)
  const items = req.body;
  try {

    await spgDao.updateProductQuantity(items);

    res.status(200).end();
  } catch {
    res.status(500).json({ error: "cannot update basket" });
  }
});



// POST /api/orders/
//new order
app.post('/api/orders', async (req, res) => {

  const clock = await spgDao.getClock();
  const datetime = moment(clock.serverTime);
  if ((datetime.day() === 0 && datetime.hour() === 23) || (datetime.day() === 1 && (datetime.hour() >= 0 && datetime.hour() <= 8))) {
    res.status(507).end('New orders are not permitted in this timeslot.');
    return;
  }

  const order = req.body;
  try {
    if (order.test) {
      // just to test, after the call is set to -1
      order.id = await spgDao.getNextNumber();
      order.id = -1;
      order.products = {};
      order.amount = 0.0;
    }
    else {
      let flag = false;
      order.products.forEach(async (prod) => {
        const res_prod = await spgDao.orderPrep(prod);
        if (res_prod.error) flag = true;
      })
      if (flag) return;
      order.id = await spgDao.getNextNumber();
    }
    const clockString = moment(clock.serverTime).format('YYYY-MM-DD HH:mm');
    order.date = clockString.split(' ')[0];
    order.time = clockString.split(' ')[1];
    order.products = JSON.stringify(order.products);
    order.address = JSON.stringify(order.address);
    const result = await spgDao.addOrder(order);
    if (result.err)
      res.status(404).json(result);
    else {
      if (order.test) await spgDao.deleteTestOrder();
      res.status(200).json(order);
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: `${err}.` });
    return;
  }

});

// GET orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await spgDao.getOrders();
    if (orders.error) {
      res.status(404).json(orders);
    } else {
      res.json(orders);
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

// GET unretrieved orders
app.get("/api/unretrievedOrders/:datetime", async (req, res) => {
  try {
    const orders = await spgDao.getUnretrievedOrders(req.params.datetime);
    if (orders.error) {
      res.status(404).json(orders);
    } else {
      res.json(orders);
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

// DELETE order
app.delete("/api/order/:id", async (req, res) => {
  const result = await spgDao.deleteOrder(req.params.id);
  res.status(200).json(result);
});

// GET orders of specific client
app.get("/api/orders/:id", async (req, res) => {
  try {
    const orders = await spgDao.getOrders(req.params.id);
    if (orders.error) {
      res.status(404).json(orders);
    } else {
      res.json(orders);
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

//update order
app.put("/api/updateOrder/:id", async (req, res) => {
  const clock = await spgDao.getClock();
  const datetime = moment(clock.serverTime);
  if (!((datetime.day() === 3 && datetime.hour() >= 8) || datetime.day() === 4 || (datetime.day() === 5 && (datetime.hour() >= 0 && datetime.hour() <= 19)))) {
    res.status(500).end('Handing out is not permitted in this timeslot.');
    return;
  }

  const id = req.params.id;
  try {
    if (req.body.fulfilled) {
      const result = await spgDao.updateOrderFulfilled(id);
      if (result.err) res.status(404).json(result);
      else res.json(result);
    }
  } catch (err) {
    res.status(500).json({ error: `${err}.` });
    return;
  }
});

//update products status of a given order
app.put("/api/orders/:orderId/confirmProducts/", async (req, res) => {

  const clock = await spgDao.getClock();
  const datetime = moment(clock.serverTime);
  if (!((datetime.day() === 3 && datetime.hour() >= 8) || datetime.day() === 4 || (datetime.day() === 5 && (datetime.hour() >= 0 && datetime.hour() <= 19)))) {
    res.status(500).end('Confirmation out is not permitted in this timeslot.');
    return;
  }

  const orderId = req.params.orderId;
  const orderInfo = req.body.elem



  try {
    const result = await spgDao.confirmProductsOrder(orderId, orderInfo)
    if (result.err) res.status(404).json(result);
    else res.json(true);

  } catch (err) {
    res.status(500).json({ error: `${err}.` });
    return;
  }
});

//pay order
app.put("/api/orders/pay", async (req, res) => {
  const order = req.body;
  try {
    const result = await spgDao.updateOrderPaid(order);
    if (result.err) res.status(401).json(result);
    else res.json(result);
  } catch (err) {
    res.status(500).json({ error: `${err}.` });
    return;
  }
});



app.get("/api/orderswithstatus/:status", async (req, res) => {
  try {
    const orders = await spgDao.getOrdersByStatus(req.params.status);
    if (orders.error) {
      res.status(404).json(orders);
    } else {
      res.json(orders);
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

//update product confirm
app.put("/api/updateProduct/:id", async (req, res) => {
  const clock = await spgDao.getClock();
  const datetime = moment(clock.serverTime);
  if (!((datetime.day() === 6 && datetime.hour() >= 8) || datetime.day() === 0 || (datetime.day() === 5 && (datetime.hour() >= 0 && datetime.hour() <= 19)))) {
    res.status(500).end('Confirming a product is not permitted in this timeslot.');
    return;
  }

  const id = req.params.id;
  try {
    if (req.body.fulfilled) {
      const result = await spgDao.updateOrderFulfilled(id);
      if (result.err) res.status(404).json(result);
      else res.json(result);
    }
  } catch (err) {
    res.status(500).json({ error: `${err}.` });
    return;
  }
});

// GET server clock
app.get("/api/clock", async (req, res) => {
  try {
    const clock = await spgDao.getClock();
    if (clock.error) {
      res.status(404).json(clock);
    } else {
      res.json(clock);
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

// PUT server clock
app.put("/api/clock", async (req, res) => {
  try {
    const clock = await spgDao.setClock(req.body.serverTime);
    if (clock.error) {
      res.status(404).json(clock);
    } else {
      res.json(clock);
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

// GET deliverable products
app.get("/api/deliverableProducts", async (req, res) => {
  try {
    const orders = await spgDao.getOrders();
    const products = {};
    const farmers = [];
    console.log(orders)
    console.log("--")
    if (orders.error) {
      res.status(404).json(orders);
    } else {
      const promProd = await Promise.all(orders.map(async (o) => {
        await Promise.all(o.products.map(async (p) => {
          //return if product is not in state 2 = confirmed preparation
          if (parseInt(p.status) !== 2) return;
          if (!farmers.includes(p.farmer)) {
            farmers.push(p.farmer);
            let tempF = await spgDao.getFarmer(p.farmer);
            products[tempF.name] = [{ ...p, orderId: o.id }];
          }
          else {
            let tempF = await spgDao.getFarmer(p.farmer);
            products[tempF.name].push({ ...p, orderId: o.id });
          }
        }));
        return products;
      }));
      res.json(promProd[0] || []);
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

// GET deliveries
app.get("/api/deliveries", async (req, res) => {
  try {
    const deliveries = await spgDao.getDeliveries();
    if (deliveries.error) {
      res.status(404).json(deliveries);
    } else {
      const promDel = await Promise.all(deliveries.map(async (d) => {
        return {
          id: d.id,
          product: await spgDao.getProduct(d.product),
          farmer: await spgDao.getFarmer(d.farmer),
          quantity: d.quantity,
          orderId: d.orderId
        }
      }));
      res.json(promDel);
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

// POST deliveries
app.post("/api/deliveries", async (req, res) => {
  try {
    const clock = await spgDao.getClock();
    const datetime = moment(clock.serverTime);
    if (!((datetime.day() === 1 && datetime.hour() >= 9) || (datetime.day() === 2))) {
      res.status(500).end('Delivery is not permitted in this timeslot.');
      return;
    }

    const delivery = req.body;
    const order = await spgDao.getOrders(undefined, delivery.orderId);
    if (order.error) {
      res.status(404).json(order);
    }
    order[0].products.forEach((p) => {
      if (p.id === delivery.id) {
        p.status = 3;
      }
    });
    order[0].products = JSON.stringify(order[0].products);
    const result = await spgDao.confirmProductsOrder(delivery.orderId, order[0]);
    if (result.error) {
      res.status(404).json(result);
    }
    const resultD = await spgDao.createDelivery(delivery);
    if (resultD.error) {
      res.status(404).json(resultD);
    } else {
      res.json(resultD);
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

app.post("/api/confirmOrderForPickup", async (req, res) => {
  try {
    const order = req.body;
    console.log(req.body)
    const products = JSON.parse(order.products)
    var result;
    products.forEach(async (p) => {
      result = await spgDao.subtractQuantities(p.quantity, p.id);
      if (result.error) {
        res.status(501).json(result);
      }
    })
    result = await spgDao.setOrderStatus("available", order.id);
    if (result.error) {
      res.status(502).json(result);
    }
    else {
      res.status(200).json(result)
    }
  }
  catch (error) {
    console.log(error);
    res.status(503).end();
  }
})

/*** User APIs ***/

// POST sessions 
// login
app.post('/api/sessions', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      // display wrong login messages
      //console.log(user)
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (error) => {
      if (error)
        return next(error);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});

// POST addNewUser
// add a new user
app.post('/api/addNewUser', async (req, res) => {
  console.log('Request arrived to the server');
  const user_info = req.body;
  try {
    const result = await userDao.addUser(user_info.name, user_info.surname, user_info.password, user_info.email, user_info.phoneNumber, user_info.city, user_info.address, user_info.country, 'client');
    if (result.err) {
      res.status(500).json(result);
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ error: `${err}.` });
    return;
  }
});

// DELETE user
app.delete('/api/deleteUser', async (req, res) => {
  const result = await userDao.deleteUser(req.body.email);
  res.status(200).json(result);
});


// DELETE sessions/current 
// logout
app.delete('/api/sessions/current', (req, res) => {
  req.logout();
  res.status(200).end();
});

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  }
  else
    res.status(401).json({ error: 'Unauthenticated user!' });
});

module.exports = app;
