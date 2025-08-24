import { initialize, mswLoader } from "msw-storybook-addon";

// Initialize MSW with options to handle unmatched requests
initialize({
  onUnhandledRequest: (request, print) => {
    // Ignore requests for static assets, Vite HMR, and development files
    if (
      request.url.includes(".ts?") ||
      request.url.includes(".tsx?") ||
      request.url.includes(".js?") ||
      request.url.includes(".jsx?") ||
      request.url.includes(".json?") ||
      request.url.includes("/@") ||
      request.url.includes("/src/") ||
      request.url.includes("?t=") ||
      request.url.includes("/node_modules/")
    ) {
      return;
    }

    // For other unhandled requests, use the default warning
    print.warning();
  },
});

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
};

export default preview;
