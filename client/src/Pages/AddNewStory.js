import React, { useState } from "react";

import Layout from "../components/Layout/Layout";
import AddingStory from "../components/AddingStory/AddingStory";

const AddNewStory = (props) => {
  const [title, setTitle] = useState("Add new story");
  return (
    <Layout activeTab="Add new story" {...props}>
      <h1
        style={{
          color: "rgba(189, 50, 117, 1)",
          margin: "1em 3em",
          fontSize: "3em",
        }}
      >
        {title}
      </h1>
      <AddingStory setTitle={setTitle} title={title} />
    </Layout>
  );
};

export default AddNewStory;
