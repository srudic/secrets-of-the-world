import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import ContentGrid from "../components/ContentGrid/ContentGrid";

const MyStories = (props) => {
  const [stories, setStories] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:8080/feed/GetMyStories",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setStories(response.data.stories);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const deleteStoryFrontEnd = (storyId) => {
    const newStories = stories.filter((story) => {
      if (story._id.toString() === storyId.toString()) return false;
      return true;
    });
    setStories(newStories);
  };

  return (
    <Layout activeTab="My stories" {...props}>
      <h1
        style={{
          color: "rgba(189, 50, 117, 1)",
          margin: "1em 3em",
          fontSize: "3em",
        }}
      >
        My stories
      </h1>
      <ContentGrid
        activeTab="My stories"
        stories={stories}
        isLoaded={isLoaded}
        deleteStoryFrontEnd={deleteStoryFrontEnd}
      />
    </Layout>
  );
};

export default MyStories;
