const { describe } = require("jest-circus");
const request = require("supertest");
var dayjs = require("dayjs");
const spgDao = require("../spgDao");
const moment = require("moment");
const app = require("../app");
var server = request.agent(app)
const userDao = require("../userDao")


function loginAdmin() {
  return function (done) {
    server
      .post("/api/sessions")
      .send({ username: "admin@admin.admin", password: "admin" })
      .expect(200)
      .end(onResponse);

    function onResponse(err, res) {
      if (err) return done(err);
      return done();
    }
  };
}

function loginClient() {
  return function (done) {
    server
      .post("/api/sessions")
      .send({ username: "client@client.client", password: "client" })
      .expect(200)
      .end(onResponse);

    function onResponse(err, res) {
      if (err) return done(err);
      return done();
    }
  };
}

function loginFarmer() {
  return function (done) {
    server
      .post("/api/sessions")
      .send({ username: "farmer@farmer.farmer", password: "farmer" })
      .expect(200)
      .end(onResponse);

    function onResponse(err, res) {
      if (err) return done(err);
      return done();
    }
  };
}

function loginWManager() {
  return function (done) {
    server
      .post("/api/sessions")
      .send({ username: "wmanager@wmanager.wmanager", password: "wmanager" })
      .expect(200)
      .end(onResponse);

    function onResponse(err, res) {
      if (err) return done(err);
      return done();
    }
  };
}

function logoutUser() {
  return function (done) {
    server.delete("/api/sessions/current").expect(200).end(onResponse);

    function onResponse(err, res) {
      if (err) return done(err);
      return done();
    }
  };
}

describe("Products test", () => {
  it("tests GET /api/products", async () => {
    const response = await request(app).get("/api/products");

    response.body.forEach((product) => {
      expect(product).toMatchSnapshot({
        id: expect.any(Number),
        name: expect.any(String),
        quantity: expect.any(Number),
        unit: expect.any(String),
        farmer: expect.any(Number),
        farmerName: expect.any(String),
        price: expect.any(Number),
      });

    });

  });
});

describe("Clients test", () => {
  it("tests GET /api/clients", async () => {
    const response = await request(app).get("/api/clients");
    response.body.forEach((product) => {
      expect(product).toMatchSnapshot({
        id: expect.any(Number),
        name: expect.any(String),
        surname: expect.any(String),
        role: expect.any(String)
      });
    });
  });

  it("tests GET /api/clients/:id", async () => {
    const response = await request(app).get("/api/clients/-1");
    expect(response.body).toMatchSnapshot({
      id: expect.any(Number),
      name: expect.any(String),
      surname: expect.any(String),
      wallet: expect.any(Number),
      email: expect.any(String),
    });
  });

  it("tests error GET /api/clients/:id", async () => {
    const response = await request(app).get("/api/clients/ciao").expect(500)
  });

  it("tests PUT /api/clients/:id/wallet", async () => {
    const wallet = 0.0;
    await request(app)
      .put("/api/clients/-1/wallet")
      .send({ wallet })
      .expect(200);
  });


});


describe("Orders test", () => {
  it("tests GET /api/orders", async () => {
    const response = await request(app).get("/api/orders").expect(200);
    /*response.body.forEach((order) => {
      expect(order).toMatchSnapshot({
        id: expect.any(Number),
        date: expect.any(String),
        time: expect.any(String),
        amount: expect.any(Number),
        conf: expect.any(Number),
        fulfilled: expect.any(Number),
        paid: expect.any(Number)
      });
    });*/
  });

  it("tests GET /api/orders/:id", async () => {
    const response = await request(app).get("/api/orders/1").expect(200);
    response.body.forEach((order) => {
      expect(order).toMatchSnapshot({
        id: expect.any(Number),
        products: expect.any(Array),
        address: expect.any(Object),
        date: expect.any(String),
        time: expect.any(String),
        amount: expect.any(Number),
        conf: expect.any(Number),
        fulfilled: expect.any(Number),
        paid: expect.any(Number)
      });
    });
  });



  it("tests POST /api/orders", async () => {
    const test = "yes";
    const response = await request(app)
      .post("/api/orders")
      .send({ test })
      .expect(200);
  });

  it("test GET /api/unretrievedOrders/:datetime", async () => {
    const resonse = await request(app).get("/api/unretrievedOrders/2022-01-20").expect(200);
  });

  it("test GET /api/unretrievedOrders/:datetime with a null datetime", async () => {
    const resonse = await request(app).get("/api/unretrievedOrders/").expect(404);
  })
});

