import React, { Component } from "react";
import SearchRecipes from "../components/SearchRecipes";
import { connect } from "react-redux";
import { getRecipesSearch } from "../actions";
import Button from "../components/elements/Button";

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { page: this.props.searchRecipes.pg };
  }
  componentWillMount() {
    if (this.props.shouldSearch) {
      this.props.getRecipesSearch(this.props.location.search, 1);
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.location.search !== this.props.location.search) {
      nextProps.getRecipesSearch(nextProps.location.search, 1);
    }
    if (this.state.page !== nextState.page) {
      nextProps.getRecipesSearch(nextProps.location.search, nextState.page);
    }
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h5>
                <Button
                  color="danger"
                  onClick={() => this.props.history.goBack()}
                >
                  Go Back
                </Button>{" "}
                Results for:{" "}
                {this.props.location.search.slice(3).replace(/%20/g, " ")}
                <span className="pull-right">
                  {/* Showing 1-12 of 5000 */}
                  Showing{" "}
                  {1 +
                    (this.props.searchRecipes.pg - 1) *
                      this.props.searchRecipes.rpp}-{this.props.searchRecipes
                    .rpp * this.props.searchRecipes.pg}{" "}
                  of {this.props.searchRecipes.resultCount}
                </span>
              </h5>
              <br />
              {!this.props.isFetching ? (
                <p className="pull-right">
                  {this.props.searchRecipes.pg > 1 ? (
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() =>
                        this.setState({ page: Number(this.state.page) - 1 })
                      }
                    >
                      <span className="glyphicon glyphicon-backward" />
                    </Button>
                  ) : (
                    ""
                  )}{" "}
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() =>
                      this.setState({ page: Number(this.state.page) + 1 })
                    }
                  >
                    <span className="glyphicon glyphicon-forward" />
                  </Button>
                </p>
              ) : (
                ""
              )}
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
          {!this.props.isFetching ? (
            <p className="pull-right">
              {this.props.searchRecipes.pg > 1 ? (
                <Button
                  color="primary"
                  size="sm"
                  onClick={() =>
                    this.setState({ page: Number(this.state.page) - 1 })
                  }
                >
                  <span className="glyphicon glyphicon-backward" />
                </Button>
              ) : (
                ""
              )}{" "}
              <Button
                color="primary"
                size="sm"
                onClick={() =>
                  this.setState({ page: Number(this.state.page) + 1 })
                }
              >
                <span className="glyphicon glyphicon-forward" />
              </Button>
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchRecipes: state.searchRecipes,
    isFetching: state.isFetching,
    shouldSearch: state.shouldSearch
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRecipesSearch: (location, page) =>
      dispatch(getRecipesSearch(location, page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
