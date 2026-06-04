import { test, expect } from "@playwright/test";


test.describe("Header navigation — anchor links jump to the correct section on the home page", function () {
  test("clicking the 'Street Workout' header link should scroll the disciplines section into view", async function ({ page }) {
    await page.goto("/");
    await page
      .getByRole("link", { name: /^street workout$/i })
      .first()
      .click();

    await expect(page).toHaveURL(/#disciplines$/);
    await expect(page.locator("#disciplines")).toBeInViewport({ ratio: 0.3 });
  });

  test("clicking the 'Le directoire' header link should scroll the team section into view", async function ({ page }) {
    await page.goto("/");
    await page
      .getByRole("link", { name: /le directoire/i })
      .first()
      .click();

    await expect(page).toHaveURL(/#team$/);
  });
});


test.describe("Header CTA — the 'Nous rejoindre' button navigates to the register page", function () {
  test("clicking the CTA should land the user on /register", async function ({ page }) {
    await page.goto("/");
    await page
      .getByRole("link", { name: /nous rejoindre/i })
      .first()
      .click();

    await expect(page).toHaveURL(/\/register$/);
  });
});


test.describe("Unknown URL — the application shows the custom 404 page", function () {
  test("the 404 page is rendered for any random URL", async function ({ page }) {
    await page.goto("/this-page-definitely-does-not-exist-anywhere");
    await expect(page.getByText(/404/)).toBeVisible();
  });
});
