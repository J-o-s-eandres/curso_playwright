import {expect, test} from '@playwright/test';

// Grouping tests with describe block
test.describe('Labels Example with describe', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://example.com');
    });
});

// Example of using test.only to run a specific test
test('Label Example', async ({ page }) => {
    await page.goto('https://example.com');
    const title  = await page.title();
    expect(title).toBe('Example Domain');
});

// Example of using test.skip to skip a specific test
test.skip('this test never runs', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle('Example Domain');
});

// Example of using test.fixme to mark a test as needing attention
test.fixme('this test never runs', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle('Example Domain');
});