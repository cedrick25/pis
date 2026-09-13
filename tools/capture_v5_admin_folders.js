/**
 * Capture fresh PPIS end-user manual screenshots as admin.
 * Saves into module folders under PIS_End_User_Manual_Screenshots_20260911.
 * No annotation boxes. Viewport captures preferred (avoid overstretched full-page shots).
 */
const fs = require('fs/promises');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const USERNAME = process.env.PIS_MANUAL_USER || 'admin';
const PASSWORD = process.env.PIS_MANUAL_PASS || 'admin123';
const ROOT = path.resolve(__dirname, '..');
const SCREENSHOT_DIR = path.join(ROOT, 'PIS_End_User_Manual_Screenshots_20260911');
const CATALOG_FILE = path.join(SCREENSHOT_DIR, 'screenshot_catalog.json');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function slugify(value) {
  return String(value || 'page')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90) || 'page';
}

function folderFor(moduleName) {
  const map = {
    Login: '00-login',
    Navigation: '00-navigation',
    'Docket Access': '01-docket-access',
    'Probation Investigation': '02-probation-investigation',
    'Probation Courtesy Investigation': '03-probation-courtesy-investigation',
    'Probation Supervision': '04-probation-supervision',
    'Probation Courtesy Supervision': '05-probation-courtesy-supervision',
    'Parole and Pardon Investigation': '06-parole-pardon-investigation',
    'Parole and Pardon Courtesy Investigation': '07-parole-pardon-courtesy-investigation',
    'Parole and Pardon Supervision': '08-parole-pardon-supervision',
    'Parole and Pardon Courtesy Supervision': '09-parole-pardon-courtesy-supervision',
    'Fact Sheet Probation': '10-fact-sheet-probation',
    'Fact Sheet Parole and Pardone': '11-fact-sheet-parole-pardon',
    Forms: '12-forms',
    'User Accounts': '13-user-accounts',
    'User Roles': '14-user-roles',
    'Field Office': '15-field-office',
    Region: '16-region',
    Permission: '17-permission',
    CPPO: '18-role-cppo',
    'Field Officer': '19-role-field-officer',
    'Clerk or Other': '20-role-clerk-other',
  };
  return map[moduleName] || `99-${slugify(moduleName)}`;
}

async function tidy(page) {
  await page.evaluate(() => {
    document.body.classList.add('loaded');
    document.querySelectorAll('.overlay').forEach((el) => {
      el.style.setProperty('display', 'none', 'important');
    });
    document.querySelectorAll('.fs-panel-loader').forEach((el) => el.classList.add('is-hidden'));
    document.querySelectorAll('#fsDynamicToast, .fs-dynamic-toast').forEach((el) => {
      el.style.setProperty('display', 'none', 'important');
    });
    document.querySelectorAll('.dropdown-menu.show').forEach((el) => {
      if (!el.closest('#left-panel')) {
        el.classList.remove('show');
        el.style.display = 'none';
      }
    });
  }).catch(() => {});
}

async function expandLeftPanel(page) {
  await page.evaluate(() => {
    document.body.classList.remove('open');
    const panel = document.getElementById('left-panel');
    if (panel) {
      panel.classList.remove('open');
      panel.style.display = '';
    }
  }).catch(() => {});
}

async function expandFormSections(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.collapse').forEach((el) => {
      el.classList.add('show');
      el.style.display = 'block';
      el.style.height = 'auto';
    });
    document.querySelectorAll('[data-toggle="collapse"]').forEach((el) => {
      el.setAttribute('aria-expanded', 'true');
      el.classList.remove('collapsed');
    });
  }).catch(() => {});
}

async function waitForReady(page) {
  await page.waitForLoadState('domcontentloaded', { timeout: 20000 }).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
  await sleep(700);
  await tidy(page);
  await expandLeftPanel(page);
}

