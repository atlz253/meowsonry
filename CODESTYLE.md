# Meowsonry Code Style Guide

## Documentation

### JSDoc Comments

All functions with non-trivial logic must be documented using JSDoc comments (`/** ... */`).

#### Structure

```typescript
/**
 * Short description of what the function does (single sentence).
 *
 * Optional longer explanation if needed.
 *
 * @param paramName - Description of parameter purpose and constraints
 * @returns Description of return value
 */
```

#### Rules

- **Required for**: All exported functions, classes, and interfaces; private functions with complex logic
- **Format**: Single line for short descriptions, multi-line for complex ones
- **@param tags**: Document each parameter including type inference from context
- **@returns tag**: Always document return value (use `@returns void` if no return)
- **Language**: Write descriptions in English

#### Examples

```typescript
/**
 * Gets the closest top children whose horizontal range overlaps with [x1, x2].
 *
 * Checks both current row and previous row for children that could be
 * potential alignment targets.
 *
 * @param x1 - Left boundary of search range
 * @param x2 - Right boundary of search range
 * @returns Array of child placements sorted by appearance order
 */
getClosestTopChildrenByRange(x1: number, x2: number): ComputedChildPlacement[] {
  // implementation...
}
```

```typescript
/**
 * Computes the height of all placed children by calculating the vertical
 * extent from the minimum top position to the maximum bottom position.
 *
 * @returns Total height in pixels
 */
get height(): number {
  // implementation...
}
```

```typescript
/**
 * Pushes one or more child placements into the internal storage.
 *
 * @param items - Child placement records to add
 * @returns New length of the placed children array
 */
push(...items: ComputedChildPlacement[]): number {
  // implementation...
}
```

---

## TypeScript

### File Organization

- Use `.ts` extension for all source files
- Export types from `src/types.ts`
- Place middleware in `src/middleware/` subdirectories

### Declarations

- Prefer `const` over `let`
- Use `readonly` where appropriate
- Use readonly arrays with private fields (`#placed: PlacedChild[] = []`) for encapsulation

### Strict Mode

Enable strict mode in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "exactOptionalPropertyTypes": true,
    "strict": true,
    "isolatedModules": true
  }
}
```

---

## Testing

- Unit tests: `tests/unit/`
- E2E tests: `tests/e2e/`
- Use Vitest for unit tests: `import { describe, expect, test } from "vitest"`
- Use Playwright for e2e screenshot testing: `import { test, expect } from "@playwright/test"`

---

## Naming Conventions

| Entity            | Case                    | Example                                     |
| ----------------- | ----------------------- | ------------------------------------------- |
| Classes           | PascalCase              | `PlacedChildren`, `NumericRange`            |
| Functions         | camelCase               | `meowsonry`, `getClosestTopChildrenByRange` |
| Private fields    | camelCase with # prefix | `#placed`, `#rowsCount`                     |
| Test descriptions | lowercase with spaces   | "push should work"                          |

---

## Formatting

- Indentation: 2 spaces
- Statements: semicolon required at end
- Strings: single quotes (`'example'`)
- Object literals: no trailing commas, align properties vertically for readability

---

## Imports & Exports

- Default export: `export default meowsonry`
- Named exports: use for utility classes and types (`PlacedChildren`, `NumericRange`)
- Relative imports within source: `import { PlacedChild } from "./types"`
- Use `satisfies` operator for type-checked arrays: `as satisfies PlacedChild[]`

---

## Error Handling

- Throw descriptive errors for invalid arguments
- Return empty arrays `[]` for edge cases instead of undefined
- Use TypeScript's `at()` method for safe array access

---

## Commit Message Conventions

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>
```

For this project, use only these types:

- `feat` - new feature
- `fix` - bug fix
- `chore` - maintenance tasks, dependency updates
- `docs` - documentation changes
- `test` - test additions/changes
- `refactor` - code restructuring without behavior change

**Rules:**

- Subject line must be in imperative mood (e.g., "add", not "added" or "adds")
- Maximum 72 characters for subject line
- No capitalization after type (lowercase)
- No trailing period
- Use `refactor` for code improvements without functionality changes
- Use `chore` for build/config/tasks that don't affect runtime

**Examples:**

```
feat: add row-aware child placement tracking
fix: correct calculation of container width
test: add unit tests for PlacedChildren class
docs: update architecture overview
refactor: extract numeric range validation
chore: update dependencies to latest versions
```
