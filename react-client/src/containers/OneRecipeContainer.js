import React, { Component } from "react";
import { connect } from "react-redux";
import { setSingleRecipeFromId, setShouldSearch } from "../actions";
import OneRecipe from "../components/OneRecipe";
import SaveButtons from "../components/SaveButtons";
import Button from "../components/elements/Button";

class SingleContainer extends Component {
  componentWillMount() {
    this.props.getRecipe(
      this.props.location.pathname.slice(8),
      this.props.recipes,
      this.props.searchRecipes
    );
    this.props.setShouldSearch();
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="container">
        <div className="col-sm-12">
          <Button color="danger" onClick={() => this.props.history.goBack()}>
            Go Back
          </Button>
          <SaveButtons id={this.props.singleRecipe.id} />
          <br />
        </div>
        <OneRecipe
          recipe={this.props.singleRecipe}
          history={this.props.history}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    singleRecipe: state.singleRecipe,
    recipes: state.recipes,
    searchRecipes: state.searchRecipes,
    isFetching: state.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRecipe: (recipeId, recipes, searchRecipes) => {
      dispatch(setSingleRecipeFromId(recipeId, recipes, searchRecipes));
    },
    setShouldSearch: () => {
      dispatch(setShouldSearch(false));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleContainer);
