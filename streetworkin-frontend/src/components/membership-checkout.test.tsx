import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MembershipCheckout from "./membership-checkout";
import {
  LIST_OF_CHECKOUT_TUNNEL_STEPS,
  LIST_OF_MEMBERSHIP_PAYMENT_OPTIONS,
  TOTAL_NUMBER_OF_REGISTERED_MEMBERS,
} from "@/constants/membership";


describe("MembershipCheckout section — static rendering", function () {
  it("should display the 'Inscription' badge", function () {
    const { container } = render(<MembershipCheckout />);
    // Target the badge element specifically by its BEM class so we do not
    // collide with the word "inscription" used in surrounding paragraphs.
    const badgeElementAboveTheHeading = container.querySelector(".membership-checkout__badge");
    expect(badgeElementAboveTheHeading?.textContent?.toLowerCase()).toBe("inscription");
  });

  it("should display the total number of registered members from the constants file", function () {
    render(<MembershipCheckout />);
    expect(
      screen.getByText(String(TOTAL_NUMBER_OF_REGISTERED_MEMBERS)),
    ).toBeInTheDocument();
  });

  it("should render one tab for every step of the checkout tunnel", function () {
    render(<MembershipCheckout />);
    for (const oneTunnelStep of LIST_OF_CHECKOUT_TUNNEL_STEPS) {
      expect(
        screen.getByRole("button", { name: new RegExp(oneTunnelStep.stepDisplayLabel, "i") }),
      ).toBeInTheDocument();
    }
  });

  it("should render every payment option as an option card", function () {
    const { container } = render(<MembershipCheckout />);
    const everyOptionCardElement = container.querySelectorAll(".membership-checkout__option");
    expect(everyOptionCardElement).toHaveLength(LIST_OF_MEMBERSHIP_PAYMENT_OPTIONS.length);
  });

  it("should show the disabled 'Continuer' button with the coming-soon hint", function () {
    render(<MembershipCheckout />);
    const continueButtonElement = screen.getByRole("button", { name: /continuer/i });
    expect(continueButtonElement).toBeDisabled();
    expect(screen.getByText(/disponible dès la première mise à jour/i)).toBeInTheDocument();
  });
});


describe("MembershipCheckout section — quantity selector interactions", function () {
  it("should start every payment option with a quantity of 0", function () {
    const { container } = render(<MembershipCheckout />);
    const everyQuantityValueElement = container.querySelectorAll(
      ".membership-checkout__quantity-value",
    );
    for (const oneQuantityValueElement of everyQuantityValueElement) {
      expect(oneQuantityValueElement.textContent).toBe("0");
    }
  });

  it("should disable the [-] button when the quantity is already at 0", function () {
    render(<MembershipCheckout />);
    const everyDecrementButtonElement = screen.getAllByRole("button", {
      name: /diminuer la quantité/i,
    });
    for (const oneDecrementButtonElement of everyDecrementButtonElement) {
      expect(oneDecrementButtonElement).toBeDisabled();
    }
  });

  it("should increment the quantity from 0 to 1 when the [+] button is clicked", async function () {
    const userInteractionSimulator = userEvent.setup();
    const { container } = render(<MembershipCheckout />);

    const firstIncrementButtonElement = screen.getAllByRole("button", {
      name: /augmenter la quantité/i,
    })[0];
    await userInteractionSimulator.click(firstIncrementButtonElement);

    const firstQuantityValueElement = container.querySelectorAll(
      ".membership-checkout__quantity-value",
    )[0];
    expect(firstQuantityValueElement.textContent).toBe("1");
  });

  it("should disable the [+] button once the maximum allowed quantity (1) is reached", async function () {
    const userInteractionSimulator = userEvent.setup();
    render(<MembershipCheckout />);

    const firstIncrementButtonElement = screen.getAllByRole("button", {
      name: /augmenter la quantité/i,
    })[0];
    await userInteractionSimulator.click(firstIncrementButtonElement);

    // After 1 click, qty = 1 = max → the [+] button should now be disabled.
    expect(firstIncrementButtonElement).toBeDisabled();
  });

  it("should bring the quantity back to 0 when [-] is clicked after [+]", async function () {
    const userInteractionSimulator = userEvent.setup();
    const { container } = render(<MembershipCheckout />);

    const firstIncrementButtonElement = screen.getAllByRole("button", {
      name: /augmenter la quantité/i,
    })[0];
    const firstDecrementButtonElement = screen.getAllByRole("button", {
      name: /diminuer la quantité/i,
    })[0];

    await userInteractionSimulator.click(firstIncrementButtonElement);
    await userInteractionSimulator.click(firstDecrementButtonElement);

    const firstQuantityValueElement = container.querySelectorAll(
      ".membership-checkout__quantity-value",
    )[0];
    expect(firstQuantityValueElement.textContent).toBe("0");
  });
});


describe("MembershipCheckout section — tab navigation", function () {
  it("should switch to the 'Adhérents' step content when the user clicks that tab", async function () {
    const userInteractionSimulator = userEvent.setup();
    render(<MembershipCheckout />);

    await userInteractionSimulator.click(screen.getByRole("button", { name: /adhérents/i }));

    // The "choice" step content should be gone; a placeholder should be visible.
    expect(screen.getByText(/étape disponible une fois ton choix/i)).toBeInTheDocument();
  });
});
