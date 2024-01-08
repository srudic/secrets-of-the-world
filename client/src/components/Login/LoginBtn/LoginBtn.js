import React from "react";

import style from "./LoginBtn.module.css";

const LoginBtn = (props) => {
  return (
    <div className={style.LoginBtn} onClick={props.clicked}>
      Login
    </div>
  );
};

export default LoginBtn;
