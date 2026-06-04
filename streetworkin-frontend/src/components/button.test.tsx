import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./button";


describe("Button", function () {
  it("should render a real <button> element when no navigation URL is provided", function () {
    render(<Button buttonContentToDisplay="Click me" />);
    const renderedButtonElement = screen.getByRole("button", { name: /click me/i });
    expect(renderedButtonElement.tagName).toBe("BUTTON");
  });

  it("should render an anchor (link) element when a navigation URL is provided", function () {
    render(
      <Button
        buttonContentToDisplay="Go home"
        optionalNavigationUrl="/"
      />,
    );
    const renderedLinkElement = screen.getByRole("link", { name: /go home/i });
    expect(renderedLinkElement.tagName).toBe("A");
    expect(renderedLinkElement).toHaveAttribute("href", "/");
  });

  it("should call the click handler when the user clicks the button", async function () {
    const mockClickHandlerFunction = vi.fn();
    const userInteractionSimulator = userEvent.setup();

    render(
      <Button
        buttonContentToDisplay="Press here"
        optionalClickEventHandler={mockClickHandlerFunction}
      />,
    );

    await userInteractionSimulator.click(screen.getByRole("button", { name: /press here/i }));
    expect(mockClickHandlerFunction).toHaveBeenCalledTimes(1);
  });

  it("should apply the provided className to the rendered element", function () {
    render(
      <Button
        buttonContentToDisplay="Styled"
        className="my-custom-class-name"
      />,
    );
    expect(screen.getByRole("button", { name: /styled/i })).toHaveClass("my-custom-class-name");
  });
});