async function waitForTableRows(page) {
  await page.waitForFunction(() => {
    const rows = document.querySelectorAll('table tbody tr');
    if (!rows.length) return false;
    const text = (rows[0].innerText || '').toLowerCase();
    if (text.includes('field office could not') || text.includes('no data') || text.includes('loading')) {
      return false;
    }
    return true;
  }, null, { timeout: 25000 }).catch(() => {});
  await page.waitForSelector('.btn_view, .btn_update, .btn_factsheet, a[href*="client_view_factsheet"], .btn-saveData, table tbody tr td', { timeout: 12000 }).catch(() => {});
  await sleep(700);
  await tidy(page);
  await expandLeftPanel(page);
}

async function login(page) {
  await page.goto(BASE_URL, { waitUntil: 'load', timeout: 25000 });
  await waitForReady(page);
  await page.locator('input.email').fill(USERNAME);
  await page.locator('input.password').fill(PASSWORD);
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\/(investigation_docketing|dashboard|client_list)/, { timeout: 35000 }).catch(() => {});
  await page.waitForFunction(() => {
    const cookies = document.cookie || '';
    return /field_office_id=/.test(cookies) && !!localStorage.getItem('permission');
  }, null, { timeout: 20000 }).catch(() => {});
  await waitForReady(page);
  await page.waitForFunction(() => document.querySelectorAll('#left-panel a[href]').length > 5, null, { timeout: 15000 }).catch(() => {});
  await expandLeftPanel(page);
}

async function setRoleCookie(page, roleId) {
  await page.context().addCookies([{
    name: 'role_id',
    value: String(roleId),
    url: BASE_URL,
  }]);
  await page.evaluate((id) => {
    document.cookie = 'role_id=' + id + '; path=/';
  }, String(roleId));
}

async function openDropdownMenus(page) {
  await page.evaluate(() => {
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
  }).catch(() => {});
  await sleep(400);
}

async function collectControls(page) {
  return page.evaluate(() => {
    const visible = (el) => {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
    };
    const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
    const out = { buttons: [], fields: [], tables: [], tabs: [], modals: [] };
    document.querySelectorAll('button, .btn, input[type=button], input[type=submit]').forEach((el) => {
      if (!visible(el)) return;
      const value = clean(el.innerText || el.value || el.getAttribute('title') || el.getAttribute('aria-label'));
      if (value) out.buttons.push(value);
    });
    document.querySelectorAll('.nav-tabs .nav-link, [role=tab]').forEach((el) => {
      if (visible(el)) out.tabs.push(clean(el.textContent));
    });
    for (const key of Object.keys(out)) out[key] = [...new Set(out[key].filter(Boolean))].slice(0, 20);
    return out;
  }).catch(() => ({}));
}

async function capture(page, records, name, kind, moduleName, options = {}) {
  await waitForReady(page);
  await tidy(page);
  if (options.expandSections) {
    await expandFormSections(page);
    await sleep(300);
  }
  const folder = folderFor(moduleName);
  const dir = path.join(SCREENSHOT_DIR, folder);
  await fs.mkdir(dir, { recursive: true });
  const safeName = `${String(records.length + 1).padStart(3, '0')}-${slugify(name)}-${slugify(kind)}`;
  const filename = `${safeName}.png`;
  const relative = path.join(folder, filename).replace(/\\/g, '/');
  const dest = path.join(dir, filename);

  const modal = page.locator('.modal.show:visible').first();
  const hasModal = await modal.count().then((n) => n > 0).catch(() => false);
  const useFullPage = !!(options.fullPage) && !hasModal;

  if (hasModal && await modal.isVisible().catch(() => false)) {
    // Prefer modal clip when possible; fallback to viewport (no boxes)
    try {
      const box = await modal.boundingBox();
      if (box && box.width > 40 && box.height > 40) {
        const pad = 24;
        await page.screenshot({
          path: dest,
          fullPage: false,
          animations: 'disabled',
          clip: {
            x: Math.max(0, box.x - pad),
            y: Math.max(0, box.y - pad),
            width: Math.min(box.width + pad * 2, 1600),
            height: Math.min(box.height + pad * 2, 900),
          },
        });
      } else {
        await page.screenshot({ path: dest, fullPage: false, animations: 'disabled' });
      }
    } catch (_) {
      await page.screenshot({ path: dest, fullPage: false, animations: 'disabled' });
    }
  } else {
    await page.screenshot({ path: dest, fullPage: useFullPage, animations: 'disabled' });
  }

  const record = {
    module: moduleName || name,
    name,
    kind,
    filename: relative,
    folder,
    url: page.url(),
    controls: await collectControls(page),
    captions: options.captions || [],
  };
  records.push(record);
  console.log(`CAPTURED ${relative}`);
  return record;
}

