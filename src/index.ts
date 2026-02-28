import { Middleware } from "./middleware";
import { baseRowPlacement } from "./middleware/baseRowPlacement";
import { MIDDLEWARE_TYPE } from "./middleware/constants";
import { containerClientWidth } from "./middleware/containerClientWidth";
import { handleMiddleware } from "./middleware/handleMiddleware";
import { setPositionProperty } from "./middleware/position";
import { endCurrentChildPlacement } from "./middleware/endCurrentChildPlacement";
import { PlacedChildren } from "./PlacedChildren";

export function meowsonry({
  container,
  middleware = [],
}: {
  container: HTMLElement;
  middleware?: Middleware[];
}) {
  const { containerWidth = 0, gap = 0 } = handleMiddleware({
    initialContext: { container },
    middleware: [
      setPositionProperty({
        value: "relative",
        apply: ({ value, container }) => {
          if (!container) throw new Error("container missing");
          container.style.position = value;
        },
      }),
      containerClientWidth({
        apply: ({ clientWidth, setContext }) => {
          setContext((prev) => ({
            ...prev,
            containerWidth: clientWidth,
          }));
        },
      }),
      ...middleware.filter(
        (m) =>
          m.type === MIDDLEWARE_TYPE.beforePlacement ||
          m.type === MIDDLEWARE_TYPE.common,
      ),
    ],
  });
  const childrenElements = Array.from(container.children).filter(
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
        container,
        containerWidth,
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
  // TODO: apply height to container
}

export default meowsonry;
