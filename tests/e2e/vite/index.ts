import Alpine from "alpinejs";
import meowsonry from "../../../src";

// @ts-expect-error Alpine setup
window.Alpine = Alpine;

Alpine.start();

const params = new URLSearchParams(window.location.search);
const testId = params.get("test");
const container = document.querySelector(`#${testId}`) as HTMLElement | null;

if (container) {
  container.style.display = "block";
  meowsonry({ container });
}
