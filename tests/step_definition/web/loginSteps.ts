import { defineStep as step } from '@cucumber/cucumber';
import { ConfigLoader } from '../../helper/ConfigLoader';
import { LoginPageLocators } from '../../locators/LoginPageLocators';
import { DashboardLocators } from '../../locators/DashboardLocators';


step("user navigates to the login page", { timeout: 60000 }, async function () {
    await this.webActions.navigateTo(ConfigLoader.getWeb_BaseUrl());
});

step("user enters valid username as {string}", async function (email: string) {
    await this.webActions.typeText(LoginPageLocators.emailInputField, email);
});

step("user enters valid password as {string}", async function (password: string) {
    await this.webActions.typeText(LoginPageLocators.passwordInputField, password);
});

step("user clicks submit button", async function () {
    await this.webActions.clickElement(LoginPageLocators.submitButton);
});

step("user should successfully log in and see the dashboard", async function () {
    await this.webAssertions.verifyElementText(DashboardLocators.logoutButton, "Logout");
})
