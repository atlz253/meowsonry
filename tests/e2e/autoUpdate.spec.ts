import test, { expect } from "@playwright/test";

test("auto update should invoke after container size change", async ({
  page,
}) => {
  await page.goto(
    "http://localhost:3000/autoUpdate-should-work-on-container-resize",
  );
  await page.setViewportSize({ width: 1920, height: 1080 });
  await expect(page).toHaveScreenshot();
  await page.setViewportSize({ width: 1280, height: 720 });
  await expect(page).toHaveScreenshot();
  await page.setViewportSize({ width: 800, height: 600 });
  await expect(page).toHaveScreenshot();
  await page.setViewportSize({ width: 400, height: 300 });
  await expect(page).toHaveScreenshot();
});
