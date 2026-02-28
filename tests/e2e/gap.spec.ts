import test, { expect } from "@playwright/test";

test("gap should work", async ({ page }) => {
  await page.goto("http://localhost:3000/gap-should-work");
  await expect(page).toHaveScreenshot();
});

test("should wrap a row if not enough space for gap", async ({ page }) => {
  await page.goto(
    "http://localhost:3000/should-wrap-row-if-not-enough-space-for-gap",
  );
  await expect(page).toHaveScreenshot();
});
