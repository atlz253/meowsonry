import { Middleware } from "./middleware";
import { baseRowPlacement } from "./middleware/baseRowPlacement";
import { MIDDLEWARE_TYPE } from "./middleware/constants";
import { containerProperties } from "./middleware/containerProperties";
import { handleMiddleware } from "./middleware/handleMiddleware";
import { setPositionProperty } from "./middleware/position";
import { endCurrentChildPlacement } from "./middleware/endCurrentChildPlacement";
import { PlacedChildren } from "./PlacedChildren";

export { autoUpdate } from "./autoUpdate";

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
    baseRowPlacement(),
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
