import React, { Component } from "react";
import axios from "axios";

import { withRouter } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import Searching from "../components/Searching/Searching";
import Content from "../components/Content/Content";
import Spinner from "../components/UI/Spinner/Spinner";
import SearchingLoader from "../components/Searching/SearchingLoader/SearchingLoader";

class FindStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: null,
      selectedFilters: ["", "", ""],
    };
  }

  componentDidMount() {
    const searchInput = this.props.match.params.searchInput;
    this.loadStories();
    if (searchInput) {
      const country = searchInput.split("&")[0];
      const author = searchInput.split("&")[1];
      if (country !== "" || author !== "") {
        this.findStoriesHandler(country, "", author);
      }
    }
  }

  loadStories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/feed/GetAllPosts"
      );
      const posts = response.data.posts;

      this.setState({
        stories: posts,
      });
    } catch (err) {
      console.log(err);
    }
  };

  findStoriesHandler = async (country, city, author) => {
    const searchData = {
      userCountryInput: country,
      userCityInput: city,
      userAuthorInput: author,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/feed/getSearchedStories",
        searchData
      );

      this.setState({
        stories: response.data.stories,
        selectedFilters: [country, city, author],
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    // let content = <p>Stories are coming...</p>;
    let content = <Spinner />;
    let searching = <SearchingLoader />;

    if (this.state.stories) {
      content = (
        <Content
          selectedFilters={this.state.selectedFilters}
          activeTab="Find a story"
          stories={this.state.stories}
        />
      );
      searching = (
        <Searching
          activeTab="Find a story"
          stories={this.state.stories}
          findStoriesHandler={this.findStoriesHandler}
        />
      );
    }

    return (
      <Layout activeTab="Find a story" {...this.props}>
        {searching}
        {content}
      </Layout>
    );
  }
}

export default withRouter(FindStory);
