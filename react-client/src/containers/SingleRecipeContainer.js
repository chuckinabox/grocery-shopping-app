import React, { Component } from "react";
import { connect } from "react-redux";
import { setSingleRecipeFromId } from "../actions";
import OneRecipe from "../components/OneRecipe";

class SingleContainer extends Component {
  componentWillMount() {
    this.props.getRecipe(
      this.props.location.pathname.slice(8),
      this.props.recipes,
      this.props.searchRecipes
    );
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return <OneRecipe recipe={this.props.singleRecipe} />;
  }
}

const mapStateToProps = state => {
  return {
    singleRecipe: state.singleRecipe,
    recipes: state.recipes,
    searchRecipes: state.searchRecipes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRecipe: (recipeId, recipes, searchRecipes) => {
      dispatch(setSingleRecipeFromId(recipeId, recipes, searchRecipes));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleContainer);
