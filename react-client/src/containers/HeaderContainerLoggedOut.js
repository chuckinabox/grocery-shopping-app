import React, { Component } from "react";
import LoginContainer from "./LoginContainer";
import ModalButton from "../components/elements/ModalButton";
import Header from "../components/Header";

class HeaderContainerLoggedOut extends Component {
  render() {
    return (
      <Header
        history={this.props.history}
        location={this.props.location}
        modal={
          <ModalButton label="Login/Signup">
            <LoginContainer history={this.props.history} />
          </ModalButton>
        }
        routes={[{ name: "Home", path: "/" }]}
      />
    );
  }
}

export default HeaderContainerLoggedOut;
