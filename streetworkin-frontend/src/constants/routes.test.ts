import { describe, it, expect } from "vitest";
import { APP_ROUTE_PATHS } from "./routes";


describe("APP_ROUTE_PATHS", function () {
  it("should expose a path for the home page", function () {
    expect(APP_ROUTE_PATHS.homePage).toBe("/");
  });

  it("should expose a path for the login page", function () {
    expect(APP_ROUTE_PATHS.loginPage).toBe("/login");
  });

  it("should expose a path for the register page", function () {
    expect(APP_ROUTE_PATHS.registerPage).toBe("/register");
  });

  it("every route path should start with a slash", function () {
    const everyRoutePathValue = Object.values(APP_ROUTE_PATHS);
    for (const oneRoutePathValue of everyRoutePathValue) {
      expect(oneRoutePathValue.startsWith("/")).toBe(true);
    }
  });
});
