import Keyv from '@keyvhq/core';
import KeyvSqlite from '@keyvhq/sqlite';
import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import { createKeyvStorage } from '../src';

async function demonstrateCache() {
    console.log('🚀 Starting axios-cache-interceptor-keyv demo\n');

    // Setup cache with debug logging enabled
    const keyv = new Keyv({ store: new KeyvSqlite('sqlite://cache.db') });
    const api = setupCache(axios, {
        storage: createKeyvStorage(keyv, { debug: true }),
        ttl: 5000, // 5 seconds TTL for demo
        headerInterpreter: () => 'not enough headers',
    });

    const url = 'http://worldtimeapi.org/api/timezone/America/New_York';

    try {
        console.log('📡 First request (should miss cache):');
        const firstCall = await api.get(url);
        console.log(`   Time: ${firstCall.data.unixtime}, Cached: ${firstCall.cached}\n`);

        console.log('📡 Second request (should hit cache):');
        const secondCall = await api.get(url);
        console.log(`   Time: ${secondCall.data.unixtime}, Cached: ${secondCall.cached}\n`);

        console.log('📡 Third request with cache disabled:');
        const noCacheCall = await api.get(url, { cache: false });
        console.log(`   Time: ${noCacheCall.data.unixtime}, Cached: ${noCacheCall.cached}\n`);

        // Wait for cache to expire
        console.log('⏰ Waiting for cache to expire (6 seconds)...');
        await Bun.sleep(6000);

        console.log('📡 Fourth request (cache should be expired):');
        const expiredCall = await api.get(url);
        console.log(`   Time: ${expiredCall.data.unixtime}, Cached: ${expiredCall.cached}\n`);

        console.log('📊 Results Summary:');
        console.log({
            cacheWorking: firstCall.data.unixtime === secondCall.data.unixtime,
            noCacheBypass: noCacheCall.data.unixtime !== secondCall.data.unixtime,
            cacheExpired: expiredCall.data.unixtime !== firstCall.data.unixtime,
        });
    } catch (error) {
        console.error('❌ Demo failed:', error);
    } finally {
        // Clean up
        await keyv.clear();
        console.log('\n🧹 Cache cleared. Demo complete!');
    }
}

demonstrateCache();
