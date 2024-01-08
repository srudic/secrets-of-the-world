import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import Header from "./Header/Header";
import NavBar from "./NavBar/NavBar";
import LoginBtn from "../../Login/LoginBtn/LoginBtn";

import style from "./Toolbar.module.css";

const Toolbar = (props) => {
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    props.setAuthFalse();
    props.history.push("/");
  };
  const [hover, setHover] = useState(false);

  const myProfileHandler = () => {
    props.history.replace(`/MyProfile`);
  };

  return (
    <div className={style.Toolbar}>
      <div className={style.HeaderContainer}>
        <Header />
        {!props.isAuth ? (
          <LoginBtn clicked={props.loginToggleClicked} />
        ) : (
          <div className={style.Logged}>
            <h2>Logged as</h2>
            <div
              className={style.LoggedName}
              onMouseLeave={() => setHover(false)}
            >
              <h2 onMouseEnter={() => setHover(true)}>{props.userName}</h2>
              <div
                className={style.NameHover}
                style={hover ? null : { opacity: "0" }}
              >
                <h3 onClick={myProfileHandler}>My Profile</h3>
                <h3 onClick={logoutHandler}>Log out</h3>
              </div>
            </div>
          </div>
        )}
      </div>
      <NavBar activeTab={props.activeTab} isAuth={props.isAuth} />
    </div>
  );
};

export default withRouter(Toolbar);
