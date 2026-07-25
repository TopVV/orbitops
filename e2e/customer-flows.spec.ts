import { expect, test } from "@playwright/test";

test("filters customers and opens customer details", async ({ page }) => {
  await page.goto("/customers");

  const customersTable = page.getByRole("table", {
    name: "Customers",
  });

  await expect(
    customersTable.getByText("Acme Robotics"),
  ).toBeVisible();

  await page
    .getByRole("textbox", {
      name: "Search company, domain, or contact",
    })
    .fill("Nova");

  await expect(page).toHaveURL(/q=Nova/);
  await expect(
    customersTable.getByText("Nova Analytics"),
  ).toBeVisible();

  await page.getByRole("combobox", { name: "Health" }).click();
  await page.getByRole("option", { name: "At Risk" }).click();

  await expect(page).toHaveURL(/health=at-risk/);
  await expect(
    customersTable.getByText("Nova Analytics"),
  ).toBeVisible();

  await customersTable
    .getByRole("link", { name: "View Nova Analytics" })
    .click();

  await expect(page).toHaveURL(/\/customers\/nova-analytics$/);
  await expect(
    page.getByRole("heading", { name: "Nova Analytics" }),
  ).toBeVisible();
});

test("validates and creates a customer", async ({ page }) => {
  await page.goto("/customers/new");

  const companyNameInput = page.getByLabel("Company name");
  const domainInput = page.getByLabel("Company domain");
  const emailInput = page.getByLabel("Email");

  await companyNameInput.fill("A");
  await domainInput.fill("invalid");
  await emailInput.fill("not-an-email");

  await expect(companyNameInput).toHaveValue("A");
  await expect(domainInput).toHaveValue("invalid");
  await expect(emailInput).toHaveValue("not-an-email");

  await page
    .getByRole("button", { name: "Create customer" })
    .click();

  await expect(
    page.getByText(
      "Company name must contain at least 2 characters",
    ),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Enter a valid domain, for example acme.com",
    ),
  ).toBeVisible();
  await expect(
    page.getByText("Enter a valid email address"),
  ).toBeVisible();

  await page.getByLabel("Company name").fill("Orbit Demo");
  await page.getByLabel("Company domain").fill("orbit-demo.com");
  await page.getByLabel("Monthly recurring revenue").fill("4200");
  await page.getByLabel("Renewal date").fill("2027-07-25");
  await page.getByLabel("Contact name").fill("Alex Morgan");
  await page.getByLabel("Email").fill("alex@orbit-demo.com");
  await page.getByLabel("Job title").fill("VP of Operations");

  await page
    .getByRole("button", { name: "Create customer" })
    .click();

  await expect(page).toHaveURL(/\/customers\/orbit-demo$/);
  await expect(
    page.getByRole("heading", { name: "Orbit Demo" }),
  ).toBeVisible();
  await expect(page.getByText("$4,200")).toBeVisible();
});
