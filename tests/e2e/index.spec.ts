import { test, expect } from "@playwright/test";

test("row positioning should work", async ({ page }) => {
  await page.goto("http://localhost:3000/row-positioning-should-work");
  await expect(page).toHaveScreenshot();
});

test("column positioning should work", async ({ page }) => {
  await page.goto("http://localhost:3000/column-positioning-should-work");
  await expect(page).toHaveScreenshot();
});

test("container height should be correct", async ({ page }) => {
  await page.goto("http://localhost:3000/container-height-should-be-correct");
  await expect(page).toHaveScreenshot();
});

test("container padding should be considered", async ({ page }) => {
  await page.goto(
    "http://localhost:3000/container-padding-should-be-considered",
  );
  await expect(page).toHaveScreenshot();
});

test("image cards should work", async ({ page }) => {
  await page.goto("http://localhost:3000/image-cards-should-work");
  await page.setViewportSize({ width: 1920, height: 1080 });
  await expect(page).toHaveScreenshot();
  await page.setViewportSize({ width: 1502, height: 1080 });
  await expect(page).toHaveScreenshot();
  await page.setViewportSize({ width: 1296, height: 1080 });
  await expect(page).toHaveScreenshot();
  await page.setViewportSize({ width: 1048, height: 1080 });
  await expect(page).toHaveScreenshot();
  await page.setViewportSize({ width: 798, height: 1080 });
  await expect(page).toHaveScreenshot();
  await page.setViewportSize({ width: 538, height: 1080 });
  await expect(page).toHaveScreenshot();
  await page.setViewportSize({ width: 298, height: 1080 });
  await expect(page).toHaveScreenshot();
  await page.setViewportSize({ width: 198, height: 1080 });
  await expect(page).toHaveScreenshot();
});
