import React from "react";

import Modal from "../UI/Modal/Modal";
import { FaExclamationCircle } from "react-icons/fa";
import style from "./ConfirmPublishing.module.css";
import Spinner from "../UI/Spinner/Spinner";

const ConfirmPublishing = (props) => {
  const answerChosen = () => {
    props.publishStory();
    props.closed();
    props.setPublishLoader(true);
  };

  let modalContent = <Spinner />;
  if (!props.showSpinner) {
    modalContent = (
      <div className={style.ConfirmPublishing}>
        <FaExclamationCircle size={60} color="var(--mainPink)" />
        <h1>Confirm publishing</h1>
        <p>
          Publishing this will make it available to the public immediately upon
          completion. This process may take a while.
        </p>
        <p>Are you sure you want to continue?</p>
        <div className={style.Choose}>
          <h2 onClick={props.closed}>Cancel</h2>
          <h2 onClick={answerChosen}>Publish</h2>
        </div>
      </div>
    );
  }
  return (
    <Modal show={props.open} clicked={props.closed} confirmPublishing>
      {modalContent}
    </Modal>
  );
};

export default ConfirmPublishing;
