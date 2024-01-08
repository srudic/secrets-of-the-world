import React from "react";

import style from "./PublishBtn.module.css";

const PublishBtn = (props) => {
  return (
    <div className={style.PublishBtn} onClick={props.confirmPublishingHandler}>
      Publish
    </div>
  );
};

export default PublishBtn;
