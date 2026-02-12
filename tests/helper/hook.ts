// tests/helper/hook.ts
import { Before, After } from '@cucumber/cucumber';

Before(async function () {

});

After(async function () {
    // 1. Close the Page and Browser gracefully
    if (this.page) {
        const browser = this.page.context().browser();
        await this.page.close();
        if (browser) {
            await browser.close(); // This is the "Kill Switch"
        }
    }

    // 2. Dispose of API Contexts
    if (this.apiContext) {
        await this.apiContext.dispose();
    }
});