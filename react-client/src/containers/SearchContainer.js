import React, { Component } from "react";
import SearchRecipes from "../components/SearchRecipes";
import { connect } from "react-redux";
import { getRecipesSearch } from "../actions";

class SearchContainer extends Component {
  componentWillMount() {
    this.props.getRecipesSearch(this.props.location.search);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      nextProps.getRecipesSearch(nextProps.location.search);
    }
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h5>
                <button onClick={() => this.props.history.goBack()}>
                  Go Back
                </button>{" "}
                Results for: {this.props.location.search.slice(3)}
              </h5>
            </div>
          </div>
        </div>
        <div className="container">
          {this.props.isFetching ? (
            "Loading..."
          ) : (
            <SearchRecipes
              recipes={this.props.searchRecipes}
              history={this.props.history}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchRecipes: state.searchRecipes,
    isFetching: state.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRecipesSearch: location => dispatch(getRecipesSearch(location))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
