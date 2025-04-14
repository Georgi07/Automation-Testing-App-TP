import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test("Login Successfully", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("Login Error Locked User", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    await page.locator("#user-name").fill("locked_out_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      "Sorry, this user has been locked out."
    );
  });

  test("Login Error", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    await page.locator("#user-name").fill("invalid_user");
    await page.locator("#password").fill("wrong_password");
    await page.locator("#login-button").click();

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      "Username and password do not match"
    );
  });
});
