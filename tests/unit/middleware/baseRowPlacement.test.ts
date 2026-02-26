import { describe, expect, test } from "vitest";
import { baseRowPlacement } from "../../../src/middleware/baseRowPlacement";
import { PlacedChildren } from "../../../src/PlacedChildren";

describe("baseRowPlacement", () => {
  test("should place first child at top-left corner", () => {
    const currentChildElement = {
      clientWidth: 100,
      clientHeight: 50,
    } as HTMLElement;

    const placedChildren = new PlacedChildren();
    let capturedContext: any = null;

    baseRowPlacement().callback({
      context: {
        container: {} as HTMLElement,
        containerWidth: 800,
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
    });
  });

  test("should place child next to previous when there is space", () => {
    const currentChildElement = {
      clientWidth: 100,
      clientHeight: 50,
    } as HTMLElement;

    const placedChildren = new PlacedChildren([
      { top: 0, left: 0, width: 100, height: 50, remainingRowWidth: 600 },
    ]);
    let capturedContext: any = null;

    baseRowPlacement().callback({
      context: {
        container: {} as HTMLElement,
        containerWidth: 800,
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
    });
  });

  test("should wrap to new row when no space in current row", () => {
    const currentChildElement = {
      clientWidth: 300,
      clientHeight: 50,
    } as HTMLElement;

    const placedChildren = new PlacedChildren([
      { top: 0, left: 0, width: 400, height: 50, remainingRowWidth: 100 },
    ]);
    let capturedContext: any = null;

    baseRowPlacement().callback({
      context: {
        container: {} as HTMLElement,
        containerWidth: 800,
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
    });
  });

  test("should position below closest top children in same row", () => {
    const currentChildElement = {
      clientWidth: 80,
      clientHeight: 50,
    } as HTMLElement;

    const placedChildren = new PlacedChildren([
      { top: 0, left: 0, width: 100, height: 100, remainingRowWidth: 600 },
      { top: 0, left: 100, width: 100, height: 80, remainingRowWidth: 400 },
    ]);
    let capturedContext: any = null;

    baseRowPlacement().callback({
      context: {
        container: {} as HTMLElement,
        containerWidth: 800,
        placedChildren,
        childrenElements: [],
        currentChildElement,
      },
      setContext: (c) => {
        capturedContext = typeof c === "function" ? c(capturedContext) : c;
      },
    });

    expect(capturedContext.currentChild.top).toBe(0);
  });

  test("should position below all previous children when they are taller", () => {
    const currentChildElement = {
      clientWidth: 80,
      clientHeight: 50,
    } as HTMLElement;

    const placedChildren = new PlacedChildren([
      { top: 0, left: 0, width: 100, height: 150, remainingRowWidth: 600 },
      { top: 0, left: 100, width: 100, height: 200, remainingRowWidth: 400 },
    ]);
    let capturedContext: any = null;

    baseRowPlacement().callback({
      context: {
        container: {} as HTMLElement,
        containerWidth: 800,
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
    });
  });

  test("should work with multiple rows", () => {
    const currentChildElement = {
      clientWidth: 80,
      clientHeight: 40,
    } as HTMLElement;

    const placedChildren = new PlacedChildren([
      { top: 0, left: 0, width: 100, height: 50, remainingRowWidth: 600 },
      { top: 0, left: 100, width: 100, height: 50, remainingRowWidth: 400 },
      { top: 0, left: 200, width: 100, height: 50, remainingRowWidth: 200 },
      { top: 50, left: 0, width: 100, height: 60, remainingRowWidth: 600 },
    ]);
    let capturedContext: any = null;

    baseRowPlacement().callback({
      context: {
        container: {} as HTMLElement,
        containerWidth: 800,
        placedChildren,
        childrenElements: [],
        currentChildElement,
      },
      setContext: (c) => {
        capturedContext = typeof c === "function" ? c(capturedContext) : c;
      },
    });

    expect(capturedContext.currentChild.top).toBe(50);
  });
});
