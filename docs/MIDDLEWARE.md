# Meowsonry Middleware Architecture

## Overview

Meowsonry uses a **middleware pipeline architecture** to implement its masonry layout algorithm.

## Pipeline Phases

### 1. beforePlacement Phase
- Executed once before processing children
- Context: container, containerWidth
- Use cases: measurements, container setup

### 2. placement Phase
- Executed for each child element
- Context: container, containerWidth, placedChildren, currentChildElement, currentChild
- Use cases: position calculations, DOM updates

## Middleware Types

| Type | Execution | Context |
|------|-----------|---------|
| beforePlacement | Once | Container-level |
| placement | Per child | Child-specific |
| common | Both phases | Shared |

## Core Components

- **handleMiddleware**: Pipeline executor
- **position**: CSS position setter
- **containerClientWidth**: Width measurement
- **baseRowPlacement**: Layout algorithm
- **assignAbsolutePositioningPropertiesToCurrentChild**: DOM styling
- **pushCurrentChildToPlacedChildren**: Result tracking

## Data Structures

- **PlacedChildren**: Manages placed items with row-aware operations
- **NumericRange**: Interval operations

See source files in src/middleware/ for implementation details.
