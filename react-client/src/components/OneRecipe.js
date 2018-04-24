import React, { Component } from "react";
import ModalPicture from "./elements/ModalPicture";
import PropTypes from "prop-types";
import Spinner from "react-spinkit";

class OneRecipe extends Component {
  render() {
    if (this.props.isFetching) {
      return (
        <div className="card container">
          <div className="row">
            <div className="col-sm-12 large">
              <Spinner name="chasing-dots" id="large" color="black" />
            </div>
          </div>
        </div>
      );
    }
    //Split ingredients for formatting
    const ingredients = this.props.recipe.ingredients.map(ingred => (
      <p key={ingred}>{ingred}</p>
    ));

    let instructionToShow;
    if (this.props.recipe.instructions.includes("Instructions are at")) {
      //Split Instruction guide and button
      const instructions = this.props.recipe.instructions.split(/http(.)+/g);
      const instructionsLink = this.props.recipe.instructions.match(
        /http(.)+/g
      );

      instructionToShow = (
        <div>
          <p>
            {instructions[0]}:{" "}
            {instructionsLink ? (
              <a href={instructionsLink[0]}>{instructionsLink[0]}</a>
            ) : (
              ""
            )}
          </p>
        </div>
      );
    } else if (
      this.props.recipe.instructions.includes("1.") &&
      this.props.recipe.instructions.includes("2.")
    ) {
      //If Instructions already Numbered
      //Split instructions {"1. Whisk this 2. Do this..."} to {"1. Whisk this", "2. Do this..", ...}
      let splitInstructions = this.props.recipe.instructions.split(
        /(?=[0-9]\. )/g
      );
      let instructionsNumbered = splitInstructions.map(instruct => {
        return <p key={instruct}>{instruct}</p>;
      });
      instructionToShow = instructionsNumbered;
    } else {
      //Number and seperate instructions
      //**Work around for lack of regex lookbehind

      //Split instructions in sentences {"Blah blah balh. Too too."} with last letter missing and last letter ["Blah blah bal", "h", "Too to", "o"...]
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
            <p key={splitInstructions[index - 1]}>
              {increm}. {splitInstructions[index - 1]}
              {instruct}.
            </p>
          );
          //If the end
        } else if (index === splitInstructions.length - 1) {
          return (
            <p key={instruct}>
              {increm + 1}. {instruct}
            </p>
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
            <h3>{this.props.recipe.title}</h3>

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
            <ModalPicture
              className="thumbnail"
              src={
                this.props.recipe.photoURL
                  ? this.props.recipe.photoURL
                  : "https://photos.bigoven.com/recipe/hero/recipe-no-image.jpg"
              }
              alt={this.props.recipe.title}
            />
            <hr />
            <p>{this.props.recipe.description}</p>
            {this.props.recipe.description ? <hr /> : ""}
          </div>
          <div className="col-sm-6">{ingredients}</div>
        </div>
        <div className="row">
          <div className="col-sm-12">{instructionToShow}</div>
        </div>
      </div>
    );
  }
}

OneRecipe.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default OneRecipe;
