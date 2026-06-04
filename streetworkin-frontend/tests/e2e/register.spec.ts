import { test, expect } from "@playwright/test";


test.describe("Register page — pricing tiers and inscription tunnel", function () {
  test.beforeEach(async function ({ page }) {
    await page.goto("/register");
  });

  test("the 'Avantage adhérents' tiers section should display both membership formulas", async function ({ page }) {
    await expect(page.getByRole("heading", { name: /avantage adhérents/i })).toBeVisible();
    await expect(page.getByText("Adhésion Classique")).toBeVisible();
    await expect(page.getByText("Adhésion Athlète")).toBeVisible();
  });

  test("the Classic formula card should display 175€ as its price", async function ({ page }) {
    await expect(page.getByText("175€")).toBeVisible();
  });

  test("the 'Finalise ton adhésion' section should display the checkout panel", async function ({ page }) {
    await expect(page.getByRole("heading", { name: /finalise ton/i })).toBeVisible();
    await expect(page.getByText("Paiement sécurisé")).toBeVisible();
  });

  test("the checkout panel should display all four tunnel steps as tabs", async function ({ page }) {
    await expect(page.getByRole("button", { name: /choix de l'adhésion/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /adhérents/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /coordonnées/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /récapitulatif/i })).toBeVisible();
  });

  test("clicking the [+] button should increment the quantity for the matching option", async function ({ page }) {
    const incrementButtonElement = page
      .getByRole("button", { name: /augmenter la quantité/i })
      .first();
    await incrementButtonElement.click();

    // The quantity value next to it should now read "1".
    const everyQuantityValueElement = await page.locator(".membership-checkout__quantity-value").all();
    const firstQuantityText = await everyQuantityValueElement[0].textContent();
    expect(firstQuantityText).toBe("1");
  });

  test("the 'Continuer' submit button is disabled and announces it will be available in the first update", async function ({ page }) {
    const continueButtonElement = page.getByRole("button", { name: /continuer/i });
    await expect(continueButtonElement).toBeDisabled();
    await expect(page.getByText(/disponible dès la première mise à jour/i)).toBeVisible();
  });
});
