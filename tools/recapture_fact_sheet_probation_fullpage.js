const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const OUT_DIR = path.resolve(__dirname, '..', 'PIS_End_User_Manual_Screenshots_20260911', '10-fact-sheet-probation');
const CATALOG = path.resolve(__dirname, '..', 'PIS_End_User_Manual_Screenshots_20260911', 'screenshot_catalog.json');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function tidy(page) {
  await page.evaluate(() => {
    document.body.classList.add('loaded');
    document.querySelectorAll('.overlay').forEach((el) => el.style.setProperty('display', 'none', 'important'));
    document.querySelectorAll('.fs-panel-loader').forEach((el) => el.classList.add('is-hidden'));
    document.querySelectorAll('#fsDynamicToast, .fs-dynamic-toast').forEach((el) => {
      el.style.setProperty('display', 'none', 'important');
    });
    document.querySelectorAll('#left-panel li.menu-item-has-children.dropdown').forEach((li) => {
      const toggle = li.querySelector('.dropdown-toggle');
      const menu = li.querySelector('.dropdown-menu');
      if (!toggle || !menu) return;
      if (getComputedStyle(li).display === 'none') return;
      li.classList.add('show');
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.add('show');
      menu.style.display = 'block';
    });
    document.body.classList.remove('open');
    const panel = document.getElementById('left-panel');
    if (panel) panel.classList.remove('open');
  }).catch(() => {});
}

async function login(page) {
  await page.goto(BASE_URL, { waitUntil: 'load', timeout: 25000 });
  await page.locator('input.email').fill('admin');
  await page.locator('input.password').fill('admin123');
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\/(investigation_docketing|dashboard|client_list)/, { timeout: 45000 });
  await page.waitForFunction(() => /field_office_id=/.test(document.cookie) && !!localStorage.getItem('permission'), null, { timeout: 30000 });
  await sleep(1500);
  await tidy(page);
}

async function fitAndCapture(page, filename, captions, records, kind = 'page') {
  await tidy(page);
  await page.setViewportSize({ width: 1600, height: 1000 });
  await sleep(200);
  // Wait until fact sheet chrome is present when on client view
  if (/client_view_factsheet/.test(page.url())) {
    await page.waitForSelector('#investigationTab', { timeout: 20000 }).catch(() => {});
    await sleep(1200);
  }
  const height = await page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    return Math.min(Math.max(body.scrollHeight, doc.scrollHeight, 1100) + 100, 5000);
  });
  await page.setViewportSize({ width: 1600, height });
  await sleep(400);
  await tidy(page);
  const dest = path.join(OUT_DIR, filename);
  await page.screenshot({ path: dest, fullPage: true, animations: 'disabled' });
  records.push({
    module: 'Fact Sheet Probation',
    name: filename.replace(/\.png$/, ''),
    kind,
    filename: `10-fact-sheet-probation/${filename}`,
    folder: '10-fact-sheet-probation',
    url: page.url(),
    captions,
  });
  console.log('CAPTURED', filename, 'url=', page.url());
}

async function closeModal(page) {
  await page.locator('.modal.show [data-dismiss="modal"], .modal.show .close, .modal.show .btn-secondary, #closePreview').first().click({ timeout: 2500 }).catch(() => {});
  await sleep(600);
}

