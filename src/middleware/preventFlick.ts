import { CommonMiddleware } from "./types";

const INITIAL_RENDER_ATTRIBUTE = "data-meowsonry-prevent-flick";
const INITIAL_RENDER_INDEX_PROPERTY = "--meowsonry-index";

const initializedContainers = new WeakSet<HTMLElement>();
const pendingContainers = new WeakSet<HTMLElement>();

/**
 * Prevents the initial unpositioned layout from being visible and marks
 * elements with CSS hooks that can be used for first-render animations.
 */
export const preventFlick = (): CommonMiddleware => ({
  type: "common",
  callback: ({ context }) => {
    const childrenElements = (context as { childrenElements?: HTMLElement[] })
      .childrenElements;
    const containerElement = context.container?.element;

    if (!containerElement || initializedContainers.has(containerElement)) {
      return;
    }

    if (context.currentChildElement) {
      const initialRenderIndex =
        childrenElements?.indexOf(context.currentChildElement) ?? -1;

      context.currentChildElement.setAttribute(INITIAL_RENDER_ATTRIBUTE, "");

      if (initialRenderIndex >= 0) {
        context.currentChildElement.style.setProperty(
          INITIAL_RENDER_INDEX_PROPERTY,
          initialRenderIndex.toString(),
        );
      }

      return;
    }

    if (pendingContainers.has(containerElement)) {
      return;
    }

    const previousVisibility = containerElement.style.visibility;

    pendingContainers.add(containerElement);
    containerElement.style.visibility = "hidden";

    queueMicrotask(() => {
      containerElement.style.visibility = previousVisibility;
      pendingContainers.delete(containerElement);
      initializedContainers.add(containerElement);
    });
  },
});
