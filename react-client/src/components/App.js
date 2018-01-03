import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Headers
import HeaderContainerLoggedIn from "../containers/HeaderContainerLoggedIn";
import HeaderContainerLoggedOut from "../containers/HeaderContainerLoggedOut";
//Pages
import HomeContainer from "../containers/HomeContainer";
import OneRecipeContainer from "../containers/OneRecipeContainer";
import SearchContainer from "../containers/SearchContainer";
import SignupContainer from "../containers/SignupContainer";
import GoingToCookContainer from "../containers/GoingToCookContainer";
import SavedRecipesContainer from "../containers/SavedRecipesContainer";
import ErrorContainer from "../containers/ErrorContainer";

import { setCookie } from "../actions";
import { connect } from "react-redux";
import {
  getRecipes,
  getSavedRecipes,
  getMakeRecipes,
  getMakeRecipesIds,
  getSavedRecipesIds
} from "../actions";

class App extends Component {
  componentWillMount() {
    this.props.getRecipes();

    if (!!localStorage.getItem("loginToken")) {
      //fetch here to check that it's good
      if (true) {
        this.props.setCookie(localStorage.getItem("loginToken"));
        // console.log("Cookie Checked Here");
      } else {
        localStorage.removeItem("loginToken");
        this.props.setCookie("");
      }
    } else {
      //What to do with no cookie present
      this.props.setCookie("");
      // console.log("No Cookie");
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cookie !== nextProps.cookie) {
      // console.log("Update Cookie");
      if (nextProps.cookie) {
        // console.log("LOGGED IN");
        this.props.getSavedRecipes(1);
        this.props.getMakeRecipes(1);
        this.props.getSavedRecipesIds();
        this.props.getMakeRecipesIds();
      }
      return true;
    }
  }

  render() {
    let headerBar = (
      <Switch>
        <Route exact path="/" component={HeaderContainerLoggedOut} />
        <Route exact path="/recipe/:id" component={HeaderContainerLoggedOut} />
        <Route path="/search" component={HeaderContainerLoggedOut} />
      </Switch>
    );
    let components = (
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/recipe/:id" component={OneRecipeContainer} />
        <Route path="/search" component={SearchContainer} />
        <Route path="/signup" component={SignupContainer} />
        <Route component={ErrorContainer} />
      </Switch>
    );
    if (this.props.cookie) {
      headerBar = (
        <Switch>
          <Route exact path="/" component={HeaderContainerLoggedIn} />
          <Route exact path="/recipe/:id" component={HeaderContainerLoggedIn} />
          <Route path="/search" component={HeaderContainerLoggedIn} />
          <Route path="/goingtocook" component={HeaderContainerLoggedIn} />
          <Route path="/savedrecipes" component={HeaderContainerLoggedIn} />
        </Switch>
      );
      components = (
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/recipe/:id" component={OneRecipeContainer} />
          <Route path="/search" component={SearchContainer} />
          <Route path="/goingtocook" component={GoingToCookContainer} />
          <Route path="/savedrecipes" component={SavedRecipesContainer} />
          <Route path="/signup" component={SignupContainer} />
          <Route component={ErrorContainer} />
        </Switch>
      );
    }

    return (
      <div className="App">
        <Router>
          <div>
            <header>{headerBar}</header>
            {components}
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cookie: state.cookie
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCookie: cookie => {
      dispatch(setCookie(cookie));
    },
    getRecipes: () => {
      dispatch(getRecipes());
    },
    getSavedRecipes: () => {
      dispatch(getSavedRecipes());
    },
    getMakeRecipes: () => {
      dispatch(getMakeRecipes());
    },
    getMakeRecipesIds: () => {
      dispatch(getMakeRecipesIds());
    },
    getSavedRecipesIds: () => {
      dispatch(getSavedRecipesIds());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
