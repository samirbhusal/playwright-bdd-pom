import { v4 as uuidv4 } from 'uuid';

export class RandomUtils {
    static resolve(value: any): any {
        if (typeof value !== 'string') return value;

        if (value.includes("randomEmail")) return `test_${Date.now()}@example.com`;
        if (value.includes("randomGuid")) return uuidv4();
        if (value.includes("randomCurrentDate")) return new Date().toISOString().split('T')[0];
        if (value.includes("randomSessionId")) return `SESS-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
        
        return value;
    }

    // Recursively search and resolve placeholders in the JSON object
    static resolveObject(obj: any): any {
        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                this.resolveObject(obj[key]);
            } else {
                obj[key] = this.resolve(obj[key]);
            }
        }
        return obj;
    }
}