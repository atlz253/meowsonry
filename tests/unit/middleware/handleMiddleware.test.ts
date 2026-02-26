import { describe, expect, test } from "vitest";
import { handleMiddleware } from "../../../src/middleware/handleMiddleware";
import { MIDDLEWARE_TYPE } from "../../../src/middleware/constants";
import type {
  BeforePlacementMiddlewareContext,
  PlacementMiddlewareContext,
} from "../../../src/middleware/types";

describe("handleMiddleware", () => {
  test("should return initial context if middleware array is empty", () => {
    const container = {} as HTMLElement;
    const initialContext: BeforePlacementMiddlewareContext = {
      container,
      containerWidth: 100,
    };

    const result = handleMiddleware({
      middleware: [],
      initialContext,
    });

    expect(result).toBe(initialContext);
  });

  test("should allow middleware to modify context using setContext", () => {
    const container = {} as HTMLElement;
    const initialContext: BeforePlacementMiddlewareContext = {
      container,
      containerWidth: 100,
    };

    const result = handleMiddleware({
      middleware: [
        {
          type: MIDDLEWARE_TYPE.beforePlacement,
          callback: ({ setContext }) => {
            setContext({ container, containerWidth: 200 });
          },
        },
      ],
      initialContext,
    });

    expect(result.containerWidth).toBe(200);
  });

  test("should allow middleware to modify context using function setter", () => {
    const container = {} as HTMLElement;
    const initialContext: BeforePlacementMiddlewareContext = {
      container,
      containerWidth: 100,
    };

    const result = handleMiddleware({
      middleware: [
        {
          type: MIDDLEWARE_TYPE.beforePlacement,
          callback: ({ setContext }) => {
            setContext((prev) => ({
              ...prev,
              containerWidth: (prev.containerWidth ?? 0) + 50,
            }));
          },
        },
      ],
      initialContext,
    });

    expect(result.containerWidth).toBe(150);
  });

  test("should apply middleware in order", () => {
    const container = {} as HTMLElement;
    const initialContext: BeforePlacementMiddlewareContext = {
      container,
      containerWidth: 100,
    };

    const result = handleMiddleware({
      middleware: [
        {
          type: MIDDLEWARE_TYPE.beforePlacement,
          callback: ({ setContext }) => {
            setContext({ container, containerWidth: 150 });
          },
        },
        {
          type: MIDDLEWARE_TYPE.beforePlacement,
          callback: ({ setContext }) => {
            setContext({ container, containerWidth: 200 });
          },
        },
      ],
      initialContext,
    });

    expect(result.containerWidth).toBe(200);
  });

  test("should return same context object if no modifications", () => {
    const container = {} as HTMLElement;
    const initialContext: BeforePlacementMiddlewareContext = {
      container,
      containerWidth: 100,
    };

    const result = handleMiddleware({
      middleware: [],
      initialContext,
    });

    expect(result).toBe(initialContext);
  });

  test("should allow placement middleware to modify context", () => {
    const container = {} as HTMLElement;
    const childrenElements: HTMLElement[] = [];
    const currentChildElement = {} as HTMLElement;

    const initialContext: PlacementMiddlewareContext = {
      container,
      containerWidth: 100,
      placedChildren: null as never,
      childrenElements,
      currentChildElement,
      currentChild: undefined as never,
    };

    const result = handleMiddleware({
      middleware: [
        {
          type: MIDDLEWARE_TYPE.placement,
          callback: ({ setContext }) => {
            setContext({ ...initialContext, containerWidth: 300 });
          },
        },
      ],
      initialContext,
    });

    expect(result.containerWidth).toBe(300);
  });
});
