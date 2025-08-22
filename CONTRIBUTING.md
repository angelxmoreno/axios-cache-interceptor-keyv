# Contributing to axios-cache-interceptor-keyv

Thank you for your interest in contributing to axios-cache-interceptor-keyv!

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/angelxmoreno/axios-cache-interceptor-keyv.git
   cd axios-cache-interceptor-keyv
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Run tests**
   ```bash
   bun test
   ```

4. **Run linting**
   ```bash
   bun run lint
   ```

5. **Type checking**
   ```bash
   bun run typecheck
   ```

## Development Guidelines

### Code Style
- Use Biome for formatting and linting
- Follow TypeScript strict mode - no `any` types
- Keep the implementation simple and direct

### Testing
- Write tests for new functionality
- Ensure all tests pass before submitting PR
- Include edge cases in test coverage

### Commits
- Use conventional commits format: `feat:`, `fix:`, `docs:`, etc.
- Write clear, descriptive commit messages
- Keep commits focused and atomic

## Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Add tests for new functionality
4. Ensure all tests pass: `bun test`
5. Ensure linting passes: `bun run lint`
6. Ensure types are correct: `bun run typecheck`
7. Commit your changes using conventional commits
8. Push to your fork and submit a pull request

## Project Principles

- **Simplicity**: Keep the implementation simple and direct
- **Reliability**: All storage operations should handle errors gracefully
- **TypeScript**: Maintain strict typing without overengineering
- **Let Keyv handle what it does best**: Don't reinvent TTL management or expiration logic