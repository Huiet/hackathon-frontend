import React from "react";
import ReactDOM from "react-dom/client";

import "@mantine/core/styles.css";
import { App } from "./app";

// Set up a Router instance

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
