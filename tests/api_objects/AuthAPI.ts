import { APIRequestContext } from "@playwright/test";

export class AuthAPI {

    private apiRequestContext: APIRequestContext;

    constructor(apiRequestContext: APIRequestContext) {
        this.apiRequestContext = apiRequestContext;
    }

    async login(payload: object) {
        return await this.apiRequestContext.post('/users/login', { data: payload })
    }

    async addUser(payload: object) {
        return await this.apiRequestContext.post('/users', { data: payload })
    }

    async getContacts(token: string) {
        return await this.apiRequestContext.get('/contacts', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
    }

}