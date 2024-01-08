import React, { Component } from "react";
import axios from "axios";

import { withRouter } from "react-router-dom";

import style from "./FullStory.module.css";

import Stars from "../UI/Stars/Stars";
import Layout from "../Layout/Layout";

import Rating from "../Rating/Rating";
import RateBtn from "../UI/Buttons/RateBtn/RateBtn";
import Spinner from "../UI/Spinner/Spinner";

import { FaMapMarkerAlt } from "react-icons/fa";
import { FaSignature } from "react-icons/fa";

class FullStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      story: null,
      isLoaded: false,
      rating: false,
      storyId: null,
    };
  }

  async componentDidMount() {
    const storyId = this.props.match.params.id;
    try {
      const response = await axios.post(
        "http://localhost:8080/feed/GetStorybyId",
        { storyId: storyId }
      );
      const fullStory = response.data.fullStory;

      this.setState({ story: fullStory, isLoaded: true, storyId: storyId });
    } catch (err) {
      console.log(err);
    }
  }

  ratingClosedHandler = () => {
    this.setState({ rating: false });
  };

  ratingToggleHandler = () => {
    this.setState((prevState) => {
      return { rating: !prevState.rating };
    });
  };

  rateStory = async (rateInput) => {
    const token = localStorage.getItem("token");
    if (rateInput) {
      try {
        axios.post(
          "http://localhost:8080/feed/RateStory",
          {
            userRate: rateInput,
            storyId: this.state.storyId,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
    this.ratingToggleHandler();
  };

  render() {
    let fullStory = <Spinner />;
    if (this.state.isLoaded) {
      fullStory = (
        <>
          <div className={style.FullStory}>
            <div className={style.Header}>
              <div className={style.Data}>
                <h1>{this.state.story.storyTitle}</h1>
                <div className={style.Creator}>
                  <FaSignature color={"rgba(0, 19, 77, 1)"} />
                  <h4>{this.state.story.creator.name}</h4>
                </div>

                <div className={style.Location}>
                  <FaMapMarkerAlt color={"rgba(0, 19, 77, 1)"} />
                  <h4>
                    {this.state.story.country}, {this.state.story.city}
                  </h4>
                </div>
              </div>
              <div className={style.Report}>
                <div className={style.Stars}>
                  {this.props.isAuth ? (
                    <RateBtn clicked={this.ratingToggleHandler} />
                  ) : null}
                  <Stars rating={this.state.story.rating} />
                </div>
                <h5>{this.state.story.views} views</h5>
              </div>
            </div>
            <div className={style.CoverPhoto}>
              <img
                src={`http://localhost:8080/${this.state.story.imageUrl}`}
                alt="coverPhoto"
              />
            </div>
            <div className={style.Text}>{this.state.story.storyText}</div>
          </div>
          <Rating
            open={this.state.rating}
            closed={this.ratingClosedHandler}
            rateStory={this.rateStory}
          />
        </>
      );
    }
    return (
      <>
        <Layout {...this.props}>{fullStory} </Layout>
      </>
    );
  }
}

export default withRouter(FullStory);
