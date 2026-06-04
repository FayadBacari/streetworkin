import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";


// Vitest configuration for unit + integration tests.
// Unit tests live next to the source files (e.g. `header.test.tsx` next to `header.tsx`).
// They run in a jsdom virtual browser, NO real browser is needed for these.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Mirror the `@/...` alias used by Next.js so tests can import the same way.
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    // Use jsdom so the tests can access `document`, `window`, etc.
    environment: "jsdom",

    // File that runs ONCE before every test file. Sets up jest-dom matchers
    // (toBeInTheDocument, toHaveClass, ...) and global cleanup helpers.
    setupFiles: ["./tests/setup.ts"],

    // Make `describe`, `it`, `expect` available without importing them.
    globals: true,

    // Tell Vitest which files are tests (avoids running E2E Playwright specs by accident).
    include: ["src/**/*.test.{ts,tsx}"],

    // Exclude things that should never be run by Vitest.
    exclude: ["node_modules", ".next", "tests/e2e", "playwright-report"],

    // Generate a coverage report when running `npm run test:coverage`.
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/**/*.scss",
        "src/app/layout.tsx",
        "src/app/**/page.tsx",
        ".next/**",
      ],
    },
  },
});
