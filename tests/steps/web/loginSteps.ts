import { defineStep as step } from '@cucumber/cucumber';
import { ConfigLoader } from '../../helper/ConfigLoader.js';


step("user navigates to the login page", { timeout: 60000 }, async function () {
    await this.page.goto(ConfigLoader.getWeb_BaseUrl());
});