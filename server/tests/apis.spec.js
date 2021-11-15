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

  it('tests POST /api/addNewUser', async () => {
    const test = {name: "Mario", surname: "Rossi", password: "password", email: "email@email.it"};
    const response = await request(app).post("/api/addNewUser").send({ test }).expect(200);
  });
});

describe('Orders test', () => {
  it('tests POST /api/orders', async () => {
    const test = 'yes';
    const response = await request(app).post("/api/orders").send({ test }).expect(200);
  });
});
