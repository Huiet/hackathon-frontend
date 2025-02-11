import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AppShell, Burger, createTheme, MantineProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Navbar } from "../Navbar/Navbar";

export const Route = createRootRoute({
  component: RootComponent,
});

const theme = createTheme({
  primaryColor: "blue",
  /** Put your mantine theme override here */
});
function RootComponent() {
  return (
    <MantineProvider theme={theme}>
      <AppShell
        navbar={{
          width: "auto",
          breakpoint: 0,
          // collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Navbar>
          <Navbar />
        </AppShell.Navbar>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>

        <TanStackRouterDevtools position="bottom-right" />
      </AppShell>
    </MantineProvider>
  );
}
