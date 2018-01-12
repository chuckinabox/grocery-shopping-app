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
    let welcomeMessage =
      "Welcome to the Recipe Shopping App.  Click on any recipe to view it or search up in the top bar.  If you log in or sign up, you can save recipes for later and make your own shopping list, otherwise enjoy these top rated recipes below.";
    if (this.props.cookie) {
      welcomeMessage = `Welcome back, ${this.props.username}.`;
    }
    let welcomeMessageContainer = (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 well frontText">
            <h2>{welcomeMessage}</h2>
          </div>
        </div>
      </div>
    );
    return (
      <div>
        {this.props.recipesPage === 1 ? welcomeMessageContainer : ""}
        <br />
        <div className="text-right">
          <span className="pull-right col-sm-10 col-sm-offset-1">
            {backButton} Page{" "}
            {forwardButton || backButton ? this.state.page : ""} {forwardButton}
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
            {backButton} Page{" "}
            {forwardButton || backButton ? this.state.page : ""} {forwardButton}
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
    isFetching: state.isFetching,
    cookie: state.cookie,
    username: state.username
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
