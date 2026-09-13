const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const SCREENSHOT_DIR = path.resolve(__dirname, '..', 'PIS_End_User_Manual_Screenshots_20260911');
const CATALOG_FILE = path.join(SCREENSHOT_DIR, 'screenshot_catalog.json');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function capture(page, records, stem, captions) {
  const folder = '13-user-accounts';
  const dir = path.join(SCREENSHOT_DIR, folder);
  fs.mkdirSync(dir, { recursive: true });
  const filename = `${String(110 + records.length).padStart(3, '0')}-${stem}.png`;
  const relative = `${folder}/${filename}`;
  const dest = path.join(dir, filename);
  const modal = page.locator('.modal.show:visible').first();
  if (await modal.count() && await modal.isVisible().catch(() => false)) {
    const box = await modal.boundingBox();
    if (box) {
      const pad = 24;
      await page.screenshot({
        path: dest,
        animations: 'disabled',
        clip: {
          x: Math.max(0, box.x - pad),
          y: Math.max(0, box.y - pad),
          width: Math.min(box.width + pad * 2, 1550),
          height: Math.min(box.height + pad * 2, 860),
        },
      });
    } else {
      await page.screenshot({ path: dest, fullPage: false, animations: 'disabled' });
    }
  } else {
    await page.screenshot({ path: dest, fullPage: false, animations: 'disabled' });
  }
  records.push({
    module: 'User Accounts',
    name: stem,
    kind: stem.includes('update') ? 'update' : 'remove confirmation',
    filename: relative,
    folder,
    url: page.url(),
    captions,
  });
  console.log('CAPTURED', relative);
}

(async () => {
  const catalog = JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf8'));
  const extra = [];
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await (await browser.newContext({
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 2,
  })).newPage();

  page.on('dialog', async (d) => {
    console.log('alert', d.message());
    await d.accept();
  });

  await page.goto(BASE_URL, { waitUntil: 'load' });
  await page.locator('input.email').fill('admin');
  await page.locator('input.password').fill('admin123');
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\//, { timeout: 35000 }).catch(() => {});
  await sleep(2000);

  await page.goto(BASE_URL + 'user_accounts', { waitUntil: 'load' });
  await sleep(3000);

  let found = false;
  for (const user of ['admin', 'jssantos', 'a', 'test']) {
    await page.locator('input.searchByUsername').fill(user);
    await page.locator('button.btn-search-username').click();
    await sleep(3000);
    const n = await page.locator('.btn_update').count();
    const t = (await page.locator('table tbody').innerText().catch(() => '')).replace(/\s+/g, ' ').slice(0, 160);
    console.log('search', user, 'update', n, t);
    if (n > 0) {
      found = true;
      // also refresh list page screenshot with data
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, '13-user-accounts', '111-user-accounts-list-page-with-data.png'),
        fullPage: false,
        animations: 'disabled',
      });
      catalog.records.push({
        module: 'User Accounts',
        name: 'User Accounts',
        kind: 'list page',
        filename: '13-user-accounts/111-user-accounts-list-page-with-data.png',
        folder: '13-user-accounts',
        url: page.url(),
        captions: ['User Accounts list page'],
      });
      break;
    }
  }

  if (found) {
    await page.locator('.btn_update').first().click({ force: true });
    await sleep(1800);
    await capture(page, extra, 'user-accounts-update-update', ['User Accounts (Update)']);
    await page.goto(BASE_URL + 'user_accounts', { waitUntil: 'load' });
    await sleep(2500);
    await page.locator('input.searchByUsername').fill('admin');
    await page.locator('button.btn-search-username').click();
    await sleep(2500);
    if (!(await page.locator('.btn_remove, .btn_delete').count())) {
      // retry last successful username if needed - use whatever is visible
    }
    if (await page.locator('.btn_remove, .btn_delete').count()) {
      await page.locator('.btn_remove, .btn_delete').first().click({ force: true });
      await sleep(1200);
      await capture(page, extra, 'user-accounts-remove-confirmation-remove-confirmation', ['User Accounts (Delete)']);
    }
  }

  catalog.records = catalog.records.concat(extra);
  fs.writeFileSync(CATALOG_FILE, JSON.stringify(catalog, null, 2));
  await browser.close();
  console.log(JSON.stringify({ found, added: extra.length }, null, 2));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
