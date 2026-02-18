interface PlacedChild {
  top: number;
  left: number;
  width: number;
  height: number;
  remainingRawWidth: number;
}

export function meowsonry({ container }: { container: HTMLElement }) {
  const children = Array.from(container.children).filter(
    (c) => c instanceof HTMLElement,
  );
  container.style.position = "relative";
  const containerWidth = container.clientWidth;
  const placed: PlacedChild[] = [];
  children.forEach((c) => {
    c.style.position = "absolute";
    const prev = placed.at(-1);
    const top = 0;
    const left = prev === undefined ? 0 : prev.left + prev.width;
    Object.assign(c.style, { top: top, left: `${left}px` });
    placed.push({
      top: top,
      left: left,
      width: c.clientWidth,
      height: c.clientHeight,
      remainingRawWidth: containerWidth - c.clientWidth,
    });
  });
}

export default meowsonry;
