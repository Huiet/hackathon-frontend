import { JSX, ReactNode, useState } from "react";
import { IconHome2, IconUser } from "@tabler/icons-react";
import { Center, Stack, Tooltip, UnstyledButton } from "@mantine/core";
import classes from "./Navbar.module.css";
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
        activeOptions={{ exact: true }}
        className={classes.link}
        activeProps={{
          className: classes.link_active,
        }}
        // data-active={active || undefined}
      >
        <Icon size={20} stroke={2} />
      </UnstyledButton>
    </Tooltip>
  );
}

type RouteLink = {
  icon: ReactNode;
  label: string;
  route: string;
};
const routeLinks = [
  { icon: IconHome2, label: "Home", route: "/" },
  { icon: IconUser, label: "Beneficiaries", route: "/Beneficiaries" },
  // { icon: IconGauge, label: "Dashboard" },
  // { icon: IconDeviceDesktopAnalytics, label: "Analytics" },
  // { icon: IconCalendarStats, label: "Releases" },
  // { icon: IconFingerprint, label: "Security" },
  // { icon: IconSettings, label: "Settings" },
];

export function Navbar() {
  const [active, setActive] = useState(2);

  const links = routeLinks.map((link, index) => (
    <NavbarLink {...link} key={link.label} active={index === active} />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>B</Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>
    </nav>
  );
}
