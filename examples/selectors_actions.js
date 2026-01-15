const {chromium} = require('playwright');

(async () => {
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://google.com');

    // Perform a search for "Playwright GitHub"
    await page.fill('#APjFqb', 'Playwright Documentation');
    await page.press('#APjFqb', 'Enter');

    // Wait for search results to load
    await page.waitForSelector('h3');

    // Click on the Playwright Instaallation link
    await page.click('text=installation');

    await page.waitForTimeout(4000); // wait to see the result

    await page.click('text=Community'); // Click on "On this page" link
    await page.waitForTimeout(2000);
    await browser.close();
})();