import { describe, expect, test } from "vitest";
import { PlacedChildren } from "../../src/PlacedChildren";
import { PlacedChild } from "../../src/types";
import { getThreeRowsBoxesPlacedChildren } from "./mocks";

describe("PlacedChildren", () => {
  test("push should work", () => {
    const placedChildren = new PlacedChildren();
    const testItems: PlacedChild[] = [
      { top: 0, left: 0, width: 10, height: 10, remainingRowWidth: 90 },
      { top: 0, left: 11, width: 10, height: 10, remainingRowWidth: 79 },
    ];

    placedChildren.push(...testItems);

    expect(placedChildren.placed).toEqual(testItems);
  });

  test("at should work", () => {
    const placedChildren = new PlacedChildren([
      { top: 0, left: 0, width: 10, height: 10, remainingRowWidth: 90 },
      { top: 0, left: 11, width: 10, height: 10, remainingRowWidth: 79 },
    ]);

    expect(placedChildren.at(0)).toEqual({
      top: 0,
      left: 0,
      width: 10,
      height: 10,
      remainingRowWidth: 90,
    });
    expect(placedChildren.at(-1)).toEqual({
      top: 0,
      left: 11,
      width: 10,
      height: 10,
      remainingRowWidth: 79,
    });
  });

  describe("rowAt", () => {
    test("should return empty array if placed child empty", () => {
      const placedChildren = new PlacedChildren();
      expect(placedChildren.rowAt(0)).toEqual([]);
      expect(placedChildren.rowAt(-1)).toEqual([]);
    });

    test("should return same array for 0 and -1 indexes if only one row", () => {
      const placedChildrenObjects = [
        { top: 0, left: 0, width: 10, height: 10, remainingRowWidth: 90 },
        { top: 0, left: 11, width: 10, height: 10, remainingRowWidth: 79 },
      ];
      const placedChildren = new PlacedChildren(placedChildrenObjects);
      expect(placedChildren.rowAt(0)).toEqual(placedChildrenObjects);
      expect(placedChildren.rowAt(-1)).toEqual(placedChildrenObjects);
    });

    test("positive and zero indexes should work", () => {
      const children = getThreeRowsBoxesPlacedChildren();
      const placedChildren = new PlacedChildren(children);

      expect(placedChildren.rowAt(0)).toEqual(children.slice(0, 3));
      expect(placedChildren.rowAt(1)).toEqual(children.slice(3, 6));
      expect(placedChildren.rowAt(2)).toEqual(children.slice(6));
    });

    test("negative indexes should work", () => {});
  });

  describe("getRowFirstChildIndex", () => {
    test("should return -1 if children empty", () => {
      const placedChildren = new PlacedChildren();
      // @ts-expect-error getRowFirstChildIndex test
      expect(placedChildren.getRowFirstChildIndex(0)).toEqual(-1);
    });

    test("should return -1 if row doesn't exist", () => {
      const placedChildren = new PlacedChildren(
        getThreeRowsBoxesPlacedChildren(),
      );
      // @ts-expect-error getRowFirstChildIndex test
      expect(placedChildren.getRowFirstChildIndex(3)).toEqual(-1);
    });

    test("should return firstChildIndex", () => {
      const placedChildren = new PlacedChildren(
        getThreeRowsBoxesPlacedChildren(),
      );
      // @ts-expect-error getRowFirstChildIndex test
      expect(placedChildren.getRowFirstChildIndex(0)).toEqual(0);
      // @ts-expect-error getRowFirstChildIndex test
      expect(placedChildren.getRowFirstChildIndex(1)).toEqual(3);
      // @ts-expect-error getRowFirstChildIndex test
      expect(placedChildren.getRowFirstChildIndex(2)).toEqual(6);
    });
  });

  describe("getRow", () => {
    test("should return empty array if children empty", () => {
      const placedChildren = new PlacedChildren();
      // @ts-expect-error getRow test
      expect(placedChildren.getRow(0)).toEqual([]);
    });

    test("should return empty array if row doesn't exist", () => {
      const placedChildren = new PlacedChildren(
        getThreeRowsBoxesPlacedChildren(),
      );
      // @ts-expect-error getRow test
      expect(placedChildren.getRow(3)).toEqual([]);
    });

    test("should return row children", () => {
      const children = getThreeRowsBoxesPlacedChildren();
      const placedChildren = new PlacedChildren(children);
      // @ts-expect-error getRow test
      expect(placedChildren.getRow(0)).toEqual(children.slice(0, 3));
      // @ts-expect-error getRow test
      expect(placedChildren.getRow(1)).toEqual(children.slice(3, 6));
      // @ts-expect-error getRow test
      expect(placedChildren.getRow(2)).toEqual(children.slice(6));
    });
  });

  describe("getLastRow", () => {
    test("should return empty array if children empty", () => {
      const placedChildren = new PlacedChildren();
      // @ts-expect-error getLastRow test
      expect(placedChildren.getLastRow(0)).toEqual([]);
    });

    test("should return empty array if row doesn't exist", () => {
      const placedChildren = new PlacedChildren(
        getThreeRowsBoxesPlacedChildren(),
      );

      // @ts-expect-error getLastRow test
      expect(placedChildren.getLastRow(3)).toEqual([]);
    });

    test("should return row children", () => {
      const children = getThreeRowsBoxesPlacedChildren();
      const placedChildren = new PlacedChildren(children);
      // @ts-expect-error getLastRow test
      expect(placedChildren.getLastRow(0)).toEqual(children.slice(6));
      // @ts-expect-error getLastRow test
      expect(placedChildren.getLastRow(1)).toEqual(children.slice(3, 6));
      // @ts-expect-error getLastRow test
      expect(placedChildren.getLastRow(2)).toEqual(children.slice(0, 3));
    });
  });

  describe("getClosestTopChildrenByRange", () => {
    test("should return empty array if children empty", () => {
      const placedChildren = new PlacedChildren();
      expect(placedChildren.getClosestTopChildrenByRange(0, 10)).toEqual([]);
    });

    test("should return empty array if top children in range doesn't exist", () => {
      const placedChildren = new PlacedChildren([
        { top: 0, left: 0, width: 10, height: 10, remainingRowWidth: 20 },
        { top: 0, left: 10, width: 10, height: 10, remainingRowWidth: 10 },
      ]);
      expect(placedChildren.getClosestTopChildrenByRange(21, 30)).toEqual([]);
    });

    test("should return closest top children in range", () => {
      const children = getThreeRowsBoxesPlacedChildren();
      const placedChildren = new PlacedChildren(children);
      expect(placedChildren.getClosestTopChildrenByRange(0, 5)).toEqual(
        children.slice(6, 7),
      );
      expect(placedChildren.getClosestTopChildrenByRange(0, 10)).toEqual(
        children.slice(6, 8),
      );
      expect(placedChildren.getClosestTopChildrenByRange(0, 20)).toEqual(
        children.slice(6),
      );
    });

    test("should work with partial filled rows", () => {
      const placedChildren = new PlacedChildren([
        { top: 0, left: 0, width: 10, height: 10, remainingRowWidth: 20 },
        { top: 0, left: 10, width: 10, height: 10, remainingRowWidth: 10 },
        { top: 0, left: 20, width: 10, height: 10, remainingRowWidth: 0 },
        { top: 10, left: 0, width: 10, height: 10, remainingRowWidth: 20 },
        { top: 10, left: 10, width: 10, height: 10, remainingRowWidth: 10 },
      ]);
      expect(placedChildren.getClosestTopChildrenByRange(0, 5)).toEqual([
        { top: 10, left: 0, width: 10, height: 10, remainingRowWidth: 20 },
      ]);
      expect(placedChildren.getClosestTopChildrenByRange(0, 10)).toEqual([
        { top: 10, left: 0, width: 10, height: 10, remainingRowWidth: 20 },
        { top: 10, left: 10, width: 10, height: 10, remainingRowWidth: 10 },
      ]);
      expect(placedChildren.getClosestTopChildrenByRange(0, 20)).toEqual([
        { top: 10, left: 0, width: 10, height: 10, remainingRowWidth: 20 },
        { top: 10, left: 10, width: 10, height: 10, remainingRowWidth: 10 },
        { top: 0, left: 20, width: 10, height: 10, remainingRowWidth: 0 },
      ]);
      expect(placedChildren.getClosestTopChildrenByRange(21, 25)).toEqual([
        { top: 0, left: 20, width: 10, height: 10, remainingRowWidth: 0 },
      ]);
      expect(placedChildren.getClosestTopChildrenByRange(20, 30)).toEqual([
        { top: 10, left: 10, width: 10, height: 10, remainingRowWidth: 10 },
        { top: 0, left: 20, width: 10, height: 10, remainingRowWidth: 0 },
      ]);
    });
  });
});
