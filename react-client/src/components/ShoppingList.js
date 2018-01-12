import React, { Component } from "react";
import { connect } from "react-redux";
import ShoppingListSingle from "./ShoppingListSingle";
import { CopyToClipboard } from "react-copy-to-clipboard";

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [], copyButton: [], copied: false };
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
      this.setState({ copied: false });
    }
  }
  //--Map through shopping list, grouping and splitting list
  mapOutList(isChecked, shoppingList) {
    //Sort Shopping List
    let sortedShoppingList = shoppingList.sort(function(a, b) {
      if (a.make_recipe_id === b.make_recipe_id) {
        return a.id - b.id;
      } else {
        return a.make_recipe_id - b.make_recipe_id;
      }
    });
    //Filter out checked or not
    let newShoppingList = sortedShoppingList.filter(
      item => item.check === isChecked
    );
    //Copy text
    let copiedText = "-Shopping List-\n";
    if (isChecked) {
      copiedText = "-Already Have-\n";
    }
    for (var j = 0; j < newShoppingList.length; j++) {
      if (newShoppingList[j].unit) {
        copiedText +=
          newShoppingList[j].quantity +
          " " +
          newShoppingList[j].unit +
          " " +
          newShoppingList[j].name +
          "\n";
      } else {
        copiedText +=
          newShoppingList[j].quantity + " " + newShoppingList[j].name + "\n";
      }
    }
    // console.log(copiedText);
    if (newShoppingList.length) {
      this.setState({
        copyButton: (
          <CopyToClipboard
            text={copiedText}
            onCopy={() => this.setState({ copied: true })}
          >
            <button>
              Copy "{this.props.checked ? "Already Have" : "Shopping List"}" To
              Clipboard
            </button>
          </CopyToClipboard>
        )
      });
    } else {
      this.setState({
        copyButton: ""
      });
    }

    //--end copy
    let list = [];
    //If empty
    if (!newShoppingList.length) {
      list = <p>No Results</p>;
    } else {
      let groupedItems = {
        title: "",
        titleId: "",
        items: []
      };

      for (var i = 0; i < newShoppingList.length; i++) {
        //If beginning of list, then setup
        if (i === 0) {
          if (newShoppingList[0].make_recipe) {
            groupedItems.titleId = newShoppingList[0].make_recipe.recipe_id;
            groupedItems.title = "";
            groupedItems.items = [];
          } else {
            groupedItems.titleId = "";
            groupedItems.title = "Personally Added";
            groupedItems.items = [];
          }
        }
        //If have items
        if (groupedItems.items.length) {
          //If different recipe
          if (
            groupedItems.items[0].make_recipe_id !==
            newShoppingList[i].make_recipe_id
          ) {
            list.push(
              <ShoppingListSingle
                title={groupedItems.title}
                titleId={groupedItems.titleId}
                items={groupedItems.items}
                key={
                  "ShoppingListSingle" +
                  groupedItems.title +
                  groupedItems.titleId
                }
              />
            );
            //If BigOven recipe next
            if (newShoppingList[i].make_recipe) {
              groupedItems.titleId = newShoppingList[i].make_recipe.recipe_id;
              groupedItems.title = "";
              groupedItems.items = [];
              //If Personal Recipe next
            } else {
              groupedItems.titleId = "";
              groupedItems.title = "Personally Added";
              groupedItems.items = [];
            }
          }
        }
        //if end of list
        if (i + 1 === newShoppingList.length) {
          groupedItems.items.push(newShoppingList[i]);
          list.push(
            <ShoppingListSingle
              title={groupedItems.title}
              titleId={groupedItems.titleId}
              items={groupedItems.items}
              key={
                "ShoppingListSingle" + groupedItems.title + groupedItems.titleId
              }
            />
          );
          groupedItems.items = [];
        }
        //Accumualtor per item
        groupedItems.items.push(newShoppingList[i]);
      }
    }

    this.setState({ list: list });
  }

  render() {
    return (
      <div className="container shoppingList">
        <div className="row">
          <div className="">
            {this.state.copyButton}
            {this.state.copied ? " Copied to clipboard" : ""}
            {this.state.list}
          </div>
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
