/**
 * Recapture User Accounts, User Roles, Field Office, Region, and Permission
 * screenshots using the same framing as Fact Sheet recaptures:
 * 1920x1080 viewport, natural sidebar, live data, empty add-form placeholders.
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const ROOT = path.resolve(__dirname, '..', 'PIS_End_User_Manual_Screenshots_20260911');
const CATALOG = path.join(ROOT, 'screenshot_catalog.json');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const FILES = {
  '13-user-accounts': [
    { file: '049-user-accounts-list-page.png', captions: ['User Accounts list page'], kind: 'page' },
    { file: '050-user-accounts-add-record-add-record.png', captions: ['User Accounts (Add Record)'], kind: 'modal' },
  ],
  '14-user-roles': [
    { file: '051-user-roles-list-page.png', captions: ['User Roles list page'], kind: 'page' },
    { file: '052-user-roles-update-update.png', captions: ['User Roles (Update)', 'User Roles update page'], kind: 'modal' },
    { file: '053-user-roles-add-record-add-record.png', captions: ['User Roles (Add Record)'], kind: 'modal' },
  ],
  '15-field-office': [
    { file: '054-field-office-list-page.png', captions: ['Field Office list page'], kind: 'page' },
    { file: '055-field-office-view-view.png', captions: ['Field Office (View)', 'Field Office view page'], kind: 'modal' },
    { file: '056-field-office-update-update.png', captions: ['Field Office (Update)', 'Field Office update page'], kind: 'modal' },
    { file: '057-field-office-remove-confirmation-remove-confirmation.png', captions: ['Field Office (Delete)', 'Field Office delete page'], kind: 'modal' },
    { file: '058-field-office-add-record-add-record.png', captions: ['Field Office (Add Record)'], kind: 'modal' },
  ],
  '16-region': [
    { file: '059-region-list-page.png', captions: ['Region list page'], kind: 'page' },
    { file: '060-region-update-update.png', captions: ['Region (Update)', 'Region update page'], kind: 'modal' },
    { file: '061-region-remove-confirmation-remove-confirmation.png', captions: ['Region (Delete)', 'Region delete page'], kind: 'modal' },
    { file: '062-region-add-record-add-record.png', captions: ['Region (Add Record)'], kind: 'modal' },
  ],
  '17-permission': [
    { file: '063-permission-list-page.png', captions: ['Permission list page'], kind: 'page' },
    { file: '064-permission-update-update.png', captions: ['Permission (Update)', 'Permission update page'], kind: 'modal' },
    { file: '065-permission-remove-confirmation-remove-confirmation.png', captions: ['Permission (Delete)', 'Permission delete page'], kind: 'modal' },
    { file: '066-permission-add-record-add-record.png', captions: ['Permission (Add Record)'], kind: 'modal' },
  ],
};

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

    document.querySelectorAll('.dropdown-menu.show').forEach((el) => {
      if (!el.closest('#left-panel')) {
        el.classList.remove('show');
        el.style.display = 'none';
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

async function waitForOrgNav(page) {
  await page.waitForFunction(() => {
    const org = document.querySelector('#left-panel [data-permission="can_access_organization"]');
    if (!org) return false;
    return getComputedStyle(org).display !== 'none';
  }, null, { timeout: 20000 }).catch(() => {});
  await sleep(400);
  await tidy(page);
}

async function waitForTable(page, { allowEmpty = false } = {}) {
  await page.waitForSelector('.table_head tbody tr, table tbody tr', { timeout: 25000 });
  await page.waitForFunction((allowEmptyRows) => {
    const rows = document.querySelectorAll('.table_head tbody tr, table tbody tr');
    if (!rows.length) return false;
    const text = (rows[0].innerText || '').toLowerCase();
    if (text.includes('loading') || text.includes('processing')) return false;
    if (allowEmptyRows) return true;
    return !text.includes('no data');
  }, allowEmpty, { timeout: 35000 }).catch(() => {});
  await sleep(600);
  await tidy(page);
}

async function capture(page, folder, filename, captions, records, kind = 'page') {
  await tidy(page);
  await sleep(350);
  const dest = path.join(ROOT, folder, filename);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await page.screenshot({ path: dest, fullPage: false, animations: 'disabled' });
  records.push({
    folder,
    filename: `${folder}/${filename}`,
    kind,
    url: page.url(),
    captions,
  });
  console.log('CAPTURED', `${folder}/${filename}`);
}

async function closeModal(page) {
  const visible = page.locator('.modal.show:visible');
  if (!(await visible.count())) return;
  await page.locator('.modal.show [data-dismiss="modal"], .modal.show .close, .modal.show .btn-secondary').first()
    .click({ timeout: 2500 }).catch(() => {});
  await page.waitForFunction(() => !document.querySelector('.modal.show:visible'), null, { timeout: 5000 }).catch(() => {});
  await sleep(400);
}

async function openModal(page, clickLocator, { force = false, filledSelector } = {}) {
  try {
    await clickLocator.click({ force, timeout: 4000 });
  } catch (err) {
    console.log('click fallback', String(err.message || err).split('\n')[0]);
    await clickLocator.evaluate((el) => el.click());
  }
  await page.waitForSelector('.modal.show:visible', { timeout: 10000 });
  if (filledSelector) {
    await page.waitForFunction((sel) => {
      const el = document.querySelector(sel);
      if (!el) return false;
      const value = (el.value || el.textContent || '').trim();
      return value.length > 0;
    }, filledSelector, { timeout: 12000 }).catch(() => {});
  }
  await sleep(700);
  await tidy(page);
}

async function clickAdd(page, buttonText) {
  const btn = page.locator(`button:visible:has-text("${buttonText}")`).first();
  await btn.click();
  await page.waitForSelector('.modal.show:visible', { timeout: 10000 });
  await sleep(700);
  await tidy(page);
}

async function row(page, textRe) {
  if (textRe) {
    const named = page.locator('.table_head tbody tr').filter({ hasText: textRe }).first();
    if (await named.count()) return named;
  }
  return page.locator('.table_head tbody tr').first();
}

async function waitForUserList(page) {
  const responseWait = page.waitForResponse((res) => {
    const url = res.url();
    return /8088\/user\?/.test(url) && url.includes('page=') && res.request().method() === 'GET';
  }, { timeout: 120000 }).catch((err) => {
    console.log('user list response wait', String(err.message || err).split('\n')[0]);
    return null;
  });
  await page.goto(BASE_URL + 'user_accounts', { waitUntil: 'load', timeout: 30000 });
  await waitForOrgNav(page);
  const res = await responseWait;
  if (res) console.log('user list http', res.status(), res.url());
  await page.waitForFunction(() => {
    const rows = document.querySelectorAll('.table_head tbody tr');
    if (!rows.length) return false;
    const text = (rows[0].innerText || '').toLowerCase();
    return !text.includes('loading') && !text.includes('no data') && !!document.querySelector('.btn_update');
  }, null, { timeout: 120000 });
  await sleep(800);
  await tidy(page);
}

async function gotoModule(page, route) {
  await page.goto(BASE_URL + route, { waitUntil: 'load', timeout: 30000 });
  await waitForOrgNav(page);
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
  page.on('dialog', async (d) => {
    console.log('alert', d.message());
    await d.dismiss().catch(() => d.accept());
  });

  await login(page);

  // --- User Accounts ---
  await waitForUserList(page);
  console.log('user accounts', (await page.locator('.table_head tbody').innerText().catch(() => '')).replace(/\s+/g, ' ').slice(0, 220));
  await capture(page, '13-user-accounts', '049-user-accounts-list-page.png', FILES['13-user-accounts'][0].captions, records);
  await clickAdd(page, 'Add User Account');
  await capture(page, '13-user-accounts', '050-user-accounts-add-record-add-record.png', FILES['13-user-accounts'][1].captions, records, 'modal');
  await closeModal(page);

  // --- User Roles ---
  await gotoModule(page, 'user_roles');
  await waitForTable(page);
  console.log('roles', (await page.locator('.table_head tbody').innerText().catch(() => '')).replace(/\s+/g, ' ').slice(0, 200));
  await capture(page, '14-user-roles', '051-user-roles-list-page.png', FILES['14-user-roles'][0].captions, records);
  await openModal(page, (await row(page, /SYSTEM ADMINISTRATOR|Administrator/i)).locator('.btn_update').first(), {
    filledSelector: '.user_role_name_update',
  });
  await capture(page, '14-user-roles', '052-user-roles-update-update.png', FILES['14-user-roles'][1].captions, records, 'modal');
  await closeModal(page);
  await clickAdd(page, 'Add Role');
  await capture(page, '14-user-roles', '053-user-roles-add-record-add-record.png', FILES['14-user-roles'][2].captions, records, 'modal');
  await closeModal(page);

  // --- Field Office ---
  await gotoModule(page, 'department');
  await waitForTable(page);
  console.log('offices', (await page.locator('.table_head tbody').innerText().catch(() => '')).replace(/\s+/g, ' ').slice(0, 220));
  await capture(page, '15-field-office', '054-field-office-list-page.png', FILES['15-field-office'][0].captions, records);

  const officeRow = await row(page, /Baybay City Parole And Probation Office/i);
  await openModal(page, officeRow.locator('.btn_view').first(), { filledSelector: '.field_office_view' });
  await capture(page, '15-field-office', '055-field-office-view-view.png', FILES['15-field-office'][1].captions, records, 'modal');
  await closeModal(page);

  await openModal(page, (await row(page, /Baybay City Parole And Probation Office/i)).locator('.btn_update').first(), {
    filledSelector: '.dep_name_update',
  });
  await capture(page, '15-field-office', '056-field-office-update-update.png', FILES['15-field-office'][2].captions, records, 'modal');
  await closeModal(page);

  await openModal(page, (await row(page, /Baybay City Parole And Probation Office/i)).locator('.btn_remove').first());
  await capture(page, '15-field-office', '057-field-office-remove-confirmation-remove-confirmation.png', FILES['15-field-office'][3].captions, records, 'modal');
  await closeModal(page);

  await clickAdd(page, 'Add Field Office');
  await capture(page, '15-field-office', '058-field-office-add-record-add-record.png', FILES['15-field-office'][4].captions, records, 'modal');
  await closeModal(page);

  // --- Region ---
  await gotoModule(page, 'location');
  await waitForTable(page);
  console.log('regions', (await page.locator('.table_head tbody').innerText().catch(() => '')).replace(/\s+/g, ' ').slice(0, 220));
  await capture(page, '16-region', '059-region-list-page.png', FILES['16-region'][0].captions, records);

  const regionRow = await row(page, /Region VIII|VIII/i);
  await openModal(page, regionRow.locator('.btn_update').first(), { filledSelector: '.loc_name_update' });
  await capture(page, '16-region', '060-region-update-update.png', FILES['16-region'][1].captions, records, 'modal');
  await closeModal(page);

  await openModal(page, (await row(page, /Region VIII|VIII/i)).locator('.btn_remove').first());
  await capture(page, '16-region', '061-region-remove-confirmation-remove-confirmation.png', FILES['16-region'][2].captions, records, 'modal');
  await closeModal(page);

  await clickAdd(page, 'Add Region');
  await capture(page, '16-region', '062-region-add-record-add-record.png', FILES['16-region'][3].captions, records, 'modal');
  await closeModal(page);

  // --- Permission ---
  await gotoModule(page, 'permission');
  await waitForTable(page);
  console.log('permissions', (await page.locator('.table_head tbody').innerText().catch(() => '')).replace(/\s+/g, ' ').slice(0, 220));
  await capture(page, '17-permission', '063-permission-list-page.png', FILES['17-permission'][0].captions, records);

  await openModal(page, page.locator('.btn_update').first(), { filledSelector: '.permission_name_update' });
  await capture(page, '17-permission', '064-permission-update-update.png', FILES['17-permission'][1].captions, records, 'modal');
  await closeModal(page);

  const removeBtn = page.locator('.btn_remove').first();
  if (await removeBtn.count()) {
    const visible = await removeBtn.isVisible().catch(() => false);
    console.log('permission remove visible', visible);
    await openModal(page, removeBtn, { force: true });
    const modalOpen = await page.locator('.modal.show:visible').count();
    console.log('permission remove modal', modalOpen);
    await capture(page, '17-permission', '065-permission-remove-confirmation-remove-confirmation.png', FILES['17-permission'][2].captions, records, 'modal');
    await closeModal(page);
  } else {
    console.log('permission remove button missing; capturing list instead');
    await capture(page, '17-permission', '065-permission-remove-confirmation-remove-confirmation.png', FILES['17-permission'][2].captions, records);
  }

  await clickAdd(page, 'Add Permission');
  await capture(page, '17-permission', '066-permission-add-record-add-record.png', FILES['17-permission'][3].captions, records, 'modal');
  await closeModal(page);

  let catalog = { records: [] };
  if (fs.existsSync(CATALOG)) catalog = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));
  const capturedNames = new Set(records.map((r) => r.filename));
  (catalog.records || []).forEach((existing) => {
    const match = records.find((r) => r.filename === existing.filename);
    if (!match) return;
    existing.url = match.url;
    existing.captions = match.captions.length ? match.captions : existing.captions;
  });
  catalog.adminOrgRecaptureAt = new Date().toISOString();
  fs.writeFileSync(CATALOG, JSON.stringify(catalog, null, 2));

  await browser.close();
  console.log(JSON.stringify({
    captured: records.length,
    files: records.map((r) => r.filename),
    missingFromCatalog: [...capturedNames].filter((name) => !(catalog.records || []).some((r) => r.filename === name)),
  }, null, 2));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
