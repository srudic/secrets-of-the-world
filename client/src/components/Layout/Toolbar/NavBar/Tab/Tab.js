import React from "react";
import { NavLink } from "react-router-dom";

import style from "./Tab.module.css";
import { FaPlus } from "react-icons/fa";

const Tab = (props) => {
  return (
    <NavLink to={`/${props.tabName}`}>
      <div className={`${style.Tab} ${props.active ? style.Active : ""}`}>
        {props.tabName === "Add new story" ? (
          <FaPlus color={"white"} size={13} style={{ marginRight: "3px" }} />
        ) : null}
        {props.tabName}
      </div>
    </NavLink>
  );
};

export default Tab;
