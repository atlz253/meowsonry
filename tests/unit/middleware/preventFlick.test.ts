import { describe, expect, test } from "vitest";
import { preventFlick } from "../../../src";
import { handleMiddleware } from "../../../src/middleware/handleMiddleware";
import { PlacedChildren } from "../../../src/PlacedChildren";
import { FakeElement } from "../mocks";
import type {
  BeforePlacementMiddlewareContext,
  PlacementMiddlewareContext,
} from "../../../src/middleware/types";

const createBeforePlacementContext = (
  containerElement: HTMLElement,
): BeforePlacementMiddlewareContext => ({
  container: {
    element: containerElement,
    width: 100,
  },
});

const createPlacementContext = ({
  containerElement,
  childrenElements,
  currentChildElement,
}: {
  containerElement: HTMLElement;
  childrenElements: HTMLElement[];
  currentChildElement: HTMLElement;
}): PlacementMiddlewareContext => ({
  gap: 0,
  container: {
    element: containerElement,
    width: 100,
    paddingTop: 0,
    paddingLeft: 0,
  },
  placedChildren: new PlacedChildren(),
  childrenElements,
  currentChildElement,
});

describe("preventFlick", () => {
  test("should hide container and restore previous inline visibility", async () => {
    const container = new FakeElement() as unknown as HTMLElement;
    const middleware = [preventFlick()];

    container.style.visibility = "visible";

    handleMiddleware({
      middleware,
      initialContext: createBeforePlacementContext(container),
    });

    expect(container.style.visibility).toBe("hidden");

    await Promise.resolve();

    expect(container.style.visibility).toBe("visible");
  });

  test("should clear previous hidden visibility from container", async () => {
    const container = new FakeElement() as unknown as HTMLElement;
    const middleware = [preventFlick()];

    container.style.visibility = "hidden";

    handleMiddleware({
      middleware,
      initialContext: createBeforePlacementContext(container),
    });

    expect(container.style.visibility).toBe("hidden");

    await Promise.resolve();

    expect(container.style.visibility).toBe("");
  });

  test("should set initial render attribute and index on first layout", () => {
    const container = new FakeElement() as unknown as HTMLElement;
    const firstChild = new FakeElement() as unknown as HTMLElement;
    const secondChild = new FakeElement() as unknown as HTMLElement;
    const middleware = [preventFlick()];

    handleMiddleware({
      middleware,
      initialContext: createBeforePlacementContext(container),
    });

    [firstChild, secondChild].forEach((currentChildElement) =>
      handleMiddleware({
        middleware,
        initialContext: createPlacementContext({
          containerElement: container,
          childrenElements: [firstChild, secondChild],
          currentChildElement,
        }),
      }),
    );

    expect(firstChild.hasAttribute("data-meowsonry-prevent-flick")).toBe(true);
    expect(firstChild.getAttribute("data-meowsonry-prevent-flick")).toBe("");
    expect(firstChild.style.getPropertyValue("--meowsonry-index")).toBe("0");
    expect(secondChild.hasAttribute("data-meowsonry-prevent-flick")).toBe(true);
    expect(secondChild.style.getPropertyValue("--meowsonry-index")).toBe("1");
  });

  test("should not update initial render hooks after first layout", async () => {
    const container = new FakeElement() as unknown as HTMLElement;
    const firstChild = new FakeElement() as unknown as HTMLElement;
    const secondChild = new FakeElement() as unknown as HTMLElement;
    const middleware = [preventFlick()];

    handleMiddleware({
      middleware,
      initialContext: createBeforePlacementContext(container),
    });
    handleMiddleware({
      middleware,
      initialContext: createPlacementContext({
        containerElement: container,
        childrenElements: [firstChild],
        currentChildElement: firstChild,
      }),
    });

    await Promise.resolve();

    handleMiddleware({
      middleware,
      initialContext: createBeforePlacementContext(container),
    });
    handleMiddleware({
      middleware,
      initialContext: createPlacementContext({
        containerElement: container,
        childrenElements: [firstChild, secondChild],
        currentChildElement: secondChild,
      }),
    });

    expect(firstChild.style.getPropertyValue("--meowsonry-index")).toBe("0");
    expect(secondChild.hasAttribute("data-meowsonry-prevent-flick")).toBe(
      false,
    );
    expect(secondChild.style.getPropertyValue("--meowsonry-index")).toBe("");
  });
});
