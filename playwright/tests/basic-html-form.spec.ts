import { test, expect, Page } from "@playwright/test";
import path from "path";

interface Results {
  username: string;
  password: string;
  comments: string;
  dropdownValue: string;
}

const results: Results = {
  username: "testUser",
  password: "secret",
  comments: "Test comment",
  dropdownValue: "dd2",
};

const fillFields = async (page: Page, resultsObj: Results) => {
  await test.step("Enter Username", async () => {
    // Locate and fill username field
    const usernameInput = page.locator("xpath=//input[@name='username']");
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill(resultsObj.username);
    await expect(usernameInput).toHaveValue(resultsObj.username);
  });

  await test.step("Enter Password", async () => {
    //Locate and fill password field
    const passwordInput = page.locator('xpath=//input[@name="password"]');
    await passwordInput.fill(resultsObj.password);
    await expect(passwordInput).toHaveValue(resultsObj.password);
  });

  await test.step("Fill comments field", async () => {
    //Locate and fill comments field
    const commentsField = page.locator('xpath=//textarea[@name="comments"]');
    await expect(commentsField).toBeVisible();
    await commentsField.fill(resultsObj.comments);
    await expect(commentsField).toHaveValue(resultsObj.comments);
  });

  await test.step("Select checkbox value", async () => {
    //Locate and check the checkbox
    const checkboxEl = page.locator('xpath=//input[@value="cb2"]');
    await expect(checkboxEl).toBeVisible();
    await checkboxEl.check();
    await expect(checkboxEl).toBeChecked();
  });

  await test.step("Select radio button", async () => {
    //Locate and check the radio button
    const radio2 = page.locator('xpath=//input[@value="rd2"]');
    await radio2.check();
    await expect(radio2).toBeChecked();
  });

  await test.step("Select dropdown option", async () => {
    //Locate and select an option from dropdown
    const dropdown = page.locator('xpath=//select[@name="dropdown"]');
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption(resultsObj.dropdownValue);
    await expect(dropdown).toHaveValue(resultsObj.dropdownValue);
  });

  await test.step("Upload file", async () => {
    //Locate upload button and upload a file
    const uploadBtn = page.locator('xpath=//input[@type="file"]');
    const filePath = path.resolve(__dirname, "./tests.txt");
    await expect(uploadBtn).toBeVisible();
    await uploadBtn.setInputFiles(filePath);
  });
};

test.describe("Test Basic HTML Form", () => {
  test.beforeEach("Navigate to HTML Form Page", async ({ page }) => {
    const htmlFormUrl = process.env.BASE_HTML_FORM_URL as string;
    await page.goto(htmlFormUrl);
  });

  test("Has h1 title", async ({ page }) => {
    const title = page.locator("xpath=//h1");
    await expect(title).toHaveText("Basic HTML Form Example");
  });

  test("Reset Form", async ({ page }) => {
    const cancelBtn = page.locator('xpath=//input[@type="reset"]');
    await expect(cancelBtn).toBeVisible();
    await fillFields(page, results);
    await cancelBtn.click();

    await expect(page.locator("xpath=//input[@name='username']")).toHaveValue(
      ""
    );
    await expect(page.locator('xpath=//input[@value="cb3"]')).toBeChecked();
  });

  test("Submit Form", async ({ page }) => {
    const submitButton = page.locator('xpath=//input[@type="submit"]');
    await expect(submitButton).toBeVisible();
    await fillFields(page, results);
    await submitButton.click();
    await expect(page).toHaveURL(
      "https://testpages.herokuapp.com/styled/the_form_processor.php"
    );

    const usernameVal = page.locator('xpath=//li[@id="_valueusername"]');
    await expect(usernameVal).toHaveText(results.username);
    console.log("Test console tab");

    const dropdownVal = page.locator('xpath=//li[@id="_valuedropdown"]');
    await expect(dropdownVal).toHaveText(results.dropdownValue);
  });
});
