# axios-cache-interceptor-keyv Demo

This sample application demonstrates the key features of `axios-cache-interceptor-keyv` with a SQLite backend.

## What This Demo Shows

- 🎯 **Cache Miss/Hit Behavior**: First request misses cache, second hits cache
- 🐛 **Debug Logging**: Real-time cache operation logging 
- ⚡ **Cache Bypass**: Forcing fresh requests with `cache: false`
- ⏰ **TTL Expiration**: Automatic cache expiration after 5 seconds
- 💾 **SQLite Storage**: Persistent storage using `@keyvhq/sqlite`
- 🧹 **Resource Cleanup**: Proper cache clearing when done

## Features Demonstrated

- **Cache Storage**: Using Keyv with SQLite backend for persistent caching
- **Debug Mode**: Enable `debug: true` to see detailed cache operation logs
- **TTL Management**: Short 5-second TTL to quickly demonstrate expiration
- **API Integration**: Real HTTP requests to WorldTimeAPI
- **Error Handling**: Proper error catching and resource cleanup

## Installation

```bash
bun install
```

## Run the Demo

```bash
bun run index.ts
```

## Expected Output

```
🚀 Starting axios-cache-interceptor-keyv demo

📡 First request (should miss cache):
[axios-cache-interceptor-keyv] FIND: { key: 'get:http://...', found: false }
[axios-cache-interceptor-keyv] SET: { key: 'get:http://...', state: 'cached', ttl: 5000 }
   Time: 1703123456, Cached: false

📡 Second request (should hit cache):
[axios-cache-interceptor-keyv] FIND: { key: 'get:http://...', found: true }
   Time: 1703123456, Cached: true

📡 Third request with cache disabled:
   Time: 1703123460, Cached: false

⏰ Waiting for cache to expire (6 seconds)...

📡 Fourth request (cache should be expired):
[axios-cache-interceptor-keyv] FIND: { key: 'get:http://...', found: false }
[axios-cache-interceptor-keyv] SET: { key: 'get:http://...', state: 'cached', ttl: 5000 }
   Time: 1703123467, Cached: false

📊 Results Summary:
{ cacheWorking: true, noCacheBypass: true, cacheExpired: true }

🧹 Cache cleared. Demo complete!
```

## Key Concepts Illustrated

1. **First Request**: Cache miss - data is fetched and stored
2. **Second Request**: Cache hit - same timestamp returned from cache
3. **Cache Bypass**: Fresh request ignores cache completely  
4. **Cache Expiration**: After TTL expires, cache miss occurs again
5. **Debug Logging**: Shows internal cache operations in real-time

This demo provides a comprehensive overview of caching behavior and is perfect for understanding how the library works in practice.
