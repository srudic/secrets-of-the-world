import React, { Component } from "react";

import Footer from "./Footer/Footer";
import Toolbar from "./Toolbar/Toolbar";
import Login from "../../components/Login/Login";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
    };
  }

  loginClosedHandler = () => {
    this.setState({ showLogin: false });
  };

  loginToggleHandler = () => {
    this.setState((prevState) => {
      return { showLogin: !prevState.showLogin };
    });
  };

  render() {
    return (
      <>
        <Toolbar
          {...this.props}
          activeTab={this.props.activeTab}
          loginToggleClicked={this.loginToggleHandler}
        />
        <Login
          open={this.state.showLogin}
          closed={this.loginClosedHandler}
          {...this.props}
        />
        <div style={{ minHeight: "45vw" }}>{this.props.children}</div>
        <Footer />
      </>
    );
  }
}

export default Layout;
