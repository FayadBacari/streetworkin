import { defineConfig, devices } from "@playwright/test";


// Playwright configuration for End-to-End tests.
// E2E tests live inside `tests/e2e/` and run against a real Chromium browser
// (controlled by Playwright) talking to a real Next.js production server.
export default defineConfig({
  testDir: "./tests/e2e",
  // How long Playwright will wait for an assertion to become true (per assertion).
  expect: { timeout: 5_000 },
  // How long an entire test can run before it is killed.
  timeout: 30_000,

  // Run tests in parallel locally; force sequential on CI for stability.
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: process.env.CI ? "github" : "list",

  use: {
    baseURL: "http://localhost:3000",
    // Capture a screenshot only on failure (keeps logs clean otherwise).
    screenshot: "only-on-failure",
    // Save a trace file on the first retry (very useful to debug flaky tests).
    trace: "on-first-retry",
  },

  // Tests run against the production build (more realistic and faster than dev).
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },

  // We test on Chromium only — adding Firefox/WebKit triples the CI time and
  // for a small site like this Chromium covers 90% of real-world bugs.
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
