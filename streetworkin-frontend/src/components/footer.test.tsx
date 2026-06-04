import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./footer";


describe("Footer", function () {
  it("should display the copyright line with the StreetWork'in brand name", function () {
    render(<Footer />);
    expect(screen.getByText(/StreetWork.?in/i)).toBeInTheDocument();
  });

  it("should render at least one social media link (Instagram, Snapchat or TikTok)", function () {
    render(<Footer />);
    const everyExternalLinkElement = screen.getAllByRole("link");
    expect(everyExternalLinkElement.length).toBeGreaterThan(0);
  });

  it("every social media link should open in a new tab (target=_blank + rel safe)", function () {
    render(<Footer />);
    const everyExternalLinkElement = screen.getAllByRole("link");
    for (const oneExternalLinkElement of everyExternalLinkElement) {
      expect(oneExternalLinkElement).toHaveAttribute("target", "_blank");
      expect(oneExternalLinkElement.getAttribute("rel")).toContain("noopener");
    }
  });

  it("should render 3 columns of placeholder text inside the top area", function () {
    const { container } = render(<Footer />);
    const everyTextColumnElement = container.querySelectorAll(".site-footer__column");
    expect(everyTextColumnElement).toHaveLength(3);
  });
});
