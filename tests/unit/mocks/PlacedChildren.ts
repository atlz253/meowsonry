import { ComputedChildPlacement } from "../../../src/types";

export function getThreeRowsBoxesPlacedChildren() {
  return [
    {
      top: 0,
      left: 0,
      width: 10,
      height: 10,
      remainingRowWidth: 20,
      element: {} as HTMLElement,
    },
    {
      top: 0,
      left: 10,
      width: 10,
      height: 10,
      remainingRowWidth: 10,
      element: {} as HTMLElement,
    },
    {
      top: 0,
      left: 20,
      width: 10,
      height: 10,
      remainingRowWidth: 0,
      element: {} as HTMLElement,
    },
    {
      top: 10,
      left: 0,
      width: 10,
      height: 10,
      remainingRowWidth: 20,
      element: {} as HTMLElement,
    },
    {
      top: 10,
      left: 10,
      width: 10,
      height: 10,
      remainingRowWidth: 10,
      element: {} as HTMLElement,
    },
    {
      top: 10,
      left: 20,
      width: 10,
      height: 10,
      remainingRowWidth: 0,
      element: {} as HTMLElement,
    },
    {
      top: 20,
      left: 0,
      width: 10,
      height: 10,
      remainingRowWidth: 20,
      element: {} as HTMLElement,
    },
    {
      top: 20,
      left: 10,
      width: 10,
      height: 10,
      remainingRowWidth: 10,
      element: {} as HTMLElement,
    },
    {
      top: 20,
      left: 20,
      width: 10,
      height: 10,
      remainingRowWidth: 0,
      element: {} as HTMLElement,
    },
  ] satisfies ComputedChildPlacement[];
}
