import { describe, it, expect } from "vitest";
import {
  MAIN_BACKGROUND_VIDEO_PATH,
  MAIN_BACKGROUND_VIDEO_POSTER_IMAGE,
  STREET_WORKOUT_PREVIEW_VIDEO_PATH,
  STREET_WORKIN_PREVIEW_VIDEO_PATH,
  ROUTES_WHERE_BACKGROUND_VIDEO_IS_BLURRED,
  ROUTES_WHERE_BACKGROUND_VIDEO_IS_HIDDEN,
} from "./site-media";
import { APP_ROUTE_PATHS } from "./routes";


describe("site-media constants", function () {
  it("main background video should be served from /assets/", function () {
    expect(MAIN_BACKGROUND_VIDEO_PATH.startsWith("/assets/")).toBe(true);
    expect(MAIN_BACKGROUND_VIDEO_PATH.endsWith(".mp4")).toBe(true);
  });

  it("main background poster should be a jpg image inside /assets/", function () {
    expect(MAIN_BACKGROUND_VIDEO_POSTER_IMAGE.startsWith("/assets/")).toBe(true);
    expect(MAIN_BACKGROUND_VIDEO_POSTER_IMAGE.endsWith(".jpg")).toBe(true);
  });

  it("street workout preview video should be a mp4 in /assets/", function () {
    expect(STREET_WORKOUT_PREVIEW_VIDEO_PATH.startsWith("/assets/")).toBe(true);
    expect(STREET_WORKOUT_PREVIEW_VIDEO_PATH.endsWith(".mp4")).toBe(true);
  });

  it("street workin preview video should be a mp4 in /assets/", function () {
    expect(STREET_WORKIN_PREVIEW_VIDEO_PATH.startsWith("/assets/")).toBe(true);
    expect(STREET_WORKIN_PREVIEW_VIDEO_PATH.endsWith(".mp4")).toBe(true);
  });

  it("the two preview videos should be different files", function () {
    expect(STREET_WORKOUT_PREVIEW_VIDEO_PATH).not.toBe(STREET_WORKIN_PREVIEW_VIDEO_PATH);
  });

  it("blurred-video routes should include login and register", function () {
    expect(ROUTES_WHERE_BACKGROUND_VIDEO_IS_BLURRED).toContain(APP_ROUTE_PATHS.loginPage);
    expect(ROUTES_WHERE_BACKGROUND_VIDEO_IS_BLURRED).toContain(APP_ROUTE_PATHS.registerPage);
  });

  it("hidden-video routes should be empty for now", function () {
    expect(ROUTES_WHERE_BACKGROUND_VIDEO_IS_HIDDEN).toHaveLength(0);
  });
});
