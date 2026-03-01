import { PlacementMiddleware } from "./types";

export const baseRowPlacement = (): PlacementMiddleware => ({
  type: "placement",
  callback: ({
    context: {
      placedChildren,
      currentChildElement,
      container: { width, paddingLeft, paddingTop },
      gap,
    },
    setContext,
  }) => {
    const prevChild = placedChildren.at(-1);
    const left =
      prevChild === undefined ||
      prevChild.remainingRowWidth < currentChildElement.clientWidth
        ? paddingLeft
        : prevChild.left + prevChild.width + gap;
    const closestTopChildren = placedChildren.getClosestTopChildrenByRange(
      left,
      left + currentChildElement.clientWidth,
    );
    const closestTopChildrenWithoutSameRowPrev =
      prevChild &&
      prevChild === closestTopChildren[0] &&
      prevChild.remainingRowWidth >= currentChildElement.clientWidth
        ? closestTopChildren.slice(1)
        : closestTopChildren;
    const top = Math.max(
      paddingTop,
      ...closestTopChildrenWithoutSameRowPrev.map(
        (c) => c.top + c.height + gap,
      ),
    );
    setContext((prev) => ({
      ...prev,
      currentChild: {
        top: top,
        left: left,
        element: currentChildElement,
        width: currentChildElement.clientWidth,
        height: currentChildElement.clientHeight,
        remainingRowWidth:
          prevChild &&
          prevChild.remainingRowWidth >= currentChildElement.clientWidth
            ? prevChild.remainingRowWidth - currentChildElement.clientWidth
            : width - currentChildElement.clientWidth,
      },
    }));
  },
});