describe("Users test", () => {
  it("tests POST /api/addNewUser", async () => {
    const response = await request(app)
      .post("/api/addNewUser")
      .send({
        name: "Mario",
        surname: "Rossi",
        password: "password",
        email: "test_email@email.it",
        phoneNumber: "3333333333",
        city: "Torino",
        address: "Via X, 5",
        country: "Italy",
        role: "customer",
      })
      .expect(200);
    const response2 = await request(app)
      .post("/api/addNewUser")
      .send({
        name: "Mario",
        surname: "Rossi",
        password: "password",
        email: "test_email@email.it",
        phoneNumber: "3333333333",
        city: "Torino",
        address: "Via X, 5",
        country: "Italy",
        role: "customer",
      })
      .expect(500);
    const deleteRes = await request(app)
      .delete("/api/deleteUser")
      .send({ email: "test_email@email.it" })
      .expect(200);
  });

  it("tests error POST /api/addNewUser", async () => {
    const response = await request(app)
      .post("/api/addNewUser")
      .send({
        name: "Mario",
        surname: "Rossi",
        email: "test_email@email.it",
        phoneNumber: "3333333333",
        city: "Torino",
        address: "Via X, 5",
        country: "Italy",
        role: "customer",
      })
      .expect(500);
  });
});

describe("Farmers test", () => {
  it("login", loginFarmer());

  it("tests POST /api/products", async () => {
    await spgDao.setClock("2021-11-22 09:55");

    await server
      .post("/api/products")
      .send({
        name: "Milk",
        quantity: 7,
        unit: "l",
        price: 1.5,
        filter: "Dairy and Eggs",
      })
      .expect(500);

    await spgDao.setClock("2021-11-27 08:55");

    await server
      .post("/api/products")
      .send({
        name: "Milk",
        quantity: 7,
        unit: "l",
        price: 1.5,
        filter: "Dairy and Eggs",
      })
      .expect(200);

    const maxId = await spgDao.getMaxProdId();
    await server.delete(`/api/products/${maxId}`).expect(200);

  });

  it("tests PUT /api/products/:id", async () => {
    const clock = await spgDao.getClock();
    await spgDao.setClock("2021-11-27 08:55");
    const datetime = moment("2021-11-27 08:55");
    if (
      !(datetime.day() === 5 || (datetime.day() === 6 && datetime.hour() < 9))
    ) {
      await server
        .post("/api/products")
        .send({
          name: "Milk",
          quantity: 7,
          unit: "l",
          price: 1.5,
          filter: "Dairy and Eggs",
        })
        .expect(500);

      console.log("Insertion of product not permitted");
    } else {
      await server
        .post("/api/products")
        .send({
          name: "Milk",
          quantity: 7,
          unit: "l",
          price: 1.5,
          filter: "Dairy and Eggs",
        })
        .expect(200);

      const maxId = await spgDao.getMaxProdId();

      await server
        .put(`/api/products/${maxId}`)
        .send({
          product: {
            id: maxId,
            name: "Milk",
            quantity: 7,
            unit: "l",
            price: 1.5,
            filter: "Dairy and Eggs",
            delete: 0,
            image: "no_image.png"
          },
          action: {
            update: true,
          },
        })
        .expect(200);

      await spgDao.setClock("2021-11-29 08:55");

      await server
        .put(`/api/products/${maxId}`)
        .send({
          product: {
            id: maxId,
          },
          action: {
            confirm: true,
          },
        })
        .expect(200);

      await spgDao.setClock(clock.serverTime);

      await server.delete(`/api/products/${maxId}`).expect(200);
    }
  });

  it("logout", logoutUser());
});

describe("Session test", () => {
  it("tests delete /api/sessions/current", async () => {
    const deleteRes = await request(app)
      .delete("/api/sessions/current")
      .expect(200);
  });

  it("tests get /api/sessions/current", async () => {
    const deleteRes = await request(app)
      .get("/api/sessions/current")
      .expect(401);
  });
});

describe("Next week test", () => {
  it("tests get /api/nextProducts without performing the login", async () => {
    const deleteRes = await request(app)
      .delete("/api/sessions/current")
      .expect(200);
    const res = await request(app).get("/api/nextProducts").expect(401);
  });
});

