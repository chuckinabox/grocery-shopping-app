import React, { Component } from "react";
import SaveButtons from "./SaveButtons";
import PropTypes from "prop-types";
import Spinner from "react-spinkit";

class Recipes extends Component {
  render() {
    if (this.props.isFetching) {
      return (
        <div className="flex-parent">
          <div className="card flex-item large">
            <Spinner name="chasing-dots" id="large" color="black" />
          </div>
          <div className="card flex-item large">
            <Spinner name="chasing-dots" id="large" color="black" />
          </div>
          <div className="card flex-item large">
            <Spinner name="chasing-dots" id="large" color="black" />
          </div>
        </div>
      );
    }
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
          key={recipe.id}
          onClick={e => {
            this.props.history.push(`/recipe/${recipe.id}`);
          }}
        >
          <SaveButtons id={recipe.id} />
          <h4>{recipe.title}</h4>
          <small>Rating: {recipe.rating ? recipe.rating.toFixed(1) : ""}</small>
          <div className="col-sm-12">
            <img
              src={recipe.photoURL}
              alt={recipe.title}
              className="thumbnail"
            />
          </div>
          <div className="col-sm-12">{description}</div>
        </div>
      );
    });
    return <div className="flex-parent">{listRecipes}</div>;
  }
}

Recipes.propTypes = {
  recipes: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

export default Recipes;
