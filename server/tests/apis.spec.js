const { describe } = require('jest-circus');
const request = require('supertest');
const app = require("../app");

describe('Products test', () => {
  it('tests GET /api/products', async () => {
    const response = await request(app).get("/api/products");
    response.body.forEach((product) => {
      expect(product).toMatchSnapshot({
        id: expect.any(Number),
        name: expect.any(String),
        quantity: expect.any(Number),
        unit: expect.any(String),
        farmer: expect.any(Number),
        farmerName: expect.any(String),
        price: expect.any(Number)
      });
    });
  });
});

describe('Clients test', () => {
  it('tests GET /api/clients', async () => {
    const response = await request(app).get("/api/clients");
    response.body.forEach((product) => {
      expect(product).toMatchSnapshot({
        id: expect.any(Number),
        name: expect.any(String),
        surname: expect.any(String)
      });
    });
  });

  it('tests GET /api/clients/:id', async () => {
    const response = await request(app).get("/api/clients/-1");
    expect(response.body).toMatchSnapshot({
      id: expect.any(Number),
      name: expect.any(String),
      surname: expect.any(String),
      wallet: expect.any(Number),
      email: expect.any(String)
    });
  });

  it('tests PUT /api/clients/:id/wallet', async () => {
    const wallet = 0.0;
    await request(app).put("/api/clients/-1/wallet").send({ wallet }).expect(200);
  });
});

describe('Orders test', () => {
  it('tests GET /api/orders', async () => {
    const response = await request(app).get("/api/orders");
    response.body.forEach((order) => {
      expect(order).toMatchSnapshot({
        id: expect.any(Number),
        userId: expect.any(Number),
        products: expect.any(Object),
        address: expect.any(String),
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
        userId: expect.any(Number),
        products: expect.any(Object),
        address: expect.any(String),
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

describe('Users test', () => {
  it('tests POST /api/addNewUser', async () => {
    const response = await request(app).post("/api/addNewUser").send({ name: "Mario", surname: "Rossi", password: "password", email: "test_email@email.it" }).expect(200);
    console.log(response.body.id)
    const response2 = await request(app).post("/api/addNewUser").send({ name: "Mario", surname: "Rossi", password: "password", email: "test_email@email.it" }).expect(500);
    const deleteRes = await request(app).delete("/api/deleteUser").send({ email: "test_email@email.it" }).expect(200);
  });

  it('tests error POST /api/addNewUser', async () => {
    const response = await request(app).post("/api/addNewUser").send({ name: "Mario", surname: "Rossi", email: "test_email@email.it" }).expect(500);
  });
});

describe('Session test', () => {
  it('tests delete /api/sessions/current', async () => {
    const deleteRes = await request(app).delete("/api/sessions/current").expect(200);
  });

  it('tests get /api/sessions/current', async () => {
    const deleteRes = await request(app).get("/api/sessions/current").expect(401);
  });

});