describe("Next week test not on sunday", () => {
  it("login", loginClient());

  it("tests get /api/nextProducts after the login as a customer not on sunday", async () => {
    var today = dayjs("2021-11-27 8:55");
    if (today.day() == 0) {
      today = today.add(1, "day");
    }
    // set the clock
    const res_clock = await request(app)
      .put("/api/clock")
      .send({ serverTime: today.format("YYYY-MM-DD hh:mm") })
      .expect(200);
    // login
    const res_login = await request(app)
      .post("/api/sessions")
      .send({ username: "admin@admin.admin", password: "admin" })
      .expect(200);
    const res = await server.get("/api/nextProducts").expect(200);

    res.body.forEach((product) => {
      expect(product).toMatchSnapshot({
        id: expect.any(Number),
        name: expect.any(String),
        quantity: expect.any(Number),
        unit: expect.any(String),
        farmer: expect.any(Number),
        farmerName: expect.any(String),
        price: expect.any(Number),
        availability: expect.any(String),
        filter: expect.any(String),
        image: expect.any(String),
        confirmed: expect.any(Number)
      });
    });
    const logout = await request(app)
      .delete("/api/sessions/current")
      .expect(200);
  });
});

describe("Next week test on sunday", () => {
  it("login", loginClient());

  it("tests get /api/nextProducts after the login as a customer on sunday", async () => {
    // compute the day of the sunday of the week
    const today = dayjs();
    let difference_from_sunday = 0;
    if (today.day() != 0) {
      difference_from_sunday = 7 - today.day() - 1;
    }
    const next_week = today.add(difference_from_sunday, "day");
    // set the clock
    const res_clock = await request(app)
      .put("/api/clock")
      .send({ serverTime: next_week.format("YYYY-MM-DD hh:mm") })
      .expect(200);

    await server.get("/api/nextProducts").expect(200);

    const logout = await request(app)
      .delete("/api/sessions/current")
      .expect(200);
  });

  it("tests fet /api/nextProducts in the current week", async () => {
    await server
      .get("/api/nextProducts")
      .query({ week: "current" })
      .expect(200);
    const logout = await request(app)
      .delete("/api/sessions/current")
      .expect(200);
  });
});

describe("Next week test farmer", () => {
  it("login", loginFarmer());

  it("tests get /api/nextProducts after the login as a farmer", async () => {
    const res = await server.get("/api/nextProducts").query({ role: "farmer" });
    res.body.forEach((product) => {
      expect(product).toMatchSnapshot({
        id: expect.any(Number),
        name: expect.any(String),
        quantity: expect.any(Number),
        unit: expect.any(String),
        farmer: expect.any(Number),
        price: expect.any(Number),
        availability: expect.any(String),
        filter: expect.any(String),
      });
    });
  });
  afterEach(() => {
    return request(app).delete("/api/sessions/current").expect(200);
  });
});

describe("login test", () => {
  it("tests post /api/session", async () => {
    const response = await request(app)
      .post("/api/sessions")
      .send({ username: "admin@admin.admin", password: "admin" })
      .expect(200);
    const deleteRes = await request(app)
      .delete("/api/sessions/current")
      .expect(200);
  });
  it("tests post /api/session error", async () => {
    const response = await request(app)
      .post("/api/sessions")
      .send({ username: "admin@admin.admin", password: "admi" })
      .expect(401);
  });
});

describe("update basket test", () => {
  it("tests PUT /api/clients/basket/:id", async () => {
    await request(app)
      .put("/api/clients/basket/2")
      .send({
        id: 4,
        name: "Cheese",
        quantity: 2,
        unit: "kg",
        filter: "Dairy",
        farmer: 3,
        farmerName: "TerraGrossa",
        price: 10.3,
        availability: "2021-11-29",
      })
      .expect(200);
  });
});

describe("modify order test", () => {
  it("tests PUT /api/orders/modify/:id", async () => {
    await request(app)
      .put("/api/orders/modify/1")
      .send({
        address: {
          address: "STORE PICKUP", deliveryOn: "2021-12-01 11:30"
        }, products:
          [{ id: 4, quantity: 2, unit: "kg", price: 10.3, farmer: 3, status: 0, name: "Cheese" }],
        oldQ: [{ id: 4, quantity: 1 }],
        amount: 20.6
      })
      .expect(200);
  });
});

