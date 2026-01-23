import {expect, test, Page} from '@playwright/test';

class GooglePage {
    private page: Page;
    private searchBox = '#APjFqb';
    private searchButton = 'input[name="btnK"]';

    constructor(page: Page) {
        this.page = page;
    }

    async search(text: string) {
        await this.page.fill(this.searchBox, text);
        await this.page.click(this.searchButton);
    }

    async verifyResultsContain(text: string) {
        const results = await this.page.locator('body');
        await expect(results).toContainText(text);
    }
}

test('Google Search Tests', async ({ page }) => {
    const googlePage = new GooglePage(page);
    await page.goto('https://www.google.com');
    await googlePage.search('Playwright');
    await googlePage.verifyResultsContain('Playwright');
});