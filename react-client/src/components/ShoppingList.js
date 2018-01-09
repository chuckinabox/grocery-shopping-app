import React, { Component } from "react";
import { connect } from "react-redux";
import ShoppingListSingle from "./ShoppingListSingle";

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [] };
  }
  componentWillMount() {
    this.mapOutList(this.props.checked, this.props.shoppingList);
  }
  componentWillUpdate(nextProps, nextState) {
    if (
      nextProps.shoppingList.filter(item => item.check === this.props.checked)
        .length !==
      this.props.shoppingList.filter(item => item.check === this.props.checked)
        .length
    ) {
      this.mapOutList(this.props.checked, nextProps.shoppingList);
    }
  }
  //--Map through shopping list, grouping and splitting list
  mapOutList(isChecked, shoppingList) {
    //Sort Shopping List
    let sortedShoppingList = shoppingList.sort(function(a, b) {
      return a.id - b.id;
    });
    //Filter out checked or not
    let newShoppingList = sortedShoppingList.filter(
      item => item.check === isChecked
    );
    let list = [];
    //If empty
    if (!newShoppingList.length) {
      list = <p>No Results</p>;
    } else {
      //else collect title and items
      let recipeItem = {
        titleId: newShoppingList[0].make_recipe.recipe_id,
        items: []
      };
      for (var i = 0; i < newShoppingList.length; i++) {
        //if end of list or previous item recipe !== next recipe
        if (
          recipeItem.titleId !== newShoppingList[i].make_recipe.recipe_id ||
          i + 1 === newShoppingList.length
        ) {
          //if end of list, push on last item
          if (i + 1 === newShoppingList.length) {
            recipeItem.items.push(newShoppingList[i]);
          }
          list.push(
            <ShoppingListSingle
              titleId={recipeItem.titleId}
              items={recipeItem.items}
              key={"ShoppingSingle" + recipeItem.titleId}
            />
          );
          recipeItem.titleId = newShoppingList[i].make_recipe.recipe_id;
          recipeItem.items = [];
        }
        //push item onto accumalator
        recipeItem.items.push(newShoppingList[i]);
      }
    }

    this.setState({ list: list });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="">{this.state.list}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    shoppingList: state.shoppingList
  };
};

export default connect(mapStateToProps, null)(ShoppingList);
