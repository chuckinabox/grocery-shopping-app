import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HeaderContainer from "../containers/HeaderContainer";
import HeaderContainerLoggedOut from "../containers/HeaderContainerLoggedOut";
import HomeContainer from "../containers/HomeContainer";
import SingleRecipeContainer from "../containers/SingleRecipeContainer";
import SearchContainer from "../containers/SearchContainer";
import SignupContainer from "../containers/SignupContainer";
import GoingToCookContainer from "../containers/GoingToCookContainer";
import SavedRecipesContainer from "../containers/SavedRecipesContainer";
import Cookies from "js-cookie";
import { setCookie } from "../actions";
import { connect } from "react-redux";
import { getRecipes } from "../actions";

class App extends Component {
  componentWillMount() {
    this.props.getRecipes();
    // Cookies.remove("key");
    // Cookies.set("key", 123, { expires: 1 });
    if (Cookies.get("key")) {
      //fetch here to check that it's good
      if (true) {
        this.props.setCookie(Cookies.get("key"));
      } else {
        Cookies.remove("key");
        this.props.setCookie("");
      }
    } else {
      //What to do with no cookie present
      this.props.setCookie("");
    }
  }
  render() {
    let headerBar = (
      <Switch>
        <Route exact path="/" component={HeaderContainerLoggedOut} />
        <Route path="/recipe" component={HeaderContainerLoggedOut} />
        <Route path="/search" component={HeaderContainerLoggedOut} />
      </Switch>
    );
    if (this.props.cookie) {
      headerBar = (
        <Switch>
          <Route exact path="/" component={HeaderContainer} />
          <Route path="/recipe" component={HeaderContainer} />
          <Route path="/search" component={HeaderContainer} />
          <Route path="/goingtocook" component={HeaderContainer} />
          <Route path="/savedrecipes" component={HeaderContainer} />
        </Switch>
      );
    }

    return (
      <div className="App">
        <Router>
          <div>
            <header>{headerBar}</header>
            <Switch>
              <Route exact path="/" component={HomeContainer} />
              <Route path="/recipe" component={SingleRecipeContainer} />
              <Route path="/search" component={SearchContainer} />
              <Route path="/goingtocook" component={GoingToCookContainer} />
              <Route path="/savedrecipes" component={SavedRecipesContainer} />
              <Route path="/signup" component={SignupContainer} />
            </Switch>
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
