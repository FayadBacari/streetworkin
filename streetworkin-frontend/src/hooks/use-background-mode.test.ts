import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useBackgroundMode } from "./use-background-mode";


// We need to mock `next/navigation` so the hook can read a fake pathname
// instead of looking for a real Next.js router context (which does not exist in jsdom).
const mockUsePathnameFunction = vi.fn();
vi.mock("next/navigation", function () {
  return {
    usePathname: function () {
      return mockUsePathnameFunction();
    },
  };
});


beforeEach(function resetMockBeforeEachTest() {
  mockUsePathnameFunction.mockReset();
  Object.defineProperty(window, "scrollY", { writable: true, value: 0 });
  Object.defineProperty(window, "innerHeight", { writable: true, value: 1000 });
});


describe("useBackgroundMode — on the home page", function () {
  it("should NOT blur the background by default (we are at the top of the page)", function () {
    mockUsePathnameFunction.mockReturnValue("/");
    const renderedHookResult = renderHook(function () {
      return useBackgroundMode();
    });
    expect(renderedHookResult.result.current.shouldBlurTheBackgroundVideo).toBe(false);
    expect(renderedHookResult.result.current.shouldHideTheBackgroundVideo).toBe(false);
  });

  it("should start blurring the background once the user scrolls past half of the viewport height", function () {
    mockUsePathnameFunction.mockReturnValue("/");
    const renderedHookResult = renderHook(function () {
      return useBackgroundMode();
    });

    // Half of 1000px viewport = 500px. We scroll past it.
    act(function simulateUserScrollingPastTheBlurThreshold() {
      Object.defineProperty(window, "scrollY", { writable: true, value: 600 });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(renderedHookResult.result.current.shouldBlurTheBackgroundVideo).toBe(true);
  });
});


describe("useBackgroundMode — on the login and register pages", function () {
  it("should always blur the background on /login regardless of scroll position", function () {
    mockUsePathnameFunction.mockReturnValue("/login");
    const renderedHookResult = renderHook(function () {
      return useBackgroundMode();
    });
    expect(renderedHookResult.result.current.shouldBlurTheBackgroundVideo).toBe(true);
  });

  it("should always blur the background on /register regardless of scroll position", function () {
    mockUsePathnameFunction.mockReturnValue("/register");
    const renderedHookResult = renderHook(function () {
      return useBackgroundMode();
    });
    expect(renderedHookResult.result.current.shouldBlurTheBackgroundVideo).toBe(true);
  });

  it("should never hide the background (hide list is empty for now)", function () {
    mockUsePathnameFunction.mockReturnValue("/login");
    const renderedHookResult = renderHook(function () {
      return useBackgroundMode();
    });
    expect(renderedHookResult.result.current.shouldHideTheBackgroundVideo).toBe(false);
  });
});
