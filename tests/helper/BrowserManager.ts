// tests/helper/BrowserManager.ts
import os from 'node:os';

export class BrowserManager {
    private static macOSList = ["Big Sur", "Sonoma", "Ventura"];
    private static winOSList = ["11", "10", "8.1", "8"];
    private static browserList = ["Chrome", "Edge", "Firefox", "Safari"];

    private static shuffle<T>(items: T[]): T[] {
        const copy = [...items];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    static getRandomPlatform() {
        // 'darwin' = macOS, 'win32' = Windows
        const hostPlatform = os.platform();
        let selectedOS: string;
        let selectedBrowser: string;

        if (hostPlatform === 'darwin') {
            // Logic for when running on a Mac
            selectedOS = this.macOSList[Math.floor(Math.random() * this.macOSList.length)];
            selectedBrowser = this.browserList[Math.floor(Math.random() * this.browserList.length)];
        } else {
            // Logic for when running on Windows (or Linux/CI)
            selectedOS = this.winOSList[Math.floor(Math.random() * this.winOSList.length)];
            // Exclude Safari (last item) because real Safari only exists on Mac
            selectedBrowser = this.browserList[Math.floor(Math.random() * (this.browserList.length - 1))];
        }

        return { os: selectedOS, browser: selectedBrowser };

    }

    static getRandomPlatformCandidates() {
        const hostPlatform = os.platform();
        const selectedOS =
            hostPlatform === 'darwin'
                ? this.macOSList[Math.floor(Math.random() * this.macOSList.length)]
                : this.winOSList[Math.floor(Math.random() * this.winOSList.length)];

        const candidateBrowsers =
            hostPlatform === 'darwin'
                ? this.browserList
                : this.browserList.filter((browser) => browser !== 'Safari');

        return { os: selectedOS, browsers: this.shuffle(candidateBrowsers) };
    }

    static getBrowserOptions(browserName: string) {
        // Map your string list to actual Playwright browser types
        switch (browserName.toLowerCase()) {
            case 'chrome': return { name: 'chromium', channel: 'chrome' };
            case 'edge': return { name: 'chromium', channel: 'msedge' };
            case 'firefox': return { name: 'firefox', channel: undefined };
            case 'safari': return { name: 'webkit', channel: undefined };
            default: return { name: 'chromium', channel: undefined };
        }
    }
}
