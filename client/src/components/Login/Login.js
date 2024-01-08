import React, { useState } from "react";

import Modal from "../UI/Modal/Modal";
import LoginForm from "./LoginForm/LoginForm";
import SignUpForm from "./SignUpForm/SignUpForm";

const Login = (props) => {
  const [showSignUp, setSignUpModal] = useState(false);

  const toggleFormView = () => {
    setSignUpModal(!showSignUp);
  };

  let modal = null;

  if (!props.isAuth) {
    modal = (
      <Modal show={props.open} clicked={props.closed}>
        {!showSignUp ? (
          <LoginForm
            setUserName={props.setUserName}
            toggleFormView={toggleFormView}
            setAuthTrue={props.setAuthTrue}
            closed={props.closed}
          />
        ) : null}
        {showSignUp ? <SignUpForm toggleFormView={toggleFormView} /> : null}
      </Modal>
    );
  }

  return <> {modal}</>;
};

export default Login;
