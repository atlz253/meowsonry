import { MIDDLEWARE_TYPE } from "./constants";
import { BeforePlacementMiddleware } from "./types";

export const gap = (value: number): BeforePlacementMiddleware => ({
  type: MIDDLEWARE_TYPE.beforePlacement,
  callback: ({ context: { gap = 0 }, setContext }) => {
    setContext((prev) => ({ ...prev, gap: gap + value }));
  },
});
