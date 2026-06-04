import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Competitions from "./competitions";


describe("Competitions section", function () {
  it("should display the heading 'Prochaines Compétitions'", function () {
    render(<Competitions />);
    expect(
      screen.getByRole("heading", { name: /prochaines compétitions/i }),
    ).toBeInTheDocument();
  });

  it("should display an intro paragraph mentioning StreetWork'in", function () {
    render(<Competitions />);
    expect(screen.getByText(/StreetWork/i)).toBeInTheDocument();
  });

  it("should render at least one upcoming competition card on screen", function () {
    const { container } = render(<Competitions />);
    const everyCompetitionCardElement = container.querySelectorAll(".competitions__card");
    expect(everyCompetitionCardElement.length).toBeGreaterThan(0);
  });

  it("every rendered competition card should have a visible date and a visible location", function () {
    const { container } = render(<Competitions />);
    const everyCompetitionCardElement = Array.from(
      container.querySelectorAll(".competitions__card"),
    );

    for (const oneCompetitionCardElement of everyCompetitionCardElement) {
      expect(oneCompetitionCardElement.querySelector(".competitions__card-date")).not.toBeNull();
      expect(oneCompetitionCardElement.querySelector(".competitions__card-location")).not.toBeNull();
    }
  });
});
