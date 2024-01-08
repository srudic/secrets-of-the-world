import React from "react";
import { withRouter } from "react-router-dom";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import style from "./Recommendation.module.css";
import { FaSignature } from "react-icons/fa";

const recommendation = (props) => {
  const storyToggleHandler = (id) => {
    props.history.push(`Story/${id}`);
  };

  let recommendations = (
    <CarouselProvider
      className={style.CarouselProvider}
      naturalSlideHeight={100}
      naturalSlideWidth={100}
      totalSlides={5}
      visibleSlides={3}
      infinite={true}
      // dragEnabled={false}
    >
      <Slider>
        {props.recommendations.map((recommendation, i) => {
          return (
            <Slide key={recommendation._id} index={i}>
              <div
                className={style.Recommendation}
                onClick={() => storyToggleHandler(recommendation._id)}
              >
                <div className={style.ImageContainer}>
                  <img
                    draggable={false}
                    src={`http://localhost:8080/${recommendation.imageUrl}`}
                    alt={recommendation.storyTitle}
                  />
                </div>
                <h4>{recommendation.storyTitle}</h4>
                <div className={style.Author}>
                  <FaSignature color="white" />
                  <span>{recommendation.creator.name}</span>
                </div>
              </div>
            </Slide>
          );
        })}
      </Slider>
      <ButtonBack className={style.LeftArrow}>
        <FaChevronLeft size={55} color={"rgba(0, 19, 77, 1)"} />
      </ButtonBack>
      <ButtonNext className={style.RightArrow}>
        <FaChevronRight size={55} color={"rgba(0, 19, 77, 1)"} />
      </ButtonNext>
    </CarouselProvider>
  );

  return <div className={style.SliderContainer}>{recommendations}</div>;
};

export default withRouter(recommendation);