async function closeModal(page) {
  const modal = page.locator('.modal.show:visible').first();
  if (!(await modal.count().catch(() => 0))) return;
  await page.locator('.modal.show [data-dismiss="modal"], .modal.show .close, .modal.show .btn-secondary').first().click({ timeout: 2500 }).catch(() => {});
  await sleep(400);
}

async function clickAndCaptureAction(page, records, moduleName, selector, actionName, captions) {
  const loc = page.locator(selector).first();
  if (!(await loc.count().catch(() => 0))) {
    console.log(`NO ${actionName} on ${moduleName}`);
    return false;
  }
  const before = page.url();
  await loc.scrollIntoViewIfNeeded().catch(() => {});
  await loc.click({ timeout: 6000, force: true }).catch(() => {});
  await sleep(1800);
  await waitForReady(page);
  const isForm = /view|update/i.test(actionName);
  await capture(page, records, `${moduleName} ${actionName}`, actionName, moduleName, {
    fullPage: isForm,
    expandSections: isForm,
    captions,
  });
  const hasModal = await page.locator('.modal.show:visible').count().catch(() => 0);
  if (hasModal) {
    await closeModal(page);
  } else if (page.url() !== before) {
    await page.goto(before, { waitUntil: 'load', timeout: 25000 }).catch(() => {});
    await waitForReady(page);
    await waitForTableRows(page);
  }
  return true;
}

const pages = [
  ['Probation Investigation', 'investigation_docketing'],
  ['Probation Courtesy Investigation', 'probation-courtesy-investigation-list'],
  ['Probation Supervision', 'supervision_docketing'],
  ['Probation Courtesy Supervision', 'probation-courtesy-supervision-list'],
  ['Parole and Pardon Investigation', 'parole-pardon-investigation-list'],
  ['Parole and Pardon Courtesy Investigation', 'parole-pardon-courtesy-investigation-list'],
  ['Parole and Pardon Supervision', 'parole-pardon-supervision'],
  ['Parole and Pardon Courtesy Supervision', 'parole-pardon-courtesy-supervision-list'],
  ['Fact Sheet Probation', 'client_list'],
  ['Fact Sheet Parole and Pardone', 'client_list_parole_and_pardone'],
  ['Forms', 'form_list'],
  ['User Accounts', 'user_accounts'],
  ['User Roles', 'user_roles'],
  ['Field Office', 'department'],
  ['Region', 'location'],
  ['Permission', 'permission'],
];

async function openFirstClientProfile(page, listRoute, linkSelector) {
  await page.goto(`${BASE_URL}${listRoute}`, { waitUntil: 'load', timeout: 25000 });
  await waitForReady(page);
  await waitForTableRows(page);
  const link = page.locator(linkSelector).first();
  if (!(await link.count().catch(() => 0))) return false;
  await link.click();
  await page.waitForURL(/client_view_factsheet/, { timeout: 20000 }).catch(() => {});
  await waitForReady(page);
  await sleep(1400);
  await tidy(page);
  return /client_view_factsheet/.test(page.url());
}

