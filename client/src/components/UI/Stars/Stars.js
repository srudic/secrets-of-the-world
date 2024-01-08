import React from "react";

import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

import style from "./Stars.module.css";

const Stars = (props) => {
  return (
    <div className={style.Rating}>
      {Array(5)
        .fill()
        .map((star, i) => {
          return props.rating > i + 0.4 ? (
            <FaStar color={"gold"} key={i} />
          ) : (
            <FaRegStar color={"gold"} key={i} />
          );
        })}
      <h2>{props.rating}</h2>
    </div>
  );
};

export default Stars;
