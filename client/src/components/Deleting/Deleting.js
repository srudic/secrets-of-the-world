import React from "react";
import Modal from "../UI/Modal/Modal";
import { FaExclamationCircle } from "react-icons/fa";
import style from "./Deleting.module.css";

const Deleting = (props) => {
  const answerChosen = () => {
    props.deleteStory();
    props.closed();
  };
  return (
    <Modal show={props.open} clicked={props.closed} delete>
      <div className={style.Deleting}>
        <FaExclamationCircle
          size={60}
          color="white"
          className={style.Exclamation}
        />
        <div className={style.Text}>
          <h2>Are you sure?</h2>
          <h5>
            You will not be able to recover <span>{props.title}</span>
          </h5>
        </div>
        <div className={style.Buttons}>
          <div className={style.NoButton}>No, cancel it!</div>
          <div onClick={answerChosen} className={style.YesButton}>
            Yes, delete it!
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Deleting;
