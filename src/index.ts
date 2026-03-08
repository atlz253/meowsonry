import { Middleware } from "./middleware";
import { rowPlacement } from "./middleware/rowPlacement";
import { MIDDLEWARE_TYPE } from "./middleware/constants";
import { containerProperties } from "./middleware/containerProperties";
import { handleMiddleware } from "./middleware/handleMiddleware";
import { setPositionProperty } from "./middleware/position";
import { endCurrentChildPlacement } from "./middleware/endCurrentChildPlacement";
import { PlacedChildren } from "./PlacedChildren";

export { autoUpdate } from "./autoUpdate";

/**
 * Arranges elements inside a container according to masonry layout rules
 *
 * @param options - Configuration object
 * @param options.container - The container HTML element to apply masonry layout
 * @param options.middleware - Array of middleware functions to customize placement behavior
 *
 * @example
 * // Basic usage with default settings
 * import meowsonry from 'meowsonry';
 * const container = document.querySelector('.masonry');
 * meowsonry({ container });
 *
 * @example
 * // With custom middleware
 * import meowsonry, { Middleware } from 'meowsonry';
 * const container = document.querySelector('.masonry');
 * const customMiddleware: Middleware[] = [
 *   // Your custom middleware here
 * ];
 * meowsonry({ container, middleware: customMiddleware });
 *
 * @example
 * // Using with autoUpdate
 * import { meowsonry, autoUpdate } from 'meowsonry';
 * const container = document.querySelector('.masonry');
 * const instance = meowsonry({ container });
 * autoUpdate(container, instance);
 */
export function meowsonry({
  container: containerElement,
  middleware = [],
}: {
  container: HTMLElement;
  middleware?: Middleware[];
}) {
  const { container, gap = 0 } = handleMiddleware({
    initialContext: { container: { element: containerElement } },
    middleware: [
      setPositionProperty({
        value: "relative",
        apply: ({ value, container }) => {
          if (!container) throw new Error("container missing");
          container.style.position = value;
        },
      }),
      containerProperties(),
      ...middleware.filter(
        (m) =>
          m.type === MIDDLEWARE_TYPE.beforePlacement ||
          m.type === MIDDLEWARE_TYPE.common,
      ),
    ],
  });
  const childrenElements = Array.from(containerElement.children).filter(
    (c) => c instanceof HTMLElement,
  );
  const placedChildren = new PlacedChildren();
  const placementMiddleware = [
    setPositionProperty({
      value: "absolute",
      apply: ({ value, currentChildElement }) => {
        if (!currentChildElement)
          throw new Error("currentChildElement missing");
        currentChildElement.style.position = value;
      },
    }),
    rowPlacement(),
    ...middleware.filter(
      (m) =>
        m.type === MIDDLEWARE_TYPE.placement ||
        m.type === MIDDLEWARE_TYPE.common,
    ),
    endCurrentChildPlacement(),
  ];
  childrenElements.forEach((currentChildElement) =>
    handleMiddleware({
      initialContext: {
        gap,
        container: {
          paddingLeft: 0,
          paddingTop: 0,
          width: 0,
          ...container,
        },
        placedChildren,
        childrenElements,
        currentChildElement,
      },
      middleware: placementMiddleware,
    }),
  );
  placedChildren.forEach(({ element, top, left }) =>
    Object.assign(element.style, { top: `${top}px`, left: `${left}px` }),
  );
  Object.assign(containerElement.style, {
    height: `${placedChildren.height}px`,
  });
}

export default meowsonry;
