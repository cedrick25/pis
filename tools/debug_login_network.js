const { chromium } = require('playwright');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await (await browser.newContext({ viewport: { width: 1400, height: 900 } })).newPage();
  const responses = [];
  page.on('response', async (res) => {
    const u = res.url();
    if (/login|user|auth|8088|otp/i.test(u)) {
      responses.push([res.status(), u]);
    }
  });
  await page.goto('http://localhost/pis/', { waitUntil: 'load' });
  await sleep(1500);
  for (const [u, p] of [
    ['admin', 'admin123'],
    ['jssantos@probation.gov.ph', 'Dojppa2022'],
  ]) {
    await page.goto('http://localhost/pis/', { waitUntil: 'load' });
    await sleep(800);
    await page.locator('input.email').fill(u);
    await page.locator('input.password').fill(p);
    responses.length = 0;
    await page.locator('.btn-confirm').click();
    await sleep(5000);
    const cookie = await page.evaluate(() => document.cookie);
    const body = (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 250);
    console.log(JSON.stringify({ u, url: page.url(), cookie: cookie.slice(0, 180), body, responses: responses.slice(0, 12) }, null, 2));
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
