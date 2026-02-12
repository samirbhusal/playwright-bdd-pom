import * as fs from 'node:fs';
import path from 'node:path';

export class ConfigLoader {

    private static runConfigFile = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'run.config.json'), 'utf-8'));
    private static envConfigFile = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'env.config.json'), 'utf-8'));

    private static currentEnvType = this.runConfigFile.env;
    private static envData = this.envConfigFile[this.currentEnvType];

    static getPlatform(): string {
        return this.runConfigFile.platform;
    }

    static getWeb_BaseUrl(): string {
        return this.envData.web_base_url;
    }

    static getApi_BaseUrl(): string {
        return this.envData.api_base_url;
    }

    static isHeadless(): boolean {
        return this.runConfigFile.headless;
    }

}