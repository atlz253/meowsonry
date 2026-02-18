import Alpine from "alpinejs";
import meowsonry from "../../../src";

// @ts-expect-error Alpine setup
window.Alpine = Alpine;

Alpine.start();

const container = document.querySelector(".test") as HTMLElement;

meowsonry({ container });
