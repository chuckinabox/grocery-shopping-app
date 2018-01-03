import React, { Component } from "react";
import Recipes from "../components/Recipes";
import { connect } from "react-redux";
import { setShouldSearch } from "../actions";

class HomeContainer extends Component {
  componentWillMount() {
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
              <h2>
                App Description Lorem ipsum dolor sit amet, augue disputationi
                an qui. In probo suavitate cotidieque qui. Atomorum suavitate ei
                eam. Tamquam alienum nostrum est ne, ut tale nibh sit. Te agam
                integre erroribus eam.{" "}
              </h2>
            </div>
          </div>
        </div>
        <div>
          {this.props.recipes.length > 1 ? (
            <Recipes
              recipes={this.props.recipes}
              history={this.props.history}
            />
          ) : (
            "Loading..."
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
