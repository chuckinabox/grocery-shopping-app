import React, { Component } from "react";
import ModalButton from "../components/elements/ModalButton";
import Button from "../components/elements/Button";
import Header from "../components/Header";
import { setCookie } from "../actions";
import { connect } from "react-redux";

class HeaderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { close: false };
  }

  render() {
    let menuCount = 0;
    let savedCount = 0;
    if (this.props.menuRecipesIds) {
      menuCount = this.props.menuRecipesIds.length;
    }
    if (this.props.savedRecipesIds) {
      savedCount = this.props.savedRecipesIds.length;
    }
    return (
      <Header
        history={this.props.history}
        location={this.props.location}
        modal={
          <ModalButton label="SignOut" color="danger" close={this.state.close}>
            <div className="row">
              <div className="col-sm-12 text-center">
                <h3>Are You Sure?</h3>
                <br />
                <Button
                  color="primary"
                  onClick={() => {
                    localStorage.removeItem("loginToken");
                    this.props.removeCookie();
                    this.setState({ close: true });
                    this.props.history.push("/");
                  }}
                >
                  Yes
                </Button>{" "}
                <Button
                  color="danger"
                  onClick={() => {
                    this.setState({ close: true });
                  }}
                >
                  No
                </Button>
              </div>
            </div>
          </ModalButton>
        }
        routes={[
          { name: "Home", path: "/" },
          {
            name: "Menu For the Week",
            path: "/goingtocook",
            count: menuCount
          },
          {
            name: "Saved Recipes",
            path: "/savedrecipes",
            count: savedCount
          }
        ]}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    menuRecipesIds: state.menuRecipesIds,
    savedRecipesIds: state.savedRecipesIds
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeCookie: () => {
      dispatch(setCookie(""));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
