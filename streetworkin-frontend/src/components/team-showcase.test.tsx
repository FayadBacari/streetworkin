import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TeamShowcase from "./team-showcase";


describe("TeamShowcase section", function () {
  it("should render at least one subsection heading inside the directory", function () {
    const { container } = render(<TeamShowcase />);
    const everySubsectionHeadingElement = container.querySelectorAll(".team-showcase__heading");
    expect(everySubsectionHeadingElement.length).toBeGreaterThan(0);
  });

  it("should show the founders subsection heading 'Les Fondateurs'", function () {
    render(<TeamShowcase />);
    // The heading is split into "Les" + "Fondateurs" (the second part is highlighted).
    expect(screen.getByText(/fondateurs/i)).toBeInTheDocument();
  });

  it("should render every member as a card containing a name and a role", function () {
    const { container } = render(<TeamShowcase />);
    const everyMemberCardElement = container.querySelectorAll(".team-showcase__card");
    expect(everyMemberCardElement.length).toBeGreaterThan(0);

    for (const oneMemberCardElement of everyMemberCardElement) {
      expect(oneMemberCardElement.querySelector(".team-showcase__name")).not.toBeNull();
      expect(oneMemberCardElement.querySelector(".team-showcase__role")).not.toBeNull();
    }
  });

  it("members with a profile photo should render an <img>; others should render initials instead", function () {
    const { container } = render(<TeamShowcase />);
    const everyMemberCardElement = Array.from(container.querySelectorAll(".team-showcase__card"));

    // For each card, exactly ONE of these two must be true: it has a photo OR it has initials.
    for (const oneMemberCardElement of everyMemberCardElement) {
      const memberCardHasAPhotoImg = oneMemberCardElement.querySelector(".team-showcase__photo");
      const memberCardHasInitialsSpan = oneMemberCardElement.querySelector(".team-showcase__initials");
      const exactlyOneOfThemIsRendered =
        Number(memberCardHasAPhotoImg !== null) + Number(memberCardHasInitialsSpan !== null) === 1;
      expect(exactlyOneOfThemIsRendered).toBe(true);
    }
  });
});
