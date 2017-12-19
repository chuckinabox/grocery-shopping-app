import React, { Component } from "react";

class OneRecipe extends Component {
  render() {
    //Split ingredients for formatting
    const ingredients = this.props.recipe.ingredients.map(ingred => (
      <h6 key={ingred}>{ingred}</h6>
    ));

    let instructionToShow;
    if (this.props.recipe.instructions.includes("Instructions are at")) {
      //Split Instruction guide and button
      const instructions = this.props.recipe.instructions.split(/http(.)+/g);
      const instructionsLink = this.props.recipe.instructions.match(
        /http(.)+/g
      );

      instructionToShow = (
        <span>
          {instructions[0]}
          {instructionsLink ? (
            <a target="_blank" href={instructionsLink[0]}>
              {instructionsLink[0]}
            </a>
          ) : (
            ""
          )}
        </span>
      );
    } else {
      //Number and seperate instructions
      //**Work around for lack of regex lookbehind

      //Split instructions in sentences {"Blah blah balh. Too too."} with last letter missing and last letter ["Blah blah bal", "h",...]
      let splitInstructions = this.props.recipe.instructions.split(
        /([a-z])\. (?=[A-Z])/g
      );
      //Incrementure for numbering
      let increm = 0;
      let instructionsSpelledOut = splitInstructions.map((instruct, index) => {
        //If a letter
        if (instruct.length === 1) {
          increm++;
          return (
            <h6 key={splitInstructions[index - 1]}>
              {increm}. {splitInstructions[index - 1]}
              {instruct}.
            </h6>
          );
          //If the end
        } else if (index === splitInstructions.length - 1) {
          return (
            <h6 key={instruct}>
              {increm + 1}. {instruct}
            </h6>
          );
          //else return nothing
        } else {
          return false;
        }
      });
      instructionToShow = instructionsSpelledOut;
    }

    return (
      <div className="card container">
        <div className="row">
          <div className="col-sm-12">
            <h4>{this.props.recipe.title}</h4>
            <small>
              Rating:{" "}
              {this.props.recipe.rating
                ? this.props.recipe.rating.toFixed(1)
                : ""}
            </small>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <a href={this.props.recipe.photoURL} target="_blank">
              <img
                src={this.props.recipe.photoURL}
                alt={this.props.recipe.title}
                className="thumbnail"
              />
            </a>
            <hr />
            <p>{this.props.recipe.description}</p>
            {this.props.recipe.description ? <hr /> : ""}
          </div>
          <div className="col-sm-6">{ingredients}</div>
          <hr />
        </div>
        <div className="row">
          <div className="col-sm-12">{instructionToShow}</div>
        </div>
      </div>
    );
  }
}

export default OneRecipe;
