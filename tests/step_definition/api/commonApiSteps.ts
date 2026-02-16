import { defineStep as step } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ConfigLoader } from "../../helper/ConfigLoader";


step("the response code should be {int}", async function (expectedStatus: number) {
    const actualStatusCode = this.response.status();

    expect(actualStatusCode, `Expected status ${expectedStatus} but got ${actualStatusCode}`).toBe(expectedStatus);
})
