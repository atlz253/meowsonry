# Meowsonry Layout - Agent Guidelines

## Build & Test Commands

```bash
npm test                    # Run unit tests with vitest
npm run test.playwright     # Run e2e tests with Playwright
npm run test.playwright.ui  # Run e2e tests in UI mode
npm run test.playwright.update  # Update screenshot snapshots
npm run test.server         # Start Vite dev server for e2e tests
npm run typecheck           # Verify no type errors (run after task completion)
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
- Use readonly arrays with private fields (`#placed: PlacedChild[] = []`) for encapsulation
- Prefer `const` over `let`, use `readonly` where appropriate
- Use numeric range class (`NumericRange`) for interval operations
- Enable strict mode: `exactOptionalPropertyTypes`, `strict`, `isolatedModules`

### Testing
- Unit tests in `tests/unit/`, e2e tests in `tests/e2e/`
- Use Vitest for unit tests: `import { describe, expect, test } from "vitest"`
- Use Playwright for e2e screenshot testing: `import { test, expect } from "@playwright/test"`
- Mock test data in `tests/unit/mocks/` using `#placed` pattern
- Snapshot directory: `./tests/e2e/snapshots`
- For row-based mocks, use remainingRowWidth to indicate row boundaries (reset to higher value at row start)

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
- Named exports: use for utility classes and types (PlacedChildren, NumericRange)
- Relative imports within source: `import { PlacedChild } from "./types"`
- Use `satisfies` operator for type-checked arrays: `as satisfies PlacedChild[]`

### Formatting
- 2-space indentation
- Semicolon required at end of statements
- Single quotes for strings
- No trailing commas in object literals
- Align properties vertically where it improves readability

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for overview of middleware-based architecture.

### Middleware System
- **beforePlacement**: Runs once before processing children (container initialization)
- **placement**: Runs for each child element (layout calculation)
- **common**: Runs in both phases (shared logic)

Context types:
- `BeforePlacementMiddlewareContext`: container, containerWidth?
- `PlacementMiddlewareContext`: container, containerWidth, placedChildren, childrenElements, currentChildElement, currentChild?

### Data Structures
- **PlacedChildren**: Manages placed items with row-aware operations
  - Row detection: remainingRowWidth increases indicate new row
  - Key methods: push(), at(), rowAt(), getClosestTopChildrenByRange()
- **NumericRange**: Handles interval operations for position calculations

## Important Post-Task Steps

After completing any coding task, verify type correctness:
```bash
npm run typecheck
```

This is mandatory to ensure no type errors were introduced.

