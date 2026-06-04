import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import NumberCountUp from "./counter";


describe("NumberCountUp", function () {
  it("should display 0 right after mounting (the animation has not progressed yet)", function () {
    render(<NumberCountUp finalNumberToReach={100} animationTotalDurationInMs={1000} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should eventually reach the final number after the animation is complete", async function () {
    render(<NumberCountUp finalNumberToReach={42} animationTotalDurationInMs={50} />);

    // Wait long enough for the animation to finish (50ms duration + a safety margin).
    await act(async function () {
      await new Promise(function (resolve) {
        setTimeout(resolve, 200);
      });
    });

    expect(screen.getByText("42")).toBeInTheDocument();
  });
});
