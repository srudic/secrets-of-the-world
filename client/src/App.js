import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import axios from "axios";

import "./App.css";

import Home from "./Pages/Home";
import FindStory from "./Pages/FindStory";
import TopRated from "./Pages/TopRated";
import SevenWonders from "./Pages/SevenWonders";
import FullStory from "./components/FullStory/FullStory";
import MyStories from "./Pages/MyStories";
import AddNewStory from "./Pages/AddNewStory";
import ModifyStory from "./components/ModifyStory/ModifyStory";
import MyProfile from "./Pages/MyProfilePage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      userName: null,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");

    if (token) {
      axios
        .get("http://localhost:8080/auth/getClientStatus", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.setState({ isAuth: true, userName: userName });
          }
          // console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  setUserName = (userName) => {
    // console.log(userName);
    this.setState({ userName: userName });
  };

  setAuthFalse = () => {
    this.setState({ isAuth: false });
  };

  setAuthTrue = () => {
    this.setState({ isAuth: true });
  };

  render() {
    document.title = "Secrets of the world";

    let routes = (
      <>
        <Route
          exact
          path="/"
          render={() => (
            <Home
              setUserName={this.setUserName}
              userName={this.state.userName}
              isAuth={this.state.isAuth}
              setAuthFalse={this.setAuthFalse}
              setAuthTrue={this.setAuthTrue}
            />
          )}
        />
        <Route
          path="/Story/:id"
          exact
          render={() => (
            <FullStory
              setUserName={this.setUserName}
              userName={this.state.userName}
              isAuth={this.state.isAuth}
              setAuthFalse={this.setAuthFalse}
              setAuthTrue={this.setAuthTrue}
            />
          )}
        />
        <Route
          path="/Find a story/:searchInput?"
          render={() => (
            <FindStory
              setUserName={this.setUserName}
              userName={this.state.userName}
              isAuth={this.state.isAuth}
              setAuthFalse={this.setAuthFalse}
              setAuthTrue={this.setAuthTrue}
            />
          )}
        />
        <Route
          path="/Top rated/"
          render={() => (
            <TopRated
              setUserName={this.setUserName}
              userName={this.state.userName}
              isAuth={this.state.isAuth}
              setAuthFalse={this.setAuthFalse}
              setAuthTrue={this.setAuthTrue}
            />
          )}
        />
        <Route
          path="/7 wonders of the world/"
          render={() => (
            <SevenWonders
              setUserName={this.setUserName}
              userName={this.state.userName}
              isAuth={this.state.isAuth}
              setAuthFalse={this.setAuthFalse}
              setAuthTrue={this.setAuthTrue}
            />
          )}
        />
      </>
    );

    if (this.state.isAuth) {
      routes = (
        <>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                setUserName={this.setUserName}
                userName={this.state.userName}
                isAuth={this.state.isAuth}
                setAuthFalse={this.setAuthFalse}
                setAuthTrue={this.setAuthTrue}
              />
            )}
          />
          <Route
            path="/Story/:id"
            exact
            render={() => (
              <FullStory
                setUserName={this.setUserName}
                userName={this.state.userName}
                isAuth={this.state.isAuth}
                setAuthFalse={this.setAuthFalse}
                setAuthTrue={this.setAuthTrue}
              />
            )}
          />
          <Route
            path="/ModifyStory/:id"
            exact
            render={() => (
              <ModifyStory
                setUserName={this.setUserName}
                userName={this.state.userName}
                isAuth={this.state.isAuth}
                setAuthFalse={this.setAuthFalse}
                setAuthTrue={this.setAuthTrue}
              />
            )}
          />
          <Route
            path="/Find a story/:searchInput?"
            render={() => (
              <FindStory
                setUserName={this.setUserName}
                userName={this.state.userName}
                isAuth={this.state.isAuth}
                setAuthFalse={this.setAuthFalse}
                setAuthTrue={this.setAuthTrue}
              />
            )}
          />
          <Route
            path="/Top rated/"
            render={() => (
              <TopRated
                setUserName={this.setUserName}
                userName={this.state.userName}
                isAuth={this.state.isAuth}
                setAuthFalse={this.setAuthFalse}
                setAuthTrue={this.setAuthTrue}
              />
            )}
          />
          <Route
            path="/7 wonders of the world/"
            render={() => (
              <SevenWonders
                setUserName={this.setUserName}
                userName={this.state.userName}
                isAuth={this.state.isAuth}
                setAuthFalse={this.setAuthFalse}
                setAuthTrue={this.setAuthTrue}
              />
            )}
          />
          <Route
            path="/My stories/"
            render={() => (
              <MyStories
                setUserName={this.setUserName}
                userName={this.state.userName}
                isAuth={this.state.isAuth}
                setAuthFalse={this.setAuthFalse}
                setAuthTrue={this.setAuthTrue}
              />
            )}
          />
          <Route
            path="/Add new story/:id?"
            render={() => (
              <AddNewStory
                setUserName={this.setUserName}
                userName={this.state.userName}
                isAuth={this.state.isAuth}
                setAuthFalse={this.setAuthFalse}
                setAuthTrue={this.setAuthTrue}
              />
            )}
          />
          <Route
            exact
            path="/MyProfile/"
            render={() => (
              <MyProfile
                setUserName={this.setUserName}
                userName={this.state.userName}
                isAuth={this.state.isAuth}
                setAuthFalse={this.setAuthFalse}
                setAuthTrue={this.setAuthTrue}
              />
            )}
          />
          {/* <Route
            // exact
            // path="/"
            render={() => {
              // this.props.history.push("/");
              return <h1>This looks like a problem, choose from navbar</h1>;
            }}
          /> */}
        </>
      );
    }

    return <Switch>{routes}</Switch>;
  }
}

export default withRouter(App);
