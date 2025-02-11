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

function NavbarLink({ icon: Icon, label, active, route }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        component={Link}
        to={route}
        // activeOptions={{ exact: true }}
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
  { icon: IconHome2, label: "My Policies", route: "/" },
  { icon: IconEdit, label: "Edit My Policies", route: "/edit-policies/" },
];

export function Navbar() {
  const [active, setActive] = useState(2);

  const links = routeLinks.map((link, index) => (
    <NavbarLink {...link} key={link.label} active={index === active} />
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
