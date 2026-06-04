import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./header";


// Reset the window scroll position to the top of the page before each test
// so that the "scrolled" state does not leak from one test to the next.
beforeEach(function resetWindowScrollPositionBeforeEachTest() {
  Object.defineProperty(window, "scrollY", { writable: true, value: 0 });
});


describe("Header — desktop navigation", function () {
  it("should render a link for the home page (the logo)", function () {
    render(<Header />);
    const everyHomeLinkElement = screen.getAllByRole("link", { name: /streetwork'in logo/i });
    expect(everyHomeLinkElement.length).toBeGreaterThan(0);
  });

  it("should render every main navigation link", function () {
    render(<Header />);
    expect(screen.getAllByRole("link", { name: /street workout/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /street work'in/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /nos events/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /le directoire/i }).length).toBeGreaterThan(0);
  });

  it("should render the 'Nous rejoindre' CTA pointing to the register page", function () {
    render(<Header />);
    const everyRegisterCallToActionLink = screen.getAllByRole("link", { name: /nous rejoindre/i });
    expect(everyRegisterCallToActionLink.length).toBeGreaterThan(0);
    // At least one of them must point to the register URL.
    const atLeastOneCtaPointsToRegister = everyRegisterCallToActionLink.some(function (oneLink) {
      return oneLink.getAttribute("href") === "/register";
    });
    expect(atLeastOneCtaPointsToRegister).toBe(true);
  });
});


describe("Header — mobile dropdown menu", function () {
  it("should not render the mobile dropdown initially", function () {
    render(<Header />);
    expect(screen.queryByLabelText(/menu mobile/i)).not.toBeInTheDocument();
  });

  it("should open the mobile dropdown when the user clicks the burger button", async function () {
    const userInteractionSimulator = userEvent.setup();
    render(<Header />);

    await userInteractionSimulator.click(screen.getByRole("button", { name: /ouvrir le menu/i }));

    expect(screen.getByLabelText(/menu mobile/i)).toBeInTheDocument();
  });

  it("should switch the burger button aria-label to 'Fermer le menu' once the dropdown is opened", async function () {
    const userInteractionSimulator = userEvent.setup();
    render(<Header />);

    await userInteractionSimulator.click(screen.getByRole("button", { name: /ouvrir le menu/i }));

    expect(screen.getByRole("button", { name: /fermer le menu/i })).toBeInTheDocument();
  });

  it("should close the mobile dropdown again when the user clicks the burger a second time", async function () {
    const userInteractionSimulator = userEvent.setup();
    render(<Header />);

    await userInteractionSimulator.click(screen.getByRole("button", { name: /ouvrir le menu/i }));
    await userInteractionSimulator.click(screen.getByRole("button", { name: /fermer le menu/i }));

    expect(screen.queryByLabelText(/menu mobile/i)).not.toBeInTheDocument();
  });
});


describe("Header — scrolled state", function () {
  it("should NOT have the --scrolled modifier class at the top of the page", function () {
    const { container } = render(<Header />);
    const renderedHeaderElement = container.querySelector(".site-header");
    expect(renderedHeaderElement).not.toBeNull();
    expect(renderedHeaderElement).not.toHaveClass("site-header--scrolled");
  });

  it("should add the --scrolled modifier class after the user scrolls down past the threshold", function () {
    const { container } = render(<Header />);

    // Simulate the user scrolling 200 pixels down (well above the 50px threshold).
    act(function simulateUserScrollingDownTheWindow() {
      Object.defineProperty(window, "scrollY", { writable: true, value: 200 });
      window.dispatchEvent(new Event("scroll"));
    });

    const renderedHeaderElement = container.querySelector(".site-header");
    expect(renderedHeaderElement).toHaveClass("site-header--scrolled");
  });
});
