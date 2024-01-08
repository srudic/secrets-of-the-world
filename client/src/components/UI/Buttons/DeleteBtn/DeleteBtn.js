import React from "react";
import style from "./DeleteBtn.module.css";

const DeleteBtn = (props) => {
  return (
    <div className={style.DeleteBtn} onClick={props.clicked}>
      Delete
    </div>
  );
};

export default DeleteBtn;
