import React, { Component } from "react";

class OneRecipe extends Component {
  render() {
    //Split ingredients for formatting
    const ingredients = this.props.recipe.ingredients.map(ingred => (
      <h6 key={ingred}>-{ingred}</h6>
    ));
    //Split instructions for formatting
    let instructions = this.props.recipe.instructions
      .split(/\.(?=[A-Z])|\. (?=[A-Z])/g)
      .map((instruct, index) => {
        if (instruct[instruct.length - 1] === ".") {
          return (
            <h6 key={instruct}>
              {index + 1}. {instruct}
            </h6>
          );
        }
        return (
          <h6 key={instruct}>
            {index + 1}. {instruct}.
          </h6>
        );
      });
    return (
      <div className="card container">
        <div className="row">
          <div className="col-sm-12">
            <h4>{this.props.recipe.title}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <img
              src={this.props.recipe.photo_url}
              alt={this.props.recipe.title}
              className="thumbnail"
            />
          </div>
          <div className="col-sm-6">{ingredients}</div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <span>{instructions}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default OneRecipe;
