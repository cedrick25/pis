const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const USERNAME = 'jssantos';
const PASSWORD = 'Dojppa2022';

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: 'load', timeout: 25000 });
  const apiBefore = await page.evaluate(() => ({
    api: localStorage.getItem('api'),
    pisApi: window.__PIS_API_BASE,
  }));
  console.log('before login', apiBefore);
  await page.locator('input.email').fill(USERNAME);
  await page.locator('input.password').fill(PASSWORD);
  await page.locator('.btn-confirm').click();
  await page.waitForTimeout(5000);
  const after = await page.evaluate(() => ({
    url: location.href,
    api: localStorage.getItem('api'),
    permission: !!localStorage.getItem('permission'),
    userName: localStorage.getItem('userName'),
    cookies: document.cookie,
    prompt: (document.querySelector('#prompt, .prompt') || {}).innerText || '',
  }));
  console.log(JSON.stringify(after, null, 2));
  await page.screenshot({ path: 'C:/wamp64/www/pis/PIS_End_User_Manual_Screenshots_20260910/debug-after-login.png', fullPage: false });
  await browser.close();
})();
