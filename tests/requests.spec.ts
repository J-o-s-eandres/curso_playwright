import {test, expect} from '@playwright/test';

test('API Request Test', async ({page}) => {
    await page.route("**/regres.in/api/users", async (route) => {
        const mockResponse = {
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                data: [
                    {id: 1, first_name: "John Doe", last_name: "Doe", email:"john.doe@example.com"},
                    {id: 2, first_name: "Jane Smith", last_name: "Smith", email:"jane.smith@example.com"}
                ]
            })
        };
        await route.fulfill(mockResponse);
    });

    await page.goto('https://example.com/'); // Replace with a valid URL that makes the API request

    const response = await page.evaluate(async () => {
        const res = await fetch('http://regres.in/api/users');
        return res.json();
    });

    expect(response.data).toHaveLength(2);
    expect(response.data[0].first_name).toBe("John Doe");
    expect(response.data[1].first_name).toBe("Jane Smith");
});