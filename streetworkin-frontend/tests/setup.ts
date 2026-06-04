// This file runs ONCE before every test file (configured via vitest.config.ts).
// It plugs the @testing-library/jest-dom matchers into Vitest's `expect`
// so that we can write assertions like `expect(element).toBeInTheDocument()`.

import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";


// Automatically unmount every rendered React tree after each test
// so that one test never sees leftover DOM from the previous one.
afterEach(function unmountReactTreesBetweenTests() {
  cleanup();
});
