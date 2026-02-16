import { defineStep as step } from "@cucumber/cucumber";
import { PayLoadBuilder } from "../../helper/PayloadBuilder";
import { RandomUtils } from "../../helper/randomUtils";

step("user generates access token with {string} body", async function (payloadKeyName: string) {
    const payload = PayLoadBuilder.build(payloadKeyName);
    const registerResponse = await this.authApi.addUser(payload);
    this.response = registerResponse;
    this.userEmail = payload.email;

    const registerBody = await RandomUtils.parseJsonBody(registerResponse);
    this.token = registerBody.token;

    // Some environments may not return token on register; fallback to login.
    if (!this.token) {
        const loginResponse = await this.authApi.login({
            email: payload.email,
            password: payload.password,
        });
        const loginBody = await RandomUtils.parseJsonBody(loginResponse);
        this.token = loginBody.token;
    }

    if (!this.token) {
        throw new Error(`Token not found in register/login response for ${payload.email}`);
    }
});

step("registered user generates access token with {string} body", async function (payloadKeyName: string) {
    const payload = PayLoadBuilder.build(payloadKeyName);
    const response = await this.authApi.login(payload);
    this.response = response;

    const body = await RandomUtils.parseJsonBody(response);
    this.token = body.token; // Saving token to "this" context

    if (!this.token) {
        throw new Error(`Token not found in login response for ${payload.email}`);
    }
});
