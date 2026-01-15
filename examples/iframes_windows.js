const {chromium} = require('playwright');

(async () => {
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe');

    const iframe = page.frame({name: 'main'});
    console.log('Searching for iframe...');

    if(iframe){
        await iframe.click('#w3-logo');
        console.log('Iframe found');
    }
})();