import { chromium, firefox, webkit, Page, APIRequestContext, request } from '@playwright/test';
import { ConfigLoader } from './ConfigLoader.js';
import { BrowserManager } from './BrowserManager.js';

export class DriverFactory {

    static async launchFromConfig(): Promise<Page | APIRequestContext> {
        const platform = ConfigLoader.getPlatform().toLowerCase();
        if (platform === 'webportal') return await this.launchWeb();
        if (platform === 'api') return await this.launchApi();
        throw new Error(`Unsupported platform: ${platform}`);
    }

    static async launchWeb(): Promise<Page> {

        const selection = BrowserManager.getRandomPlatform();


        const options = BrowserManager.getBrowserOptions(selection.browser);

        // Select the correct Engine
        let engine;
        if (options.name === 'firefox') engine = firefox;
        else if (options.name === 'webkit') engine = webkit;
        else engine = chromium;

        // Launch with Headless and Channel support
        const browser = await engine.launch({
            headless: ConfigLoader.isHeadless(),
            channel: options.channel,
            args: ['--start-maximized'] // Only affects Chromium-based browsers
        }).catch(async (error) => {
            if (error.message.includes('not found')) {
                console.warn(`⚠️  Channel ${options.channel} not found. Falling back to default Chromium.`);
                // Re-launching without the specific channel
                return await engine.launch({
                    headless: ConfigLoader.isHeadless(),
                    args: ['--start-maximized']
                });
            }
            throw error;
        });

        // Create Context with "Null" viewport to allow true maximization
        const context = await browser.newContext({
            viewport: null,
            // Optional: You can add UserAgent spoofing here if needed
        });

        const page = await context.newPage();

        console.log(`Web Instance Started: ${selection.browser} on ${selection.os}`);
        return page;
    }

    static async launchApi(): Promise<APIRequestContext> {
        return await request.newContext({
            baseURL: ConfigLoader.getApi_BaseUrl(),
            extraHTTPHeaders: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
    }
}