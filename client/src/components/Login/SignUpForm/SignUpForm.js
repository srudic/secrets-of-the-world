import React, { useState } from "react";

import axios from "axios";

import style from "./SignUpForm.module.css";

import { FaCheck, FaUsers } from "react-icons/fa";

const SignUpForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [usernameInvalid, setUsernameInvalid] = useState(false);

  let registerButtonClasses = [style.Btn];
  if (usernameInvalid || emailInvalid) {
    registerButtonClasses = [style.Btn, style.Disable].join(" ");
  }

  const sendSignUpData = () => {
    if (usernameInvalid || emailInvalid) return;
    const data = {
      username: username,
      password: password,
      email: email,
    };
    axios
      .put("http://localhost:8080/auth/signup", data)
      .then((response) => {
        props.toggleFormView();
      })
      .catch((err) => console.log(err));
  };

  const checkUsername = () => {
    axios
      .post("http://localhost:8080/feed/CheckUserName", {
        username: username,
      })
      .then((response) => {
        setUsernameInvalid(response.data.exist);
      })
      .catch((err) => console.log(err));
  };

  const checkEmail = () => {
    axios
      .post("http://localhost:8080/feed/CheckEmail", {
        email: email,
      })
      .then((response) => {
        setEmailInvalid(response.data.exist);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={style.LoginForm}>
      <div className={style.Title}>
        <FaUsers size={60} color={"white"} />
      </div>
      <div className={style.InputFields}>
        <h2>SIGN UP</h2>
        <input
          style={emailInvalid ? { border: "2px solid red" } : null}
          type="text"
          placeholder="Email"
          id="email"
          onMouseLeave={() => checkEmail()}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={usernameInvalid ? { border: "2px solid red" } : null}
          type="text"
          placeholder="Username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          onMouseLeave={() => checkUsername()}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {usernameInvalid ? <h3>Invalid username</h3> : null}
        {emailInvalid ? <h3>Invalid email</h3> : null}
        <div className={registerButtonClasses} onClick={sendSignUpData}>
          Sign Up
        </div>
      </div>
      <div className={style.Register}>
        <h2>Already have an account?</h2>
        <div className={style.RegisterBtn} onClick={props.toggleFormView}>
          Login here
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
