const {chromium} = require('playwright');


(async () => {  
  const browser = await chromium.launch({headless: false}); 
    const context = await browser.newContext();                 
    const page = await context.newPage();   
    await page.goto('https://www.facebook.com'); 

    // Set default timeout for all waitFor*
    page.setDefaultTimeout(5000);

    await page.fill("#email", 'prueba@gmail.com');
    await page.fill("#pass", '123456789');

    // Using Promise.all to wait for navigation and click simultaneously
    await Promise.all([
      page.waitForURL('https://www.facebook.com/'), 
       page.click('[name="login"]')   
      //page.click('text=Iniciar sesión') // Alternative selector 
      //page.click('[data-testid="royal-login-button"]') // Another alternative selector
    ]);

    // Wait for a specific element to ensure the page has loaded
    await page.waitForSelector('#userNavigationLabel');
    await  browser.close();
})();