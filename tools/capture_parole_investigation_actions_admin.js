const fs = require('fs/promises');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const SCREENSHOT_DIR = path.resolve(__dirname, '..', 'PIS_End_User_Manual_Screenshots_Current');
const CATALOG_FILE = path.join(SCREENSHOT_DIR, 'screenshot_catalog.json');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function tidy(page) {
  await page.evaluate(() => {
    document.body.classList.add('loaded');
    document.body.classList.remove('open');
    document.querySelectorAll('.overlay').forEach((el) => {
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
  await sleep(900);
  await tidy(page);
}

async function closeModal(page) {
  await page.locator('.modal.show [data-dismiss="modal"], .modal.show .close, .modal.show .btn-secondary').first().click({ timeout: 2500 }).catch(() => {});
  await sleep(400);
}

(async () => {
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome',
    args: ['--guest'],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
  });
  const page = await context.newPage();

  await page.goto(BASE_URL, { waitUntil: 'load' });
  await page.locator('input.email').fill('admin');
  await page.locator('input.password').fill('admin123');
  await page.locator('.btn-confirm').click();
  await page.waitForFunction(() => /field_office_id=/.test(document.cookie), null, { timeout: 25000 }).catch(() => {});
  await waitReady(page);
  await sleep(1500);

  await context.addCookies([{ name: 'field_office_id', value: 'ALL', url: BASE_URL }]);
  await page.evaluate(() => {
    document.cookie = 'field_office_id=ALL; path=/';
  });

  await page.goto(BASE_URL + 'parole-pardon-investigation-list', { waitUntil: 'domcontentloaded', timeout: 25000 });
  await waitReady(page);
  await page.waitForFunction(() => {
    const n = document.querySelectorAll('.btn_view, .btn_update').length;
    const text = (document.querySelector('table tbody') || {}).innerText || '';
    return n > 0 && !/no dockets|loading/i.test(text);
  }, null, { timeout: 25000 }).catch(() => {});
  await sleep(1600);
  await tidy(page);

  const preview = (await page.locator('table tbody').innerText().catch(() => '')).slice(0, 160).replace(/\s+/g, ' ');
  const buttons = await page.locator('.btn_view').count();
  console.log('rows', buttons, preview);
  if (!buttons) {
    console.log('NO ACTION BUTTONS');
    await browser.close();
    process.exit(1);
  }

  async function captureAction(selector, filename, kind) {
    const listUrl = BASE_URL + 'parole-pardon-investigation-list';
    const loc = page.locator(selector).first();
    if (!(await loc.count())) {
      console.log('NO', kind);
      return false;
    }
    await loc.scrollIntoViewIfNeeded().catch(() => {});
    await loc.click({ force: true, timeout: 6000 }).catch(() => {});
    await sleep(1800);
    await waitReady(page);
    const modalVisible = await page.locator('.modal.show:visible').count().then((n) => n > 0).catch(() => false);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, filename),
      fullPage: !modalVisible,
      animations: 'disabled',
    });
    console.log('CAPTURED', filename, page.url());
    if (modalVisible) {
      await closeModal(page);
    } else {
      await page.goto(listUrl, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await waitReady(page);
      await page.waitForSelector('.btn_view, .btn_update', { timeout: 20000 }).catch(() => {});
      await sleep(1200);
    }
    return true;
  }

  await captureAction('.btn_view', '092-parole-and-pardon-investigation-view-view.png', 'View');
  await captureAction('.btn_update', '093-parole-and-pardon-investigation-update-update.png', 'Update');
  await captureAction('.btn_attachments, .btn_upload', '094-parole-and-pardon-investigation-attachments-attachments.png', 'Attachments');
  await captureAction('.btn_remove, .btn_delete', '095-parole-and-pardon-investigation-remove-confirmation-remove-confirmation.png', 'Remove confirmation');

  const catalog = JSON.parse(await fs.readFile(CATALOG_FILE, 'utf8'));
  const extra = [
    ['092-parole-and-pardon-investigation-view-view.png', 'View'],
    ['093-parole-and-pardon-investigation-update-update.png', 'Update'],
    ['094-parole-and-pardon-investigation-attachments-attachments.png', 'Attachments'],
    ['095-parole-and-pardon-investigation-remove-confirmation-remove-confirmation.png', 'Remove confirmation'],
  ];
  const seen = new Set((catalog.records || []).map((r) => r.filename));
  extra.forEach(([filename, kind]) => {
    if (seen.has(filename)) return;
    catalog.records.push({
      module: 'Parole and Pardon Investigation',
      name: 'Parole and Pardon Investigation ' + kind,
      kind,
      filename,
    });
  });
  await fs.writeFile(CATALOG_FILE, JSON.stringify(catalog, null, 2));
  await browser.close();
})();
