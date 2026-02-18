import { test, expect } from "@playwright/test";

test("has hello world", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page).toHaveTitle(/Hello, world!/);
});
