import React from "react";
import { withRouter } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import Recommendations from "../components/Recommendations/Recommendations";
import Searching from "../components/Searching/Searching";

const Home = (props) => {
  const searchMiddleware = (country, author) => {
    props.history.push(`/Find a story/${country}&${author}`);
  };

  return (
    <Layout activeTab="Home" {...props}>
      <Searching
        stories={[]}
        tab={"Home"}
        searchMiddleware={searchMiddleware}
      />
      <Recommendations activeTab />
    </Layout>
  );
};

export default withRouter(Home);
