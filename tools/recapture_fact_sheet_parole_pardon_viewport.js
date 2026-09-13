/**
 * Recapture Fact Sheet Parole and Pardon screenshots using the same
 * framing rules as Fact Sheet Probation: viewport, natural sidebar,
 * no hidden tabs/menus, live client data.
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const OUT_DIR = path.resolve(__dirname, '..', 'PIS_End_User_Manual_Screenshots_20260911', '11-fact-sheet-parole-pardon');
const CATALOG = path.resolve(__dirname, '..', 'PIS_End_User_Manual_Screenshots_20260911', 'screenshot_catalog.json');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const CLIENT_RE = /cabiling|oliver/i;

async function tidy(page) {
  await page.evaluate(() => {
    document.body.classList.add('loaded');
    document.body.classList.remove('open');
    document.querySelectorAll('.overlay').forEach((el) => {
      el.style.setProperty('display', 'none', 'important');
    });
    document.querySelectorAll('.fs-panel-loader').forEach((el) => el.classList.add('is-hidden'));
    document.querySelectorAll('#fsDynamicToast, .fs-dynamic-toast').forEach((el) => {
      el.style.setProperty('display', 'none', 'important');
    });
    const panel = document.getElementById('left-panel');
    if (panel) panel.classList.remove('open');

    document.querySelectorAll('#left-panel li.menu-item-has-children.dropdown').forEach((li) => {
      if (getComputedStyle(li).display === 'none') return;
      const toggle = li.querySelector(':scope > .dropdown-toggle');
      const menu = li.querySelector(':scope > .dropdown-menu');
      if (!toggle || !menu) return;
      const keepOpen = li.classList.contains('active') || !!li.querySelector(':scope > .dropdown-menu > li.active');
      if (keepOpen) {
        li.classList.add('show');
        toggle.setAttribute('aria-expanded', 'true');
        menu.classList.add('show');
      } else {
        li.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('show');
        menu.style.removeProperty('display');
      }
    });
  }).catch(() => {});
}

async function login(page) {
  await page.goto(BASE_URL, { waitUntil: 'load', timeout: 25000 });
  await page.locator('input.email').fill('admin');
  await page.locator('input.password').fill('admin123');
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\/(investigation_docketing|dashboard|client_list)/, { timeout: 45000 });
  await page.waitForFunction(
    () => /field_office_id=/.test(document.cookie) && !!localStorage.getItem('permission'),
    null,
    { timeout: 30000 }
  );
  await sleep(1800);
  await tidy(page);
}

async function capture(page, filename, captions, records, kind = 'page') {
  await tidy(page);
  await sleep(350);
  const dest = path.join(OUT_DIR, filename);
  await page.screenshot({ path: dest, fullPage: false, animations: 'disabled' });
  records.push({
    module: 'Fact Sheet Parole and Pardone',
    name: filename.replace(/\.png$/, ''),
    kind,
    filename: `11-fact-sheet-parole-pardon/${filename}`,
    folder: '11-fact-sheet-parole-pardon',
    url: page.url(),
    captions,
  });
  console.log('CAPTURED', filename, page.url());
}

async function closeModal(page) {
  await page.locator('.modal.show [data-dismiss="modal"], .modal.show .close, .modal.show .btn-secondary').first()
    .click({ timeout: 2500 }).catch(() => {});
  await sleep(500);
}

async function selectBaybay(page) {
  await page.waitForSelector('.pis-docket-office-filter .select2-container, #pisDocketOfficeFilter', { timeout: 20000 });
  await page.waitForFunction(() => {
    const sel = document.getElementById('pisDocketOfficeFilter');
    return sel && sel.options && sel.options.length > 2;
  }, null, { timeout: 20000 }).catch(() => {});
  await sleep(400);
  if (await page.locator('.pis-docket-office-filter .select2-container').count()) {
    await page.locator('.pis-docket-office-filter .select2-container').click();
    await page.locator('.select2-search__field').fill('Baybay');
    await sleep(500);
    await page.locator('.select2-results__option').filter({ hasText: /baybay/i }).first().click();
    await sleep(3500);
    return true;
  }
  return false;
}

async function openParoleList(page) {
  await page.goto(BASE_URL + 'client_list_parole_and_pardone', { waitUntil: 'load', timeout: 30000 });
  await page.waitForSelector('.table_head tbody tr, #client_pr', { timeout: 25000 });
  await page.waitForFunction(() => {
    const rows = document.querySelectorAll('.table_head tbody tr');
    if (!rows.length) return false;
    const text = (rows[0].innerText || '').toLowerCase();
    return !text.includes('loading') && !text.includes('no data');
  }, null, { timeout: 35000 }).catch(() => {});
  await selectBaybay(page);
  await page.waitForFunction(() => {
    const text = (document.querySelector('.table_head tbody') || {}).innerText || '';
    return /cabiling|baybay/i.test(text) && !/no data available/i.test(text);
  }, null, { timeout: 25000 });
  await sleep(800);
  await tidy(page);
}

async function clientRow(page) {
  const named = page.locator('.table_head tbody tr').filter({ hasText: CLIENT_RE }).first();
  if (await named.count()) return named;
  return page.locator('.table_head tbody tr').first();
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const records = [];
  const browser = await chromium.launch({ headless: true, channel: 'chrome' }).catch(() => chromium.launch({ headless: true }));
  const page = await (await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
  })).newPage();
  page.setDefaultTimeout(20000);

  await login(page);
  await openParoleList(page);
  const listText = (await page.locator('.table_head tbody').innerText().catch(() => '')).replace(/\s+/g, ' ').slice(0, 300);
  console.log('list', listText);

  await capture(page, '044-fact-sheet-parole-and-pardone-list-page.png', ['Fact Sheet Parole and Pardone list page'], records);

  const row = await clientRow(page);
  const profileHref = await row.locator('a[href*="client_view_factsheet_parole_pardone"]').first().getAttribute('href');
  console.log('profileHref', profileHref);

  await row.locator('.btn_update').first().click();
  await page.waitForURL(/client_list_parole_and_pardone_update/, { timeout: 25000 });
  await page.waitForSelector('text=Update Client, input, select', { timeout: 20000 }).catch(() => {});
  await sleep(1500);
  await capture(page, '045-fact-sheet-parole-and-pardone-update-update.png', [
    'Fact Sheet Parole and Pardone (Update)',
    'Fact Sheet Parole and Pardone update page',
  ], records);

  await openParoleList(page);
  const row2 = await clientRow(page);
  await row2.locator('.btn_upload').first().click();
  await page.waitForURL(/client_list_parole_and_pardone_upload/, { timeout: 25000 });
  await page.waitForSelector('text=Upload File, table', { timeout: 20000 }).catch(() => {});
  await sleep(1800);
  await capture(page, '046-fact-sheet-parole-and-pardone-attachments-attachments.png', [
    'Fact Sheet Parole and Pardone (Attachments)',
    'Fact Sheet Parole and Pardone attachment page',
  ], records);

  if (profileHref) {
    await page.goto(new URL(profileHref, BASE_URL).toString(), { waitUntil: 'load', timeout: 30000 });
  } else {
    await openParoleList(page);
    await (await clientRow(page)).locator('a[href*="client_view_factsheet_parole_pardone"]').first().click();
    await page.waitForURL(/client_view_factsheet_parole/, { timeout: 25000 });
  }
  await page.waitForSelector('#investigationTab, #petitionerName', { timeout: 25000 });
  await page.waitForFunction(() => {
    const name = (document.getElementById('petitionerName') || {}).textContent || '';
    return /cabiling|oliver/i.test(name);
  }, null, { timeout: 20000 }).catch(() => {});
  await page.waitForFunction(() => {
    const text = document.body.innerText || '';
    return /\.pdf/i.test(text);
  }, null, { timeout: 18000 }).catch(() => {});
  await page.waitForFunction(() => {
    const text = document.body.innerText || '';
    return /\.pdf/i.test(text) || /No documents found for this tab/i.test(text);
  }, null, { timeout: 8000 }).catch(() => {});
  await page.waitForSelector('button:visible:has-text("Take Photo"), button:visible:has-text("Upload Photo")', { timeout: 12000 }).catch(() => {});
  await sleep(1800);
  await tidy(page);
  console.log('profile', await page.locator('#petitionerName').innerText().catch(() => ''));
  console.log('docs', (await page.locator('.info-details').innerText().catch(() => '')).replace(/\s+/g, ' ').slice(0, 240));

  await capture(page, '078-fact-sheet-parole-and-pardon-client-view-profile-client-view-profile.png', ['Fact Sheet Parole and Pardon — client view profile'], records);
  await capture(page, '079-fact-sheet-parole-and-pardon-client-profile-tabs-tabs.png', ['Fact Sheet Parole and Pardon — client profile tabs'], records);

  if (await page.locator('button:visible:has-text("Upload Photo")').count()) {
    await page.locator('button:visible:has-text("Upload Photo")').first().click();
    await page.waitForSelector('.modal.show:visible', { timeout: 8000 });
    await sleep(700);
    await capture(page, '080-fact-sheet-parole-and-pardon-upload-photo-upload-photo.png', ['Fact Sheet Parole and Pardon — upload photo'], records, 'modal');
    await closeModal(page);
  }
  if (await page.locator('button:visible:has-text("Take Photo")').count()) {
    await page.locator('button:visible:has-text("Take Photo")').first().click();
    await page.waitForSelector('.modal.show:visible', { timeout: 8000 });
    await sleep(700);
    await capture(page, '081-fact-sheet-parole-and-pardon-take-photo-take-photo.png', ['Fact Sheet Parole and Pardon — take photo'], records, 'modal');
    await closeModal(page);
  }
  if (await page.locator('button:visible:has-text("Upload Fingerprint")').count()) {
    await page.locator('button:visible:has-text("Upload Fingerprint")').first().click();
    await page.waitForSelector('.modal.show:visible, #uploadFingerprintModal.show', { timeout: 8000 });
    await sleep(1200);
    await capture(page, '082-fact-sheet-parole-and-pardon-upload-fingerprint-upload-fingerprint.png', ['Fact Sheet Parole and Pardon — upload fingerprint'], records, 'modal');
    await closeModal(page);
  }

  let catalog = { records: [] };
  if (fs.existsSync(CATALOG)) catalog = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));
  const keep = (catalog.records || []).filter((r) => !String(r.filename || '').includes('11-fact-sheet-parole-pardon/'));
  catalog.records = keep.concat(records);
  catalog.factSheetParolePardonRecaptureAt = new Date().toISOString();
  fs.writeFileSync(CATALOG, JSON.stringify(catalog, null, 2));

  await browser.close();
  console.log(JSON.stringify({ captured: records.length, files: records.map((r) => r.filename) }, null, 2));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
