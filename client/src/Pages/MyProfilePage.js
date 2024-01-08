import React from "react";

import { withRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import MyProfile from "../components/MyProfile/MyProfile";

const MyProfilePage = (props) => {
  return (
    <Layout {...props}>
      <h1
        style={{
          color: "rgba(189, 50, 117, 1)",
          padding: "1em 3em",
          fontSize: "3em",
          backgroundColor: "rgb(195, 233, 255)",
          margin: "0px",
        }}
      >
        My Profile
      </h1>
      <MyProfile {...props} />
    </Layout>
  );
};

export default withRouter(MyProfilePage);
