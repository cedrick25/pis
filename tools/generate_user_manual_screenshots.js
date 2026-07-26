const fs = require('fs/promises');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const USERNAME = 'jssantos';
const PASSWORD = 'Dojppa2022';
const ROOT = process.cwd();
const SCREENSHOT_DIR = path.join(ROOT, 'screenshots');
const MANUAL_FILE = path.join(ROOT, 'user_manual_screenshots.md');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function slugify(value) {
  return String(value || 'page')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'page';
}

function absolutize(href) {
  if (!href || href === '#!' || href === '#') return null;
  try {
    const url = new URL(href, BASE_URL);
    if (url.origin !== new URL(BASE_URL).origin) return null;
    if (!url.pathname.toLowerCase().startsWith('/pis')) return null;
    url.hash = '';
    return url.toString();
  } catch {
    return null;
  }
}

function titleFromUrl(url) {
  const u = new URL(url);
  const last = u.pathname.split('/').filter(Boolean).pop() || 'login';
  return last
    .replace(/[-_]+/g, ' ')
    .replace(/\bpdl\b/gi, 'PDL')
    .replace(/\bpis\b/gi, 'PIS')
    .replace(/\bsc\b/gi, 'SC')
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function describePurpose(title, url, text) {
  const key = `${title} ${url} ${text}`.toLowerCase();
  if (key.includes('dashboard')) return 'Provides a landing view for system activity and logged-in user navigation.';
  if (key.includes('investigation')) return 'Manages investigation records, case lists, and related investigation workflows.';
  if (key.includes('supervision')) return 'Manages supervision records, case lists, and related supervision workflows.';
  if (key.includes('docket')) return 'Supports docket routing, forwarding, return, and case movement tracking.';
  if (key.includes('sent')) return 'Shows cases or documents sent to another office or workflow queue.';
  if (key.includes('received') || key.includes('inbox')) return 'Shows incoming cases or documents awaiting action.';
  if (key.includes('fact sheet') || key.includes('client')) return 'Maintains client fact sheet information and supporting attachments.';
  if (key.includes('form')) return 'Lists and uploads reusable system forms.';
  if (key.includes('user accounts')) return 'Administers user account records and account actions.';
  if (key.includes('user roles')) return 'Administers role definitions and assigned permissions.';
  if (key.includes('field office')) return 'Maintains field office reference records.';
  if (key.includes('region')) return 'Maintains region/location reference records.';
  if (key.includes('permission')) return 'Maintains permission records used for access control.';
  if (key.includes('upload')) return 'Uploads and manages supporting files for the selected record.';
  if (key.includes('create') || key.includes('new')) return 'Provides a data-entry form for creating a new record.';
  if (key.includes('update') || key.includes('edit')) return 'Provides a form for reviewing and updating an existing record.';
  if (key.includes('view')) return 'Displays read-only or detail information for a selected record.';
  if (key.includes('login')) return 'Authenticates a user and starts an application session.';
  return 'Provides access to the named module and its page-specific actions.';
}

function uniqueByUrl(items) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    if (!item.url || seen.has(item.url)) continue;
    seen.add(item.url);
    out.push(item);
  }
  return out;
}

async function waitForReady(page) {
  await page.waitForLoadState('domcontentloaded', { timeout: 15000 }).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
  await page.waitForFunction(() => document.fonts ? document.fonts.ready.then(() => true) : true, null, { timeout: 8000 }).catch(() => {});
  await sleep(900);
}

async function dismissObstructions(page) {
  for (const selector of ['.modal.show .close', '.modal.show [data-dismiss="modal"]', '.swal2-confirm']) {
    const loc = page.locator(selector);
    const count = await loc.count().catch(() => 0);
    if (count > 0) {
      await loc.first().click({ timeout: 1200 }).catch(() => {});
      await sleep(250);
    }
  }
}

async function capture(page, records, name, suffix, purposeOverride) {
  await waitForReady(page);
  await dismissObstructions(page);
  const title = name || await getPageName(page);
  const filename = `${String(records.length + 1).padStart(3, '0')}-${slugify(title)}${suffix ? '-' + slugify(suffix) : ''}.png`;
  const fullPath = path.join(SCREENSHOT_DIR, filename);
  await page.screenshot({ path: fullPath, fullPage: true });
  const controls = await collectControls(page);
  const text = await page.locator('body').innerText({ timeout: 5000 }).catch(() => '');
  records.push({
    pageName: suffix ? `${title} - ${suffix}` : title,
    purpose: purposeOverride || describePurpose(title, page.url(), text),
    filename,
    url: page.url(),
    controls,
    error: null,
  });
  console.log(`CAPTURED ${filename}`);
  return filename;
}

