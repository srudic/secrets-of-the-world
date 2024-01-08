import React from "react";

import style from "./ViewStoryBtn.module.css";

const ViewStoryBtn = (props) => {
  return (
    <div className={style.ViewStoryBtn} onClick={props.clicked}>
      View story
    </div>
  );
};

export default ViewStoryBtn;
