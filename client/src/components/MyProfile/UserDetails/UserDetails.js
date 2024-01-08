import React, { useState } from "react";

import axios from "axios";

import style from "./UserDetails.module.css";

const UserDetails = (props) => {
  const [userName, setUserName] = useState(props.userData.name);
  const [email, setEmail] = useState(props.userData.email);
  const [odlPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassConfirm, setnewPassConfirm] = useState("");

  const [emailInvalid, setEmailInvalid] = useState(true);
  const [usernameInvalid, setUsernameInvalid] = useState(true);

  const [detailsChanged, setDetailsChanged] = useState(false);

  const checkUsername = () => {
    axios
      .post("http://localhost:8080/feed/CheckUserName", {
        username: userName,
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

  const updateDetails = () => {
    if (usernameInvalid && emailInvalid) return;
    const token = localStorage.getItem("token");

    const formData = {
      username: userName,
      email: email,
    };

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios
      .post("http://localhost:8080/feed/ChangeUserDetails", formData, config)
      .then((res) => {
        setDetailsChanged(res.data.changed);
      })
      .catch((err) => {
        // console.log(err);
      });
    setTimeout(() => {
      setDetailsChanged(false);
    }, 3500);
  };

  return (
    <div className={style.UserDetails}>
      <h1>Your details</h1>
      <div className={style.Details}>
        <label>Username</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          onMouseLeave={() => checkUsername()}
        />
        <label>E-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onMouseLeave={() => checkEmail()}
        />
        <div
          style={
            usernameInvalid && emailInvalid ? { cursor: "not-allowed" } : null
          }
          onClick={updateDetails}
        >
          Update details
        </div>
        {detailsChanged ? <p>Details changed succesfully!</p> : null}
      </div>

      {/* <h2>Change password</h2>
      <div className={style.Details}>
        <label>Old password</label>
        <input
          type="password"
          onChange={(e) => {
            setOldPassword(e.target.value);
          }}
        />
        <label>New password</label>
        <input
          type="password"
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
        <label>Re-enter new password</label>
        <input
          type="password"
          onChange={(e) => {
            setnewPassConfirm(e.target.value);
          }}
        />
        <div>Change password</div>
      </div> */}
    </div>
  );
};

export default UserDetails;
