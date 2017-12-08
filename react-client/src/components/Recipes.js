import React, { Component } from "react";

class Recipes extends Component {
  render() {
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
          className="card flex-item"
          key={recipe.title}
          onClick={e => {
            this.props.history.push(`/recipe/${recipe.id}`);
          }}
        >
          <p>{recipe.title}</p>
          <div className="col-sm-12">
            <img
              src={recipe.photo_url}
              alt={recipe.title}
              className="thumbnail"
            />
          </div>
          <div className="col-sm-12">{ingredients}</div>
        </div>
      );
    });
    return <div className="flex-parent">{listRecipes}</div>;
  }
}

export default Recipes;
