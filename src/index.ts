import { PlacedChildren } from "./PlacedChildren";

export function meowsonry({ container }: { container: HTMLElement }) {
  const children = Array.from(container.children).filter(
    (c) => c instanceof HTMLElement,
  );
  container.style.position = "relative";
  const containerWidth = container.clientWidth;
  const placed = new PlacedChildren();

  children.forEach((c) => {
    c.style.position = "absolute";
    const prev = placed.at(-1);
    const left =
      prev === undefined || prev.remainingRawWidth < c.clientWidth
        ? 0
        : prev.left + prev.width;

    const closestTopChildren = placed.getClosestTopChildrenByRange(
      left,
      left + c.clientWidth,
    );
    const closestTopChildrenWithoutPrev =
      prev && prev === closestTopChildren[0]
        ? closestTopChildren.slice(1)
        : closestTopChildren;
    let top = Math.max(
      0,
      ...closestTopChildrenWithoutPrev.map((c) => c.top + c.height),
    );
    Object.assign(c.style, { top: `${top}px`, left: `${left}px` });
    placed.push({
      top: top,
      left: left,
      width: c.clientWidth,
      height: c.clientHeight,
      remainingRawWidth:
        prev && prev.remainingRawWidth >= c.clientWidth
          ? prev.remainingRawWidth - c.clientWidth
          : containerWidth - c.clientWidth,
    });
  });
}

export default meowsonry;
