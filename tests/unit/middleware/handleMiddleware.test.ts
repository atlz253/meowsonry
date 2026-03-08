import { describe, expect, test } from "vitest";
import { handleMiddleware } from "../../../src/middleware/handleMiddleware";
import { MIDDLEWARE_TYPE } from "../../../src/middleware/constants";
import type {
  BeforePlacementMiddlewareContext,
  PlacementMiddlewareContext,
} from "../../../src/middleware/types";

describe("handleMiddleware", () => {
  test("should return initial context if middleware array is empty", () => {
    const initialContext: BeforePlacementMiddlewareContext = {
      container: {
        element: {} as HTMLElement,
        width: 100,
      },
    };

    const result = handleMiddleware({
      middleware: [],
      initialContext,
    });

    expect(result).toBe(initialContext);
  });

  test("should allow middleware to modify context using setContext", () => {
    const initialContext: BeforePlacementMiddlewareContext = {
      container: {
        element: {} as HTMLElement,
        width: 100,
      },
    };

    const result = handleMiddleware({
      middleware: [
        {
          type: MIDDLEWARE_TYPE.beforePlacement,
          callback: ({ setContext }) => {
            setContext({
              container: {
                element: {} as HTMLElement,
                width: 200,
              },
            });
          },
        },
      ],
      initialContext,
    });

    expect(result.container.width).toBe(200);
  });

  test("should allow middleware to modify context using function setter", () => {
    const initialContext: BeforePlacementMiddlewareContext = {
      container: {
        element: {} as HTMLElement,
        width: 100,
      },
    };

    const result = handleMiddleware({
      middleware: [
        {
          type: MIDDLEWARE_TYPE.beforePlacement,
          callback: ({ setContext }) => {
            setContext((prev) => ({
              ...prev,
              container: {
                ...prev.container,
                width: (prev.container.width ?? 0) + 50,
              },
            }));
          },
        },
      ],
      initialContext,
    });

    expect(result.container.width).toBe(150);
  });

  test("should apply middleware in order", () => {
    const containerElement = {} as HTMLElement;
    const initialContext: BeforePlacementMiddlewareContext = {
      container: {
        element: containerElement,
        width: 100,
      },
    };

    const result = handleMiddleware({
      middleware: [
        {
          type: MIDDLEWARE_TYPE.beforePlacement,
          callback: ({ setContext }) => {
            setContext({
              container: {
                element: containerElement,
                width: 150,
              },
            });
          },
        },
        {
          type: MIDDLEWARE_TYPE.beforePlacement,
          callback: ({ setContext }) => {
            setContext({
              container: {
                element: containerElement,
                width: 200,
              },
            });
          },
        },
      ],
      initialContext,
    });

    expect(result.container.width).toBe(200);
  });

  test("should return same context object if no modifications", () => {
    const initialContext: BeforePlacementMiddlewareContext = {
      container: {
        element: {} as HTMLElement,
        width: 100,
      },
    };

    const result = handleMiddleware({
      middleware: [],
      initialContext,
    });

    expect(result).toBe(initialContext);
  });

  test("should allow placement middleware to modify context", () => {
    const childrenElements: HTMLElement[] = [];
    const currentChildElement = {} as HTMLElement;

    const initialContext: PlacementMiddlewareContext = {
      gap: 0,
      container: {
        element: {} as HTMLElement,
        width: 100,
        paddingTop: 0,
        paddingLeft: 0,
      },
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
            setContext({
              ...initialContext,
              container: { ...initialContext.container, width: 300 },
            });
          },
        },
      ],
      initialContext,
    });

    expect(result.container.width).toBe(300);
  });
});
