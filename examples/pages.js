const {chromium} = require('playwright');

(async () => {
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto('https://google.com');
    console.log('Google page opened');

    const pag2 = await context.newPage();
    await pag2.goto('https://facebook.com');
    console.log('Facebook page opened');

    console.log('Chance to Google page again');
    await page.bringToFront();

    await page.fill("#APjFqb", 'Linux');
    await page.keyboard.press('Enter');

    console.log('Chance to Facebook page again');
    await pag2.bringToFront();

    await pag2.fill("#email", 'prueba@gmail.com');
    await pag2.fill("#pass", '123456789');

})();