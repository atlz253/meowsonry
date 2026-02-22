import { describe, expect, test } from "vitest";
import { NumericRange } from "../../src/Range";

describe("NumericRange", () => {
  test("must store the range correctly", () => {
    const correctRange = new NumericRange(1, 5);
    const reversedRange = new NumericRange(5, 1);

    expect(correctRange.from).toBe(1);
    expect(correctRange.to).toBe(5);
    expect(reversedRange.from).toBe(1);
    expect(reversedRange.to).toBe(5);
  });

  test("contains should work", () => {
    expect(new NumericRange(5, 20).contains(10, 15)).toBe(true);
    expect(new NumericRange(5, 20).contains(5, 10)).toBe(true);
    expect(new NumericRange(5, 20).contains(15, 20)).toBe(true);
    expect(new NumericRange(5, 20).contains(3, 10)).toBe(true);
    expect(new NumericRange(5, 20).contains(3, 20)).toBe(true);
    expect(new NumericRange(5, 20).contains(3, 5)).toBe(true);
    expect(new NumericRange(5, 20).contains(15, 30)).toBe(true);
    expect(new NumericRange(5, 20).contains(20, 30)).toBe(true);
    expect(new NumericRange(5, 20).contains(5, 30)).toBe(true);
    expect(new NumericRange(5, 20).contains(2, 4)).toBe(false);
    expect(new NumericRange(5, 20).contains(25, 30)).toBe(false);

    expect(new NumericRange(10, 15).contains(5, 20)).toBe(true);
    expect(new NumericRange(5, 10).contains(5, 20)).toBe(true);
    expect(new NumericRange(15, 20).contains(5, 20)).toBe(true);
    expect(new NumericRange(3, 10).contains(5, 20)).toBe(true);
    expect(new NumericRange(3, 20).contains(5, 20)).toBe(true);
    expect(new NumericRange(3, 5).contains(5, 20)).toBe(true);
    expect(new NumericRange(15, 30).contains(5, 20)).toBe(true);
    expect(new NumericRange(20, 30).contains(5, 20)).toBe(true);
    expect(new NumericRange(5, 30).contains(5, 20)).toBe(true);
    expect(new NumericRange(2, 4).contains(5, 20)).toBe(false);
    expect(new NumericRange(25, 30).contains(5, 20)).toBe(false);
  });
});
