// tests/helper/CustomWorld.ts
import { World } from '@cucumber/cucumber';
import { Page, APIRequestContext } from '@playwright/test';
import { AuthAPI } from '../api_objects/AuthAPI';
import { WebActions } from '../core/WebActions';
import { WebAssertions } from '../core/WebAssertions';

export class CustomWorld extends World {
    page?: Page;
    apiContext?: APIRequestContext;


    // Data storage
    token!: string;
    userEmail!: string;
    response!: any;

    private _authApi?: AuthAPI;
    private _webActions?: WebActions;
    private _webAssertions?: WebAssertions;

    get authApi(): AuthAPI {
        if (!this.apiContext) {
            throw new Error('API context is not initialized. Run step: "API environment is set up" first.');
        }
        if (!this._authApi) {
            this._authApi = new AuthAPI(this.apiContext);
        }
        return this._authApi;
    }

    get webActions(): WebActions {
        if (!this.page) {
            throw new Error('Web page is not initialized. Run step: "Web platform is launched" first.');
        }
        if (!this._webActions) {
            this._webActions = new WebActions(this.page);
        }
        return this._webActions;
    }

    get webAssertions(): WebAssertions {
        if (!this.page) {
            throw new Error('Web page is not initialized. Run step: "Web platform is launched" first.');
        }
        if (!this._webAssertions) {
            this._webAssertions = new WebAssertions(this.page);
        }
        return this._webAssertions;
    }
}
