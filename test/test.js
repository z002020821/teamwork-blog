const ok = require('assert').ok
require('../src/index');
var app = require('http'); 
const puppeteer = require('puppeteer');
var browser, page

const opts = {
  headless: false,
  slowMo: 100,
  timeout: 10000
};

describe('blog', function() {
  before (async function () {
    browser = await puppeteer.launch(opts);
    page = await browser.newPage();
  });
  after(function() {
    browser.close();
  });

  describe('puppeteer', function() {
    it('GET / should see 軟體工程 - 小法帝國', async function() {
      await page.goto('http://localhost:8080', {waitUntil: 'domcontentloaded'})
      let html = await page.content()
      ok(html.indexOf('<h1>軟體工程 - 小法帝國</h1>') >= 0)
    })
    it('click Log in button', async function() {
      await page.click("body > p:nth-child(2) > a")
      let html = await page.content()
      ok(html.indexOf('<h1>登入</h1>') >= 0)
    })

    it('click Buck button', async function() {
      await page.click("body > form > p:nth-child(3) > a")
      let html = await page.content()
      ok(html.indexOf('<title>Test</title>') >= 0)
    })

    it('click Register button', async function() {
      await page.click("body > p:nth-child(3) > a")
      let html = await page.content()
      ok(html.indexOf('<h1>註冊</h1>') >= 0)
    })

    it('click Buck button', async function() {
      await page.click("body > form > p:nth-child(3) > a")
      let html = await page.content()
      ok(html.indexOf('<title>Test</title>') >= 0)
    })
  })
})