describe("modify order test", () => {
  it("tests error PUT /api/orders/modify/:id", async () => {
    await request(app)
      .put("/api/orders/modify/-4")
      .expect(500);
  });
});


describe("get wallet test", () => {
  it("tests GET /api/wallet/:id", async () => {
    const response = await request(app).get("/api/wallet/2");
    expect(200);
  });
  it("tests GET /api/wallet/ with negative id", async () => {
    const response = await request(app).get("/api/wallet/-7");
    expect(404);
  });

});

describe("Delivery tests", () => {
  it("login", loginWManager());

  afterEach(() => {
    return request(app).delete("/api/sessions/current").expect(200);
  });

  it("tests get /api/deliverableProducts after the login as a wmanager", async () => {
    const res = await server.get("/api/deliverableProducts");
    if (res.boby)
      res.body.forEach((product) => {
        expect(product).toMatchSnapshot({
          farmer: expect.any(Object),
        });
      });
  });

  it("tests get /api/deliveries after the login as a wmanager", async () => {
    const res = await server.get("/api/deliveries");
    if (res.body)
      res.body.forEach((delivery) => {
        expect(delivery).toMatchSnapshot({
          id: expect.any(Number),
          product: expect.any(Object),
          farmer: expect.any(Object),
          quantity: expect.any(Number),
          orderId: expect.any(Number),
        });
      });
  });

  it("tests post /api/deliveries after the login as a wmanager", async () => {
    const clock = await spgDao.getClock();
    await spgDao.setClock("2021-11-23 09:55");



    const res = await server.get("/api/deliverableProducts");


  });
});

describe("get orders by status", () => {
  it("login", loginWManager());
  it("tests GET /api/orderswithstatus/:status", async () => {
    const res = await server.get("/api/orderswithstatus/available").expect(200);
  });
  it("tests GET /api/orderswithstatus/not_available", async () => {
    const res = await server.get("/api/orderswithstatus/not_available").expect(200);
  });
  it("tests GET /api/orderswithstatus/ with null status", async () => {
    const res = await server.get("/api/orderswithstatus/").expect(404);
  });
});

describe("confirm order test", () => {
  it('login', loginWManager());
  it("tests POST /api/confirmOrderForPickup", async () => {
    const order = await request(app).post("/api/orders").send(JSON.stringify({
      products: [{
        id: -5,
        name: "MilkTest",
        quantity: 7,
        unit: "l",
        price: 1.5,
        filter: "Dairy and Eggs"
      }],
      amount: 2,
      address: "undefined",
      user: 2,
      paid: 0
    })).expect(500);
    /*const maxId = await spgDao.getMaxOrderId();
    const msg =
      {
        "id": maxId,
        "products": [{
          "id": -5,
          "name": "MilkTest",
          "quantity": 7,
          "unit": "l",
          "price": 1.5,
          "filter": "Dairy and Eggs"
        }],
        "amount": 2,
        "address": "undefined",
        "user": 2,
        "paid": 0
      }
    
      console.log(msg)
    await request(app).post("/api/confirmOrderForPickup").send(msg).expect(503);*/

    //const delete_order = await request(app).delete("/api/order/" + maxId).expect(200)
    await request(app).delete("/api/sessions/current").expect(200);
  });

});


describe("Pay order", () => {
  it("tests put /api/orders/pay", async () => {
    await server.put("/api/orders/pay").send({ id: 1, userID: 2, amount: 0.0 }).expect(200);
  });
});

describe("Fulfill order", () => {
  it("login", loginAdmin());

  it("tests put /api/updateOrder/:id", async () => {
    await spgDao.setClock("2021-11-21 09:55");
    await server.put("/api/updateOrder/0").send({ fulfilled: 0 }).expect(500);

    await request(app).delete("/api/sessions/current").expect(200);
  });
});


describe("System clock", () => {
  it("tests get /api/clock", async () => {
    const clock = await server.get("/api/clock").expect(200);
  });
});

describe("userDao tests", () => {
  it("getUserById with invalid id", async () => {
    try {
      await userDao.getUserById(400000)
    }
    catch (e) {
      expect(e).toEqual({
        error: 'User not found.'
      })
    }
  })

  it("getUser invalid email", async () => {
    await expect(userDao.getUser("5")).resolves.toEqual(false);
  })
})