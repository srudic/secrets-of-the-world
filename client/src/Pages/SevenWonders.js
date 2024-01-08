import React, { Component } from "react";

import Layout from "../components/Layout/Layout";
import WondersPhoto from "../components/WondersPhoto/WondersPhoto";
import WondersFilter from "../containers/WondersFilter/WondersFilter";
import Content from "../components/Content/Content";
import Spinner from "../components/UI/Spinner/Spinner";
import axios from "axios";

class SevenWonders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: null,
      filters: [
        {
          filterName: "Taj Mahal",
          isValid: false,
        },
        {
          filterName: "Colosseum",
          isValid: false,
        },
        {
          filterName: "Chichen Itza",
          isValid: false,
        },
        {
          filterName: "Petra",
          isValid: false,
        },
        {
          filterName: "Christ the Redeemer",
          isValid: false,
        },
        {
          filterName: "Machu Picchu",
          isValid: false,
        },
        {
          filterName: "Great Wall of China",
          isValid: false,
        },
      ],
    };
  }

  async componentDidMount() {
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
  }

  setFilterHandler = (selectedFilter) => {
    let filters = [...this.state.filters];
    let newFilters = filters.map((filter) => {
      if (filter.filterName === selectedFilter) {
        filter.isValid = !filter.isValid;
      }
      return filter;
    });
    this.setState({ filters: newFilters });
  };

  render() {
    let content = <Spinner />;
    if (this.state.stories) {
      content = (
        <Content
          activeTab="7 wonders of the world"
          filters={this.state.filters}
          stories={this.state.stories}
        />
      );
    }
    return (
      <Layout activeTab="7 wonders of the world" {...this.props}>
        <WondersPhoto />
        <WondersFilter
          filters={this.state.filters}
          filterClicked={this.setFilterHandler}
        />
        {content}
      </Layout>
    );
  }
}

export default SevenWonders;
