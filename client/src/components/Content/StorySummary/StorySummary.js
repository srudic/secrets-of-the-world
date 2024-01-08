import React from "react";

import style from "./StorySummary.module.css";

import ViewStoryBtn from "../../UI/Buttons/ViewStoryBtn/ViewStoryBtn";
import Stars from "../../UI/Stars/Stars";

const StorySummary = (props) => {
  return (
    <div className={style.StorySummary}>
      <div className={style.Header}>
        <div className={style.Caption}>
          <h1>{props.title}</h1>
          <Stars rating={props.rating} />
        </div>
        <div className={style.Data}>
          <h4>{props.creator}</h4>
          <h5>{props.views} views</h5>
        </div>
      </div>
      <div className={style.Content}>
        <div className={style.Image}>
          <img src={`http://localhost:8080/${props.img}`} alt="slika" />
        </div>
        <div className={style.TextAndBtn}>
          <div className={style.Text}>{props.summary}</div>
          <ViewStoryBtn clicked={props.clicked} />
        </div>
      </div>
    </div>
  );
};

export default StorySummary;
