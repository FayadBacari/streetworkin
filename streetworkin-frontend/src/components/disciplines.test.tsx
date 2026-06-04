import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Disciplines from "./disciplines";


// jsdom has no real video pipeline → stub play/pause so the embedded
// ClickToUnmuteVideo component does not throw at render time.
beforeEach(function stubHtmlMediaElementBeforeEachTest() {
  HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
  HTMLMediaElement.prototype.pause = vi.fn();
});


describe("Disciplines section", function () {
  it("should display the 'Street Workout' heading", function () {
    render(<Disciplines />);
    expect(screen.getByRole("heading", { name: /street workout/i })).toBeInTheDocument();
  });

  it("should render the four discipline cards (one for each movement)", function () {
    const { container } = render(<Disciplines />);
    const everyDisciplineCardElement = container.querySelectorAll(".disciplines__card");
    expect(everyDisciplineCardElement).toHaveLength(4);
  });

  it("should show the 'Multi Lift' separator label between the two groups of disciplines", function () {
    render(<Disciplines />);
    expect(screen.getByText(/multi lift/i)).toBeInTheDocument();
  });

  it("should embed exactly one preview video element inside the showcase area", function () {
    const { container } = render(<Disciplines />);
    const everyEmbeddedVideoElement = container.querySelectorAll("video");
    expect(everyEmbeddedVideoElement).toHaveLength(1);
  });

  it("the embedded preview video should use the disciplines__video CSS class", function () {
    const { container } = render(<Disciplines />);
    const embeddedVideoElement = container.querySelector("video");
    expect(embeddedVideoElement).toHaveClass("disciplines__video");
  });
});
