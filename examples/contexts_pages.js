const  { chromium } = require('playwright');

(async () => {
  // Launch a browser
  const browser = await chromium.launch({headless: false}); 

    // Create a new google browser context
    const googleContext = await browser.newContext();

    // Create a new page in the context
    const googlePage = await googleContext.newPage();

    // Navigate to Google
    await googlePage.goto('https://www.google.com');

    //wait to see the page
    await googlePage.waitForTimeout(8000);
    console.log('Google page opened');

    //close browser
    await browser.close();
})();