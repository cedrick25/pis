const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const LIST_URL = BASE_URL + 'parole-pardon-courtesy-supervision-list';
const SCREENSHOT_DIR = path.resolve(__dirname, '..', 'PIS_End_User_Manual_Screenshots_Current');
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

async function openList(page, context) {
  await context.addCookies([{ name: 'field_office_id', value: 'ALL', url: BASE_URL }]);
  await page.evaluate(() => {
    document.cookie = 'field_office_id=ALL; path=/';
  });
  await page.goto(LIST_URL, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await waitReady(page);
  await page.waitForFunction(() => {
    const n = document.querySelectorAll('.btn_view, .btn_update').length;
    const text = (document.querySelector('table tbody') || {}).innerText || '';
    return n > 0 && !/no dockets|loading/i.test(text);
  }, null, { timeout: 25000 }).catch(() => {});
  await sleep(1400);
  await tidy(page);
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
  await openList(page, context);

  const preview = (await page.locator('table tbody').innerText().catch(() => '')).slice(0, 140).replace(/\s+/g, ' ');
  console.log('buttons', await page.locator('.btn_view').count(), preview);

  async function captureAction(selector, filename) {
    const loc = page.locator(selector).first();
    if (!(await loc.count())) {
      console.log('NO', filename);
      return;
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
      await openList(page, context);
    }
  }

  await captureAction('.btn_view', '031-parole-and-pardon-courtesy-supervision-view-view.png');
  await captureAction('.btn_update', '032-parole-and-pardon-courtesy-supervision-update-update.png');
  await captureAction('.btn_attachments, .btn_upload', '033-parole-and-pardon-courtesy-supervision-attachments-attachments.png');
  await captureAction('.btn_remove, .btn_delete', '034-parole-and-pardon-courtesy-supervision-remove-confirmation-remove-confirmation.png');

  await browser.close();
})();
