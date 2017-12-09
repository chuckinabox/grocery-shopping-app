import React, { Component } from "react";

class SearchRecipes extends Component {
  render() {
    //Split ingredients for formatting
    let listRecipes = this.props.recipes.map(recipe => {
      let ingredients = [
        <p key={recipe.ingredients[0]}>-{recipe.ingredients[0]}</p>
      ];
      for (var i = 1; i < 5 && i < recipe.ingredients.length; i++) {
        ingredients.push(
          <p key={recipe.ingredients[i]}>-{recipe.ingredients[i]}</p>
        );
      }
      ingredients.push(<p key={"..." + recipe.title}>...</p>);
      return (
        <div
          className="card row"
          key={recipe.title}
          onClick={e => {
            this.props.history.push(`/recipe/${recipe.id}`);
          }}
        >
          <h4>{recipe.title}</h4>
          <div className="col-sm-4 col-xs-6">
            <img
              src={recipe.photo_url}
              alt={recipe.title}
              className="thumbnail"
            />
          </div>
          <div className="col-sm-8 col-xs-6">{ingredients}</div>
        </div>
      );
    });
    return <div className="">{listRecipes}</div>;
  }
}

export default SearchRecipes;
