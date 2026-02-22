import { PlacedChild } from "../../../src/types";

export function getThreeRowsBoxesPlacedChildren() {
  return [
    { top: 0, left: 0, width: 10, height: 10, remainingRowWidth: 20 },
    { top: 0, left: 10, width: 10, height: 10, remainingRowWidth: 10 },
    { top: 0, left: 20, width: 10, height: 10, remainingRowWidth: 0 },
    { top: 10, left: 0, width: 10, height: 10, remainingRowWidth: 20 },
    { top: 10, left: 10, width: 10, height: 10, remainingRowWidth: 10 },
    { top: 10, left: 20, width: 10, height: 10, remainingRowWidth: 0 },
    { top: 20, left: 0, width: 10, height: 10, remainingRowWidth: 20 },
    { top: 20, left: 10, width: 10, height: 10, remainingRowWidth: 10 },
    { top: 20, left: 20, width: 10, height: 10, remainingRowWidth: 0 },
  ] satisfies PlacedChild[];
}
