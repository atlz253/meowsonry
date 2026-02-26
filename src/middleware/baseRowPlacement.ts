import { PlacementMiddleware } from "./types";

export const baseRowPlacement = (): PlacementMiddleware => ({
  type: "placement",
  callback: ({
    context: { placedChildren, currentChildElement, containerWidth },
    setContext,
  }) => {
    const prevChild = placedChildren.at(-1);
    const left =
      prevChild === undefined ||
      prevChild.remainingRowWidth < currentChildElement.clientWidth
        ? 0
        : prevChild.left + prevChild.width;

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
    let top = Math.max(
      0,
      ...closestTopChildrenWithoutSameRowPrev.map((c) => c.top + c.height),
    );
    setContext((prev) => ({
      ...prev,
      currentChild: {
        top: top,
        left: left,
        width: currentChildElement.clientWidth,
        height: currentChildElement.clientHeight,
        remainingRowWidth:
          prevChild &&
          prevChild.remainingRowWidth >= currentChildElement.clientWidth
            ? prevChild.remainingRowWidth - currentChildElement.clientWidth
            : containerWidth - currentChildElement.clientWidth,
      },
    }));
  },
});
