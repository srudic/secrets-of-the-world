import React from "react";
import style from "./RateBtn.module.css";

const RateBtn = (props) => {
  return (
    <div className={style.RateBtn} onClick={props.clicked}>
      Rate
    </div>
  );
};

export default RateBtn;
