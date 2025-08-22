import type Keyv from '@keyvhq/core';
import type { BuildStorage } from 'axios-cache-interceptor';
import { type AxiosStorage, buildStorage } from 'axios-cache-interceptor';

export interface KeyvStorageOptions {
    debug?: boolean;
}

export function createKeyvStorage(keyv: Keyv, options?: KeyvStorageOptions): AxiosStorage {
    const debug = options?.debug ?? false;

    const log = (action: string, key: string, extra?: Record<string, unknown>) => {
        if (debug) {
            console.log(`[axios-cache-interceptor-keyv] ${action}:`, { key, ...extra });
        }
    };

    const storage: BuildStorage = {
        async find(key: string) {
            const result = await keyv.get(key);
            log('FIND', key, { found: result !== undefined });
            return result;
        },

        async set(key: string, value) {
            const ttl = value.state === 'cached' ? value.ttl : undefined;
            await keyv.set(key, value, ttl);
            log('SET', key, { state: value.state, ttl });
        },

        async remove(key: string) {
            await keyv.delete(key);
            log('REMOVE', key);
        },

        async clear() {
            await keyv.clear();
            log('CLEAR', '*');
        },
    };

    return buildStorage(storage);
}
