# Development Guide

## Prerequisites

- [Bun](https://bun.sh) runtime
- Node.js 18+ (for compatibility testing)
- Git

## Getting Started

```bash
git clone https://github.com/angelxmoreno/axios-cache-interceptor-keyv.git
cd axios-cache-interceptor-keyv
bun install
```

## Project Structure

```
src/
├── index.ts              # Main export
├── keyv-storage.ts       # Core implementation
└── keyv-storage.test.ts  # Tests
```

## Available Scripts

```bash
# Development
bun test                  # Run tests
bun run test:coverage     # Run tests with coverage
bun run typecheck         # TypeScript type checking
bun run lint              # Check code style
bun run lint:fix          # Fix code style issues

# Building
bun run build             # Compile TypeScript to dist/
bun run prepublishOnly    # Pre-publish checks
```

## Development Workflow

1. Make changes to `src/keyv-storage.ts`
2. Update tests in `src/keyv-storage.test.ts`
3. Run type checking: `bun run typecheck`
4. Run tests: `bun test`
5. Run linting: `bun run lint:fix`

## Code Guidelines

- Keep the implementation simple and direct
- Use the `buildStorage()` helper from axios-cache-interceptor
- Let Keyv handle TTL and expiration naturally
- No `any` types - use proper TypeScript
- All storage operations should handle errors gracefully

## Testing Strategy

Tests use Bun's built-in test runner with an in-memory Keyv instance. Focus on:
- Basic storage operations (get, set, remove, clear)
- TTL handling and expiration
- Error resilience

## Architecture Notes

The implementation uses axios-cache-interceptor's `buildStorage()` helper with a simple `BuildStorage` interface:
- `find(key)` - Retrieve value from Keyv
- `set(key, value)` - Store value with TTL in Keyv
- `remove(key)` - Delete key from Keyv  
- `clear()` - Clear all keys from Keyv