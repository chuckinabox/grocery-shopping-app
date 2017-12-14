import React, { Component } from "react";
import Cookies from "js-cookie";

class Recipes extends Component {
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
          className="card flex-item"
          key={recipe.title}
          onClick={e => {
            this.props.history.push(`/recipe/${recipe.id}`);
          }}
        >
          <h5>{recipe.title}</h5>
          <div className="col-sm-12">
            <img
              src={recipe.photo_url}
              alt={recipe.title}
              className="thumbnail"
            />
          </div>
          <div className="col-sm-12">
            {ingredients}
            {Cookies.get("key") ? (
              <button
                onClick={e => {
                  e.stopPropagation();
                  console.log("SAVE!!");
                }}
              >
                Save
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    });
    return <div className="flex-parent">{listRecipes}</div>;
  }
}

export default Recipes;
