import { defineStep as step } from "@cucumber/cucumber";
import { expect } from "@playwright/test";


step("the response code should be {int}", async function(expectedStatus: number) {
    const actualStatusCode = this.response.status();
    console.log(`Actual Status Code: ${actualStatusCode}` + `, response: ${this.response}` );

    expect(actualStatusCode, `Expected status ${expectedStatus} but got ${actualStatusCode}`).toBe(expectedStatus);
})