async function getPageName(page) {
  const candidates = await page.evaluate(() => {
    const text = (el) => (el && el.textContent || '').replace(/\s+/g, ' ').trim();
    const out = [];
    ['.page-title h1', '.page-title h2', '.content .card-header strong', '.breadcrumbs h1', 'h1', 'h2', 'h3'].forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        const value = text(el);
        if (value && value.length < 120) out.push(value);
      });
    });
    return out;
  }).catch(() => []);
  return candidates[0] || titleFromUrl(page.url());
}

async function collectControls(page) {
  const result = await page.evaluate(() => {
    const visible = (el) => {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
    };
    const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
    const controls = {
      buttons: [],
      links: [],
      inputs: [],
      selects: [],
      tables: [],
      tabs: [],
      modals: [],
      filters: [],
      pagination: [],
    };

    document.querySelectorAll('button, .btn, input[type=button], input[type=submit]').forEach((el) => {
      if (!visible(el)) return;
      const value = clean(el.innerText || el.value || el.getAttribute('title') || el.getAttribute('aria-label'));
      if (value) controls.buttons.push(value);
    });
    document.querySelectorAll('a[href]').forEach((el) => {
      if (!visible(el)) return;
      const value = clean(el.innerText || el.getAttribute('title') || el.getAttribute('aria-label'));
      const href = el.getAttribute('href');
      if (value && href && href !== '#') controls.links.push(value);
    });
    document.querySelectorAll('input, textarea').forEach((el) => {
      if (!visible(el) || ['hidden', 'button', 'submit'].includes((el.type || '').toLowerCase())) return;
      controls.inputs.push(clean(el.getAttribute('placeholder') || el.name || el.id || el.type));
    });
    document.querySelectorAll('select').forEach((el) => {
      if (!visible(el)) return;
      controls.selects.push(clean(el.getAttribute('aria-label') || el.name || el.id || 'Select field'));
    });
    document.querySelectorAll('table').forEach((table) => {
      if (!visible(table)) return;
      const headers = Array.from(table.querySelectorAll('thead th')).map((th) => clean(th.innerText)).filter(Boolean).slice(0, 8);
      controls.tables.push(headers.length ? headers.join(', ') : 'Data table');
    });
    document.querySelectorAll('.nav-tabs .nav-link, [role=tab]').forEach((el) => {
      if (visible(el)) controls.tabs.push(clean(el.innerText || el.getAttribute('aria-label')));
    });
    document.querySelectorAll('.modal').forEach((el) => {
      const label = clean(el.querySelector('.modal-title')?.innerText || el.id || 'Modal dialog');
      if (label) controls.modals.push(label);
    });
    document.querySelectorAll('.dataTables_filter input, input[type=search]').forEach((el) => {
      if (visible(el)) controls.filters.push(clean(el.getAttribute('placeholder') || 'Search/filter field'));
    });
    document.querySelectorAll('.pagination, .dataTables_paginate').forEach((el) => {
      if (visible(el)) controls.pagination.push(clean(el.innerText).slice(0, 100) || 'Pagination controls');
    });

    for (const key of Object.keys(controls)) {
      controls[key] = [...new Set(controls[key].filter(Boolean))].slice(0, 12);
    }
    return controls;
  }).catch(() => ({}));

  const lines = [];
  const labels = {
    buttons: 'Buttons/actions',
    links: 'Links/navigation',
    inputs: 'Input fields',
    selects: 'Dropdowns',
    tables: 'Tables',
    tabs: 'Tabs',
    modals: 'Modals available',
    filters: 'Filters/search',
    pagination: 'Pagination',
  };
  for (const [key, label] of Object.entries(labels)) {
    if (result[key]?.length) lines.push(`${label}: ${result[key].join('; ')}`);
  }
  return lines.length ? lines.join('\n') : 'No prominent interactive controls detected on the captured view.';
}

async function collectVisibleNav(page) {
  await waitForReady(page);
  return uniqueByUrl(await page.evaluate(() => {
    const visible = (el) => {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
    };
    const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
    return Array.from(document.querySelectorAll('#left-panel a[href], #main-menu a[href], .breadcrumbs a[href], a.btn[href]'))
      .filter(visible)
      .map((a) => ({ name: clean(a.innerText || a.getAttribute('title')), href: a.getAttribute('href') }))
      .filter((a) => a.name && a.href && !a.href.startsWith('javascript:'));
  }).then((links) => links.map((link) => ({ name: link.name, url: absolutize(link.href) })).filter((link) => link.url)));
}

