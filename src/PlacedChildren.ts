import { PlacedChild } from "./types";
import { NumericRange } from "./Range";

export class PlacedChildren {
  readonly #placed: PlacedChild[] = [];

  constructor(placed?: PlacedChild[]) {
    if (placed) this.#placed.push(...placed);
  }

  get placed() {
    return [...this.#placed];
  }

  private get rowsCount() {
    if (this.#placed.length === 0) return 0;
    let count = 1;
    let prevRemainingWidth = this.#placed[0].remainingRowWidth;
    for (let i = 1; i < this.#placed.length; i++) {
      const { remainingRowWidth } = this.#placed[i];
      if (remainingRowWidth > prevRemainingWidth) {
        count++;
      }
      prevRemainingWidth = remainingRowWidth;
    }
    return count;
  }

  public push(...items: PlacedChild[]) {
    return this.#placed.push(...items);
  }

  public at(index: number) {
    return this.#placed.at(index);
  }

  public getClosestTopChildrenByRange(x1: number, x2: number) {
    const range = new NumericRange(x1, x2);
    const currentRow = this.rowAt(-1);
    const prevRow = this.rowAt(-2);
    const currentRowChildrenInRange = currentRow.filter(({ left, width }) =>
      range.contains(left, left + width),
    );
    const currentRowLastChildrenInRange = currentRowChildrenInRange.at(-1);
    const currentRowFurtherX = currentRowLastChildrenInRange
      ? currentRowLastChildrenInRange.left + currentRowLastChildrenInRange.width
      : 0;
    const prevRowChildrenInRange = prevRow.filter(
      ({ left, width }) =>
        left + width > currentRowFurtherX && range.contains(left, left + width),
    );
    return [...currentRowChildrenInRange, ...prevRowChildrenInRange];
  }

  public rowAt(index: number) {
    if (index >= 0) {
      return this.getRow(index);
    } else {
      return this.getLastRow(Math.abs(index) - 1);
    }
  }

  private getRow(index: number) {
    const startIndex = this.getRowFirstChildIndex(index);
    return startIndex === -1 ? [] : this.getRowChildrenByStartIndex(startIndex);
  }

  private getLastRow(index: number) {
    // TODO: start searching from array end
    const startIndex = this.getRowFirstChildIndex(this.rowsCount - 1 - index);
    return startIndex === -1 ? [] : this.getRowChildrenByStartIndex(startIndex);
  }

  private getRowFirstChildIndex(rowIndex: number) {
    if (this.#placed.length === 0) return -1;
    let rowStartIndex = 0;
    let currentRowIndex = 0;
    for (
      let i = 1, prevRemainingWidth = this.#placed[0].remainingRowWidth;
      i < this.#placed.length && currentRowIndex !== rowIndex;
      i++
    ) {
      const { remainingRowWidth } = this.#placed[i];
      if (remainingRowWidth > prevRemainingWidth) {
        currentRowIndex++;
        rowStartIndex = i;
      }
      prevRemainingWidth = remainingRowWidth;
    }
    return currentRowIndex === rowIndex ? rowStartIndex : -1;
  }

  private getRowChildrenByStartIndex(startIndex: number) {
    const result: PlacedChild[] = [];
    for (
      let i = startIndex, prevRemainingWidth = Infinity;
      i < this.#placed.length;
      i++
    ) {
      const children = this.#placed[i];
      if (children.remainingRowWidth > prevRemainingWidth) {
        break;
      } else {
        result.push(children);
        prevRemainingWidth = children.remainingRowWidth;
      }
    }
    return result;
  }
}
