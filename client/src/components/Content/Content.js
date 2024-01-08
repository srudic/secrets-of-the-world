import React, { Component } from "react";

import style from "./Content.module.css";
import StorySummary from "./StorySummary/StorySummary";

import { withRouter } from "react-router-dom";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  storyToggleHandler = (id) => {
    this.props.history.replace(`Story/${id}`);
  };

  render() {
    let content = null;
    switch (this.props.activeTab) {
      case "Find a story":
        if (this.props.stories.length !== 0)
          content = this.props.stories.map((story) => {
            return (
              <StorySummary
                key={story._id}
                title={story.storyTitle}
                creator={story.creator.name}
                views={story.views}
                rating={
                  story.rating === 0 || story.votesNumber === 0
                    ? 0
                    : story.rating / story.votesNumber
                }
                img={story.imageUrl}
                summary={story.summary}
                id={story._id}
                clicked={() => this.storyToggleHandler(story._id)}
              />
            );
          });
        break;
      case "7 wonders of the world":
        let showAll = null;

        showAll = !this.props.filters.some(({ isValid }) => {
          return isValid;
        });

        if (this.props.stories)
          content = this.props.stories.map((story) => {
            let storyFound = false;
            let showStory = false;
            storyFound = this.props.filters.find(({ filterName, isValid }) => {
              if (filterName === story.tag && isValid) {
                return true;
              }
              return false;
            });

            if (storyFound) {
              showStory = true;
            }

            return (story.tag && showStory) || (story.tag && showAll) ? (
              <StorySummary
                key={story._id}
                title={story.storyTitle}
                creator={story.creator.name}
                views={story.views}
                rating={
                  story.rating === 0 || story.votesNumber === 0
                    ? 0
                    : story.rating / story.votesNumber
                }
                img={story.imageUrl}
                summary={story.summary}
                id={story._id}
                clicked={() => this.storyToggleHandler(story._id)}
              />
            ) : null;
          });
        break;
      default:
        content = null;
        break;
    }

    const filters = ["Country", "City", "Author"];
    let selectedFilters;
    if (this.props.selectedFilters)
      selectedFilters = (
        <div className={style.FiltersContainer}>
          {this.props.selectedFilters.map((filter, i) =>
            filter !== "" ? (
              <div key={filters[i]} className={style.Filter}>
                <i>{filters[i]}:</i> {filter}
              </div>
            ) : null
          )}
        </div>
      );

    return (
      <>
        <div className={style.Content}>
          {this.props.activeTab !== "7 wonders of the world"
            ? selectedFilters
            : null}
          {content}
        </div>
      </>
    );
  }
}

export default withRouter(Content);
