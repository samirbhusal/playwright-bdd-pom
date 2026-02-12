import { defineStep as step } from '@cucumber/cucumber';
import { DriverFactory } from '../helper/DriverFactory.js';
import { ConfigLoader } from '../helper/ConfigLoader.js';

step('API and Web platforms is launched from Web', async function () {
    this.apiContext = await DriverFactory.launchApi();
    this.page = await DriverFactory.launchWeb();
});

step('Web platform is launched', async function () {
    this.page = await DriverFactory.launchWeb();
});

step('API environment is set up', async function () {

    // If not already launched by a previous step, launch it now
    if (!this.apiContext) {
        this.apiContext = await DriverFactory.launchApi();
    }
});