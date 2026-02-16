// tests/helper/hook.ts
import { Before, After, AfterAll, setWorldConstructor } from '@cucumber/cucumber';
import { DriverFactory } from './DriverFactory';
import { CustomWorld } from './customWorld';

setWorldConstructor(CustomWorld);

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string): Promise<T | undefined> {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
        return await Promise.race([
            promise,
            new Promise<undefined>((resolve) => {
                timer = setTimeout(() => {
                    console.warn(`Cleanup timeout while ${label} (${timeoutMs}ms). Continuing teardown.`);
                    resolve(undefined);
                }, timeoutMs);
            })
        ]);
    } finally {
        if (timer) {
            clearTimeout(timer);
        }
    }
}

Before(async function () {
    // Contexts are intentionally launched by explicit steps.
});

After({ timeout: 20000 }, async function () {
    // Close the Page and Browser gracefully
    if (this.page) {
        if (!this.page.isClosed()) {
            await withTimeout(this.page.close(), 3000, 'closing page');
        }
        await withTimeout(DriverFactory.closeBrowser(), 4000, 'closing browser');
        this.page = undefined;
    }

    // 2. Dispose of API Contexts
    if (this.apiContext) {
        await withTimeout(this.apiContext.dispose(), 3000, 'disposing api context');
        this.apiContext = undefined;
    }
});

AfterAll({ timeout: 20000 }, async function () {
    // This runs once per worker when all tests are completely finished
    await withTimeout(DriverFactory.closeBrowser(), 4000, 'closing browser in AfterAll');
});
