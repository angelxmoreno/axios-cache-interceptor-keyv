# Project To Dos

## 1. Code Quality & Badges (High Priority - PR #1)
**Goal**: Make the library look professional and build developer confidence

### Code Quality
Integrate codecov (recommended over codacy for this simple codebase)
- CodeCov tracks test coverage, integrates well with GitHub Actions
- Codacy does broader analysis but may be overkill for single-function library
- Set up GitHub Actions for coverage reporting

### Badges
Add more badges to README:
- codecov (coverage percentage)
- coderabbit (already have config)
- bun (show runtime preference)
- biome (show linting/formatting tool)

## 2. Release Strategy (High Priority - PR #2)
**Goal**: Get the work published ASAP

Consider release-please (recommended over release-it)
- Better aligned with existing conventional commit usage
- Automates changelog generation
- Integrates well with GitHub Actions
- Configure npm publishing workflow

## 3. Documentation (Low Priority - PR #3)
**Goal**: SEO and discovery improvements

Incorporate Docusaurus as documentation
- Break down README into focused guide pages
- Create dedicated backend setup guides (Redis, MongoDB, SQLite, etc.)
- Add interactive API examples
- README is already comprehensive, this is more for SEO than functionality
