# axios-cache-interceptor-keyv

[![npm version](https://badge.fury.io/js/axios-cache-interceptor-keyv.svg)](https://www.npmjs.com/package/axios-cache-interceptor-keyv)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![codecov](https://codecov.io/gh/angelxmoreno/axios-cache-interceptor-keyv/graph/badge.svg?token=KY5XQ5I8NS)](https://codecov.io/gh/angelxmoreno/axios-cache-interceptor-keyv)

<a href="https://bun.sh">
  <svg width="120" height="20" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="20" rx="3" fill="#000"/>
    <text x="30" y="15" fill="white" font-family="Arial" font-size="11">Made with Bun</text>
    <image x="5" y="2" width="16" height="16" href="https://api.iconify.design/logos:bun.svg"/>
  </svg>
</a>

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/angelxmoreno/axios-cache-interceptor-keyv?utm_source=oss&utm_medium=github&utm_campaign=angelxmoreno%2Faxios-cache-interceptor-keyv&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)
[![Formatted with Biome](https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev/)


Universal storage adapter using [Keyv](https://github.com/jaredwray/keyv)
for [axios-cache-interceptor](https://github.com/arthurfiorette/axios-cache-interceptor) - supports Redis, SQLite,
MongoDB, PostgreSQL and more backends.

## Features

- **Universal Storage**: One adapter, multiple backends (Redis, SQLite, MongoDB, PostgreSQL, etc.)
- **High Performance**: Built on Keyv's optimized storage layer
- **TypeScript First**: Full TypeScript support with strict typing
- **TTL Management**: Automatic expiration handling
- **Error Resilient**: Graceful fallbacks for storage failures
- **Zero Dependencies**: Only peer dependencies for maximum compatibility

## Installation

```bash
npm install axios-cache-interceptor-keyv @keyvhq/core axios-cache-interceptor
```

```bash
yarn add axios-cache-interceptor-keyv @keyvhq/core axios-cache-interceptor
```

```bash
pnpm add axios-cache-interceptor-keyv @keyvhq/core axios-cache-interceptor
```

```bash
bun add axios-cache-interceptor-keyv @keyvhq/core axios-cache-interceptor
```

> **Note**: This package works with both the original `keyv` and the newer `@keyvhq/core` libraries. We recommend using
`@keyvhq/core` for new projects as it's the actively maintained fork.

## Quick Start

### In-Memory Storage (Default)

```typescript
import axios from 'axios';
import Keyv from '@keyvhq/core';
import {setupCache} from 'axios-cache-interceptor';
import {createKeyvStorage} from 'axios-cache-interceptor-keyv';

const keyv = new Keyv(); // In-memory storage
const api = setupCache(axios, {
    storage: createKeyvStorage(keyv)
});
```

### Redis Storage

```typescript
import axios from 'axios';
import Keyv from '@keyvhq/core';
import {setupCache} from 'axios-cache-interceptor';
import {createKeyvStorage} from 'axios-cache-interceptor-keyv';

const keyv = new Keyv('redis://localhost:6379');
const api = setupCache(axios, {
    storage: createKeyvStorage(keyv)
});
```

### SQLite Storage

```typescript
import axios from 'axios';
import Keyv from '@keyvhq/core';
import {setupCache} from 'axios-cache-interceptor';
import {createKeyvStorage} from 'axios-cache-interceptor-keyv';

const keyv = new Keyv('sqlite://cache.db');
const api = setupCache(axios, {
    storage: createKeyvStorage(keyv)
});
```

### MongoDB Storage

```typescript
import axios from 'axios';
import Keyv from '@keyvhq/core';
import {setupCache} from 'axios-cache-interceptor';
import {createKeyvStorage} from 'axios-cache-interceptor-keyv';

const keyv = new Keyv('mongodb://localhost:27017/cache');
const api = setupCache(axios, {
    storage: createKeyvStorage(keyv)
});
```

## API

### `createKeyvStorage(keyv, options?)`

Creates a storage adapter compatible with axios-cache-interceptor.

#### Parameters

- **`keyv`** (`Keyv`): A Keyv instance configured with your preferred backend
- **`options?`** (`KeyvStorageOptions`): Optional configuration object
  - **`debug?`** (`boolean`): Enable debug logging for cache operations (default: `false`)

#### Returns

- `AxiosStorage`: Storage adapter compatible with axios-cache-interceptor

#### Example

```typescript
import Keyv from '@keyvhq/core';
import {createKeyvStorage} from 'axios-cache-interceptor-keyv';

// In-memory storage
const storage = createKeyvStorage(new Keyv());

// Redis storage
const storage = createKeyvStorage(new Keyv('redis://localhost:6379'));

// With debug logging enabled
const debugStorage = createKeyvStorage(new Keyv(), {debug: true});
```

## Supported Backends

This adapter works with any Keyv-compatible backend:

### Official @keyvhq Core Adapters

| Backend        | Connection String Example             | Package Required   |
|----------------|---------------------------------------|--------------------|
| **Redis**      | `redis://localhost:6379`              | `@keyvhq/redis`    |
| **MongoDB**    | `mongodb://localhost:27017/db`        | `@keyvhq/mongo`    |
| **SQLite**     | `sqlite://cache.db`                   | `@keyvhq/sqlite`   |
| **PostgreSQL** | `postgresql://user:pass@localhost/db` | `@keyvhq/postgres` |
| **MySQL**      | `mysql://user:pass@localhost/db`      | `@keyvhq/mysql`    |
| **File**       | `file://path/to/cache`                | `@keyvhq/file`     |
| **In-Memory**  | `new Keyv()`                          | None (built-in)    |

### Community Adapters

Additional storage adapters are available from the community. For a complete list, visit
the [Keyv Community Adapters](https://github.com/microlinkhq/keyvhq?tab=readme-ov-file#community) page.

Popular community adapters include:

- **keyv-anyredis** - Redis clusters and alternative Redis clients
- **keyv-dynamodb** - DynamoDB storage adapter
- **keyv-firestore** - Firebase Cloud Firestore adapter
- **keyv-lru** - In-memory LRU back-end
- **keyv-memcache** - Memcache storage adapter
- **keyv-mssql** - Microsoft SQL Server adapter
- **keyv-s3** - Amazon S3 storage adapter
- **quick-lru** - Simple "Least Recently Used" (LRU) cache

## Advanced Usage

### Custom TTL and Configuration

```typescript
import Keyv from '@keyvhq/core';
import {setupCache} from 'axios-cache-interceptor';
import {createKeyvStorage} from 'axios-cache-interceptor-keyv';

const keyv = new Keyv('redis://localhost:6379', {
    ttl: 1000 * 60 * 60, // 1 hour default TTL
    namespace: 'myapp'
});

const api = setupCache(axios, {
    storage: createKeyvStorage(keyv),
    ttl: 1000 * 60 * 15 // 15 minutes cache TTL
});
```

### Error Handling

```typescript
import Keyv from '@keyvhq/core';
import {setupCache} from 'axios-cache-interceptor';
import {createKeyvStorage} from 'axios-cache-interceptor-keyv';

const keyv = new Keyv('redis://localhost:6379');

keyv.on('error', (error) => {
    console.error('Keyv connection error:', error);
});

const api = setupCache(axios, {
    storage: createKeyvStorage(keyv)
});
```

### Multiple Cache Instances

```typescript
import axios from 'axios';
import Keyv from '@keyvhq/core';
import {setupCache} from 'axios-cache-interceptor';
import {createKeyvStorage} from 'axios-cache-interceptor-keyv';

// User data cache
const userCache = setupCache(axios.create(), {
    storage: createKeyvStorage(
        new Keyv('redis://localhost:6379', {namespace: 'users'})
    )
});

// Product data cache  
const productCache = setupCache(axios.create(), {
    storage: createKeyvStorage(
        new Keyv('redis://localhost:6379', {namespace: 'products'})
    )
});
```

### Debug Logging

Enable debug logging to monitor cache operations:

```typescript
import axios from 'axios';
import Keyv from '@keyvhq/core';
import {setupCache} from 'axios-cache-interceptor';
import {createKeyvStorage} from 'axios-cache-interceptor-keyv';

const keyv = new Keyv('redis://localhost:6379');
const api = setupCache(axios, {
    storage: createKeyvStorage(keyv, {debug: true})
});

// This will log cache operations like:
// [axios-cache-interceptor-keyv] SET: { key: 'get:https://api.example.com/users', state: 'cached', ttl: 300000 }
// [axios-cache-interceptor-keyv] FIND: { key: 'get:https://api.example.com/users', found: true }
```

## Development

### Prerequisites

- [Bun](https://bun.sh) runtime
- Node.js 18+ (for compatibility testing)

### Setup

```bash
git clone https://github.com/angelxmoreno/axios-cache-interceptor-keyv.git
cd axios-cache-interceptor-keyv
bun install
```

### Scripts

```bash
# Run tests
bun test

# Run tests with coverage
bun run test:coverage

# Lint code
bun run lint

# Fix linting issues
bun run lint:fix

# Type checking
bun run typecheck

# Build for production
bun run build
```

### Testing

The test suite includes comprehensive tests for:

- Core functionality with in-memory Keyv
- TTL handling and expiration
- Error scenarios and edge cases
- Integration with different backends
- TypeScript type checking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass (`bun test`)
6. Run linting (`bun run lint`)
7. Commit your changes (`git commit -m 'feat: add amazing feature'`)
8. Push to the branch (`git push origin feature/amazing-feature`)
9. Open a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `refactor:` Code refactoring
- `test:` Test additions or modifications
- `chore:` Maintenance tasks

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Related Projects

- [axios-cache-interceptor](https://github.com/arthurfiorette/axios-cache-interceptor) - HTTP request cache for axios
- [@keyvhq/core](https://github.com/microlinkhq/keyvhq) - Simple key-value storage with support for multiple backends

## Support

- [Documentation](https://github.com/angelxmoreno/axios-cache-interceptor-keyv)
- [Issues](https://github.com/angelxmoreno/axios-cache-interceptor-keyv/issues)
- [Discussions](https://github.com/angelxmoreno/axios-cache-interceptor-keyv/discussions)
- [Discord](https://discord.gg/wjdDvWRWWj)

---

Made with ❤️ by [Angel S. Moreno](https://github.com/angelxmoreno)