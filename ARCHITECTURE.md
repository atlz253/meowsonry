# Meowsonry Architecture

This document provides a high-level overview of the middleware-based architecture used in Meowsonry.

## Overview

Meowsonry uses a **middleware pipeline architecture** to implement its masonry layout algorithm. This approach replaces hardcoded logic with an extensible system where developers can inject custom behavior at specific stages of the layout calculation.

## Architecture Layers

### 1. Core Engine (src/index.ts)
The main entry point orchestrates two distinct middleware phases:
- **beforePlacement**: Initializes container context (executed once)
- **placement**: Processes each child element (executed for each child)

### 2. Middleware Pipeline (src/middleware/)

See [MIDDLEWARE.md](docs/MIDDLEWARE.md) for detailed technical documentation including:
- Middleware type system and phases
- Context management
- Available middleware implementations
- Execution flow diagrams

### 3. Data Structures

- **PlacedChildren**: Manages placed items with row-aware operations
- **NumericRange**: Handles interval operations for position calculations

## Middleware Types

| Type | When | Context |
|------|------|---------|
| beforePlacement | Once before children | Container-level |
| placement | For each child | Child-specific |
| common | In both phases | Shared |

## Extension Points

Developers can inject custom middleware to:
- Modify layout algorithm
- Add debugging/profiling hooks
- Implement special positioning rules
- Integrate with third-party libraries

See [MIDDLEWARE.md](docs/MIDDLEWARE.md) for implementation details.
