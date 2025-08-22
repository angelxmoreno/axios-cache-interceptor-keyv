import { afterEach, beforeEach, describe, expect, spyOn, test } from 'bun:test';
import Keyv from '@keyvhq/core';
import { createKeyvStorage } from './keyv-storage.js';

describe('createKeyvStorage', () => {
    let keyv: Keyv;

    beforeEach(() => {
        keyv = new Keyv();
    });

    afterEach(async () => {
        await keyv.clear();
    });

    test('should create storage adapter', () => {
        const storage = createKeyvStorage(keyv);

        expect(storage).toBeDefined();
        expect(typeof storage.get).toBe('function');
        expect(typeof storage.set).toBe('function');
        expect(typeof storage.remove).toBe('function');
        expect(typeof storage.clear).toBe('function');
    });

    test('should store and retrieve value', async () => {
        const storage = createKeyvStorage(keyv);
        const testValue = {
            state: 'cached' as const,
            ttl: 300000,
            createdAt: Date.now(),
            data: { data: 'test data', status: 200, statusText: 'OK', headers: {} },
        };
        await storage.set('test-key', testValue);
        const result = await storage.get('test-key');

        // @ts-expect-error - Result type varies based on storage implementation
        expect(result.data.data).toBe('test data');
        expect(result.state).toBe('cached');
    });

    test('should log debug messages when debug is enabled', async () => {
        const consoleSpy = spyOn(console, 'log').mockImplementation(() => {});
        const storage = createKeyvStorage(keyv, { debug: true });

        const testValue = {
            state: 'cached' as const,
            ttl: 300000,
            createdAt: Date.now(),
            data: { data: 'test data', status: 200, statusText: 'OK', headers: {} },
        };

        await storage.set('test-key', testValue);
        await storage.get('test-key');
        await storage.remove?.('test-key');
        await storage.clear?.();

        expect(consoleSpy).toHaveBeenCalledWith('[axios-cache-interceptor-keyv] SET:', {
            key: 'test-key',
            state: 'cached',
            ttl: 300000,
        });
        expect(consoleSpy).toHaveBeenCalledWith('[axios-cache-interceptor-keyv] FIND:', {
            key: 'test-key',
            found: true,
        });
        expect(consoleSpy).toHaveBeenCalledWith('[axios-cache-interceptor-keyv] REMOVE:', { key: 'test-key' });
        expect(consoleSpy).toHaveBeenCalledWith('[axios-cache-interceptor-keyv] CLEAR:', { key: '*' });

        consoleSpy.mockRestore();
    });

    test('should not log debug messages when debug is disabled', async () => {
        const consoleSpy = spyOn(console, 'log').mockImplementation(() => {});
        const storage = createKeyvStorage(keyv); // debug defaults to false

        await storage.get('test-key');

        expect(consoleSpy).not.toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});
