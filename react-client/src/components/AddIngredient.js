import React, { Component } from "react";
import { addIngredient } from "../actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "./elements/Button";

class AddIngredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      error: "",
      quantity: "",
      unit: "",
      ingredient: ""
    };
  }

  toggleClicked = () => {
    this.setState({ clicked: !this.state.clicked });
  };
  setInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  saveIngredient = e => {
    e.preventDefault();
    if (this.state.quantity && this.state.unit && this.state.ingredient) {
      this.setState({ error: "" });
      this.props.addIngredient({
        name: this.state.ingredient,
        quantity: Number(this.state.quantity),
        unit: this.state.unit,
        check: this.props.check
      });
      this.toggleClicked();
    } else {
      this.setState({ error: `Missing` });
    }
  };
  render() {
    if (this.state.clicked) {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">{this.state.error}</div>
          </div>
          <div className="row">
            <form onSubmit={this.saveIngredient}>
              <div className="col-sm-3">
                Quantity <br />
                <input
                  onChange={this.setInput}
                  name="quantity"
                  value={this.state.quantity}
                  type="number"
                  autoFocus={true}
                />
              </div>
              <div className="col-sm-3">
                Unit <br />
                <input
                  onChange={this.setInput}
                  name="unit"
                  value={this.state.unit}
                  type="text"
                />
              </div>
              <div className="col-sm-3">
                Ingredient <br />
                <input
                  onChange={this.setInput}
                  name="ingredient"
                  value={this.state.ingredient}
                  type="text"
                />
              </div>
              <div className="col-sm-3">
                <br />
                <Button size="sm" type="submit">
                  Save
                </Button>{" "}
                <Button size="sm" onClick={this.toggleClicked}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <Button size="sm" onClick={this.toggleClicked}>
          + Ingredient
        </Button>
      );
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: form => {
      dispatch(addIngredient(form));
    }
  };
};

AddIngredient.propTypes = {
  check: PropTypes.bool.isRequired
};

export default connect(null, mapDispatchToProps)(AddIngredient);
