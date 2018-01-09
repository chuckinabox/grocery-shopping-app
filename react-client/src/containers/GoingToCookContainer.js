import React, { Component } from "react";
import {
  setShouldSearch,
  getMakeRecipes,
  getSavedRecipes,
  getShoppingList
} from "../actions";
import Recipes from "../components/Recipes";
import Button from "../components/elements/Button";
import ShoppingListContainer from "./ShoppingListContainer";
import { connect } from "react-redux";

class GoingToCookContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { page: this.props.menuRecipes.pg };
  }
  componentWillMount() {
    this.props.getMakeRecipes(this.state.page);
    this.props.getShoppingList();
    this.props.setShouldSearch();
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.state.page !== nextState.page) {
      nextProps.getMakeRecipes(nextState.page);
    }
    if (this.props.menuRecipesIds !== nextProps.menuRecipesIds) {
      nextProps.getMakeRecipes(nextState.page);
      nextProps.getShoppingList();
    }
    if (this.props.savedRecipesIds !== nextProps.savedRecipesIds) {
      nextProps.getSavedRecipes();
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
    if (this.props.menuRecipes.pg <= 1) {
      backButton = null;
    }
    if (
      this.props.menuRecipes.resultCount <=
      this.props.menuRecipes.pg * this.props.menuRecipes.rpp
    ) {
      forwardButton = null;
    }
    //If empty list
    if (!this.props.menuRecipes.results.length) {
      return (
        <div className="container">
          <div className="card row">
            <p>Sorry, no results</p>
          </div>
        </div>
      );
    } else {
      //If not empty list
      return (
        <div>
          <ShoppingListContainer />

          <div className="text-right">
            <p className="pull-right col-sm-10 col-sm-offset-1">
              {/* Showing 1-12 of 5000 */}
              Showing
              {1 +
                (this.props.menuRecipes.pg - 1) *
                  this.props.menuRecipes.rpp}-{this.props.menuRecipes.results
                .length < this.props.menuRecipes.rpp
                ? this.props.menuRecipes.resultCount
                : this.props.menuRecipes.rpp * this.props.menuRecipes.pg}{" "}
              of {this.props.menuRecipesIds.length}
            </p>
            <span className="pull-right col-sm-10 col-sm-offset-1">
              {backButton} {forwardButton || backButton ? this.state.page : ""}{" "}
              {forwardButton}
            </span>
            <Recipes
              recipes={this.props.menuRecipes.results}
              history={this.props.history}
            />
            <span className="pull-right col-sm-10 col-sm-offset-1">
              {backButton} {forwardButton || backButton ? this.state.page : ""}{" "}
              {forwardButton}
            </span>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    menuRecipes: state.menuRecipes,
    menuRecipesIds: state.menuRecipesIds,
    savedRecipesIds: state.savedRecipesIds,
    isFetching: state.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setShouldSearch: () => {
      dispatch(setShouldSearch(true));
    },
    getMakeRecipes: pageNumber => {
      dispatch(getMakeRecipes(pageNumber));
    },
    getSavedRecipes: () => {
      dispatch(getSavedRecipes(1));
    },
    getShoppingList: () => {
      dispatch(getShoppingList());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  GoingToCookContainer
);
