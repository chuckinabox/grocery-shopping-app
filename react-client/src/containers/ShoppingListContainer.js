import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setShoppingListOpen,
  setEmptyShoppingListOpen,
  setDoneShoppingListOpen
} from "../actions";

import Collapse from "../components/elements/Collapse";

import ShoppingList from "../components/ShoppingList";

class ShoppingListContainer extends Component {
  render() {
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
              <hr />
              <ShoppingList checked={false} />
            </div>
          </Collapse>
          <Collapse
            defaultopenvalue={this.props.doneShoppingListOpen}
            setopen={this.props.setDoneShoppingListOpen}
            title={"Completed Shopping List"}
          >
            <div>
              <h2>Already Have</h2>
              <hr />
              <ShoppingList checked={true} />
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
    doneShoppingListOpen: state.doneShoppingListOpen
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ShoppingListContainer
);
