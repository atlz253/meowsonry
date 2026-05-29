import { afterEach, describe, expect, test, vi } from "vitest";
import { autoUpdate } from "../../src";
import { ResizeObserverMock } from "./mocks";

describe("autoUpdate", () => {
  afterEach(() => {
    ResizeObserverMock.instances = [];
    vi.restoreAllMocks();
  });

  test("should invoke update immediately and observe container changes", () => {
    vi.stubGlobal("ResizeObserver", ResizeObserverMock);

    const container = {} as HTMLElement;
    const updateFn = vi.fn();
    const cleanup = autoUpdate(container, updateFn);
    const resizeObserver = ResizeObserverMock.instances[0];

    expect(updateFn).toHaveBeenCalledTimes(1);
    expect(resizeObserver.observe).toHaveBeenCalledWith(container);

    cleanup();

    expect(resizeObserver.unobserve).toHaveBeenCalledWith(container);
  });
});
