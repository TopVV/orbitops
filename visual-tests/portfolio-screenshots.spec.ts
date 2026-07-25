import { expect, test } from "@playwright/test";

const screenshotsDirectory = "docs/screenshots";

test.describe("portfolio screenshots", () => {
  test("captures desktop pages", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto("/dashboard");
    await expect(
      page.getByRole("heading", { name: "Operations Overview" }),
    ).toBeVisible();
    await page.screenshot({
      path: `${screenshotsDirectory}/dashboard-desktop.png`,
      fullPage: true,
    });

    await page.goto("/customers");
    await expect(
      page.getByRole("table", { name: "Customers" }),
    ).toBeVisible();
    await page.screenshot({
      path: `${screenshotsDirectory}/customers-desktop.png`,
      fullPage: true,
    });

    await page.goto("/customers/nova-analytics");
    await expect(
      page.getByRole("heading", { name: "Nova Analytics" }),
    ).toBeVisible();
    await page.screenshot({
      path: `${screenshotsDirectory}/customer-details.png`,
      fullPage: true,
    });

    await page.goto("/customers/new");
    await expect(
      page.getByRole("heading", { name: "Add customer" }),
    ).toBeVisible();
    await page.screenshot({
      path: `${screenshotsDirectory}/create-customer.png`,
      fullPage: true,
    });
  });

  test("captures mobile pages", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto("/dashboard");
    await expect(
      page.getByRole("heading", { name: "Operations Overview" }),
    ).toBeVisible();
    await page.screenshot({
      path: `${screenshotsDirectory}/dashboard-mobile.png`,
      fullPage: true,
    });

    await page.goto("/customers");
    await expect(
      page.getByRole("link", { name: "View Acme Robotics" }),
    ).toBeVisible();
    await page.screenshot({
      path: `${screenshotsDirectory}/customers-mobile.png`,
      fullPage: true,
    });
  });
});
