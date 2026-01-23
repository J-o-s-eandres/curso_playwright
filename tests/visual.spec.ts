import {expect, test} from '@playwright/test';

test('Visual Regression - Google Homepage Full Page', async ({page}) => {
    await page.goto('https://google.com');
    await page.waitForLoadState('networkidle');
    
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot('google-homepage-full.png');
});

test('Visual Regression - Google Search Results', async ({page}) => {
    await page.goto('https://google.com');
    await page.fill('input[name="q"]', 'playwright');
    await page.click('input[name="btnK"]');
    await page.waitForLoadState('networkidle');
    
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot('google-search-results.png');
});

test('Visual Regression - Element Specific Screenshot', async ({page}) => {
    await page.goto('https://google.com');
    const searchBox = await page.locator('input[name="q"]');
    
    expect(await searchBox.screenshot()).toMatchSnapshot('google-searchbox.png');
});

test('Visual Regression - GitHub Homepage', async ({page}) => {
    await page.goto('https://github.com');
    await page.waitForLoadState('networkidle');
    
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot('github-homepage.png', {maxDiffPixels: 100});
});

test('Visual Regression - Multiple Elements Comparison', async ({page}) => {
    await page.goto('https://example.com');
    
    const header = await page.locator('header').screenshot();
    const footer = await page.locator('footer').screenshot();
    
    expect(header).toMatchSnapshot('example-header.png');
    expect(footer).toMatchSnapshot('example-footer.png');
});

test('Visual Regression - Responsive Design Desktop', async ({page}) => {
    await page.setViewportSize({width: 1920, height: 1080});
    await page.goto('https://google.com');
    
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot('google-desktop-1920.png');
});

test('Visual Regression - Responsive Design Mobile', async ({page}) => {
    await page.setViewportSize({width: 375, height: 812});
    await page.goto('https://google.com');
    
    expect(await page.screenshot({fullPage: true})).toMatchSnapshot('google-mobile-375.png');
});