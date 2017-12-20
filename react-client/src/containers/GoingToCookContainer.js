import React, { Component } from "react";
import { setShouldSearch } from "../actions";
import { connect } from "react-redux";

class GoingToCookContainer extends Component {
  componentWillMount() {
    this.props.setShouldSearch();
  }
  render() {
    return <p>GoingToCook</p>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setShouldSearch: () => {
      dispatch(setShouldSearch(true));
    }
  };
};

export default connect(null, mapDispatchToProps)(GoingToCookContainer);
