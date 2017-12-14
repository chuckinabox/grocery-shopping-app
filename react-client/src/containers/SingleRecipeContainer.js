import React, { Component } from "react";
import { connect } from "react-redux";
import { setSingleRecipeFromId } from "../actions";
import OneRecipe from "../components/OneRecipe";

class SingleContainer extends Component {
  componentWillMount() {
    this.props.getRecipe(
      this.props.location.pathname.slice(8),
      this.props.recipes
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
    recipes: state.recipes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRecipe: (recipeId, recipes) => {
      dispatch(setSingleRecipeFromId(recipeId, recipes));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleContainer);
