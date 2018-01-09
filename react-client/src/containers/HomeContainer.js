import React, { Component } from "react";
import Recipes from "../components/Recipes";
import { connect } from "react-redux";
import { setShouldSearch, getRecipes, setRecipesPage } from "../actions";
import Button from "../components/elements/Button";

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { page: this.props.recipesPage };
  }
  componentWillMount() {
    this.props.setShouldSearch();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.state.page !== nextState.page) {
      nextProps.getRecipes(nextState.page);
      nextProps.setRecipesPage(nextState.page);
    }
  }
  render() {
    let backButton = (
      <Button
        color="primary"
        size="sm"
        onClick={() => this.setState({ page: Number(this.state.page) - 1 })}
      >
        <span className="glyphicon glyphicon-backward" />
      </Button>
    );
    let forwardButton = (
      <Button
        color="primary"
        size="sm"
        onClick={() => this.setState({ page: Number(this.state.page) + 1 })}
      >
        <span className="glyphicon glyphicon-forward" />
      </Button>
    );
    if (this.state.page < 2) {
      backButton = null;
    }
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h2>
                App Description Lorem ipsum dolor sit amet, augue disputationi
                an qui. In probo suavitate cotidieque qui. Atomorum suavitate ei
                eam. Tamquam alienum nostrum est ne, ut tale nibh sit. Te agam
                integre erroribus eam.{" "}
              </h2>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="pull-right col-sm-10 col-sm-offset-1">
            {backButton} {forwardButton || backButton ? this.state.page : ""}{" "}
            {forwardButton}
          </span>
          {this.props.recipes.length > 1 ? (
            <Recipes
              recipes={this.props.recipes}
              history={this.props.history}
            />
          ) : (
            "Loading..."
          )}
          <span className="pull-right col-sm-10 col-sm-offset-1">
            {backButton} {forwardButton || backButton ? this.state.page : ""}{" "}
            {forwardButton}
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes,
    recipesPage: state.recipesPage,
    isFetching: state.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setShouldSearch: () => {
      dispatch(setShouldSearch(true));
    },
    getRecipes: pageNumber => {
      dispatch(getRecipes(pageNumber));
    },
    setRecipesPage: page => {
      dispatch(setRecipesPage(page));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
