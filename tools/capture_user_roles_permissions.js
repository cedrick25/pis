/**
 * Capture Grant Permission and Update Permission modals on User Roles
 * using the same 1920x1080 viewport framing as the admin org recapture.
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const ROOT = path.resolve(__dirname, '..', 'PIS_End_User_Manual_Screenshots_20260911');
const FOLDER = '14-user-roles';
const CATALOG = path.join(ROOT, 'screenshot_catalog.json');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function tidy(page) {
  await page.evaluate(() => {
    document.body.classList.add('loaded');
    document.body.classList.remove('open');
    document.querySelectorAll('.overlay').forEach((el) => {
      el.style.setProperty('display', 'none', 'important');
    });
    document.querySelectorAll('.dataTables_processing').forEach((el) => {
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

async function capture(page, filename, captions, records, kind) {
  await tidy(page);
  await sleep(400);
  const dest = path.join(ROOT, FOLDER, filename);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await page.screenshot({ path: dest, fullPage: false, animations: 'disabled' });
  records.push({
    module: 'User Roles',
    name: filename.replace(/\.png$/, ''),
    kind,
    filename: `${FOLDER}/${filename}`,
    folder: FOLDER,
    url: page.url(),
    captions,
  });
  console.log('CAPTURED', `${FOLDER}/${filename}`);
}

async function closeModal(page) {
  await page.locator('.modal.show [data-dismiss="modal"], .modal.show .close, .modal.show .btn-secondary').first()
    .click({ timeout: 2500 }).catch(() => {});
  await page.waitForFunction(() => !document.querySelector('.modal.show:visible'), null, { timeout: 5000 }).catch(() => {});
  await sleep(500);
}

async function roleRow(page) {
  const named = page.locator('.table_head tbody tr').filter({ hasText: /^[\s\S]*FIELD OFFICER[\s\S]*$/ }).first();
  if (await named.count()) {
    const text = await named.innerText();
    if (!/FIELD OFFICE CLERK/i.test(text) || /FIELD OFFICER\s/i.test(text)) {
      const exact = page.locator('.table_head tbody tr').filter({ hasText: 'FIELD OFFICER' }).filter({ hasNotText: 'CLERK' }).first();
      if (await exact.count()) return exact;
    }
  }
  return page.locator('.table_head tbody tr').nth(3);
}

(async () => {
  const records = [];
  const browser = await chromium.launch({ headless: true, channel: 'chrome' }).catch(() => chromium.launch({ headless: true }));
  const page = await (await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
  })).newPage();
  page.setDefaultTimeout(20000);

  await login(page);
  await page.goto(BASE_URL + 'user_roles', { waitUntil: 'load', timeout: 30000 });
  await page.waitForFunction(() => {
    const org = document.querySelector('#left-panel [data-permission="can_access_organization"]');
    return org && getComputedStyle(org).display !== 'none';
  }, null, { timeout: 20000 }).catch(() => {});
  await page.waitForFunction(() => {
    const rows = document.querySelectorAll('.table_head tbody tr');
    if (!rows.length) return false;
    const text = (rows[0].innerText || '').toLowerCase();
    return !text.includes('loading') && !text.includes('no data') && !!document.querySelector('.btn_grant');
  }, null, { timeout: 35000 });
  await sleep(800);
  await tidy(page);

  const row = await roleRow(page);
  const rowText = (await row.innerText()).replace(/\s+/g, ' ').slice(0, 120);
  console.log('role row', rowText);

  await row.locator('.btn_grant').first().click();
  await page.waitForSelector('#grantPermissionModal.show:visible, .modal.show:visible', { timeout: 12000 });
  await page.waitForFunction(() => document.querySelectorAll('#grantPermissionModal .permission-item, .permission_list .permission-item').length > 3, null, { timeout: 20000 });
  await sleep(1000);
  const grantLabels = (await page.locator('#grantPermissionModal .permission-label, .permission_list .permission-label').allInnerTexts()).slice(0, 8);
  console.log('grant labels', grantLabels);
  await capture(page, '067-user-roles-grant-permission-grant-permission.png', [
    'User Roles (Grant Permission)',
    'User Roles grant permission page',
  ], records, 'Grant Permission');
  await closeModal(page);

  const row2 = await roleRow(page);
  await row2.locator('.btn_grant_update').first().click();
  await page.waitForSelector('#updatePermissionModal.show:visible, .modal.show:visible', { timeout: 12000 });
  await page.waitForFunction(() => document.querySelectorAll('.permission_list_update .permission-item').length > 3, null, { timeout: 20000 });
  await sleep(1200);
  const updateLabels = (await page.locator('.permission_list_update .permission-label').allInnerTexts()).slice(0, 8);
  console.log('update labels', updateLabels);
  await capture(page, '068-user-roles-update-permission-update-permission.png', [
    'User Roles (Update Permission)',
    'User Roles update permission page',
  ], records, 'Update Permission');
  await closeModal(page);

  let catalog = { records: [] };
  if (fs.existsSync(CATALOG)) catalog = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));
  const keep = (catalog.records || []).filter((r) => {
    const name = String(r.filename || '');
    return name !== records[0].filename && name !== records[1].filename;
  });
  catalog.records = keep.concat(records);
  catalog.userRolesPermissionRecaptureAt = new Date().toISOString();
  fs.writeFileSync(CATALOG, JSON.stringify(catalog, null, 2));

  await browser.close();
  console.log(JSON.stringify({ captured: records.length, files: records.map((r) => r.filename) }, null, 2));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
