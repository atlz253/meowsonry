import test, { expect } from "@playwright/test";

test("preventFlick should expose animation hooks", async ({ page }) => {
  await page.goto("http://localhost:3000/prevent-flick-animation-should-work");

  const items = page.locator(".container > div");
  const container = page.locator(".container");

  await expect(container).toHaveCSS("visibility", "visible");
  await expect(items).toHaveCount(4);
  await expect(items.nth(0)).toHaveAttribute(
    "data-meowsonry-prevent-flick",
    "",
  );
  await expect(items.nth(1)).toHaveAttribute(
    "data-meowsonry-prevent-flick",
    "",
  );

  await expect
    .poll(() =>
      items.evaluateAll((elements) =>
        elements.map((element) => ({
          position: (element as HTMLElement).style.position,
          top: (element as HTMLElement).style.top,
          left: (element as HTMLElement).style.left,
          index: (element as HTMLElement).style.getPropertyValue(
            "--meowsonry-index",
          ),
          animationName: getComputedStyle(element).animationName,
        })),
      ),
    )
    .toEqual([
      {
        position: "absolute",
        top: "0px",
        left: "0px",
        index: "0",
        animationName: "meowsonry-fade-in",
      },
      {
        position: "absolute",
        top: "0px",
        left: "108px",
        index: "1",
        animationName: "meowsonry-fade-in",
      },
      {
        position: "absolute",
        top: "0px",
        left: "216px",
        index: "2",
        animationName: "meowsonry-fade-in",
      },
      {
        position: "absolute",
        top: "108px",
        left: "0px",
        index: "3",
        animationName: "meowsonry-fade-in",
      },
    ]);
});