async function captureFactSheetProbation(page, records) {
  const opened = await openFirstClientProfile(page, 'client_list', 'table a[href*="client_view_factsheet"]');
  if (!opened) {
    console.log('SKIP fact sheet extras: no client profile link');
    return;
  }
  await capture(page, records, 'Fact Sheet Probation click client name', 'click client name', 'Fact Sheet Probation', {
    fullPage: false,
    captions: ['Fact Sheet Probation — click client name'],
  });
  await capture(page, records, 'Fact Sheet Probation client view profile', 'client view profile', 'Fact Sheet Probation', {
    fullPage: false,
    captions: ['Fact Sheet Probation — client view profile'],
  });
  await capture(page, records, 'Fact Sheet Tabs', 'tabs', 'Fact Sheet Probation', {
    fullPage: false,
    captions: ['Fact Sheet Tabs'],
  });

  if (await page.locator('.btn-photo:visible, [data-target="#uploadPicModal"]:visible').count()) {
    await page.locator('.btn-photo, [data-target="#uploadPicModal"]').first().click().catch(() => {});
    await sleep(800);
    await capture(page, records, 'Fact Sheet Probation upload photo', 'upload photo', 'Fact Sheet Probation', {
      captions: ['Fact Sheet Probation — upload photo'],
    });
    await closeModal(page);
  }

  if (await page.locator('.btn-take:visible, [data-target="#cameraModal"]:visible').count()) {
    await page.locator('.btn-take, [data-target="#cameraModal"]').first().click().catch(() => {});
    await sleep(800);
    await capture(page, records, 'Fact Sheet Probation take photo', 'take photo', 'Fact Sheet Probation', {
      captions: ['Fact Sheet Probation — take photo'],
    });
    await closeModal(page);
  }

  if (await page.locator('.btn-fingerprint:visible').count()) {
    await page.locator('.btn-fingerprint').first().click().catch(() => {});
    await sleep(800);
    await capture(page, records, 'Fact Sheet Probation upload fingerprint', 'upload fingerprint', 'Fact Sheet Probation', {
      captions: ['Fact Sheet Probation — upload fingerprint'],
    });
    await closeModal(page);
  }

  const docketTab = page.locator('#docketListTab, a:has-text("Docket List")').first();
  if (await docketTab.count()) {
    await docketTab.click().catch(() => {});
    await sleep(2200);
    await waitForReady(page);
    await capture(page, records, 'Fact Sheet Probation Worksheet and PSIR Overview', 'docket list', 'Fact Sheet Probation', {
      fullPage: false,
      captions: ['Fact Sheet Probation — Worksheet and PSIR Overview'],
    });
    await capture(page, records, 'Fact Sheet Probation Navigate to Worksheet', 'docket worksheet', 'Fact Sheet Probation', {
      fullPage: false,
      captions: ['Fact Sheet Probation — Navigate to Worksheet'],
    });
    await capture(page, records, 'Fact Sheet Probation Navigate to PSIR', 'docket psir', 'Fact Sheet Probation', {
      fullPage: false,
      captions: ['Fact Sheet Probation — Navigate to PSIR'],
    });

    const printWs = page.locator('.btn_pdfWorksheet').first();
    if (await printWs.count()) {
      await printWs.click().catch(() => {});
      await sleep(2500);
      await capture(page, records, 'Fact Sheet Probation Worksheet Print Out Sample', 'worksheet print', 'Fact Sheet Probation', {
        captions: ['Fact Sheet Probation — Worksheet Print Out Sample'],
      });
      await page.locator('#closePreview, #pdfPreviewModal .close').first().click().catch(() => {});
      await sleep(400);
    }

    const printPsir = page.locator('.btn_pdfPSIR').first();
    if (await printPsir.count()) {
      await printPsir.click().catch(() => {});
      await sleep(2500);
      await capture(page, records, 'Fact Sheet Probation PSIR Print Out Sample', 'psir print', 'Fact Sheet Probation', {
        captions: ['Fact Sheet Probation — PSIR Print Out Sample'],
      });
      await page.locator('#closePreview, #pdfPreviewModal .close').first().click().catch(() => {});
      await sleep(400);
    }

    const editWs = page.locator('a.fs-edit-worksheet').first();
    if (await editWs.count()) {
      const href = await editWs.getAttribute('href');
      if (href) {
        await page.goto(new URL(href, BASE_URL).toString(), { waitUntil: 'load', timeout: 25000 }).catch(() => {});
        await waitForReady(page);
        await capture(page, records, 'Fact Sheet Probation Fill Out Worksheet', 'worksheet editor', 'Fact Sheet Probation', {
          fullPage: false,
          captions: ['Fact Sheet Probation — Fill Out Worksheet'],
        });
        const saveBtn = page.locator('.btn-saveData:visible').first();
        if (await saveBtn.count()) {
          await saveBtn.click().catch(() => {});
          await sleep(800);
          await capture(page, records, 'Fact Sheet Probation Worksheet Save Changes', 'worksheet save dialog', 'Fact Sheet Probation', {
            captions: ['Confirmation dialog — Save Changes or Update Changes'],
          });
          await closeModal(page);
        }
        await page.goBack().catch(() => {});
        await waitForReady(page);
        const docketTab2 = page.locator('#docketListTab, a:has-text("Docket List")').first();
        if (await docketTab2.count()) {
          await docketTab2.click().catch(() => {});
          await sleep(1800);
        }
      }
    }

    const editPsir = page.locator('a.fs-edit-psir').first();
    if (await editPsir.count()) {
      const href = await editPsir.getAttribute('href');
      if (href) {
        await page.goto(new URL(href, BASE_URL).toString(), { waitUntil: 'load', timeout: 25000 }).catch(() => {});
        await waitForReady(page);
        await capture(page, records, 'Fact Sheet Probation Fill Out PSIR', 'psir editor', 'Fact Sheet Probation', {
          fullPage: false,
          captions: ['Fact Sheet Probation — Fill Out PSIR'],
        });
        const saveBtn = page.locator('.btn-saveData:visible').first();
        if (await saveBtn.count()) {
          await saveBtn.click().catch(() => {});
          await sleep(800);
          await capture(page, records, 'Fact Sheet Probation PSIR Save Changes', 'psir save dialog', 'Fact Sheet Probation', {
            captions: ['Confirmation dialog — Save Changes or Update Changes'],
          });
          await closeModal(page);
        }
      }
    }
  }
}

