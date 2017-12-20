import React, { Component } from "react";
import Recipes from "../components/Recipes";
import { connect } from "react-redux";
import { setShouldSearch } from "../actions";
import Cookies from "js-cookie";

class HomeContainer extends Component {
  componentWillMount() {
    if (Cookies.get("key")) {
      console.log("GET SAVED");
    }
    this.props.setShouldSearch();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <p>
                App Description Lorem ipsum dolor sit amet, augue disputationi
                an qui. In probo suavitate cotidieque qui. Atomorum suavitate ei
                eam. Tamquam alienum nostrum est ne, ut tale nibh sit. Te agam
                integre erroribus eam.
              </p>
            </div>
          </div>
        </div>
        <div>
          {this.props.isFetching ? (
            "Loading..."
          ) : (
            <Recipes
              recipes={this.props.recipes}
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
    recipes: state.recipes,
    isFetching: state.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setShouldSearch: () => {
      dispatch(setShouldSearch(true));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
