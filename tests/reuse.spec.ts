import {test,expect,chromium, BrowserContext} from '@playwright/test';

let context: BrowserContext;


test.beforeAll(async () => {
  const browser = await chromium.launch();
  context = await browser.newContext();
});


test('should reuse browser context across tests', async () => {
  const page = await context.newPage();
  await page.goto('https://google.com');
  const title = await page.title(); 

    if (title !== 'Google') {
    throw new Error(`Expected title to be 'Google' but got '${title}'`);
  }
})

test.afterAll(async () => {
  await context.close();
});
