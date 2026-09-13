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

async function capture(page, records, name, kind) {
  await waitReady(page);
  await tidy(page);
  const filename = `${String(records.length + 1).padStart(3, '0')}-${name}.png`;
  const modalVisible = await page.locator('.modal.show:visible').count().then((n) => n > 0).catch(() => false);
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, filename),
    fullPage: !modalVisible,
    animations: 'disabled',
  });
  records.push({
    module: 'Probation Courtesy Supervision',
    name,
    kind,
    filename,
    url: page.url(),
  });
  console.log('CAPTURED', filename, page.url());
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
  const records = [];

  await page.goto(BASE_URL, { waitUntil: 'load' });
  await page.locator('input.email').fill('admin');
  await page.locator('input.password').fill('admin123');
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\//, { timeout: 35000 }).catch(() => {});
  await page.waitForFunction(() => /field_office_id=/.test(document.cookie), null, { timeout: 20000 }).catch(() => {});
  await waitReady(page);
  console.log('cookies', await page.evaluate(() => document.cookie));

  const officesToTry = [null, '5', '208', '206'];
  let hasRows = false;
  for (const officeId of officesToTry) {
    if (officeId) {
      await context.addCookies([{ name: 'field_office_id', value: officeId, url: BASE_URL }]);
      await page.evaluate((id) => {
        document.cookie = 'field_office_id=' + id + '; path=/';
      }, officeId);
      console.log('trying office', officeId);
    }
    await page.goto(BASE_URL + 'probation-courtesy-supervision-list', { waitUntil: 'load', timeout: 25000 });
    await waitReady(page);
    await page.waitForFunction(() => {
      const rows = document.querySelectorAll('table tbody tr');
      return rows.length > 0;
    }, null, { timeout: 15000 }).catch(() => {});
    await sleep(1500);
    const n = await page.locator('.btn_view, .btn_update').count();
    const tableText = await page.locator('table tbody').innerText().catch(() => '');
    console.log('buttons', n, 'table', tableText.slice(0, 180).replace(/\s+/g, ' '));
    if (n > 0 && !/no dockets|no data/i.test(tableText)) {
      hasRows = true;
      break;
    }
  }

  if (!hasRows) {
    console.log('still empty, capturing list only');
    await capture(page, records, '018-probation-courtesy-supervision-list-page', 'list page');
    await browser.close();
    process.exit(1);
  }

  // Overwrite the empty list shot with the populated one, using the original filename.
  await tidy(page);
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '018-probation-courtesy-supervision-list-page.png'),
    fullPage: true,
    animations: 'disabled',
  });
  console.log('REPLACED 018-probation-courtesy-supervision-list-page.png');

  const catalog = JSON.parse(await fs.readFile(CATALOG_FILE, 'utf8'));
  const existing = catalog.records || [];

  async function captureAction(selector, filename, kind) {
    const listUrl = page.url();
    const loc = page.locator(selector).first();
    if (!(await loc.count())) {
      console.log('NO', kind);
      return;
    }
    await loc.click({ force: true, timeout: 6000 }).catch(() => {});
    await sleep(1800);
    await waitReady(page);
    const modalVisible = await page.locator('.modal.show:visible').count().then((n) => n > 0).catch(() => false);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, filename),
      fullPage: !modalVisible,
      animations: 'disabled',
    });
    existing.push({
      module: 'Probation Courtesy Supervision',
      name: 'Probation Courtesy Supervision ' + kind,
      kind,
      filename,
      url: page.url(),
    });
    console.log('CAPTURED', filename);
    if (modalVisible) {
      await closeModal(page);
    } else {
      await page.goto(listUrl, { waitUntil: 'load', timeout: 25000 });
      await waitReady(page);
      await sleep(1200);
    }
  }

  await captureAction('.btn_view', '088-probation-courtesy-supervision-view-view.png', 'View');
  await captureAction('.btn_update', '089-probation-courtesy-supervision-update-update.png', 'Update');
  await captureAction('.btn_attachments, .btn_upload', '090-probation-courtesy-supervision-attachments-attachments.png', 'Attachments');
  await captureAction('.btn_remove, .btn_delete', '091-probation-courtesy-supervision-remove-confirmation-remove-confirmation.png', 'Remove confirmation');

  const seen = new Set(existing.map((r) => r.filename));
  ['088-probation-courtesy-supervision-view-view.png',
    '089-probation-courtesy-supervision-update-update.png',
    '090-probation-courtesy-supervision-attachments-attachments.png',
    '091-probation-courtesy-supervision-remove-confirmation-remove-confirmation.png'].forEach((filename) => {
    if (!seen.has(filename)) return;
  });
  catalog.records = existing;
  await fs.writeFile(CATALOG_FILE, JSON.stringify(catalog, null, 2));
  await browser.close();
})();
