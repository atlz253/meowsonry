import { test, expect } from "@playwright/test";

test("row positioning should work", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page).toHaveScreenshot();
});
