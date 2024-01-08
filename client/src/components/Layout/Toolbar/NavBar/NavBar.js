import React from "react";

import style from "./NavBar.module.css";

import Tab from "./Tab/Tab";

const authTabs = [
  "Find a story",
  "Top rated",
  "7 wonders of the world",
  "My stories",
  "Add new story",
];

const tabs = ["Find a story", "Top rated", "7 wonders of the world"];

const navBar = (props) => {
  let navBarTabs = [...tabs];
  if (props.isAuth) {
    navBarTabs = [...authTabs];
  }
  return (
    <div className={style.NavBar}>
      <div className={style.NavTabs}>
        {navBarTabs.map((tab, i) => (
          <Tab tabName={tab} key={tab + i} active={tab === props.activeTab} />
        ))}
      </div>
      <div className={style.Line}></div>
    </div>
  );
};

export default navBar;
