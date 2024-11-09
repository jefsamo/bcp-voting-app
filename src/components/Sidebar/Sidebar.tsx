import { useState } from "react";
import { Group } from "@mantine/core";
import {
  IconFingerprint,
  IconKey,
  IconMailOpenedFilled,
  IconDashboard,
  IconMailUp,
} from "@tabler/icons-react";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";

type Data = {
  link: string;
  label: string;
  icon: any;
};

const data: Data[] = [
  { link: "dashboard", label: "Dashboard", icon: IconDashboard },
  { link: "create-voter", label: "Create Voter", icon: IconFingerprint },
  { link: "proposals", label: "Proposals", icon: IconMailOpenedFilled },
  {
    link: "create-proposal",
    label: "Create Proposal",
    icon: IconMailUp,
  },
  { link: "voters", label: "Voters", icon: IconKey },
];

const Sidebar = () => {
  const currentActive = localStorage.getItem("active") ?? "Dashboard";
  const [active, setActive] = useState<string>(currentActive);

  const links = data.map((item) => (
    <NavLink
      className={classes.link}
      data-active={item.label === active || undefined}
      to={`/${item.link}`}
      key={item.label}
      onClick={() => {
        setActive(item.label);
        localStorage.setItem("active", item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <nav className={classes.navbar} style={{ height: "100dvh" }}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <MantineLogo size={28} inverted style={{ color: "white" }} />
        </Group>
        {links}
      </div>
    </nav>
  );
};

export default Sidebar;
