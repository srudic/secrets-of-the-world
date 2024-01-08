import React from "react";

import Backdrop from "../Backdrop/Backdrop";
import style from "./Modal.module.css";

const modal = (props) => {
  let classes = [style.Modal];
  if (props.rate) {
    classes = [style.RateModal];
  }
  if (props.delete) {
    classes = [style.DeleteModal];
  }
  if (props.confirmPublishing) {
    classes = [style.ConfirmPublishingModal];
  }
  return (
    <>
      <Backdrop show={props.show} clicked={props.clicked} />
      <div
        className={classes}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export default modal;
