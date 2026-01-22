import {test,  expect} from '@playwright/test';

// Suite to test Facebook login functionality
test.describe('Test Facebook Login', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://www.facebook.com/login/');
    });

    test('Valid Login Test', async ({page}) => {
        await page.fill('input[name="email"]', 'test@example.com');
        await page.fill('input[name="pass"]', 'password123');
        await page.click('button[name="login"]');
    });

    test('Invalid Login Test', async ({page}) => {
        await page.fill('input[name="email"]', 'invalid@example.com');
        await page.fill('input[name="pass"]', 'wrongpassword');
        await page.click('button[name="login"]');
        const error = await page.locator('#error_box').textContent();
        expect(error).toContain('The email or mobile number you entered isn\'t connected to an account.');
    });

});