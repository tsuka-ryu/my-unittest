import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { defineConfig } from "vitest/config";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    coverage: {
      exclude: [
        "**/*.d.ts",
        "**/type.ts",
        "**/types.ts",
        "**/mockServiceWorker.js",
        "public/**",
        "node_modules/**",
        "**/*.config.*",
        "**/*.stories.*",
        ".storybook/**",
      ],
    },
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, ".storybook") }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }],
          },
          setupFiles: [".storybook/vitest.setup.js"],
        },
      },
      {
        test: {
          name: "unit",
          include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,tsx,jsx}"],
          exclude: [
            "**/*.{stories}.{tsx}",
            "**/*.browser.test.*",
            "node_modules/**",
          ],
          // browser modeを無効にして通常のNode.js環境でテスト実行
        },
      },
      {
        test: {
          name: "browser",
          include: ["src/**/*.browser.test.*"],
          exclude: ["**/__snapshots__/**"],
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
