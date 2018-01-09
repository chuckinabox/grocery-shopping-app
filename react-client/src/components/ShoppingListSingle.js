import React, { Component } from "react";
import { connect } from "react-redux";
import { updateShoppingList } from "../actions";
import PropTypes from "prop-types";
import Button from "./elements/Button";

class ShoppingListSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      title: ""
    };
  }

  returnRecipeFromApi = recipeId => {
    //Get title from api
    fetch(`api/recipe/${recipeId}`)
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
    let name = "unknown";

    for (var i = 0; i < this.props.menuRecipes.results.length; i++) {
      if (this.props.menuRecipes.results[i].id === recipeId) {
        name = this.props.menuRecipes.results[i].title;
        break;
      }
    }
    if (name === "unknown") {
      //If title not in menu list, call api
      this.returnRecipeFromApi(recipeId);
    } else {
      this.setState({ title: name });
    }
  };

  setList = items => {
    let list = items.map(item => (
      <div className="form-group" key={"item" + item.id}>
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
    this.returnRecipe(this.props.titleId);
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
    this.setList(this.props.items);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.items.length !== nextProps.items.length) {
      this.setList(nextProps.items);
    }
  }

  render() {
    return (
      <div>
        <h3>
          {this.state.title}
          <span className="pull-right">{this.checkAllButton()}</span>
        </h3>

        {this.state.list}
        <hr />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    menuRecipes: state.menuRecipes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateShoppingList: (id, check) => {
      dispatch(updateShoppingList(id, check));
    }
  };
};

ShoppingListSingle.propTypes = {
  titleId: PropTypes.number.isRequired,
  items: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListSingle);
