import React from "react";
import { withRouter } from "react-router-dom";

import style from "./Header.module.css";

const header = (props) => {
  return (
    <div className={style.Header}>
      <h1 onClick={() => props.history.replace("/")}>Secrets of the world</h1>
      <h3>Discover the secrets of the world through the stories of others</h3>
    </div>
  );
};

export default withRouter(header);
