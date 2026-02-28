import { test, expect } from "@playwright/test";

test("row positioning should work", async ({ page }) => {
  await page.goto("http://localhost:3000/row-positioning-should-work");
  await expect(page).toHaveScreenshot();
});

test("column positioning should work", async ({ page }) => {
  await page.goto("http://localhost:3000/column-positioning-should-work");
  await expect(page).toHaveScreenshot();
});
