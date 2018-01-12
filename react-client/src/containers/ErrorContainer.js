import React, { Component } from "react";
import Button from "../components/elements/Button";

class ErrorContainer extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div
            className="col-sm-3 col-xs-12 title"
            onClick={() => this.props.history.push("/")}
          >
            <h1>RecipeShoppingApp</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 text-center">
            <h1>Error: Don't know how you go here.</h1>
            <h2>
              Click{" "}
              <Button
                color="primary"
                onClick={() => this.props.history.goBack()}
              >
                here
              </Button>{" "}
              to go back
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorContainer;
