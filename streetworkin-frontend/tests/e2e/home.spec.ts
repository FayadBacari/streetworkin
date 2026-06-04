import { test, expect } from "@playwright/test";


// End-to-End test: load the home page and verify every important section is rendered.
test.describe("Home page — main sections render correctly", function () {
  test.beforeEach(async function ({ page }) {
    await page.goto("/");
  });

  test("the home page should respond with HTTP 200 and not show a 404 error", async function ({ page }) {
    const homePageResponse = await page.goto("/");
    expect(homePageResponse?.status()).toBe(200);
  });

  test("the Street Workout disciplines section should appear on the page", async function ({ page }) {
    await expect(page.locator("#disciplines")).toBeVisible();
    await expect(page.getByRole("heading", { name: /street workout/i })).toBeVisible();
  });

  test("the Street Work'in intro section should appear on the page", async function ({ page }) {
    await expect(page.locator("#streetworkin")).toBeVisible();
  });

  test("the upcoming competitions section should appear on the page", async function ({ page }) {
    await expect(page.locator("#events")).toBeVisible();
    await expect(page.getByRole("heading", { name: /prochaines compétitions/i })).toBeVisible();
  });

  test("the team directory section should appear on the page", async function ({ page }) {
    await expect(page.locator("#team")).toBeVisible();
  });

  test("the partners marquee section should appear on the page", async function ({ page }) {
    await expect(page.locator("#partners")).toBeVisible();
    await expect(page.getByRole("heading", { name: /nos partenaires/i })).toBeVisible();
  });
});
