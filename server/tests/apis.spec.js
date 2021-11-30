const { describe } = require("jest-circus");
const request = require("supertest");
const app = require("../app");
var server = request.agent(app);
var dayjs = require('dayjs');
const spgDao = require("../spgDao");
const moment = require('moment')

function loginUser() {
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
};

function loginClient() {
  return function (done) {
    server
      .post("/api/sessions")
      .send({ username: "gigi@libero.it", password: "cagliari" })
      .expect(200)
      .end(onResponse);

    function onResponse(err, res) {
      if (err) return done(err);
      return done();
    }
  };
};

function logoutUser() {
  return function (done) {
    server
      .delete("/api/sessions/current")
      .expect(200)
      .end(onResponse);

    function onResponse(err, res) {
      if (err) return done(err);
      return done();
    }
  };
};

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

  it("tests PUT /api/clients/:id/wallet", async () => {
    const wallet = 0.0;
    await request(app)
      .put("/api/clients/-1/wallet")
      .send({ wallet })
      .expect(200);
  });
});

describe('Orders test', () => {
  
  it('tests GET /api/orders', async () => {
    const response = await request(app).get("/api/orders")//.expect(200);
    response.body.forEach((order) => {
      expect(order).toMatchSnapshot({
        id: expect.any(Number),
        products: expect.any(Object),
        address: expect.any(Object),
        date: expect.any(String),
        time: expect.any(String),
        amount: expect.any(Number),
        conf: expect.any(Boolean),
        fulfilled: expect.any(Boolean)
      });
    });
  });

  it('tests GET /api/orders/:id', async () => {
    const response = await request(app).get("/api/orders/1");
    response.body.forEach((order) => {
      expect(order).toMatchSnapshot({
        id: expect.any(Number),
        products: expect.any(Object),
        address: expect.any(Object),
        date: expect.any(String),
        time: expect.any(String),
        amount: expect.any(Number),
        conf: expect.any(Boolean),
        fulfilled: expect.any(Boolean)
      });
    });
  });

  it('tests POST /api/orders', async () => {
    const test = 'yes';
    const response = await request(app).post("/api/orders").send({ test }).expect(200);
  });
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
    console.log(response.body.id);
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
  it('login', loginUser());

  it("tests POST /api/products", async () => {
    await spgDao.setClock("2021-11-27 08:55");
    const datetime = moment("2021-11-27 08:55");
    if (!(datetime.day() === 5 || (datetime.day() === 6 && datetime.hour() < 9))) {
      await server
        .post("/api/products")
        .send({
          name: "Milk",
          quantity: 7,
          unit: "l",
          price: 1.5,
          filter: "Dairy and Eggs"
        })
        .expect(500);

      console.log("Insertion of product not permitted")
    }
    else {
      await server
        .post("/api/products")
        .send({
          name: "Milk",
          quantity: 7,
          unit: "l",
          price: 1.5,
          filter: "Dairy and Eggs"
        })
        .expect(200);


      const maxId = await spgDao.getMaxProdId();
      await server
        .delete(`/api/products/${maxId}`)
        .expect(200);
    }
  });

  it("tests PUT /api/products/:id", async () => {
    const clock = await spgDao.getClock();
    await spgDao.setClock("2021-11-27 08:55");
    const datetime = moment("2021-11-27 08:55");
    if (!(datetime.day() === 5 || (datetime.day() === 6 && datetime.hour() < 9))) {
      await server
        .post("/api/products")
        .send({
          name: "Milk",
          quantity: 7,
          unit: "l",
          price: 1.5,
          filter: "Dairy and Eggs"
        })
        .expect(500);

      console.log("Insertion of product not permitted")
    }
    else {
      await server
        .post("/api/products")
        .send({
          name: "Milk",
          quantity: 7,
          unit: "l",
          price: 1.5,
          filter: "Dairy and Eggs"
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
            filter: "Dairy and Eggs"
          },
          action: {
            update: true
          }
        })
        .expect(200);

      await spgDao.setClock("2021-11-29 08:55");

      await server
        .put(`/api/products/${maxId}`)
        .send({
          product: {
            id: maxId
          },
          action: {
            confirm: true
          }
        })
        .expect(200);

      await spgDao.setClock(clock.serverTime);

      await server
        .delete(`/api/products/${maxId}`)
        .expect(200);
    }
  });


  it('logout', logoutUser());
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

describe('Next week test', () => {
  it('tests get /api/nextProducts without performing the login', async () => {
    const deleteRes = await request(app).delete("/api/sessions/current").expect(200);
    const res = await request(app).get("/api/nextProducts").expect(401);
  });
});

describe('Next week test not on sunday', () => {

  it('login', loginClient());

  it('tests get /api/nextProducts after the login as a customer not on sunday', async () => {
    var today = dayjs("2021-11-27 8:55");
    if (today.day() == 0) {
      today = today.add(1, 'day');
    }
    // set the clock
    const res_clock = await request(app).put("/api/clock").send({ serverTime: today.format('YYYY-MM-DD hh:mm') }).expect(200);
    // login
    const res_login = await request(app).post("/api/sessions").send({ username: "gigi@libero.it", password: "cagliari" }).expect(200);
    console.log(res_login.body)
    console.log("LOGIN----------------" + res_login.body.id)
    const res = await server.get("/api/nextProducts").expect(200);

    res.body.forEach((product) => {
      expect(product).toMatchSnapshot({
        id: expect.any(Number),
        name: expect.any(String),
        quantity: expect.any(Number),
        unit: expect.any(String),
        farmer: expect.any(Number),
        price: expect.any(Number),
        availability: expect.any(String),
        filter: expect.any(String)
      });
    });
    const logout = await request(app).delete("/api/sessions/current").expect(200);
  });
});


describe('Next week test on sunday', () => {

  it('login', loginUser());

  it('tests get /api/nextProducts after the login as a customer on sunday', async () => {
    // compute the day of the sunday of the week
    const today = dayjs();
    let difference_from_sunday = 0;
    if (today.day() != 0) {
        difference_from_sunday = 7 - today.day()+1;
    }
    const next_week = today.add(difference_from_sunday, 'day');
    // set the clock
    const res_clock = await request(app).put("/api/clock").send({serverTime: toString(next_week)}).expect(200);

    await server.get("/api/nextProducts").expect(200);
    
    const logout = await request(app).delete("/api/sessions/current").expect(200);
  });

  it('tests fet /api/nextProducts in the current week', async () => {
    await server.get("/api/nextProducts").query({week: "current"}).expect(200);
    const logout = await request(app).delete("/api/sessions/current").expect(200);
  })
});

describe('Next week test farmer', () => {

  it('login', loginUser());

  it('tests get /api/nextProducts after the login as a farmer', async () => {
    const res = await server.get("/api/nextProducts").query({role: "farmer"});
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

describe('login test', () => {
  it('tests post /api/session', async () => {
    const response = await request(app).post("/api/sessions").send({ username: "gigi@libero.it", password: "cagliari" }).expect(200);
    const deleteRes = await request(app).delete("/api/sessions/current").expect(200);
  });
  it("tests post /api/session error", async () => {
    const response = await request(app)
      .post("/api/sessions")
      .send({ username: "gigi@libero.it", password: "cagl" })
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

describe("get wallet test", () => {
  it("tests GET /api/wallet/:id", async () => {
    const response = await request(app).get("/api/wallet/2");
    response.body.forEach((wallet) => {
      expect(wallet).toMatchSnapshot({
        wallet: expect.any(Number),
      });
    });
  });


});
