import { Page } from '@playwright/test';
import { GlobalConstants } from '../constants/GlobalConstants';

export class WebActions {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    async getElement(selector: string) {
        const locator = this.page.locator(selector);
        await locator.waitFor({ state: 'visible', timeout: GlobalConstants.MEDIUM_TIMEOUT });
        await locator.scrollIntoViewIfNeeded();
        return locator;
    }

    async clickElement(selector: string) {
        await (await this.getElement(selector)).click();
    }

    async typeText(selector: string, text: string) {
        await (await this.getElement(selector)).fill(text);
    }

    async getText(selector: string) {
        return await (await this.getElement(selector)).textContent();
    }
}
