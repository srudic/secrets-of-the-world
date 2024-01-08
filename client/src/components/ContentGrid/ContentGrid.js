import React, { Component } from "react";

import axios from "axios";

import StorySummaryGrid from "./StorySummaryGrid/StorySummaryGrid";
import { withRouter } from "react-router-dom";

import style from "./ContentGrid.module.css";

class ContentGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async deleteStory(clickedId) {
    // console.log(clickedId);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:8080/feed/DeleteStory",
        { postId: clickedId },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        this.props.deleteStoryFrontEnd(clickedId);
      }
    } catch (err) {
      console.log(err);
    }
  }

  storyToggleHandler = (id) => {
    this.props.history.replace(`Story/${id}`);
  };

  render() {
    let content = <p>Stories are loading...</p>;
    if (this.props.isLoaded) {
      switch (this.props.activeTab) {
        case "Top rated":
          content = this.props.stories.map((story) => {
            // console.log(story.imageUrl);
            return story.rating / story.votesNumber > 4.4 ? (
              <StorySummaryGrid
                key={story._id}
                title={story.storyTitle}
                creator={story.creator.name}
                views={story.views}
                rating={story.rating / story.votesNumber}
                img={story.imageUrl}
                id={story.id}
                clicked={() => this.storyToggleHandler(story._id)}
              />
            ) : null;
          });
          break;
        case "My stories":
          content = this.props.stories.map((story) => {
            // console.log(story);
            return (
              <StorySummaryGrid
                key={story._id}
                title={story.storyTitle}
                views={story.views}
                rating={story.rating / story.votesNumber}
                img={story.imageUrl}
                id={story._id}
                clicked={() => this.storyToggleHandler(story._id)}
                deleteStory={() => this.deleteStory(story._id)}
                myStoriesTab
              />
            );
          });
          break;
        default:
          content = null;
          break;
      }
    }

    return <div className={style.ContentGrid}>{content}</div>;
  }
}

export default withRouter(ContentGrid);
