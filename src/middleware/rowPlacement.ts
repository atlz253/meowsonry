import { PlacementMiddleware } from "./types";

export const rowPlacement = (): PlacementMiddleware => ({
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
      prevChild.remainingRowWidth < currentChildElement.clientWidth + gap
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
    const top =
      closestTopChildrenWithoutSameRowPrev.length == 0 && prevChild
        ? prevChild.top
        : Math.max(
            paddingTop,
            ...closestTopChildrenWithoutSameRowPrev.map(
              (c) => c.top + c.height + gap,
            ),
          );
    const remainingRowWidth = Math.max(
      0,
      prevChild &&
        prevChild.remainingRowWidth >= currentChildElement.clientWidth + gap
        ? prevChild.remainingRowWidth - currentChildElement.clientWidth - gap
        : width - currentChildElement.clientWidth,
    );
    setContext((prev) => ({
      ...prev,
      currentChild: {
        top: top,
        left: left,
        element: currentChildElement,
        width: currentChildElement.clientWidth,
        height: currentChildElement.clientHeight,
        remainingRowWidth: remainingRowWidth,
      },
    }));
  },
});
