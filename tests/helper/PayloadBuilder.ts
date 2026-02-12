import * as fs from 'node:fs';
import path from 'node:path';

export class PayLoadBuilder {

    static getTemplate(templateKeyName: string, fileName?: string): any {
        const actualFilePath = path.join(process.cwd(), 'tests/testData', fileName ? fileName : 'testData.json');
        const data = JSON.parse(fs.readFileSync(actualFilePath, 'utf-8'));
        if (!data[templateKeyName]) throw new Error(`Payload key "${templateKeyName}" not found in ${fileName || 'testData.json'}`);
        return JSON.parse(JSON.stringify(data[templateKeyName]));
    }

    static build(templateKeyName: string, overrides: Record<string, any> = {}, fileName?: string): any {
        let payload = this.getTemplate(templateKeyName, fileName);

        // 1. Resolve Dynamic Tags (like randomEmail)
        payload = this.resolveDynamicTags(payload);

        // 2. Apply Manual Overrides from Gherkin
        Object.entries(overrides).forEach(([key, value]) => {
            if (payload.hasOwnProperty(key)) {
                payload[key] = value;
            }
        });

        return payload;
    }

    private static resolveDynamicTags(obj: any): any {
        const timestamp = Date.now();

        // Loop through the object to find and replace tags
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                if (obj[key] === 'randomEmail') {
                    obj[key] = `test_user_${timestamp}@fake.com`;
                }
                // You can add more tags here, like 'randomPhone' or 'randomGuid'
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                this.resolveDynamicTags(obj[key]); // Recursive call for nested JSON
            }
        }
        return obj;
    }
}