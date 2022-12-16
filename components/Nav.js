import React, { useEffect } from "react";
import {
  AppstoreOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Column } from "./Components";
import Link from "next/link";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const assembleURL = (item) => {
  console.log(item);
  if (
    item.keyPath.includes("events") &&
    item.keyPath.includes("current") &&
    item.keyPath.includes("config")
  ) {
    return `/dashboard/events/${item.keyPath[1]}/config`;
  }
  if (
    item.keyPath.includes("events") &&
    item.keyPath.includes("current") &&
    item.keyPath.includes("tickets")
  ) {
    return `/dashboard/events/${item.keyPath[1]}/tickets`;
  }
  if (
    item.keyPath.includes("events") &&
    item.keyPath.includes("current") &&
    item.keyPath.includes("attendees")
  ) {
    return `/dashboard/events/${item.keyPath[1]}/attendees`;
  }
  if (
    item.keyPath.includes("events") &&
    item.keyPath.includes("current") &&
    item.keyPath.includes("volunteers")
  ) {
    return `/dashboard/events/${item.keyPath[1]}/volunteers`;
  }
  if (item.keyPath.includes("events") && item.keyPath.includes("current")) {
    return `/dashboard/events/${item.key}`;
  }
  if (item.keyPath.includes("events") && item.keyPath.includes("create")) {
    return `/dashboard/events/create`;
  }
  if (item.keyPath.includes("settings") && item.keyPath.includes("account")) {
    return `/dashboard/settings/account`;
  }
  if (item.keyPath.includes("settings") && item.keyPath.includes("payment")) {
    return `/dashboard/settings/payment`;
  }
  if (item.keyPath.includes("settings") && item.keyPath.includes("support")) {
    return `/dashboard/settings/support`;
  }
  if (item.keyPath.includes("home")) {
    return `/dashboard/`;
  }
  return "/";
};

const Nav = ({ session, openkeys, selectedkey }) => {
  const items = [
    // getItem("Home", "home", <HomeOutlined />),
    getItem(
      "Home",
      "home",
      <img src="/logoico.svg" style={{ height: "50%" }} />
    ),
    getItem("Events", "events", <AppstoreOutlined />, [
      getItem(
        "Current events",
        "current",
        null,
        session.events.map((event) =>
          getItem(event.name, event.id, null, [
            getItem("Config", "config"),
            getItem("Tickets", "tickets"),
            getItem("Attendees", "attendees"),
            getItem("Volunteers", "volunteers"),
          ])
        )
      ),
      getItem("Create a new event", "create"),
    ]),
    getItem("Settings", "settings", <SettingOutlined />, [
      getItem("Account", "account"),
      getItem("Payment", "payment"),
      getItem("Support", "support"),
    ]),
  ];

  const onClick = (e) => {
    let url = assembleURL(e);
    console.log(url);
    document.location.href = url;
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
        minWidth: 256,
      }}
      defaultSelectedKeys={selectedkey}
      defaultOpenKeys={openkeys}
      mode="inline"
      items={items}
    />
  );
};
export default Nav;
