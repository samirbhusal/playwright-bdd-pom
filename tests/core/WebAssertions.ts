import { Page, expect } from '@playwright/test';
import { GlobalConstants } from '../constants/GlobalConstants';

export class WebAssertions {
    constructor(private page: Page) { }

    // --- URL and Page State Assertions ---
    async verifyUrlContains(expectedText: string) {
        await expect(this.page).toHaveURL(new RegExp(expectedText), {
            timeout: GlobalConstants.MEDIUM_TIMEOUT
        });
    }

    async verifyPageTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(expectedTitle, {
            timeout: GlobalConstants.MEDIUM_TIMEOUT
        });
    }

    // --- Element State Assertions ---
    async verifyElementIsVisible(selector: string) {
        const locator = this.page.locator(selector);
        await expect(locator).toBeVisible({
            timeout: GlobalConstants.MEDIUM_TIMEOUT
        });
    }

    async verifyElementIsHidden(selector: string) {
        const locator = this.page.locator(selector);
        await expect(locator).toBeHidden({
            timeout: GlobalConstants.MEDIUM_TIMEOUT
        });
    }

    // --- Text Assertions ---
    async verifyElementText(selector: string, expectedText: string) {
        const locator = this.page.locator(selector);
        // toHaveText checks exact match. Use toContainText for partial matches.
        await expect(locator).toHaveText(expectedText, {
            timeout: GlobalConstants.MEDIUM_TIMEOUT
        });
    }
}
