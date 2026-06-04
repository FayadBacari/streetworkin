import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import ImageMarquee from "./image-marquee";


// Reusable fake data shared by all tests in this file.
const FAKE_LIST_OF_THREE_IMAGES = [
  { imageFileSourceUrl: "/assets/fake-1.png", shortAltDescription: "Fake 1" },
  { imageFileSourceUrl: "/assets/fake-2.png", shortAltDescription: "Fake 2" },
  { imageFileSourceUrl: "/assets/fake-3.png", shortAltDescription: "Fake 3" },
];


describe("ImageMarquee", function () {
  it("should render each input image twice (one accessible copy + one decorative copy)", function () {
    const { container } = render(
      <ImageMarquee listOfImagesToScroll={FAKE_LIST_OF_THREE_IMAGES} />,
    );

    // 3 images × 2 copies = 6 <img> tags expected in the DOM.
    const everyImgTagInsideMarquee = container.querySelectorAll("img");
    expect(everyImgTagInsideMarquee).toHaveLength(6);
  });

  it("should use the real alt text on the first copy of each image", function () {
    const { container } = render(
      <ImageMarquee listOfImagesToScroll={FAKE_LIST_OF_THREE_IMAGES} />,
    );
    const everyImgTagInsideMarquee = Array.from(container.querySelectorAll("img"));

    // First half of the imgs is the "real" copy with proper alt text.
    expect(everyImgTagInsideMarquee[0]).toHaveAttribute("alt", "Fake 1");
    expect(everyImgTagInsideMarquee[1]).toHaveAttribute("alt", "Fake 2");
    expect(everyImgTagInsideMarquee[2]).toHaveAttribute("alt", "Fake 3");
  });

  it("should mark the duplicated copies as aria-hidden so screen readers do not read them twice", function () {
    const { container } = render(
      <ImageMarquee listOfImagesToScroll={FAKE_LIST_OF_THREE_IMAGES} />,
    );
    // Find all the card containers (each contains one img).
    const everyMarqueeCardElement = container.querySelectorAll(".image-marquee__card");

    // The first 3 are accessible, the next 3 are decorative duplicates.
    expect(everyMarqueeCardElement[3]).toHaveAttribute("aria-hidden", "true");
    expect(everyMarqueeCardElement[4]).toHaveAttribute("aria-hidden", "true");
    expect(everyMarqueeCardElement[5]).toHaveAttribute("aria-hidden", "true");
  });

  it("should still render a marquee container when the input image list is empty", function () {
    const { container } = render(<ImageMarquee listOfImagesToScroll={[]} />);
    expect(container.querySelector(".image-marquee")).not.toBeNull();
    expect(container.querySelectorAll("img")).toHaveLength(0);
  });
});
