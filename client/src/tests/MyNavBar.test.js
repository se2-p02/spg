const puppeteer = require('puppeteer');

describe("MyNavBar.js tests", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("tests logout", async () => {
    await page.goto("http://localhost:3000/employee",{ waitUntil: "networkidle2"});
    let item5 = await page.$('#lll');
    console.log(item5)
    item5 = await page.$('#cazzo');
    console.log("---------------------")
    console.log(item5)
    item5 = await page.$('#puttana');
    console.log("---------------------")
    console.log(item5)
    






    
  });


  afterAll(() => browser.close());
});