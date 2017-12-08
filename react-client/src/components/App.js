import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HeaderContainer from "../containers/HeaderContainer";
import HomeContainer from "../containers/HomeContainer";
import SingleRecipeContainer from "../containers/SingleRecipeContainer";
import SearchContainer from "../containers/SearchContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <header>
              <Switch>
                <Route exact path="/" component={HeaderContainer} />
                <Route path="/recipe" component={HeaderContainer} />
                <Route path="/search" component={HeaderContainer} />
              </Switch>
            </header>
            <Switch>
              <Route exact path="/" component={HomeContainer} />
              <Route path="/recipe" component={SingleRecipeContainer} />
              <Route path="/search" component={SearchContainer} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
