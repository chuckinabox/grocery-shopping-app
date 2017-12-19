import React, { Component } from "react";
import Cookies from "js-cookie";

class Recipes extends Component {
  render() {
    //Split ingredients for formatting

    let listRecipes = this.props.recipes.map(recipe => {
      let description;
      if (recipe.description) {
        description = <p>{recipe.description}</p>;
      } else {
        description = [
          <p key={recipe.ingredients[0]}>-{recipe.ingredients[0]}</p>
        ];
        for (var i = 1; i < 5 && i < recipe.ingredients.length; i++) {
          description.push(
            <p key={recipe.ingredients[i]}>-{recipe.ingredients[i]}</p>
          );
        }
        description.push(<p key={"..." + recipe.title}>...</p>);
      }

      return (
        <div
          className="card flex-item"
          key={recipe.title}
          onClick={e => {
            this.props.history.push(`/recipe/${recipe.id}`);
          }}
        >
          <h5>{recipe.title}</h5>
          <small>Rating: {recipe.rating ? recipe.rating.toFixed(1) : ""}</small>
          <div className="col-sm-12">
            <img
              src={recipe.photoURL}
              alt={recipe.title}
              className="thumbnail"
            />
          </div>
          <div className="col-sm-12">
            {description}
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
