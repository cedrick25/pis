const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const SCREENSHOT_DIR = path.resolve(__dirname, '..', 'PIS_End_User_Manual_Screenshots_20260911');
const CATALOG_FILE = path.join(SCREENSHOT_DIR, 'screenshot_catalog.json');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function tidy(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.overlay').forEach((el) => el.style.setProperty('display', 'none', 'important'));
    document.querySelectorAll('.fs-panel-loader').forEach((el) => el.classList.add('is-hidden'));
  }).catch(() => {});
}

async function capture(page, records, folder, stem, captions, opts = {}) {
  await tidy(page);
  await sleep(500);
  const dir = path.join(SCREENSHOT_DIR, folder);
  fs.mkdirSync(dir, { recursive: true });
  const filename = `${String(90 + records.length).padStart(3, '0')}-${stem}.png`;
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
    await page.screenshot({ path: dest, fullPage: !!opts.fullPage, animations: 'disabled' });
  }
  records.push({
    module: folder,
    name: stem,
    kind: stem,
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

  page.on('response', async (res) => {
    if (/user|account|uam/i.test(res.url()) && res.url().includes('http')) {
      if (res.status() >= 400 || /users|account/.test(res.url())) {
        // light log
      }
    }
  });

  await page.goto(BASE_URL, { waitUntil: 'load' });
  await page.locator('input.email').fill('admin');
  await page.locator('input.password').fill('admin123');
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\//, { timeout: 35000 }).catch(() => {});
  await sleep(2000);

  // Capture worksheet/PSIR from a docket that has fact sheet + dockets
  await page.goto(BASE_URL + 'investigation_docketing', { waitUntil: 'load' });
  await sleep(2500);
  await page.locator('.btn_factsheet').first().click({ force: true });
  await page.waitForURL(/client_view_factsheet/, { timeout: 20000 }).catch(() => {});
  await sleep(2000);
  await page.locator('#docketListTab, a:has-text("Docket List")').first().click().catch(() => {});
  await sleep(2800);
  await tidy(page);

  // Refresh overview shots from a client that actually has dockets
  await capture(page, extra, '10-fact-sheet-probation', 'fact-sheet-probation-worksheet-and-psir-overview-docket-list', ['Fact Sheet Probation — Worksheet and PSIR Overview']);
  await capture(page, extra, '10-fact-sheet-probation', 'fact-sheet-probation-navigate-to-worksheet-docket-worksheet', ['Fact Sheet Probation — Navigate to Worksheet']);
  await capture(page, extra, '10-fact-sheet-probation', 'fact-sheet-probation-navigate-to-psir-docket-psir', ['Fact Sheet Probation — Navigate to PSIR']);

  if (await page.locator('.btn_pdfWorksheet').count()) {
    await page.locator('.btn_pdfWorksheet').first().click();
    await sleep(2800);
    await capture(page, extra, '10-fact-sheet-probation', 'fact-sheet-probation-worksheet-print-out-sample-worksheet-print', ['Fact Sheet Probation — Worksheet Print Out Sample']);
    await page.locator('#closePreview, #pdfPreviewModal .close').first().click().catch(() => {});
    await sleep(500);
  }
  if (await page.locator('.btn_pdfPSIR').count()) {
    await page.locator('.btn_pdfPSIR').first().click();
    await sleep(2800);
    await capture(page, extra, '10-fact-sheet-probation', 'fact-sheet-probation-psir-print-out-sample-psir-print', ['Fact Sheet Probation — PSIR Print Out Sample']);
    await page.locator('#closePreview, #pdfPreviewModal .close').first().click().catch(() => {});
    await sleep(500);
  }

  if (await page.locator('a.fs-edit-worksheet').count()) {
    const href = await page.locator('a.fs-edit-worksheet').first().getAttribute('href');
    await page.goto(new URL(href, BASE_URL).toString(), { waitUntil: 'load' });
    await sleep(1800);
    await capture(page, extra, '10-fact-sheet-probation', 'fact-sheet-probation-fill-out-worksheet-worksheet-editor', ['Fact Sheet Probation — Fill Out Worksheet']);
    if (await page.locator('.btn-saveData:visible').count()) {
      await page.locator('.btn-saveData:visible').first().click();
      await sleep(900);
      await capture(page, extra, '10-fact-sheet-probation', 'fact-sheet-probation-worksheet-save-changes-worksheet-save-dialog', ['Confirmation dialog — Save Changes or Update Changes']);
      await page.locator('.modal.show [data-dismiss="modal"], .modal.show .close, .modal.show .btn-secondary').first().click().catch(() => {});
      await sleep(400);
    }
    await page.goBack();
    await sleep(1500);
    await page.locator('#docketListTab, a:has-text("Docket List")').first().click().catch(() => {});
    await sleep(2000);
  }

  if (await page.locator('a.fs-edit-psir').count()) {
    const href = await page.locator('a.fs-edit-psir').first().getAttribute('href');
    await page.goto(new URL(href, BASE_URL).toString(), { waitUntil: 'load' });
    await sleep(1800);
    await capture(page, extra, '10-fact-sheet-probation', 'fact-sheet-probation-fill-out-psir-psir-editor', ['Fact Sheet Probation — Fill Out PSIR']);
    if (await page.locator('.btn-saveData:visible').count()) {
      await page.locator('.btn-saveData:visible').first().click();
      await sleep(900);
      await capture(page, extra, '10-fact-sheet-probation', 'fact-sheet-probation-psir-save-changes-psir-save-dialog', ['Confirmation dialog — Save Changes or Update Changes']);
      await page.locator('.modal.show [data-dismiss="modal"], .modal.show .close, .modal.show .btn-secondary').first().click().catch(() => {});
    }
  }

  // User accounts: capture network and try search/reload; if still empty, open Add modal only (already have) and note
  const apiHits = [];
  page.on('response', (res) => {
    if (/user|account/i.test(res.url())) apiHits.push([res.status(), res.url()]);
  });
  await page.goto(BASE_URL + 'user_accounts', { waitUntil: 'load' });
  await sleep(5000);
  console.log('UA api hits', apiHits.slice(-10));
  // try clicking Search with empty / wildcard
  if (await page.locator('button:has-text("Search"), .btn-search, #btnSearch').count()) {
    await page.locator('button:has-text("Search"), .btn-search, #btnSearch').first().click().catch(() => {});
    await sleep(3000);
  }
  console.log('UA rows after search', await page.locator('table tbody tr td').allTextContents());
  console.log('UA update', await page.locator('.btn_update').count());

  // Prefer previous good screenshots from 20260910 ONLY if admin truly has no users?
  // User asked not to reuse past screenshots - so leave list as-is; for Update/Delete we need data.
  // Try UAM-backed call via page evaluate if app exposes helpers.
  const errText = await page.evaluate(() => {
    return (window.lastUserAccountError || document.querySelector('.alert')?.innerText || '');
  });
  console.log('UA err', errText);

  catalog.records = catalog.records.concat(extra);
  catalog.filledWorksheetAt = new Date().toISOString();
  fs.writeFileSync(CATALOG_FILE, JSON.stringify(catalog, null, 2));
  await browser.close();
  console.log(JSON.stringify({ added: extra.length, total: catalog.records.length }, null, 2));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
