import React from "react";

import style from "./Tag.module.css";

const Tag = (props) => {
  return (
    <div className={`${style.Tag} ${props.active ? style.Clicked : ""}`}>
      {props.tagName}
    </div>
  );
};

export default Tag;
