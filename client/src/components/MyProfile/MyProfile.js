import React, { useEffect, useState } from "react";
import axios from "axios";

import UserDetails from "./UserDetails/UserDetails";

import style from "./MyProfile.module.css";
import { FaUserCircle } from "react-icons/fa";

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [userPublishData, setUserPublishData] = useState("");
  const [userRating, setUserRating] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:8080/feed/GetUserData",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setUserData(response.data.user);
      setUserPublishData(response.data.sumViews);
      setUserRating(response.data.userRating);
      setIsLoaded(true);
      console.log(userData);
    } catch (err) {
      console.log(err);
    }
  }, []);

  let profilePage = <p>Loading...</p>;

  if (isLoaded) {
    profilePage = (
      <div className={style.MyProfile}>
        <div className={style.UserData}>
          <FaUserCircle size={100} color={"rgba(0, 19, 77, 1)"} />
          <h1>{userData.name}</h1>
          <h2>{userRating ? userRating.toFixed(2) : "0.00"}</h2>
          <h3>rated</h3>
          <h2>{userData.posts.length}</h2>
          <h3>stories</h3>
          <h2>{userPublishData}</h2>
          <h3>views</h3>
        </div>
        <div className={style.UserDetails}>
          <UserDetails userData={userData} />
        </div>
      </div>
    );
  }
  return <>{profilePage} </>;
};

export default MyProfile;
