const { time } = require('node:console');
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

    //close google context
    await googleContext.close();

    // Context 2 (wikipedia)
    const wikipediaContext = await browser.newContext();

    // Create a new page in the context
    const wikipediaPage = await wikipediaContext.newPage();

    // Navigate to Wikipedia
    await wikipediaPage.goto('https://www.wikipedia.org');

    //wait to see the page
    await wikipediaPage.waitForTimeout(8000);

    //close wikipedia context
    await wikipediaContext.close();
    console.log('Wikipedia page opened');
    console.log('Browsers closed');

    //close browser
    await browser.close();
})();