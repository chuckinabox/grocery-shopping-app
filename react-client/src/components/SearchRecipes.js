import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "react-spinkit";

class SearchRecipes extends Component {
  render() {
    if (this.props.isFetching) {
      return (
        <div className="card row large">
          <Spinner name="chasing-dots" id="large" color="black" />
        </div>
      );
    }
    //Split ingredients for formatting
    let listRecipes = this.props.recipes.results.map(recipe => {
      return (
        <div
          className="card flex-item"
          key={recipe.title + recipe.id}
          onClick={e => {
            this.props.history.push(`/recipe/${recipe.id}`);
          }}
        >
          <h4>{recipe.title}</h4>
          <small>Rating: {recipe.StarRating.toFixed(1)}</small>
          <br />
          <div className="">
            <img
              src={recipe.photoURL}
              alt={recipe.title}
              className="thumbnail"
            />
          </div>
        </div>
      );
    });

    if (this.props.recipes.results.length) {
      return <div className="flex-parent">{listRecipes}</div>;
    } else {
      return (
        <div className="card row">
          <p>Sorry, no results</p>
        </div>
      );
    }
  }
}

SearchRecipes.propTypes = {
  recipes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default SearchRecipes;