async function openDropdownMenus(page) {
  await page.evaluate(() => {
    const isPermissionVisible = (el) => getComputedStyle(el).display !== 'none' && getComputedStyle(el).visibility !== 'hidden';
    document.querySelectorAll('#left-panel li.menu-item-has-children.dropdown').forEach((li) => {
      const toggle = li.querySelector('.dropdown-toggle');
      const menu = li.querySelector('.dropdown-menu');
      if (!toggle || !menu || !isPermissionVisible(li)) return;
      li.classList.add('show');
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.add('show');
      menu.style.display = 'block';
    });
  }).catch(() => {});
  await sleep(300);
}

async function login(page) {
  await page.goto(BASE_URL, { waitUntil: 'load', timeout: 20000 });
  await waitForReady(page);
  await page.locator('input.email').fill(USERNAME, { timeout: 10000 });
  await page.locator('input.password').fill(PASSWORD, { timeout: 10000 });
  await page.locator('.btn-confirm').click({ timeout: 10000 });
  await page.waitForURL(/\/pis\/(investigation_docketing|dashboard)(?:$|\?)/, { timeout: 25000 }).catch(() => {});
  await page.waitForFunction(() => {
    return /\/pis\/(investigation_docketing|dashboard)(?:$|\?)/.test(window.location.href) ||
      !!document.querySelector('#left-panel');
  }, null, { timeout: 10000 }).catch(() => {});
  await waitForReady(page);
  const body = await page.locator('body').innerText({ timeout: 5000 }).catch(() => '');
  if (!/\/pis\/(investigation_docketing|dashboard)(?:$|\?)/.test(page.url()) && !await page.locator('#left-panel').count().catch(() => 0)) {
    throw new Error(`Login did not navigate to the application. Current URL: ${page.url()}. Page text: ${body.slice(0, 300)}`);
  }
  if (/No record found|failed attempt|account is locked|ERROR/i.test(body)) {
    throw new Error(`Login did not succeed. Page message: ${body.slice(0, 300)}`);
  }
}

async function captureFeatures(page, records, baseName) {
  const tabs = await page.locator('.nav-tabs .nav-link:visible, [role=tab]:visible').count().catch(() => 0);
  for (let i = 0; i < Math.min(tabs, 6); i++) {
    const tab = page.locator('.nav-tabs .nav-link:visible, [role=tab]:visible').nth(i);
    const label = (await tab.innerText({ timeout: 1200 }).catch(() => `tab-${i + 1}`)).trim();
    if (!label) continue;
    await tab.click({ timeout: 1800 }).catch(() => null);
    await sleep(800);
    await capture(page, records, baseName, `tab ${label}`, `Shows the ${label} tab state and its available controls.`);
  }

  const search = page.locator('.dataTables_filter input:visible, input[type=search]:visible');
  if ((await search.count().catch(() => 0)) > 0) {
    const box = search.first();
    await box.fill('test', { timeout: 1500 }).catch(() => {});
    await sleep(800);
    await capture(page, records, baseName, 'filtered data', 'Shows the page with its search or filter control applied.');
    await box.fill('', { timeout: 1500 }).catch(() => {});
    await sleep(500);
  }

  const next = page.locator('.dataTables_paginate a:visible, .pagination a:visible').filter({ hasText: 'Next' });
  if ((await next.count().catch(() => 0)) > 0) {
    const enabled = await next.first().evaluate((el) => !el.classList.contains('disabled') && !el.parentElement?.classList.contains('disabled')).catch(() => false);
    if (enabled) {
      await next.first().click({ timeout: 1500 }).catch(() => {});
      await sleep(900);
      await capture(page, records, baseName, 'pagination next page', 'Shows paginated data after moving to the next page.');
    }
  }

  const modalTriggers = page.locator('[data-toggle="modal"]:visible, [data-bs-toggle="modal"]:visible');
  const modalCount = await modalTriggers.count().catch(() => 0);
  for (let i = 0; i < Math.min(modalCount, 2); i++) {
    const trigger = modalTriggers.nth(i);
    const label = (await trigger.innerText({ timeout: 1200 }).catch(() => `modal-${i + 1}`)).trim() || `modal-${i + 1}`;
    await trigger.click({ timeout: 1800 }).catch(() => null);
    await sleep(800);
    if ((await page.locator('.modal.show:visible').count().catch(() => 0)) > 0) {
      await capture(page, records, baseName, `modal ${label}`, `Shows the ${label} modal/dialog state.`);
      await page.locator('.modal.show [data-dismiss="modal"], .modal.show .close').first().click({ timeout: 1500 }).catch(() => {});
      await sleep(500);
    }
  }
}

