import { chromium, firefox, webkit, Page, APIRequestContext, request, Browser } from '@playwright/test';
import { ConfigLoader } from './ConfigLoader';
import { BrowserManager } from './BrowserManager';

export class DriverFactory {

    private static browser: Browser | null = null;
    private static currentBrowserKey: string | null = null;

    private static getBrowserKey(options: { name: string; channel?: string }): string {
        return `${options.name}:${options.channel ?? 'default'}`;
    }

    static async launchWeb(): Promise<Page> {

        const selection = BrowserManager.getRandomPlatformCandidates();
        const candidates = selection.browsers.map((browserName) => ({
            browserName,
            options: BrowserManager.getBrowserOptions(browserName),
        }));
        const firstChoice = candidates[0];
        const isHeadless = ConfigLoader.isHeadless();

        // Browser might have been closed by hooks; drop stale handle.
        if (this.browser && !this.browser.isConnected()) {
            this.browser = null;
            this.currentBrowserKey = null;
        }

        const preferredBrowserKey = this.getBrowserKey(firstChoice.options);

        // 1. SHUFFLE LOGIC: If random first choice changed, restart engine.
        if (this.browser && this.currentBrowserKey !== preferredBrowserKey) {
            await this.browser.close();
            this.browser = null;
            this.currentBrowserKey = null;
        }

        // 2. LAUNCH LOGIC: Only start engine if not already running.
        let activeBrowserName = firstChoice.browserName;
        if (!this.browser) {
            const launchErrors: string[] = [];

            for (const candidate of candidates) {
                try {
                    this.browser = await this.launchCandidate(candidate.options, isHeadless);
                    this.currentBrowserKey = this.getBrowserKey(candidate.options);
                    activeBrowserName = candidate.browserName;
                    break;
                } catch (error: any) {
                    const message = error?.message ?? String(error);
                    launchErrors.push(`${candidate.browserName}: ${message}`);
                    console.warn(`Launch failed for ${candidate.browserName}: ${message}`);
                }
            }

            if (!this.browser) {
                throw new Error(`Unable to launch any browser. Attempts: ${launchErrors.join(' | ')}`);
            }
        }

        const context = await this.browser.newContext({
            viewport: { width: 1920, height: 1080 },
        });

        const page = await context.newPage();
        console.log(`🎲 Worker using: ${activeBrowserName} | OS: ${selection.os}`);
        return page;
    }

    static async closeBrowser(): Promise<void> {
        if (this.browser) {
            try {
                await this.browser.close();
            } catch (error: any) {
                console.warn(`Browser close failed: ${error?.message ?? String(error)}`);
            }
            this.browser = null;
            this.currentBrowserKey = null;
        }
    }

    private static async launchCandidate(
        options: { name: string; channel?: string },
        isHeadless: boolean
    ): Promise<Browser> {
        const baseLaunchOptions = {
            headless: isHeadless,
            args: options.name === 'chromium' && !isHeadless ? ['--start-maximized'] : []
        };

        const engine = options.name === 'firefox' ? firefox :
            options.name === 'webkit' ? webkit : chromium;

        if (options.name === 'chromium' && options.channel) {
            try {
                return await engine.launch({
                    ...baseLaunchOptions,
                    channel: options.channel,
                });
            } catch {
                return await chromium.launch(baseLaunchOptions);
            }
        }

        return await engine.launch(baseLaunchOptions);
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
