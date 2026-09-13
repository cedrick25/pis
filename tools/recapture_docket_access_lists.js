const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const SCREENSHOT_DIR = path.resolve(__dirname, '..', 'PIS_End_User_Manual_Screenshots_Current');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const lists = [
  ['003-probation-investigation-list-page.png', 'investigation_docketing'],
  ['008-probation-courtesy-investigation-list-page.png', 'probation-courtesy-investigation-list'],
  ['013-probation-supervision-list-page.png', 'supervision_docketing'],
  ['018-probation-courtesy-supervision-list-page.png', 'probation-courtesy-supervision-list'],
  ['019-parole-and-pardon-investigation-list-page.png', 'parole-pardon-investigation-list'],
  ['020-parole-and-pardon-courtesy-investigation-list-page.png', 'parole-pardon-courtesy-investigation-list'],
  ['025-parole-and-pardon-supervision-list-page.png', 'parole-pardon-supervision'],
  ['030-parole-and-pardon-courtesy-supervision-list-page.png', 'parole-pardon-courtesy-supervision-list'],
];

async function tidy(page) {
  await page.evaluate(() => {
    document.body.classList.add('loaded');
    document.body.classList.remove('open');
    document.querySelectorAll('.overlay').forEach((el) => {
      el.style.setProperty('display', 'none', 'important');
    });
    document.querySelectorAll('#fsDynamicToast, .fs-dynamic-toast').forEach((el) => {
      el.style.setProperty('display', 'none', 'important');
    });
    const panel = document.getElementById('left-panel');
    if (panel) {
      panel.classList.remove('open');
      panel.style.display = '';
    }
  }).catch(() => {});
}

async function waitReady(page) {
  await page.waitForLoadState('domcontentloaded', { timeout: 20000 }).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
  await sleep(800);
  await tidy(page);
}

(async () => {
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome',
    args: ['--guest'],
  });
  const page = await (await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
  })).newPage();

  await page.goto(BASE_URL, { waitUntil: 'load' });
  await page.locator('input.email').fill('admin');
  await page.locator('input.password').fill('admin123');
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\//, { timeout: 35000 }).catch(() => {});
  await page.waitForFunction(() => /field_office_id=/.test(document.cookie), null, { timeout: 20000 }).catch(() => {});
  await waitReady(page);

  for (const [filename, route] of lists) {
    await page.goto(BASE_URL + route, { waitUntil: 'load', timeout: 25000 });
    await waitReady(page);
    await page.waitForFunction(() => {
      const rows = document.querySelectorAll('table tbody tr');
      if (!rows.length) return false;
      const text = (rows[0].innerText || '').toLowerCase();
      if (text.includes('loading')) return false;
      return true;
    }, null, { timeout: 20000 }).catch(() => {});
    await sleep(1600);
    await tidy(page);
    const preview = (await page.locator('table tbody').innerText().catch(() => '')).slice(0, 120).replace(/\s+/g, ' ');
    console.log(filename, preview);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, filename),
      fullPage: true,
      animations: 'disabled',
    });
    console.log('UPDATED', filename);
  }

  await browser.close();
})();
