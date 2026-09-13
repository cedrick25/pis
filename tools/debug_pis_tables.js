const { chromium } = require('playwright');
const BASE_URL = 'http://localhost/pis/';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  page.on('response', async (res) => {
    const url = res.url();
    if (/8080|8000|8088|client|docket|worksheet/i.test(url) && res.request().resourceType() === 'xhr' || /8000|8080|8088|8090/.test(url)) {
      if (res.request().resourceType() === 'xhr' || res.request().resourceType() === 'fetch') {
        console.log('XHR', res.status(), url.slice(0, 160));
      }
    }
  });
  await page.goto(BASE_URL, { waitUntil: 'load' });
  await page.evaluate(() => localStorage.setItem('api', 'http://localhost/'));
  await page.locator('input.email').fill('jssantos');
  await page.locator('input.password').fill('Dojppa2022');
  await page.locator('.btn-confirm').click();
  await page.waitForTimeout(4000);
  console.log('after login', page.url());
  console.log('cookies', await page.context().cookies());
  await page.goto(BASE_URL + 'investigation_docketing', { waitUntil: 'load' });
  await page.waitForTimeout(6000);
  const inv = await page.evaluate(() => ({
    rows: document.querySelectorAll('table tbody tr').length,
    buttons: Array.from(document.querySelectorAll('button, .btn')).map(b => ({
      text: (b.innerText || '').replace(/\s+/g, ' ').trim(),
      cls: b.className,
      display: getComputedStyle(b).display,
    })).filter(b => b.text).slice(0, 40),
    empty: document.body.innerText.slice(0, 400),
  }));
  console.log('INV', JSON.stringify(inv, null, 2));
  await page.goto(BASE_URL + 'client_list', { waitUntil: 'load' });
  await page.waitForTimeout(8000);
  const cl = await page.evaluate(() => ({
    rows: document.querySelectorAll('table tbody tr').length,
    links: Array.from(document.querySelectorAll('a')).map(a => a.href).filter(h => h.includes('client')).slice(0, 10),
    text: document.body.innerText.slice(0, 500),
  }));
  console.log('CLIENT', JSON.stringify(cl, null, 2));
  await browser.close();
})();
