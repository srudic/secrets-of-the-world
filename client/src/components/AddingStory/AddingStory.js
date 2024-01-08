import React, { useState, useEffect } from "react";

import axios from "axios";
import { withRouter } from "react-router-dom";

import style from "./AddingStory.module.css";

import PublishBtn from "../UI/Buttons/PublishBtn/PubishBtn";
import UploadPhoto from "../UploadPhoto/UploadPhoto";
import ConfirmPublishing from "../ConfirmPublishing/ConfirmPublishing";

const AddingStory = (props) => {
  const [city, changeCity] = useState("");
  const [country, changeCountry] = useState("");
  const [summary, changeSummary] = useState("");
  const [title, changeTitle] = useState("");
  const [text, changeText] = useState("");
  const [selectWonder, setSelectWonder] = useState("");
  const summaryLimit = 320;
  const textLimit = 1600;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [storyId, setStoryId] = useState(undefined);
  const [showStoredPhoto, setShowStoredPhoto] = useState(undefined);
  const [validStoryId, setValidStoryId] = useState(true);
  const [publishLoader, setPublishLoader] = useState(false);

  useEffect(async () => {
    props.setTitle("Add new story");
    const storyId = props.match.params.id;
    if (storyId) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          "http://localhost:8080/feed/GetPost",
          { postId: storyId },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setShowStoredPhoto(true);
        setStoryId(storyId);
        setSelectedFile(response.data.post.imageUrl);
        changeCity(response.data.post.city);
        changeCountry(response.data.post.country);
        changeSummary(response.data.post.summary);
        changeTitle(response.data.post.storyTitle);
        changeText(response.data.post.storyText);
        setSelectWonder(response.data.post.tag);
      } catch (err) {
        setValidStoryId(false);
        // console.log(err);
      }
      props.setTitle("Modify story");
      // console.log(storyId);
    } else {
      setStoryId(undefined);
      setSelectedFile(undefined);
      changeCity("");
      changeCountry("");
      changeSummary("");
      changeTitle("");
      changeText("");
      setSelectWonder("");
      setValidStoryId(true);
    }
  }, [props.match.params.id]);

  const onSelectFile = (e) => {
    // console.log(e);
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
    // console.log(e.target.files[0]);
    setShowStoredPhoto(false);
  };

  const confirmPublishingHandler = () => {
    setModalOpen(!modalOpen);
  };

  const publishStory = () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("id", storyId);
    formData.append("Image", selectedFile);
    formData.append("storyTitle", title);
    formData.append("forRecomendation", true);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("tag", selectWonder);
    formData.append("storyText", text);
    formData.append("summary", summary);
    formData.append("formData", formData);
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios
      .post("http://localhost:8080/feed/CreateNewStory", formData, config)
      .then((res) => {
        if (res.status === 201) {
          setPublishLoader(false);
          props.history.push(`/My stories/`);
          props.history.push(`/Story/${res.data.post._id}`);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  let content = <h1>Invalid story id</h1>;
  if (validStoryId) {
    content = (
      <div className={style.Container}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => {
            changeTitle(e.target.value);
          }}
        />
        <div className={style.SecondRow}>
          <input
            name="Country"
            placeholder="Country"
            value={country}
            onChange={(e) => {
              changeCountry(e.target.value);
            }}
          />
          <input
            name="City"
            placeholder="City"
            value={city}
            onChange={(e) => {
              changeCity(e.target.value);
            }}
          />
          <div className={style.Select}>
            <select
              value={selectWonder}
              onChange={(e) => {
                setSelectWonder(e.target.value);
              }}
            >
              <option value="">Select world wonder</option>
              <option value="Taj Mahal">Taj Mahal</option>
              <option value="Colosseum">Colosseum</option>
              <option value="Chichen Itza">Chichen Itza</option>
              <option value="Petra">Petra</option>
              <option value="Christ the Redeemer">Christ the Redeemer</option>
              <option value="Machu Picchu">Machu Picchu</option>
              <option value="Great Wall of China">Great Wall of China</option>
            </select>
          </div>
        </div>
        <UploadPhoto
          pictureWidth="80%"
          pictureHeight="400px"
          onSelectFile={onSelectFile}
          selectedFile={selectedFile}
          showStoredPhoto={showStoredPhoto}
        />
        <div className={style.Text}>
          <textarea
            value={text}
            placeholder="Text"
            onChange={(e) => {
              changeText(e.target.value);
            }}
            maxLength={1600}
            rows={15}
          />
          <h2>Remaining Characters: {textLimit - text.length}</h2>
        </div>

        <div className={style.Summary}>
          <textarea
            placeholder="Please write here an introduction. You can use 320 characters."
            name="summary"
            value={summary}
            onChange={(e) => {
              changeSummary(e.target.value);
            }}
            maxLength={320}
            rows={3}
          />
          <h2>Remaining Characters: {summaryLimit - summary.length}</h2>
        </div>
        <div className={style.Buttons}>
          {/* <div className={style.PreviewBtn}>Preview</div> */}
          <PublishBtn confirmPublishingHandler={confirmPublishingHandler} />
        </div>
        <ConfirmPublishing
          showSpinner={publishLoader}
          open={modalOpen}
          closed={confirmPublishingHandler}
          publishStory={publishStory}
          setPublishLoader={setPublishLoader}
        />
      </div>
    );
  }

  return <>{content}</>;
};

export default withRouter(AddingStory);