async function captureFactSheetParole(page, records) {
  const opened = await openFirstClientProfile(
    page,
    'client_list_parole_and_pardone',
    'table a[href*="client_view_factsheet_parole_pardone"]'
  );
  if (!opened) {
    console.log('SKIP parole fact sheet extras: no client profile link');
    return;
  }
  await capture(page, records, 'Fact Sheet Parole and Pardon client view profile', 'client view profile', 'Fact Sheet Parole and Pardone', {
    fullPage: false,
    captions: ['Fact Sheet Parole and Pardon — client view profile'],
  });
  await capture(page, records, 'Fact Sheet Parole and Pardon client profile tabs', 'tabs', 'Fact Sheet Parole and Pardone', {
    fullPage: false,
    captions: ['Fact Sheet Parole and Pardon — client profile tabs'],
  });

  if (await page.locator('.btn-photo:visible, [data-target="#uploadPicModal"]:visible').count()) {
    await page.locator('.btn-photo, [data-target="#uploadPicModal"]').first().click().catch(() => {});
    await sleep(800);
    await capture(page, records, 'Fact Sheet Parole and Pardon upload photo', 'upload photo', 'Fact Sheet Parole and Pardone', {
      captions: ['Fact Sheet Parole and Pardon — upload photo'],
    });
    await closeModal(page);
  }

  if (await page.locator('.btn-take:visible, [data-target="#cameraModal"]:visible').count()) {
    await page.locator('.btn-take, [data-target="#cameraModal"]').first().click().catch(() => {});
    await sleep(800);
    await capture(page, records, 'Fact Sheet Parole and Pardon take photo', 'take photo', 'Fact Sheet Parole and Pardone', {
      captions: ['Fact Sheet Parole and Pardon — take photo'],
    });
    await closeModal(page);
  }

  if (await page.locator('.btn-fingerprint:visible').count()) {
    await page.locator('.btn-fingerprint').first().click().catch(() => {});
    await sleep(800);
    await capture(page, records, 'Fact Sheet Parole and Pardon upload fingerprint', 'upload fingerprint', 'Fact Sheet Parole and Pardone');
    await closeModal(page);
  }
}

