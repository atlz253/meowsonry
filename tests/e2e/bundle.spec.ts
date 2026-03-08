import { test, expect } from "@playwright/test";

test("@bundle browser bundle should work", async ({ page }) => {
  await page.goto("http://localhost:3000/browser-bundle-shoud-work");
  await expect(page).toHaveScreenshot();
});
