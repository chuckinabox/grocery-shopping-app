import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "./elements/Button";
import { connect } from "react-redux";
import {
  addSavedRecipes,
  deleteSavedRecipes,
  addMakeRecipes,
  deleteMakeRecipes
} from "../actions";

class SaveButton extends Component {
  includedRecipe = (id, recipes) => {
    return recipes.includes(Number(id));
  };
  render() {
    if (this.props.cookie) {
      let saveButton = (
        <Button
          onClick={e => {
            e.stopPropagation();
            this.props.addSavedRecipes(
              this.props.id,
              this.props.savedRecipesIds
            );
          }}
          size="sm"
          color="primary"
          key={`addSave${this.props.id}`}
        >
          Save
        </Button>
      );
      if (this.includedRecipe(this.props.id, this.props.savedRecipesIds)) {
        saveButton = (
          <Button
            onClick={e => {
              e.stopPropagation();
              this.props.deleteSavedRecipes(
                this.props.id,
                this.props.savedRecipesIds
              );
            }}
            size="sm"
            color="danger"
            key={`deleteSave${this.props.id}`}
          >
            Delete Save
          </Button>
        );
      }
      let makeButton = (
        <Button
          onClick={e => {
            e.stopPropagation();
            this.props.addMakeRecipes(this.props.id, this.props.menuRecipesIds);
          }}
          size="sm"
          color="primary"
          key={`addMake${this.props.id}`}
        >
          Add to Menu
        </Button>
      );
      if (this.includedRecipe(this.props.id, this.props.menuRecipesIds)) {
        makeButton = (
          <Button
            onClick={e => {
              e.stopPropagation();
              this.props.deleteMakeRecipes(this.props.id);
            }}
            size="sm"
            color="danger"
            key={`deleteMake${this.props.id}`}
          >
            Remove From Menu
          </Button>
        );
      }
      return (
        <span className="col-sm-12 text-right">
          {saveButton} {makeButton}
        </span>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    menuRecipesIds: state.menuRecipesIds,
    savedRecipesIds: state.savedRecipesIds,
    cookie: state.cookie
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addSavedRecipes: (id, list) => {
      dispatch(addSavedRecipes(id, list));
    },
    deleteSavedRecipes: (id, list) => {
      dispatch(deleteSavedRecipes(id, list));
    },
    addMakeRecipes: (id, list) => {
      dispatch(addMakeRecipes(id, list));
    },
    deleteMakeRecipes: id => {
      dispatch(deleteMakeRecipes(id));
    }
  };
};

SaveButton.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
