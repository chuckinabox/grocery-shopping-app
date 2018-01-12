import React, { Component } from "react";
import { setShouldSearch, getSavedRecipes, getMakeRecipes } from "../actions";
import Recipes from "../components/Recipes";
import Button from "../components/elements/Button";
import { connect } from "react-redux";

class SavedRecipesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { page: this.props.savedRecipes.pg };
  }
  componentWillMount() {
    this.props.getSavedRecipes(this.state.page);
    this.props.setShouldSearch();
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.state.page !== nextState.page) {
      nextProps.getSavedRecipes(nextState.page);
    }
    if (this.props.savedRecipesIds !== nextProps.savedRecipesIds) {
      if (nextProps.savedRecipesIds.length % 12 >= nextState.page) {
        nextProps.getSavedRecipes(nextState.page - 1);
      } else {
        nextProps.getSavedRecipes(nextState.page);
      }
    }
    if (this.props.menuRecipesIds !== nextProps.menuRecipesIds) {
      nextProps.getMakeRecipes();
    }
  }

  render() {
    //Page Nav
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
    if (this.props.savedRecipes.pg <= 1) {
      backButton = null;
    }
    if (
      this.props.savedRecipes.resultCount <=
      this.props.savedRecipes.pg * this.props.savedRecipes.rpp
    ) {
      forwardButton = null;
    }
    //If empty list
    if (!this.props.savedRecipes.results.length) {
      return (
        <div className="container">
          <div className="card row">
            <p>Sorry, no results</p>
          </div>
        </div>
      );
    } else {
      //If not empty
      return (
        <div className="text-right">
          <p className="pull-right col-sm-10 col-sm-offset-1">
            {/* Showing 1-12 of 5000 */}
            Showing
            {1 +
              (this.props.savedRecipes.pg - 1) *
                this.props.savedRecipes.rpp}-{this.props.savedRecipes.results
              .length < this.props.savedRecipes.rpp
              ? this.props.savedRecipes.resultCount
              : this.props.savedRecipes.rpp * this.props.savedRecipes.pg}{" "}
            of {this.props.savedRecipesIds.length}
          </p>
          <br />
          <br />
          <span className="pull-right col-sm-10 col-sm-offset-1">
            {backButton}
            {forwardButton || backButton ? "Page " + this.state.page : ""}{" "}
            {forwardButton}
          </span>
          <Recipes
            recipes={this.props.savedRecipes.results}
            history={this.props.history}
          />
          <span className="pull-right col-sm-10 col-sm-offset-1">
            {backButton}
            {forwardButton || backButton ? "Page " + this.state.page : ""}{" "}
            {forwardButton}
          </span>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    savedRecipes: state.savedRecipes,
    savedRecipesIds: state.savedRecipesIds,
    menuRecipesIds: state.menuRecipesIds,
    isFetching: state.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setShouldSearch: () => {
      dispatch(setShouldSearch(true));
    },
    getSavedRecipes: pageNumber => {
      dispatch(getSavedRecipes(pageNumber));
    },
    getMakeRecipes: () => {
      dispatch(getMakeRecipes(1));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SavedRecipesContainer
);
