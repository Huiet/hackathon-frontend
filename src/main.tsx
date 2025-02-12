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
import { App } from "./app";

// Set up a Router instance

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
