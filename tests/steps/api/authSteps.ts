import { defineStep as step } from "@cucumber/cucumber";
import { PayLoadBuilder } from "../../helper/PayloadBuilder.js";
import { AuthAPI } from "../../api_objects/AuthAPI.js";

let api: AuthAPI

step("user generates access token with {string} body", async function (payloadKeyName: string) {
    api = new AuthAPI(this.apiContext);
    const payload = PayLoadBuilder.build(payloadKeyName);
    const response = await api.addUser(payload);

    const body = await response.json();
    this.token = body.token; // Saving token to "this" context
    this.response = response;

    this.userEmail = payload.email;
})

step("registered user generates access token with {string} body", async function (payloadKeyName: string) {
    api = new AuthAPI(this.apiContext);
    const payload = PayLoadBuilder.build(payloadKeyName);
    const response = await api.login(payload);

    const body = await response.json();
    this.token = body.token; // Saving token to "this" context
    this.response = response;
});