async function findAndOpenClient(page) {
  await page.goto(BASE_URL + 'investigation_docketing', { waitUntil: 'load', timeout: 30000 });
  await page.waitForSelector('.docketSearchInput, #pis_inv_docket_search', { timeout: 45000 });
  await sleep(1000);

  const search = page.locator('#pis_inv_docket_search, .docketSearchInput').first();
  const terms = ['aurestila', 'virgelio', 'virgilio guzman', 'PI-2025-09-00128', 'guzman'];
  for (const term of terms) {
    await search.fill(term);
    await page.locator('.docket_search').first().click();
    await sleep(3500);
    const rows = page.locator('table tbody tr');
    const n = await rows.count();
    console.log('term', term, 'rows', n);
    for (let i = 0; i < Math.min(n, 20); i++) {
      const text = (await rows.nth(i).innerText()).replace(/\s+/g, ' ');
      if (/aurestila|virgelio|virgilio/i.test(text) || (term.startsWith('PI-') && text.includes(term))) {
        console.log('MATCH', text.slice(0, 160));
        await rows.nth(i).locator('.btn_factsheet').first().click({ force: true });
        await page.waitForURL(/client_view_factsheet/, { timeout: 25000 });
        await page.waitForSelector('#investigationTab', { timeout: 25000 });
        await page.waitForSelector('button:has-text("Take Photo"), .btn-take, #docketListTab', { timeout: 25000 }).catch(() => {});
        await sleep(2500);
        await tidy(page);
        return true;
      }
    }
  }

  // If aurestila not in DB for admin scope, use a rich profile (has photo buttons + tabs)
  console.log('WARN: reference client not found; using best available profile with photo actions');
  await page.goto(BASE_URL + 'investigation_docketing', { waitUntil: 'load' });
  await page.waitForSelector('.btn_factsheet', { timeout: 30000 });
  await page.locator('.btn_factsheet').first().click({ force: true });
  await page.waitForURL(/client_view_factsheet/, { timeout: 25000 });
  await page.waitForSelector('#investigationTab', { timeout: 25000 });
  await sleep(2500);
  await tidy(page);
  return true;
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const records = [];
  const browser = await chromium.launch({ headless: true, channel: 'chrome' }).catch(() => chromium.launch({ headless: true }));
  const page = await (await browser.newContext({
    viewport: { width: 1600, height: 1100 },
    deviceScaleFactor: 2,
    colorScheme: 'light',
  })).newPage();

  await login(page);

  await page.goto(BASE_URL + 'client_list', { waitUntil: 'load' });
  await page.waitForSelector('table tbody tr', { timeout: 30000 }).catch(() => {});
  await sleep(2000);
  await fitAndCapture(page, '043-fact-sheet-probation-list-page.png', ['Fact Sheet Probation list page'], records);

  await findAndOpenClient(page);
  console.log('opened', page.url());
  console.log('snippet', (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 260));

  // Force investigation tab like reference
  await page.locator('#investigationTab').click().catch(() => {});
  await sleep(2000);
  await tidy(page);

  // Verify we are really on fact sheet before capturing
  const ok = await page.locator('#investigationTab').count();
  if (!ok) throw new Error('Not on fact sheet profile after open');

  await fitAndCapture(page, '069-fact-sheet-probation-click-client-name-click-client-name.png', ['Fact Sheet Probation — click client name'], records);
  await fitAndCapture(page, '070-fact-sheet-probation-client-view-profile-client-view-profile.png', ['Fact Sheet Probation — client view profile'], records);
  await fitAndCapture(page, '071-fact-sheet-tabs-tabs.png', ['Fact Sheet Tabs'], records);

  if (await page.locator('button:visible:has-text("Upload Photo")').count()) {
    await page.locator('button:visible:has-text("Upload Photo")').first().click();
    await sleep(1000);
    await fitAndCapture(page, '072-fact-sheet-probation-upload-photo-upload-photo.png', ['Fact Sheet Probation — upload photo'], records, 'modal');
    await closeModal(page);
  }
  if (await page.locator('button:visible:has-text("Take Photo")').count()) {
    await page.locator('button:visible:has-text("Take Photo")').first().click();
    await sleep(1000);
    await fitAndCapture(page, '073-fact-sheet-probation-take-photo-take-photo.png', ['Fact Sheet Probation — take photo'], records, 'modal');
    await closeModal(page);
  }
  if (await page.locator('button:visible:has-text("Upload Fingerprint")').count()) {
    await page.locator('button:visible:has-text("Upload Fingerprint")').first().click();
    await sleep(1000);
    await fitAndCapture(page, '074-fact-sheet-probation-upload-fingerprint-upload-fingerprint.png', ['Fact Sheet Probation — upload fingerprint'], records, 'modal');
    await closeModal(page);
  }

  await page.locator('#docketListTab').click();
  await sleep(3500);
  await tidy(page);
  for (const [file, cap] of [
    ['075-fact-sheet-probation-worksheet-and-psir-overview-docket-list.png', 'Fact Sheet Probation — Worksheet and PSIR Overview'],
    ['090-fact-sheet-probation-worksheet-and-psir-overview-docket-list.png', 'Fact Sheet Probation — Worksheet and PSIR Overview'],
    ['076-fact-sheet-probation-navigate-to-worksheet-docket-worksheet.png', 'Fact Sheet Probation — Navigate to Worksheet'],
    ['091-fact-sheet-probation-navigate-to-worksheet-docket-worksheet.png', 'Fact Sheet Probation — Navigate to Worksheet'],
    ['077-fact-sheet-probation-navigate-to-psir-docket-psir.png', 'Fact Sheet Probation — Navigate to PSIR'],
    ['092-fact-sheet-probation-navigate-to-psir-docket-psir.png', 'Fact Sheet Probation — Navigate to PSIR'],
  ]) await fitAndCapture(page, file, [cap], records);

  console.log('worksheet controls', {
    pdfWs: await page.locator('.btn_pdfWorksheet').count(),
    editWs: await page.locator('a.fs-edit-worksheet').count(),
    pdfPsir: await page.locator('.btn_pdfPSIR').count(),
    editPsir: await page.locator('a.fs-edit-psir').count(),
  });

  if (await page.locator('.btn_pdfWorksheet').count()) {
    await page.locator('.btn_pdfWorksheet').first().click();
    await sleep(2800);
    await fitAndCapture(page, '093-fact-sheet-probation-worksheet-print-out-sample-worksheet-print.png', ['Fact Sheet Probation — Worksheet Print Out Sample'], records, 'modal');
    await closeModal(page);
  }
  if (await page.locator('.btn_pdfPSIR').count()) {
    await page.locator('.btn_pdfPSIR').first().click();
    await sleep(2800);
    await fitAndCapture(page, '094-fact-sheet-probation-psir-print-out-sample-psir-print.png', ['Fact Sheet Probation — PSIR Print Out Sample'], records, 'modal');
    await closeModal(page);
  }
  if (await page.locator('a.fs-edit-worksheet').count()) {
    const href = await page.locator('a.fs-edit-worksheet').first().getAttribute('href');
    if (href) {
      await page.goto(new URL(href, BASE_URL).toString(), { waitUntil: 'load', timeout: 30000 });
      await sleep(2000);
      await fitAndCapture(page, '095-fact-sheet-probation-fill-out-worksheet-worksheet-editor.png', ['Fact Sheet Probation — Fill Out Worksheet'], records);
      if (await page.locator('.btn-saveData:visible').count()) {
        await page.locator('.btn-saveData:visible').first().click();
        await sleep(1000);
        await fitAndCapture(page, '096-fact-sheet-probation-worksheet-save-changes-worksheet-save-dialog.png', ['Confirmation dialog — Save Changes or Update Changes'], records, 'modal');
        await closeModal(page);
      }
      await page.goBack().catch(() => {});
      await sleep(2000);
      if (await page.locator('#docketListTab').count()) {
        await page.locator('#docketListTab').click();
        await sleep(2500);
      }
    }
  }
  if (await page.locator('a.fs-edit-psir').count()) {
    const href = await page.locator('a.fs-edit-psir').first().getAttribute('href');
    if (href) {
      await page.goto(new URL(href, BASE_URL).toString(), { waitUntil: 'load', timeout: 30000 });
      await sleep(2000);
      await fitAndCapture(page, '097-fact-sheet-probation-fill-out-psir-psir-editor.png', ['Fact Sheet Probation — Fill Out PSIR'], records);
      if (await page.locator('.btn-saveData:visible').count()) {
        await page.locator('.btn-saveData:visible').first().click();
        await sleep(1000);
        await fitAndCapture(page, '098-fact-sheet-probation-psir-save-changes-psir-save-dialog.png', ['Confirmation dialog — Save Changes or Update Changes'], records, 'modal');
        await closeModal(page);
      }
    }
  }

  let catalog = { records: [] };
  if (fs.existsSync(CATALOG)) catalog = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));
  const keep = (catalog.records || []).filter((r) => !String(r.filename || '').includes('10-fact-sheet-probation/'));
  catalog.records = keep.concat(records);
  catalog.factSheetProbationRecaptureAt = new Date().toISOString();
  fs.writeFileSync(CATALOG, JSON.stringify(catalog, null, 2));

  await browser.close();
  console.log(JSON.stringify({ captured: records.length }, null, 2));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
