/**
 * Sets up automatic updates for a container element using ResizeObserver.
 * Calls the provided update function immediately and whenever the container's
 * size changes.
 * Returns a cleanup function to stop observing and remove the listener.
 *
 * @param container - The HTML element to observe for resize events
 * @param updateFn - Callback function to execute immediately and when resized
 * @returns Cleanup function that stops observation when called
 *
 * @example
 * ```ts
 * const container = document.querySelector('.layout-container') as HTMLElement;
 *
 * const cleanup = autoUpdate(container, () => {
 *   layoutChildren();
 * });
 *
 * // Later, when cleanup is needed:
 * cleanup();
 * ```
 */
export function autoUpdate(container: HTMLElement, updateFn: () => void) {
  updateFn();
  const resizeObserver = new ResizeObserver(() => updateFn());
  resizeObserver.observe(container);
  return () => resizeObserver.unobserve(container);
}
