const puppeteer = require('puppeteer');

describe("MyLogin.js tests", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("tests error messages", async () => {
    await page.goto("http://localhost:3000/login");

    await page.type('#password', 'thisisnotapassword');
    const inputp = await page.$('#password');
    await inputp.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    const errorp = await page.$eval('#errorp', e => e.textContent);
    expect(errorp).toContain('Should have some characters');

    await page.type('#username', 'thisisnotausername');
    const inputu = await page.$('#username');
    await inputu.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    const erroru = await page.$eval('#erroru', e => e.textContent);
    expect(erroru).toContain('Should have some characters');

    await inputp.type('thisisnotapassword');
    await inputu.type('thisisnotausername');
    await page.click('#submit');
    await page.waitForSelector('#errors');
    const errors = await page.$eval('#errors', e => e.textContent);
    expect(errors).toContain('Failed to login: invalid username/password');
  });

  it("tests successful login", async () => {
    await page.goto("http://localhost:3000/login");

    await page.type('#username', 'nino@gmail.com');
    await page.type('#password', 'password');
    await page.click('#submit');
    await page.waitForNavigation();
    expect(page.url()).toContain('http://localhost:3000/employee');
  });

  afterAll(() => browser.close());
});