async function writeManual(records, errors) {
  const lines = [
    '# PPIS User Manual Screenshots',
    '',
    `Generated: ${new Date().toISOString()}`,
    `Application URL: ${BASE_URL}`,
    '',
    '## Summary',
    '',
    `- Screenshots generated: ${records.length}`,
    `- Pages or states with recorded errors: ${errors.length}`,
    `- Screenshot folder: screenshots`,
    '',
    '## Screenshot Catalog',
    '',
  ];

  records.forEach((record, idx) => {
    lines.push(`### ${idx + 1}. ${record.pageName}`);
    lines.push('');
    lines.push(`- Purpose: ${record.purpose}`);
    lines.push(`- Screenshot Filename: screenshots/${record.filename}`);
    lines.push(`- URL: ${record.url}`);
    lines.push('- Description of visible controls and functions:');
    record.controls.split('\n').forEach((line) => lines.push(`  - ${line}`));
    if (record.error) lines.push(`- Error: ${record.error}`);
    lines.push('');
    lines.push(`![${record.pageName}](screenshots/${record.filename})`);
    lines.push('');
  });

  if (errors.length) {
    lines.push('## Errors Recorded');
    lines.push('');
    errors.forEach((err) => {
      lines.push(`- ${err.name || err.url}: ${err.message}`);
    });
    lines.push('');
  }

  lines.push('## Generated Screenshot Files');
  lines.push('');
  records.forEach((record) => lines.push(`- screenshots/${record.filename}`));
  await fs.writeFile(MANUAL_FILE, `${lines.join('\n')}\n`, 'utf8');
}

async function main() {
  await fs.mkdir(SCREENSHOT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();
  page.setDefaultTimeout(10000);

  const records = [];
  const errors = [];
  const queue = [];
  const queued = new Set();

  page.on('pageerror', (err) => errors.push({ name: 'Browser page error', message: err.message }));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push({ name: 'Console error', message: msg.text().slice(0, 500) });
  });

  try {
    await page.goto(BASE_URL, { waitUntil: 'load', timeout: 20000 });
    await capture(page, records, 'Login', null, 'Authenticates a user with username and password before entering PPIS.');
    await login(page);
    await capture(page, records, await getPageName(page), 'logged in');
    await openDropdownMenus(page);
    await capture(page, records, 'Main Navigation', 'expanded menus', 'Shows the accessible sidebar modules and submenu links for the logged-in user.');
    for (const link of await collectVisibleNav(page)) {
      if (!queued.has(link.url)) {
        queued.add(link.url);
        queue.push(link);
      }
    }

    for (let index = 0; index < queue.length; index++) {
      const link = queue[index];
      try {
        await page.goto(link.url, { waitUntil: 'load', timeout: 20000 });
        await waitForReady(page);
        const pageName = await getPageName(page);
        await capture(page, records, pageName || link.name, null);
        await captureFeatures(page, records, pageName || link.name);
        await openDropdownMenus(page);
        const newLinks = await collectVisibleNav(page);
        for (const found of newLinks) {
          if (!queued.has(found.url) && queue.length < 130) {
            queued.add(found.url);
            queue.push(found);
          }
        }
      } catch (err) {
        const message = err && err.message ? err.message : String(err);
        errors.push({ name: link.name, url: link.url, message });
        records.push({
          pageName: `${link.name} - Error`,
          purpose: 'Error encountered while attempting to document this page.',
          filename: '',
          url: link.url,
          controls: 'No screenshot captured because the page failed before capture.',
          error: message,
        });
        console.log(`ERROR ${link.url}: ${message}`);
      }
    }
  } finally {
    await browser.close();
  }

  const screenshotRecords = records.filter((r) => r.filename);
  await writeManual(screenshotRecords, errors);
  console.log(JSON.stringify({
    screenshots: screenshotRecords.length,
    manual: MANUAL_FILE,
    screenshotDir: SCREENSHOT_DIR,
    errors: errors.length,
    urlsVisited: queued.size,
  }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
