# Testing Guide

## Running Tests

```bash
# Run all tests
bun test

# Run with coverage report
bun run test:coverage

# Run type checking
bun run typecheck
```

## Test Structure

Tests are located in `src/keyv-storage.test.ts` and use Bun's built-in test runner.

### Test Categories

1. **Basic Functionality**
   - Storage adapter creation
   - Get/set/remove/clear operations

2. **TTL Handling**
   - Automatic expiration via Keyv
   - TTL calculation for cached values

3. **Error Handling**
   - Graceful degradation on storage failures

## Writing Tests

### Test Setup

Each test uses a fresh in-memory Keyv instance:

```typescript
let keyv: Keyv;

beforeEach(() => {
    keyv = new Keyv(); // In-memory storage
});

afterEach(async () => {
    await keyv.clear();
});
```

### Test Data Format

Use proper storage value format:

```typescript
const testValue = {
    state: 'cached' as const,
    ttl: 300000,
    createdAt: Date.now(),
    data: { data: 'test', status: 200, statusText: 'OK', headers: {} },
};
```

## Test Guidelines

- Keep tests simple and focused
- Use descriptive test names
- Test both success and error scenarios
- Avoid complex mocking - use real Keyv instances
- Test TTL expiration with short timeouts

## Coverage Goals

Aim for high coverage of:
- All public API methods
- TTL calculation logic
- Error handling paths
- Edge cases (empty keys, expired values, etc.)