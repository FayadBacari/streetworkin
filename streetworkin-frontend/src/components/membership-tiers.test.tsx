import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MembershipTiers from "./membership-tiers";
import { LIST_OF_MEMBERSHIP_FORMULAS } from "@/constants/membership";


describe("MembershipTiers section", function () {
  it("should display the 'Tarifs' badge above the heading", function () {
    const { container } = render(<MembershipTiers />);
    // Target the badge element specifically by its BEM class so we do not
    // collide with the "Tarifs réduits …" text used inside the features list.
    const badgeElementAboveTheHeading = container.querySelector(".membership-tiers__badge");
    expect(badgeElementAboveTheHeading?.textContent?.toLowerCase()).toBe("tarifs");
  });

  it("should display the main 'Avantage adhérents' heading", function () {
    render(<MembershipTiers />);
    expect(screen.getByRole("heading", { name: /avantage adhérents/i })).toBeInTheDocument();
  });

  it("should render one card per formula defined inside the membership constants", function () {
    const { container } = render(<MembershipTiers />);
    const everyTierCardElement = container.querySelectorAll(".membership-tiers__card");
    expect(everyTierCardElement).toHaveLength(LIST_OF_MEMBERSHIP_FORMULAS.length);
  });

  it("should add the --popular modifier class to exactly one card", function () {
    const { container } = render(<MembershipTiers />);
    const everyPopularCardElement = container.querySelectorAll(".membership-tiers__card--popular");
    expect(everyPopularCardElement).toHaveLength(1);
  });

  it("should show a 'Populaire' badge on the popular card", function () {
    render(<MembershipTiers />);
    expect(screen.getByText(/populaire/i)).toBeInTheDocument();
  });

  it("should display every formula price somewhere on the page", function () {
    render(<MembershipTiers />);
    for (const oneFormula of LIST_OF_MEMBERSHIP_FORMULAS) {
      expect(screen.getByText(`${oneFormula.yearlyPriceInEuros}€`)).toBeInTheDocument();
    }
  });
});
