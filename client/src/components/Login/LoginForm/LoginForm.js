import React, { useState } from "react";

import axios from "axios";

import style from "./LoginForm.module.css";

import { FaUsers } from "react-icons/fa";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    const data = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8080/auth/login", data)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("userName", response.data.userName);
          props.setAuthTrue();
          props.closed();
          props.setUserName(response.data.userName);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={style.LoginForm}>
      <div className={style.Title}>
        <FaUsers size={60} color={"white"} />
      </div>
      <div className={style.InputFields}>
        <h2>MEMBER LOGIN</h2>
        <div className={style.InputField}>
          <input
            type="text"
            placeholder="Email"
            id="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className={style.InputField}>
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className={style.Btn} onClick={loginHandler}>
          Login
        </div>
      </div>
      <div className={style.Register}>
        <h2>Don't have an account?</h2>
        <div className={style.RegisterBtn} onClick={props.toggleFormView}>
          Register here
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
