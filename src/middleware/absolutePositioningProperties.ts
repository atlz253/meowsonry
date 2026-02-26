import { PlacementMiddleware } from "./types";

export const absolutePositioningProperties = ({
  apply,
}: {
  apply: (props: {
    absolutePositioningProperties: { top: number; left: number };
    currentChildElement: HTMLElement;
  }) => void;
}): PlacementMiddleware => ({
  type: "placement",
  callback: ({ context: { currentChild, currentChildElement } }) => {
    if (!currentChild) throw new Error("currentChild missing");
    const { top, left } = currentChild;
    apply({
      currentChildElement,
      absolutePositioningProperties: { top, left },
    });
  },
});
