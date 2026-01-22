import {test, expect} from '@playwright/test';
import { LoginPage } from './patterns.spec';

test('Facebook Login',async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.enterCredentials('invalid_user@gmail.com', 'invalid_pass');
});