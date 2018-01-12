import React, { Component } from "react";
import { connect } from "react-redux";
import { updateShoppingList, deleteIngredient } from "../actions";
import PropTypes from "prop-types";
import Button from "./elements/Button";

//-----------------------------------
//--Api Url
//-----------------------------------
const API_URL = "";

class ShoppingListSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      title: "",
      titleId: ""
    };
  }

  returnRecipeFromApi = recipeId => {
    //Get title from api
    fetch(`${API_URL}api/recipe/${recipeId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error with recipe fetch");
        } else {
          return response.json();
        }
      })
      .then(response => {
        this.setState({ title: response[0].title });
      });
  };

  returnRecipe = recipeId => {
    //Get title from menu List
    let name = "User Added";
    this.setState({ titleId: recipeId });
    for (var i = 0; i < this.props.menuRecipes.results.length; i++) {
      if (this.props.menuRecipes.results[i].id === recipeId) {
        name = this.props.menuRecipes.results[i].title;
        break;
      }
    }
    if (name === "User Added" && recipeId) {
      //If title not in menu list, call api
      this.returnRecipeFromApi(recipeId);
    } else {
      this.setState({ title: name });
    }
  };

  setListDelete = items => {
    let list = items.map(item => (
      <div
        className="form-group"
        key={"item" + item.id + item.check + "ShowDele"}
      >
        <Button
          size="sm"
          color="danger"
          onClick={() => this.props.deleteIngredient(item.id)}
        >
          <span className="glyphicon glyphicon-trash" />
        </Button>{" "}
        <label htmlFor={item.id}>
          {item.quantity} {item.unit} {item.name}
        </label>
      </div>
    ));
    this.setState({ list: list });
    if (this.props.title) {
      this.setState({ title: this.props.title });
    } else {
      this.returnRecipe(this.props.titleId);
    }
  };

  setListNotDelete = items => {
    let list = items.map(item => (
      <div className="form-group" key={"item" + item.id + item.check}>
        <label htmlFor={item.id}>
          <input
            type="checkbox"
            name={item.id}
            id={item.id}
            checked={item.check}
            onChange={e =>
              this.props.updateShoppingList(e.target.name, e.target.checked)
            }
            key={"itemInput" + item.id}
          />
          {item.quantity} {item.unit} {item.name}
        </label>
      </div>
    ));
    this.setState({ list: list });
    if (this.props.title) {
      this.setState({ title: this.props.title });
    } else {
      this.returnRecipe(this.props.titleId);
    }
  };

  setList = (items, showDelete) => {
    this.setState({ list: [] });
    if (showDelete) {
      this.setListDelete(items);
    } else {
      this.setListNotDelete(items);
    }
  };

  checkAll = checked => {
    for (let item of this.props.items) {
      this.props.updateShoppingList(item.id, checked);
    }
  };

  checkAllButton = () => {
    let button = "";
    if (this.props.items) {
      if (this.props.items[0].check) {
        button = (
          <Button size="sm" onClick={() => this.checkAll(false)}>
            Uncheck All
          </Button>
        );
      } else {
        button = (
          <Button size="sm" onClick={() => this.checkAll(true)}>
            Check All
          </Button>
        );
      }
    }
    return button;
  };

  componentWillMount() {
    this.setList(this.props.items, this.props.showDelete);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.items.length !== nextProps.items.length) {
      this.setList(nextProps.items, this.props.showDelete);
    }
    if (this.props.showDelete !== nextProps.showDelete) {
      this.setList(nextProps.items, nextProps.showDelete);
    }
  }

  render() {
    return (
      <div className="container">
        <h3>
          {this.state.title}
          {this.props.showDelete ? (
            ""
          ) : (
            <span className="">{this.checkAllButton()}</span>
          )}
        </h3>

        {this.state.list}

        <hr />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    menuRecipes: state.menuRecipes,
    showDelete: state.showDelete
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateShoppingList: (id, check) => {
      dispatch(updateShoppingList(id, check));
    },
    deleteIngredient: id => {
      dispatch(deleteIngredient(id));
    }
  };
};

ShoppingListSingle.propTypes = {
  titleId: PropTypes.node,
  title: PropTypes.string,
  items: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListSingle);
