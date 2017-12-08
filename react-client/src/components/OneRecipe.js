import React, { Component } from "react";

class OneRecipe extends Component {
  render() {
    const ingredients = this.props.recipe.ingredients.map(ingred => (
      <h6 key={ingred}>-{ingred}</h6>
    ));
    let instructions = this.props.recipe.instructions
      .split(". ")
      .map((instruct, index) => (
        <h6 key={instruct}>
          {index + 1}.{instruct}
        </h6>
      ));
    instructions.pop();
    return (
      <div className="card container">
        <div className="row">
          <div className="col-sm-12">
            <p>{this.props.recipe.title}</p>
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
