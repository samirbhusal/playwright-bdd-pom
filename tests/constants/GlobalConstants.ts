export class GlobalConstants {
    // --- Timeouts (in milliseconds) ---
    static readonly TINY_TIMEOUT = 1000;
    static readonly SMALL_TIMEOUT = 5000;
    static readonly MEDIUM_TIMEOUT = 10000;
    static readonly LARGE_TIMEOUT = 30000;

    // --- API Endpoints ---
    static readonly ENDPOINT_USERS = '/users';
    static readonly ENDPOINT_LOGIN = '/users/login';
    static readonly ENDPOINT_CONTACTS = '/contacts';

    // --- Common Error Messages ---
    static readonly ERROR_LOGIN_FAILED = 'Incorrect username or password';
    static readonly ERROR_NETWORK = 'Network connection lost';
}