async function captureRoleWorkflows(page, records) {
  const variants = [
    {
      roleId: '32',
      label: 'CPPO',
      captions: [
        'CPPO / full-access account — client profile with photo and document actions',
        'CPPO / full-access account — Docket List with Edit and Print for Worksheet and PSIR',
      ],
    },
    {
      roleId: '4',
      label: 'Field Officer',
      captions: [
        'Field Officer account — client profile with fact-sheet actions available',
        'Field Officer account — Docket List showing owner-only Worksheet/PSIR limits',
      ],
    },
    {
      roleId: '99',
      label: 'Clerk or Other',
      captions: [
        'Clerk / other account — client profile without photo or add-document buttons',
        'Clerk / other account — Docket List without Worksheet/PSIR edit and print',
      ],
    },
  ];

  for (const variant of variants) {
    await setRoleCookie(page, variant.roleId);
    const opened = await openFirstClientProfile(page, 'client_list', 'table a[href*="client_view_factsheet"]');
    if (!opened) {
      console.log(`SKIP role ${variant.label}: no client`);
      continue;
    }
    await capture(page, records, `${variant.label} fact sheet client profile`, 'client profile', variant.label, {
      fullPage: false,
      captions: [variant.captions[0]],
    });
    const docketTab = page.locator('#docketListTab, a:has-text("Docket List")').first();
    if (await docketTab.count()) {
      await docketTab.click().catch(() => {});
      await sleep(2000);
      await capture(page, records, `${variant.label} fact sheet docket list`, 'docket list', variant.label, {
        fullPage: false,
        captions: [variant.captions[1]],
      });
    }
  }
  // restore admin-like role if possible
  await setRoleCookie(page, '1');
}

async function captureDocketFactSheetNav(page, records) {
  await page.goto(`${BASE_URL}investigation_docketing`, { waitUntil: 'load', timeout: 25000 });
  await waitForReady(page);
  await waitForTableRows(page);
  const btn = page.locator('.btn_factsheet').first();
  if (!(await btn.count().catch(() => 0))) {
    console.log('SKIP docket fact sheet: no Fact Sheet button');
    return;
  }
  await btn.scrollIntoViewIfNeeded().catch(() => {});
  await capture(page, records, 'Opening the Fact Sheet from a docket', 'fact sheet button', 'Docket Access', {
    captions: ['Docket list — Fact Sheet in the Actions column'],
  });
  await btn.click({ timeout: 6000, force: true }).catch(() => {});
  await page.waitForURL(/client_view_factsheet/, { timeout: 20000 }).catch(() => {});
  await waitForReady(page);
  await sleep(1400);
  await capture(page, records, 'Opening the Fact Sheet from a docket result', 'client view profile', 'Docket Access', {
    fullPage: false,
    captions: ['Client view profile opened from Fact Sheet on a docket'],
  });
}

