import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import { RecommendationStories as stories } from "../../constants";
import Layout from "../Layout/Layout";
import PublishBtn from "../UI/Buttons/PublishBtn/PubishBtn";
import UploadBtn from "../UI/Buttons/UploadBtn/UploadBtn";

import style from "./ModifyStory.module.css";

const ModifyStory = (props) => {
  const [story, setStory] = useState(true);
  useEffect(() => {
    const storyId = props.match.params.id;
    stories.find(({ id }) => id.toString() === storyId.toString());
  }, []);

  let loadedStory = <p>Loading story</p>;
  if (story) {
    console.log(story);
    loadedStory = (
      <div className={style.ModifyStory}>
        <h2>Title</h2>
        <input
          onChange={(e) => {
            let updatedStory = { ...story };
            updatedStory.storyTitle = e.target.value;
            setStory(updatedStory);
          }}
          value={story.storyTitle}
        />
        <div className={style.CityAndCountry}>
          <div>
            <h2>City</h2>
            <input
              onChange={(e) => {
                let updatedStory = { ...story };
                updatedStory.city = e.target.value;
                setStory(updatedStory);
              }}
              value={story.city}
            />
          </div>
          <div>
            <h2>Country</h2>

            <input
              onChange={(e) => {
                let updatedStory = { ...story };
                updatedStory.country = e.target.value;
                setStory(updatedStory);
              }}
              value={story.country}
            />
          </div>
        </div>

        <img src={story.imageUrl} style={{ width: "155vh" }} />
        <UploadBtn />
        <h2>Text</h2>
        <textarea
          onChange={(e) => {
            let updatedStory = { ...story };
            updatedStory.storyText = e.target.value;
            setStory(updatedStory);
          }}
          value={story.storyText}
          rows={15}
        ></textarea>
        <h2>Summary</h2>
        <textarea
          onChange={(e) => {
            let updatedStory = { ...story };
            updatedStory.summary = e.target.value;
            setStory(updatedStory);
          }}
          value={story.summary}
          rows={5}
        ></textarea>
      </div>
    );
  }
  return (
    <>
      <Layout {...props}>
        {loadedStory}
        <div className={style.Buttons}>
          <PublishBtn />
        </div>
      </Layout>
    </>
  );
};

export default withRouter(ModifyStory);
