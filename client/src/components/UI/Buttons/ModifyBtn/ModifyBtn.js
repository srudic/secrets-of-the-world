import React from "react";

import style from "./ModifyBtn.module.css";

const ModifyBtn = (props) => {
  return (
    <div className={style.ModifyBtn} onClick={props.clicked}>
      Modify
    </div>
  );
};

export default ModifyBtn;
