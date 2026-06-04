import { describe, it, expect } from "vitest";
import {
  LIST_OF_MEMBERSHIP_FORMULAS,
  LIST_OF_MEMBERSHIP_PAYMENT_OPTIONS,
  LIST_OF_CHECKOUT_TUNNEL_STEPS,
  TOTAL_NUMBER_OF_REGISTERED_MEMBERS,
} from "./membership";


describe("LIST_OF_MEMBERSHIP_FORMULAS", function () {
  it("should expose exactly 2 membership formulas (Classic and Athlete)", function () {
    expect(LIST_OF_MEMBERSHIP_FORMULAS).toHaveLength(2);
  });

  it("every formula should have a positive yearly price in euros", function () {
    for (const oneFormula of LIST_OF_MEMBERSHIP_FORMULAS) {
      expect(oneFormula.yearlyPriceInEuros).toBeGreaterThan(0);
    }
  });

  it("every formula should have at least one benefit line listed", function () {
    for (const oneFormula of LIST_OF_MEMBERSHIP_FORMULAS) {
      expect(oneFormula.benefitsList.length).toBeGreaterThan(0);
    }
  });

  it("exactly one formula should be marked as the popular choice", function () {
    const formulasMarkedAsPopular = LIST_OF_MEMBERSHIP_FORMULAS.filter(function (oneFormula) {
      return oneFormula.isPopularChoice === true;
    });
    expect(formulasMarkedAsPopular).toHaveLength(1);
  });

  it("the Athlete formula should be more expensive than the Classic one", function () {
    const classicFormula = LIST_OF_MEMBERSHIP_FORMULAS.find(function (oneFormula) {
      return oneFormula.formulaName.includes("Classique");
    });
    const athleteFormula = LIST_OF_MEMBERSHIP_FORMULAS.find(function (oneFormula) {
      return oneFormula.formulaName.includes("Athlète");
    });
    expect(classicFormula).toBeDefined();
    expect(athleteFormula).toBeDefined();
    expect(athleteFormula!.yearlyPriceInEuros).toBeGreaterThan(classicFormula!.yearlyPriceInEuros);
  });
});


describe("LIST_OF_MEMBERSHIP_PAYMENT_OPTIONS", function () {
  it("should expose exactly 2 payment options (yearly and monthly)", function () {
    expect(LIST_OF_MEMBERSHIP_PAYMENT_OPTIONS).toHaveLength(2);
  });

  it("every option should have a unique identifier", function () {
    const everyOptionIdentifier = LIST_OF_MEMBERSHIP_PAYMENT_OPTIONS.map(function (oneOption) {
      return oneOption.uniqueOptionId;
    });
    const uniqueIdentifiersOnly = new Set(everyOptionIdentifier);
    expect(uniqueIdentifiersOnly.size).toBe(everyOptionIdentifier.length);
  });

  it("every option should be limited to 1 per person", function () {
    for (const oneOption of LIST_OF_MEMBERSHIP_PAYMENT_OPTIONS) {
      expect(oneOption.maximumQuantityPerPerson).toBe(1);
    }
  });

  it("billing periods should only be 'an' or 'mois'", function () {
    for (const oneOption of LIST_OF_MEMBERSHIP_PAYMENT_OPTIONS) {
      expect(["an", "mois"]).toContain(oneOption.billingPeriodName);
    }
  });
});


describe("LIST_OF_CHECKOUT_TUNNEL_STEPS", function () {
  it("should expose exactly 4 tunnel steps (choice, members, contact, summary)", function () {
    expect(LIST_OF_CHECKOUT_TUNNEL_STEPS).toHaveLength(4);
  });

  it("the very first step should be the choice of membership", function () {
    expect(LIST_OF_CHECKOUT_TUNNEL_STEPS[0].stepUniqueId).toBe("choice");
  });

  it("the very last step should be the summary", function () {
    const lastStepInTunnel = LIST_OF_CHECKOUT_TUNNEL_STEPS[LIST_OF_CHECKOUT_TUNNEL_STEPS.length - 1];
    expect(lastStepInTunnel.stepUniqueId).toBe("summary");
  });
});


describe("TOTAL_NUMBER_OF_REGISTERED_MEMBERS", function () {
  it("should be a positive integer (we are not below zero, not a decimal)", function () {
    expect(TOTAL_NUMBER_OF_REGISTERED_MEMBERS).toBeGreaterThan(0);
    expect(Number.isInteger(TOTAL_NUMBER_OF_REGISTERED_MEMBERS)).toBe(true);
  });
});
