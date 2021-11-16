const puppeteer = require('puppeteer');

describe("MyNavBar.js tests", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("tests logout", async () => {
    await page.goto("http://localhost:3000/employee");

    const dropdown = await page.$('#dropdown');
    await dropdown.click();
    const logout = await page.$('#logout');
    await logout.click();
    await page.waitForNavigation();
    expect(page.url()).toContain('http://localhost:3000/login');
  });

  it("tests cart presence", async () => {
    await page.goto("http://localhost:3000/employee");

    const cart = await page.$('#cart');
    await cart.click();
    let cartpresence = await page.$eval('#cartpresence', e => e ? true : false);
    expect(cartpresence).toBe(true);
  });

  afterAll(() => browser.close());
});