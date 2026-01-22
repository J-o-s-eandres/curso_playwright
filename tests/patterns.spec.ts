import {Page} from '@playwright/test';

export class LoginPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async navigateToLogin() {
        await this.page.goto('https://www.facebook.com/');
    }

    async enterCredentials(username: string, password: string) {
        await this.page.fill('input[name="email"]', username);
        await this.page.fill('input[name="pass"]', password);
        await this.page.click('button[name="login"]');
    }

    async isErrorMessageVisible(): Promise<boolean> {
        const errorMessage = this.page.locator('#error_box');    
        return await errorMessage.isVisible();
    }
}