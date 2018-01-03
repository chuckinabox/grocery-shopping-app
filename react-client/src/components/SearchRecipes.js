import React, { Component } from "react";
import PropTypes from "prop-types";

class SearchRecipes extends Component {
  render() {
    //Split ingredients for formatting
    let listRecipes = this.props.recipes.results.map(recipe => {
      // let ingredients = [
      //   <p key={recipe.ingredients[0]}>-{recipe.ingredients[0]}</p>
      // ];
      // for (var i = 1; i < 5 && i < recipe.ingredients.length; i++) {
      //   ingredients.push(
      //     <p key={recipe.ingredients[i]}>-{recipe.ingredients[i]}</p>
      //   );
      // }
      // ingredients.push(<p key={"..." + recipe.title}>...</p>);
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
          {/* <div className="col-sm-8 col-xs-6">{ingredients}</div> */}
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
