import { MIDDLEWARE_TYPE } from "./constants";
import { BeforePlacementMiddleware } from "./types";

export const containerProperties = (): BeforePlacementMiddleware => ({
  type: MIDDLEWARE_TYPE.beforePlacement,
  callback: ({
    context: {
      container: { element },
    },
    setContext,
  }) => {
    const computedStyle = getComputedStyle(element);
    setContext((prev) => ({
      ...prev,
      container: {
        element,
        width: element.clientWidth,
        paddingLeft: parseFloat(computedStyle.paddingLeft),
        paddingTop: parseFloat(computedStyle.paddingTop),
      },
    }));
  },
});
