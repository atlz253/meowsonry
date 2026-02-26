import { CommonMiddleware } from "./types";

type PositionProperty = "absolute" | "relative";

export const setPositionProperty = ({
  value,
  apply,
}: {
  value: PositionProperty;
  apply: (props: {
    value: PositionProperty;
    container?: HTMLElement;
    currentChildElement?: HTMLElement;
  }) => void;
}): CommonMiddleware => ({
  type: "common",
  callback: ({ context: { container, currentChildElement } }) => {
    apply({ value, container, currentChildElement });
  },
});
