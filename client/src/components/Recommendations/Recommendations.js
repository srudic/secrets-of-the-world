import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import style from "./Recommendations.module.css";
import Recommendation from "./Recommendation/Recommendation";
import Spinner from "../UI/Spinner/Spinner";

import { FaChevronRight } from "react-icons/fa";

const Recommendations = (props) => {
  const [postsByViews, setPostsByViews] = useState(null);
  const [postsByRating, setPostsByRating] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/feed/GetRecommendatedPosts"
      );
      // console.log(response.data.posts);
      setPostsByViews(response.data.postsByViews);
      setPostsByRating(response.data.postsByRating);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  }, []);

  // let recommendationsArticle = <p>loading...</p>;
  let recommendationsArticle = <Spinner />;
  if (isLoaded) {
    recommendationsArticle = (
      <>
        <h2>The 10 most viewed stories</h2>
        <div className={style.RecommendationsContainer}>
          <Recommendation recommendations={postsByViews} />
        </div>
        <h2>The 10 top rated stories</h2>
        <div className={style.RecommendationsContainer}>
          <Recommendation recommendations={postsByRating} />
        </div>
      </>
    );
  }

  return (
    <div className={style.MainContainer}>
      <div className={style.RecommendationsHeader}>
        <h1>Recommendations for you</h1>
        <div
          className={style.SearchButton}
          onClick={() => props.history.replace("/Find a story")}
        >
          <h4>Search</h4>
          <FaChevronRight />
        </div>
      </div>
      {recommendationsArticle}
    </div>
  );
};

export default withRouter(Recommendations);
