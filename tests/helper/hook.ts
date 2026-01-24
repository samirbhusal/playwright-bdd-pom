// tests/helper/hook.ts
import { Before, After } from '@cucumber/cucumber';
import { request } from '@playwright/test';

Before(async function () {
    // This creates an API context using the baseURL and headers from the config
    this.apiContext = await request.newContext({
        baseURL: 'https://thinking-tester-contact-list.herokuapp.com'
    });
});

After(async function () {
    await this.apiContext.dispose();
});