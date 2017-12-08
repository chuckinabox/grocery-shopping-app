import React, { Component } from "react";
import Recipes from "../components/Recipes";
import { connect } from "react-redux";

class HomeContainer extends Component {
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
          <Recipes recipes={this.props.recipes} history={this.props.history} />
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

export default connect(mapStateToProps, null)(HomeContainer);