async function main() {
  await fs.mkdir(SCREENSHOT_DIR, { recursive: true });
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  } catch (err) {
    browser = await chromium.launch({ headless: true });
  }
  const context = await browser.newContext({
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: 'light',
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();
  page.setDefaultTimeout(12000);
  const records = [];
  const errors = [];

  try {
    await page.goto(BASE_URL, { waitUntil: 'load', timeout: 25000 });
    await capture(page, records, 'Login', 'page', 'Login', { captions: ['Login page'] });
    await login(page);
    await openDropdownMenus(page);
    await capture(page, records, 'Main Navigation', 'expanded menus', 'Navigation', {
      captions: ['Main navigation'],
    });

    for (const [moduleName, route] of pages) {
      const url = `${BASE_URL}${route}`;
      try {
        await page.goto(url, { waitUntil: 'load', timeout: 25000 });
        await waitForReady(page);
        await waitForTableRows(page);
        await capture(page, records, moduleName, 'list page', moduleName, {
          captions: [`${moduleName} list page`],
        });
        const isRecordList = await page.locator('table:visible').count().catch(() => 0);
        if (isRecordList) {
          await clickAndCaptureAction(page, records, moduleName, '.btn_view', 'View', [
            `${moduleName} (View)`,
            `${moduleName} view page`,
          ]);
          await clickAndCaptureAction(page, records, moduleName, '.btn_update', 'Update', [
            `${moduleName} (Update)`,
            `${moduleName} update page`,
          ]);
          await clickAndCaptureAction(page, records, moduleName, '.btn_attachments, .btn_upload', 'Attachments', [
            `${moduleName} (Attachments)`,
            `${moduleName} attachment page`,
          ]);
          await clickAndCaptureAction(page, records, moduleName, '.btn_remove, .btn_delete', 'Remove confirmation', [
            `${moduleName} (Delete)`,
            `${moduleName} delete page`,
          ]);
        }
        const addSelector = 'button:has-text("Add"), a:has-text("Add"), button:has-text("New"), a:has-text("New"), button:has-text("Add Record"), a:has-text("Add Record"), button:has-text("Add Document")';
        if (await page.locator(addSelector).count().catch(() => 0)) {
          await clickAndCaptureAction(page, records, moduleName, addSelector, 'Add record', [
            `${moduleName} (Add Record)`,
            `${moduleName} (Add Document)`,
            'Forms (Add Document)',
          ]);
        }
      } catch (err) {
        errors.push({ module: moduleName, route, message: err && err.message ? err.message : String(err) });
        console.log(`ERROR ${moduleName}: ${errors[errors.length - 1].message}`);
      }
    }

    try {
      await captureDocketFactSheetNav(page, records);
    } catch (err) {
      errors.push({ module: 'Docket Fact Sheet', message: String(err && err.message ? err.message : err) });
      console.log(`ERROR Docket Fact Sheet: ${errors[errors.length - 1].message}`);
    }

    try {
      await captureFactSheetProbation(page, records);
    } catch (err) {
      errors.push({ module: 'Fact Sheet extras', message: String(err && err.message ? err.message : err) });
      console.log(`ERROR Fact Sheet extras: ${errors[errors.length - 1].message}`);
    }

    try {
      await captureFactSheetParole(page, records);
    } catch (err) {
      errors.push({ module: 'Fact Sheet Parole extras', message: String(err && err.message ? err.message : err) });
      console.log(`ERROR Fact Sheet Parole extras: ${errors[errors.length - 1].message}`);
    }

    try {
      await captureRoleWorkflows(page, records);
    } catch (err) {
      errors.push({ module: 'Role workflows', message: String(err && err.message ? err.message : err) });
      console.log(`ERROR Role workflows: ${errors[errors.length - 1].message}`);
    }
  } finally {
    await browser.close();
  }

  await fs.writeFile(CATALOG_FILE, JSON.stringify({ generatedAt: new Date().toISOString(), user: USERNAME, records, errors }, null, 2));
  console.log(JSON.stringify({ screenshots: records.length, errors: errors.length, catalog: CATALOG_FILE }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
