import React, { useState } from "react";

import { withRouter } from "react-router-dom";

import Stars from "../../UI/Stars/Stars";
import ViewStoryBtn from "../../UI/Buttons/ViewStoryBtn/ViewStoryBtn";
import ModifyBtn from "../../UI/Buttons/ModifyBtn/ModifyBtn";
import DeleteBtn from "../../UI/Buttons/DeleteBtn/DeleteBtn";
import Deleting from "../../Deleting/Deleting";

import style from "./StorySummaryGrid.module.css";

const StorySummaryGrid = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const deleteClickedHandler = () => {
    setModalOpen(!modalOpen);
  };

  const modifyStoryHandler = async (id) => {
    props.history.replace(`Add New Story/${id}`);
  };

  return (
    <>
      <div className={style.Story}>
        <h1>{props.title}</h1>
        {props.creator ? <h3>{props.creator}</h3> : null}
        <div className={style.Data}>
          <h5>{props.views} views</h5>
          <Stars rating={props.rating} />
        </div>
        <div className={style.ImageContainer}>
          <div className={style.Image}>
            <img src={`http://localhost:8080/${props.img}`} alt="slika" />
          </div>
        </div>

        <div className={style.Buttons}>
          <ViewStoryBtn clicked={props.clicked} />
          {props.myStoriesTab ? (
            <div className={style.ModifyAndDelete}>
              <ModifyBtn clicked={() => modifyStoryHandler(props.id)} />
              <DeleteBtn clicked={deleteClickedHandler} />
            </div>
          ) : null}
        </div>
      </div>
      <Deleting
        deleteStory={props.deleteStory}
        open={modalOpen}
        closed={deleteClickedHandler}
        title={props.title}
      />
    </>
  );
};

export default withRouter(StorySummaryGrid);
