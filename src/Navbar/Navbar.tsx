import { useState } from "react";
import { IconEdit, IconHome2, IconUser } from "@tabler/icons-react";
import { Stack, Tooltip, UnstyledButton } from "@mantine/core";
import classes from "./Navbar.module.scss";
import { Link } from "@tanstack/react-router";

interface NavbarLinkProps {
  icon: any;
  label: string;
  active?: boolean;
  route: string;
}

function NavbarLink({ icon: Icon, label, route }: NavbarLinkProps) {
  const exact = !route.includes("edit-policies");
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        component={Link}
        to={route}
        activeOptions={{ exact }}
        className={classes.link}
        activeProps={{
          className: classes.link_active,
        }}
      >
        <Icon size={20} stroke={2} />
      </UnstyledButton>
    </Tooltip>
  );
}

const routeLinks = [
  { icon: IconHome2, label: "Users", route: "/" },
  { icon: IconUser, label: "User Policies", route: "/$userId" },
  {
    icon: IconEdit,
    label: "Edit My Policies",
    route: "/$userId/edit-policies/",
  },
];

export function Navbar({ userId }: { userId: string | number | null }) {
  // const params = Route.useParams();
  // const userId = params.userId;
  const filteredLinks =
    userId != null
      ? routeLinks
      : routeLinks.filter((link) => link.label === "Users");
  const links = filteredLinks.map((link, index) => (
    <NavbarLink key={link.label} {...link} />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>
    </nav>
  );
}
