import React, { Component } from "react";
import SearchRecipes from "./SearchRecipes";
import Recipes from "./Recipes";
import Button from "./elements/Button";
import PropTypes from "prop-types";

class RecipePages extends Component {
  constructor(props) {
    super(props);
    this.state = { page: this.props.recipes.pg };
  }

  render() {
    //BackButton
    let backButton = (
      <Button
        color="primary"
        size="sm"
        onClick={() => this.setState({ page: Number(this.state.page) - 1 })}
      >
        <span className="glyphicon glyphicon-backward" />
      </Button>
    );
    let forwardButton = (
      <Button
        color="primary"
        size="sm"
        onClick={() => this.setState({ page: Number(this.state.page) + 1 })}
      >
        <span className="glyphicon glyphicon-forward" />
      </Button>
    );
    if (this.props.recipes.pg <= 1) {
      backButton = null;
    }
    if (
      this.props.recipes.resultCount <=
      this.props.recipes.pg * this.props.recipes.rpp
    ) {
      forwardButton = null;
    }
    //Recipe Format
    let recipeList = (
      <Recipes
        recipes={this.props.recipes.results}
        history={this.props.history}
      />
    );
    if (!this.props.showDescriptions) {
      recipeList = (
        <SearchRecipes
          recipes={this.props.recipes.results}
          history={this.props.history}
        />
      );
    }
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h5>
                <Button
                  color="danger"
                  onClick={() => this.props.history.goBack()}
                >
                  Go Back
                </Button>{" "}
                <span className="pull-right">
                  {/* Showing 1-12 of 5000 */}
                  Showing
                  {1 +
                    (this.props.recipes.pg - 1) * this.props.recipes.rpp}-{this
                    .props.recipes.results.length < this.props.recipes.rpp
                    ? this.props.recipes.resultCount
                    : this.props.recipes.rpp * this.props.recipes.pg}{" "}
                  of {this.props.recipes.resultCount}
                </span>
              </h5>
              <br />
              {!this.props.isFetching ? (
                <p className="pull-right">
                  {backButton} {forwardButton}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="container">
          {this.props.isFetching ? "Loading..." : recipeList}
          {!this.props.isFetching ? (
            <p className="pull-right">
              {backButton} {forwardButton}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

RecipePages.propTypes = {
  recipes: PropTypes.object.isRequired,
  showDescriptions: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

export default RecipePages;
