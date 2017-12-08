import React, { Component } from "react";
import SearchRecipes from "../components/SearchRecipes";
import { connect } from "react-redux";

class SearchContainer extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <p>Results for: {this.props.location.search.slice(3)}</p>
            </div>
          </div>
        </div>
        <div className="container">
          <SearchRecipes
            recipes={this.props.recipes}
            history={this.props.history}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes
  };
};

export default connect(mapStateToProps, null)(SearchContainer);
