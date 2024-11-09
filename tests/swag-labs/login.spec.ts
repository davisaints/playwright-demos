import { expect, mergeTests } from "@playwright/test";

import { swagLabsPagesTest } from "./fixtures/swagLabsPagesTest";

export const test = mergeTests(swagLabsPagesTest);

test.beforeEach(async ({ loginPage }) => {
  await test.step("Given the user navigates to the login page", async () => {
    await loginPage.goToLoginPage();
  });
});

test.describe("Login functionality", () => {
  test("User should log in with valid credentials", async ({
    loginPage,
    page,
  }) => {
    await test.step("When the user logs in with valid credentials", async () => {
      await loginPage.loginAs("Standard user");
    });

    await test.step("Then the user should be redirected to the Inventory page", async () => {
      await expect(page).toHaveURL(/inventory.html/);
    });

    await test.step("And the user should see the 'Products' header", async () => {
      const productPageHeader = page.getByText("Products");
      await expect(productPageHeader).toBeVisible();
    });
  });
});
