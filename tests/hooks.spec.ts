import {test, expect, Page} from '@playwright/test';
import { link } from 'node:fs';

let page:Page;



test.describe('Hooks Example', () => {

    // This hook runs before all tests in this describe block
    test.beforeAll(async ({browser}) => {
        console.log('Setting up before all tests');
        const context = await browser.newContext();
        page = await context.newPage();
    });

    // This hook runs after all tests in this describe block
    test.beforeEach(async () => {
        console.log('Setting up before each test');
        await page.goto('https://example.com');
    });

    //Test case 1
    test('Test Case 1: Check page title', async () => {
        await expect(page).toHaveTitle('Example Domain');
    });

    //Test case 2
    test('Test Case 2: Valid LINK', async () => {
        const link = await page.locator('a').textContent();
        await expect(link).toBe('Learn more');
    });

    //Test case 3
    test('Test Case 3: Valid URL', async () => {
        const url = await page.getAttribute('a', 'href');
        await expect(url).toBe('https://iana.org/domains/example');
    });

    // This hook runs after each test in this describe block
    test.afterEach(async () => {
        console.log('Cleaning up after each test');
    })

    // This hook runs after all tests in this describe block
    test.afterAll(async () => {
        console.log('Cleaning up after all tests');
        await page.close();
    });

});