import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import "@mantine/core/styles.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import {
  Button,
  createTheme,
  Input,
  MantineProvider,
  NumberInput,
  Title,
} from "@mantine/core";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);
// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;

const theme = createTheme({
  primaryColor: "blue",
  components: {
    NumberInput: NumberInput.extend({
      defaultProps: {
        hideControls: true,
      },
    }),
    Title: Title.extend({
      defaultProps: {
        order: 4,
      },
    }),
    Input: Input.extend({
      defaultProps: {
        radius: "md",
      },
    }),
    Button: Button.extend({
      defaultProps: {
        radius: "xl",
      },
    }),
  },
  /** Put your mantine theme override here */
});
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>,
  );
}
