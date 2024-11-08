import { expect, mergeTests } from "@playwright/test";

import { swagLabsPagesTest } from "./fixtures/swagLabsPagesTest";

export const test = mergeTests(swagLabsPagesTest);

test.beforeEach(async ({ loginPage }) => {
  await test.step("Given the user navigates to the login page", async () => {
    await loginPage.goToLoginPage();
  });
});

test.describe("Login functionality", () => {
  test("User is redirected to the Products page when logged in with valid credentials", async ({
    loginPage,
    page,
  }) => {
    await test.step("When the user logs in with valid credentials", async () => {
      await loginPage.loginAs("Standart user");
    });

    await test.step("Then the user is redirected to the products page", async () => {
      const productPageHeader = page.getByText("Products");
      await expect(productPageHeader).toBeVisible();
    });
  });
});
