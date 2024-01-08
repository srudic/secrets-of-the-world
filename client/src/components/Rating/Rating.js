import React, { useState } from "react";
import Modal from "../UI/Modal/Modal";
import style from "./Rating.module.css";

import { FaStar } from "react-icons/fa";

const Rating = (props) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <Modal show={props.open} clicked={props.closed} rate>
      <div className={style.Rating}>
        <h1>Enojing the story?</h1>
        <div>
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />
                <FaStar
                  color={ratingValue <= (hover || rating) ? "gold" : "#e4e5e9"}
                  size={45}
                  style={{ marginRight: "1em" }}
                  className={style.Star}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
          {rating ? <p>You rate with {rating} stars!</p> : null}
        </div>
        <h2 onClick={() => props.rateStory(rating)}>RATE THE STORY!</h2>
      </div>
    </Modal>
  );
};

export default Rating;
