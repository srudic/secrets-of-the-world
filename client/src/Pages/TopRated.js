import React, { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/Layout/Layout";
import ContentGrid from "../components/ContentGrid/ContentGrid";
import Spinner from "../components/UI/Spinner/Spinner";

const TopRated = (props) => {
  const [stories, setStories] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/feed/GetTopRatedStories"
      );

      setStories(response.data.stories);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <Layout activeTab="Top rated" {...props}>
      <h1
        style={{
          color: "rgba(189, 50, 117, 1)",
          margin: "1em 3em",
          fontSize: "3em",
        }}
      >
        Top rated
      </h1>
      {isLoaded ? (
        <ContentGrid
          activeTab="Top rated"
          stories={stories}
          isLoaded={isLoaded}
        />
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};

export default TopRated;
