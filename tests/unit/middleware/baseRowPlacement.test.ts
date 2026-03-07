import { describe, expect, test } from "vitest";
import { baseRowPlacement } from "../../../src/middleware/baseRowPlacement";
import { PlacedChildren } from "../../../src/PlacedChildren";
import { PlacementMiddlewareContext } from "../../../src/middleware";

describe("baseRowPlacement", () => {
  test("should place first child at top-left corner", () => {
    const currentChildElement = {
      clientWidth: 100,
      clientHeight: 50,
    } as HTMLElement;

    const placedChildren = new PlacedChildren();
    let capturedContext = {} as PlacementMiddlewareContext;

    baseRowPlacement().callback({
      context: {
        gap: 0,
        container: {
          element: {} as HTMLElement,
          width: 800,
          paddingTop: 0,
          paddingLeft: 0,
        },
        placedChildren,
        childrenElements: [],
        currentChildElement,
      },
      setContext: (c) => {
        capturedContext = typeof c === "function" ? c(capturedContext) : c;
      },
    });

    expect(capturedContext.currentChild).toEqual({
      top: 0,
      left: 0,
      width: 100,
      height: 50,
      remainingRowWidth: 700,
      element: currentChildElement,
    });
  });

  test("should place child next to previous when there is space", () => {
    const currentChildElement = {
      clientWidth: 100,
      clientHeight: 50,
    } as HTMLElement;

    const placedChildren = new PlacedChildren([
      {
        top: 0,
        left: 0,
        width: 100,
        height: 50,
        remainingRowWidth: 600,
        element: {} as HTMLElement,
      },
    ]);
    let capturedContext = {} as PlacementMiddlewareContext;

    baseRowPlacement().callback({
      context: {
        gap: 0,
        container: {
          element: {} as HTMLElement,
          width: 800,
          paddingTop: 0,
          paddingLeft: 0,
        },
        placedChildren,
        childrenElements: [],
        currentChildElement,
      },
      setContext: (c) => {
        capturedContext = typeof c === "function" ? c(capturedContext) : c;
      },
    });

    expect(capturedContext.currentChild).toEqual({
      top: 0,
      left: 100,
      width: 100,
      height: 50,
      remainingRowWidth: 500,
      element: currentChildElement,
    });
  });

  test("should wrap to new row when no space in current row", () => {
    const currentChildElement = {
      clientWidth: 300,
      clientHeight: 50,
    } as HTMLElement;

    const placedChildren = new PlacedChildren([
      {
        top: 0,
        left: 0,
        width: 400,
        height: 50,
        remainingRowWidth: 100,
        element: {} as HTMLElement,
      },
    ]);
    let capturedContext = {} as PlacementMiddlewareContext;

    baseRowPlacement().callback({
      context: {
        gap: 0,
        container: {
          element: {} as HTMLElement,
          width: 800,
          paddingTop: 0,
          paddingLeft: 0,
        },
        placedChildren,
        childrenElements: [],
        currentChildElement,
      },
      setContext: (c) => {
        capturedContext = typeof c === "function" ? c(capturedContext) : c;
      },
    });

    expect(capturedContext.currentChild).toEqual({
      top: 50,
      left: 0,
      width: 300,
      height: 50,
      remainingRowWidth: 500,
      element: currentChildElement,
    });
  });

  test("should position below closest top children in same row", () => {
    const currentChildElement = {
      clientWidth: 80,
      clientHeight: 50,
    } as HTMLElement;

    const placedChildren = new PlacedChildren([
      {
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        remainingRowWidth: 600,
        element: {} as HTMLElement,
      },
      {
        top: 0,
        left: 100,
        width: 100,
        height: 80,
        remainingRowWidth: 400,
        element: {} as HTMLElement,
      },
    ]);
    let capturedContext = {} as PlacementMiddlewareContext;

    baseRowPlacement().callback({
      context: {
        gap: 0,
        container: {
          element: {} as HTMLElement,
          width: 800,
          paddingTop: 0,
          paddingLeft: 0,
        },
        placedChildren,
        childrenElements: [],
        currentChildElement,
      },
      setContext: (c) => {
        capturedContext = typeof c === "function" ? c(capturedContext) : c;
      },
    });

    expect(capturedContext.currentChild?.top).toBe(0);
  });

  test("should position below all previous children when they are taller", () => {
    const currentChildElement = {
      clientWidth: 80,
      clientHeight: 50,
    } as HTMLElement;

    const placedChildren = new PlacedChildren([
      {
        top: 0,
        left: 0,
        width: 100,
        height: 150,
        remainingRowWidth: 600,
        element: {} as HTMLElement,
      },
      {
        top: 0,
        left: 100,
        width: 100,
        height: 200,
        remainingRowWidth: 400,
        element: {} as HTMLElement,
      },
    ]);
    let capturedContext = {} as PlacementMiddlewareContext;

    baseRowPlacement().callback({
      context: {
        gap: 0,
        container: {
          element: {} as HTMLElement,
          width: 800,
          paddingTop: 0,
          paddingLeft: 0,
        },
        placedChildren,
        childrenElements: [],
        currentChildElement,
      },
      setContext: (c) => {
        capturedContext = typeof c === "function" ? c(capturedContext) : c;
      },
    });

    expect(capturedContext.currentChild).toEqual({
      top: 0,
      left: 200,
      width: 80,
      height: 50,
      remainingRowWidth: 320,
      element: currentChildElement,
    });
  });

  test("should work with multiple rows", () => {
    const currentChildElement = {
      clientWidth: 80,
      clientHeight: 40,
    } as HTMLElement;

    const placedChildren = new PlacedChildren([
      {
        top: 0,
        left: 0,
        width: 100,
        height: 50,
        remainingRowWidth: 600,
        element: {} as HTMLElement,
      },
      {
        top: 0,
        left: 100,
        width: 100,
        height: 50,
        remainingRowWidth: 400,
        element: {} as HTMLElement,
      },
      {
        top: 0,
        left: 200,
        width: 100,
        height: 50,
        remainingRowWidth: 200,
        element: {} as HTMLElement,
      },
      {
        top: 50,
        left: 0,
        width: 100,
        height: 60,
        remainingRowWidth: 600,
        element: {} as HTMLElement,
      },
    ]);
    let capturedContext = {} as PlacementMiddlewareContext;

    baseRowPlacement().callback({
      context: {
        gap: 0,
        container: {
          element: {} as HTMLElement,
          width: 800,
          paddingTop: 0,
          paddingLeft: 0,
        },
        placedChildren,
        childrenElements: [],
        currentChildElement,
      },
      setContext: (c) => {
        capturedContext = typeof c === "function" ? c(capturedContext) : c;
      },
    });

    expect(capturedContext.currentChild?.top).toBe(50);
  });

  test("bugfix: should take gap into account when calculating dimensions", () => {
    const currentChildElement = {
      clientWidth: 238,
      clientHeight: 312,
    } as HTMLElement;
    const placedChildren = new PlacedChildren([
      {
        top: 0,
        left: 0,
        element: {} as HTMLElement,
        width: 235,
        height: 304,
        remainingRowWidth: 752,
      },
      {
        top: 0,
        left: 243,
        element: {} as HTMLElement,
        width: 240,
        height: 324,
        remainingRowWidth: 512,
      },
      {
        top: 0,
        left: 491,
        element: {} as HTMLElement,
        width: 250,
        height: 314,
        remainingRowWidth: 262,
      },
      {
        top: 0,
        left: 749,
        element: {} as HTMLElement,
        width: 220,
        height: 294,
        remainingRowWidth: 42,
      },
      {
        top: 332,
        left: 0,
        element: {} as HTMLElement,
        width: 260,
        height: 334,
        remainingRowWidth: 727,
      },
      {
        top: 332,
        left: 268,
        element: {} as HTMLElement,
        width: 230,
        height: 309,
        remainingRowWidth: 497,
      },
      {
        top: 322,
        left: 506,
        element: {} as HTMLElement,
        width: 245,
        height: 319,
        remainingRowWidth: 252,
      },
      {
        top: 674,
        left: 0,
        element: {} as HTMLElement,
        width: 255,
        height: 329,
        remainingRowWidth: 732,
      },
      {
        top: 649,
        left: 263,
        element: {} as HTMLElement,
        width: 225,
        height: 299,
        remainingRowWidth: 507,
      },
      {
        top: 649,
        left: 496,
        element: {} as HTMLElement,
        width: 265,
        height: 339,
        remainingRowWidth: 242,
      },
    ]);
    let capturedContext = {} as PlacementMiddlewareContext;

    baseRowPlacement().callback({
      context: {
        gap: 8,
        container: {
          element: {} as HTMLElement,
          width: 1018,
          paddingTop: 0,
          paddingLeft: 0,
        },
        placedChildren,
        childrenElements: [],
        currentChildElement,
      },
      setContext: (c) => {
        capturedContext = typeof c === "function" ? c(capturedContext) : c;
      },
    });

    expect(capturedContext.currentChild).toEqual({
      top: 1011,
      left: 0,
      width: 238,
      height: 312,
      remainingRowWidth: 780,
      element: currentChildElement,
    });
  });

  test("should take prev child top position if closest top children missing", () => {
    const currentChildElement = {
      clientWidth: 238,
      clientHeight: 312,
    } as HTMLElement;
    const placedChildren = new PlacedChildren([
      {
        top: 0,
        left: 0,
        element: {} as HTMLElement,
        width: 235,
        height: 304,
        remainingRowWidth: 772,
      },
      {
        top: 0,
        left: 243,
        element: {} as HTMLElement,
        width: 240,
        height: 324,
        remainingRowWidth: 524,
      },
      {
        top: 0,
        left: 491,
        element: {} as HTMLElement,
        width: 250,
        height: 314,
        remainingRowWidth: 266,
      },
      {
        top: 0,
        left: 749,
        element: {} as HTMLElement,
        width: 220,
        height: 294,
        remainingRowWidth: 38,
      },
      {
        top: 332,
        left: 0,
        element: {} as HTMLElement,
        width: 260,
        height: 334,
        remainingRowWidth: 747,
      },
      {
        top: 332,
        left: 268,
        element: {} as HTMLElement,
        width: 230,
        height: 309,
        remainingRowWidth: 509,
      },
      {
        top: 322,
        left: 506,
        element: {} as HTMLElement,
        width: 245,
        height: 319,
        remainingRowWidth: 256,
      },
      {
        top: 674,
        left: 0,
        element: {} as HTMLElement,
        width: 255,
        height: 329,
        remainingRowWidth: 752,
      },
      {
        top: 649,
        left: 263,
        element: {} as HTMLElement,
        width: 225,
        height: 299,
        remainingRowWidth: 519,
      },
      {
        top: 649,
        left: 496,
        element: {} as HTMLElement,
        width: 265,
        height: 339,
        remainingRowWidth: 246,
      },
    ]);
    let capturedContext = {} as PlacementMiddlewareContext;

    baseRowPlacement().callback({
      context: {
        gap: 8,
        container: {
          element: {} as HTMLElement,
          width: 1038,
          paddingTop: 0,
          paddingLeft: 0,
        },
        placedChildren,
        childrenElements: [],
        currentChildElement,
      },
      setContext: (c) => {
        capturedContext = typeof c === "function" ? c(capturedContext) : c;
      },
    });

    expect(capturedContext.currentChild).toEqual({
      top: 649,
      left: 769,
      width: 238,
      height: 312,
      remainingRowWidth: 0,
      element: currentChildElement,
    });
  });
});
