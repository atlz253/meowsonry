# Meowsonry Layout - Agent Guidelines

## Build & Test Commands

```bash
npm test                    # Run unit tests with vitest
npm run test.playwright     # Run e2e tests with Playwright
npm run test.playwright.ui  # Run e2e tests in UI mode
npm run test.playwright.update  # Update screenshot snapshots
npm run test.server         # Start Vite dev server for e2e tests
```

Run a single unit test:
```bash
npm test -- PlacedChildren.test.ts
npm test -- -t "push should work"
```

Run a single e2e test:
```bash
npx playwright test index.spec.ts --project=chromium
```

## Code Style

### TypeScript
- Use `.ts` extension for source files
- Export types from `src/types.ts`
- Use readonly arrays with `#placed: PlacedChild[] = []` pattern for encapsulation
- Prefer `const` over `let`, use `readonly` where appropriate
- Use numeric range class (`NumericRange`) for interval operations

### Testing
- Unit tests in `tests/unit/`, e2e tests in `tests/e2e/`
- Use Vitest for unit tests: `import { describe, expect, test } from "vitest"`
- Use Playwright for e2e screenshot testing: `import { test, expect } from "@playwright/test"`
- Mock test data in `tests/unit/mocks/`
- Snapshot directory: `./tests/e2e/snapshots`

### Naming Conventions
- Classes: PascalCase (`PlacedChildren`, `NumericRange`)
- Functions: camelCase (`meowsonry`, `getClosestTopChildrenByRange`)
- Private members: prefixed with `#` (private fields)
- Test descriptions: use lowercase with spaces, describe expected behavior

### Error Handling
- Throw descriptive errors for invalid arguments
- Return empty arrays `[]` for edge cases instead of undefined
- Use TypeScript's `at()` method for safe array access

### Imports & Exports
- Default export: `export default meowsonry`
- Named exports: use for utility classes and types
- Relative imports within source: `import { PlacedChild } from "./types"`
- Use `satisfies` operator for type-checked arrays: `as satisfies PlacedChild[]`

### Formatting
- 2-space indentation
- Semicolon required at end of statements
- Single quotes for strings
- No trailing commas in object literals
- Align properties vertically where it improves readability

## Eslint/Prettier
No linting or formatting tools configured. Follow existing patterns in source files.
