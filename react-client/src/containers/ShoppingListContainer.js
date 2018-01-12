import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setShoppingListOpen,
  setEmptyShoppingListOpen,
  setDoneShoppingListOpen,
  setShowDelete
} from "../actions";

import Collapse from "../components/elements/Collapse";
import ShoppingList from "../components/ShoppingList";
import AddIngredient from "../components/AddIngredient";
import Button from "../components/elements/Button";

class ShoppingListContainer extends Component {
  render() {
    let deleteButton = (
      <Button
        size="sm"
        color={this.props.showDelete ? "danger" : "default"}
        onClick={() => this.props.setShowDelete(!this.props.showDelete)}
      >
        {this.props.showDelete ? "Cancel Deleting" : "Enter Delete Mode"}
      </Button>
    );
    return (
      <Collapse
        defaultopenvalue={this.props.shoppingListOpen}
        setopen={this.props.setShoppingListOpen}
        title={"Open Shopping List"}
        openClass={"pull-right"}
      >
        <div>
          <Collapse
            defaultopenvalue={this.props.emptyShoppingListOpen}
            setopen={this.props.setEmptyShoppingListOpen}
            title={"Shopping List"}
          >
            <div>
              <h2>Shopping List</h2>
              {deleteButton}
              <hr />
              <ShoppingList checked={false} />
              {this.props.showDelete ? "" : <AddIngredient check={false} />}
            </div>
          </Collapse>

          <Collapse
            defaultopenvalue={this.props.doneShoppingListOpen}
            setopen={this.props.setDoneShoppingListOpen}
            title={"Completed Shopping List"}
          >
            <div>
              <h2>Already Have</h2>
              {deleteButton}
              <hr />
              <ShoppingList checked={true} />
              {this.props.showDelete ? "" : <AddIngredient check={true} />}
            </div>
          </Collapse>
        </div>
      </Collapse>
    );
  }
}

const mapStateToProps = state => {
  return {
    shoppingListOpen: state.shoppingListOpen,
    emptyShoppingListOpen: state.emptyShoppingListOpen,
    doneShoppingListOpen: state.doneShoppingListOpen,
    showDelete: state.showDelete
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setShoppingListOpen: data => {
      dispatch(setShoppingListOpen(!!data));
    },
    setEmptyShoppingListOpen: data => {
      dispatch(setEmptyShoppingListOpen(!!data));
    },
    setDoneShoppingListOpen: data => {
      dispatch(setDoneShoppingListOpen(!!data));
    },
    setShowDelete: data => {
      dispatch(setShowDelete(!!data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ShoppingListContainer
);
