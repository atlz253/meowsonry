import { PlacementMiddleware } from "./types";

export const endCurrentChildPlacement = (): PlacementMiddleware => ({
  type: "placement",
  callback: ({ context: { currentChild, placedChildren }, setContext }) => {
    if (!currentChild) throw new Error("currentChild missing");
    placedChildren.push(currentChild);
  },
});
