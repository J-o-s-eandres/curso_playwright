import  {chromium,Browser, Page} from 'playwright';

export interface Task {
    performAs(page?: Page): Promise<void>;
}

class Actor {
    name: string;
    private page?: Page;

    constructor(name: string) {
        this.name = name;
    }

    async attemptsTo(...tasks: Task[]){
        for (const task of tasks) {
            await task.performAs(this.page);
        }
    }

    setPage(page: Page) {
        this.page = page;
    }
}

class OpenBrowser implements Task {
    private url: string;
    private browser?: Browser;
    private page?: Page;

    constructor(url: string) {
        this.url = url;
    }

    static at(url: string): OpenBrowser {
        return new OpenBrowser(url);
    }

    async performAs(): Promise<void> {
        this.browser = await chromium.launch({headless: false});
        const context = await this.browser.newContext();
        this.page= await context.newPage();
        await this.page.goto(this.url);
    }
    async close(): Promise<void> {
        if (this.browser) {
            await this.browser.close();
        }
    }

    getPage(): Page | undefined {
        return this.page;
    }

}

class SearchGoogle implements Task {
    private query: string;

    constructor(query: string) {
        this.query = query;
    }

    static for(query: string): SearchGoogle {
        return new SearchGoogle(query);
    }

    async performAs(page?: Page): Promise<void> {
        if (!page) throw new Error("Page is not defined for the actor.");
        await page.fill('input[name="q"]', this.query);
        await page.press('input[name="q"]', 'Enter');
    }
}


class VerifySearchResults {
    static areDisplayed(): VerifySearchResults {
        return new VerifySearchResults();
    }

    async performAs(page?: Page): Promise<boolean> {
        if (!page) throw new Error("Page is not defined for the actor.");
        const results = await page.locator('h3');
        return await results.count() > 0;
    }
}

(async () => {
    const actor = new Actor('Tester');

    const openGoogle = OpenBrowser.at('https://www.google.com');
    await openGoogle.performAs();

    actor.setPage(openGoogle.getPage()!);

    const searchTask = SearchGoogle.for('Playwright');
    await actor.attemptsTo(searchTask);

    const verifyTask = VerifySearchResults.areDisplayed();
    const hasResults = await verifyTask.performAs(openGoogle.getPage());
    
    console.log(`Search results displayed: ${hasResults}`);

    await openGoogle.close();
})