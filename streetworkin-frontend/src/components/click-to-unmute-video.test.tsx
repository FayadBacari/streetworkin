import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ClickToUnmuteVideo from "./click-to-unmute-video";


// jsdom does not implement HTMLMediaElement.play() / .pause(), so we stub them
// to no-op before each test to avoid runtime errors.
beforeEach(function stubHtmlMediaElementPlayPauseBeforeEachTest() {
  HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
  HTMLMediaElement.prototype.pause = vi.fn();
});


describe("ClickToUnmuteVideo", function () {
  it("should render the toggle button with the 'enable sound' aria-label by default (video starts muted)", function () {
    render(
      <ClickToUnmuteVideo
        videoFileSourceUrl="/assets/fake-video.mp4"
        screenReaderAriaLabel="Aperçu vidéo de test"
      />,
    );
    expect(screen.getByRole("button", { name: /activer le son/i })).toBeInTheDocument();
  });

  it("should set the video tag as muted initially", function () {
    const { container } = render(
      <ClickToUnmuteVideo
        videoFileSourceUrl="/assets/fake-video.mp4"
        screenReaderAriaLabel="Aperçu vidéo de test"
      />,
    );
    const renderedVideoElement = container.querySelector("video");
    expect(renderedVideoElement).not.toBeNull();
    expect(renderedVideoElement!.muted).toBe(true);
  });

  it("should switch the aria-label to 'mute sound' after the user clicks the toggle button once", async function () {
    const userInteractionSimulator = userEvent.setup();
    render(
      <ClickToUnmuteVideo
        videoFileSourceUrl="/assets/fake-video.mp4"
        screenReaderAriaLabel="Aperçu vidéo de test"
      />,
    );

    await userInteractionSimulator.click(screen.getByRole("button", { name: /activer le son/i }));

    expect(screen.getByRole("button", { name: /couper le son/i })).toBeInTheDocument();
  });

  it("should toggle the muted attribute on the underlying video element when the button is clicked", async function () {
    const userInteractionSimulator = userEvent.setup();
    const { container } = render(
      <ClickToUnmuteVideo
        videoFileSourceUrl="/assets/fake-video.mp4"
        screenReaderAriaLabel="Aperçu vidéo de test"
      />,
    );
    const renderedVideoElement = container.querySelector("video") as HTMLVideoElement;

    expect(renderedVideoElement.muted).toBe(true);

    await userInteractionSimulator.click(screen.getByRole("button"));
    expect(renderedVideoElement.muted).toBe(false);

    await userInteractionSimulator.click(screen.getByRole("button"));
    expect(renderedVideoElement.muted).toBe(true);
  });

  it("should apply the videoTagClassName prop to the rendered <video> element", function () {
    const { container } = render(
      <ClickToUnmuteVideo
        videoFileSourceUrl="/assets/fake-video.mp4"
        videoTagClassName="custom-video-class"
        screenReaderAriaLabel="Aperçu vidéo de test"
      />,
    );
    expect(container.querySelector("video")).toHaveClass("custom-video-class");
  });
});
