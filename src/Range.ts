export class NumericRange {
  readonly from;
  readonly to;

  constructor(from: number, to: number) {
    this.from = from < to ? from : to;
    this.to = to > from ? to : from;
  }

  contains(rangeOrFrom: NumericRange): boolean;
  contains(rangeOrFrom: number, to: number): boolean;
  contains(rangeOrFrom: NumericRange | number, to?: number) {
    if (rangeOrFrom instanceof NumericRange) {
      const range = rangeOrFrom;
      return (
        (this.from <= range.from && this.to >= range.to) ||
        (this.from <= range.to && this.to >= range.to) ||
        (this.from <= range.from && this.to >= range.from) ||
        (range.from <= this.from && range.to >= this.to)
      );
    } else if (to) {
      return this.contains(new NumericRange(rangeOrFrom, to));
    } else {
      throw new Error("incorrect arguments");
    }
  }
}
