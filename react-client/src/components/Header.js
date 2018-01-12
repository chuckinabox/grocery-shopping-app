import React, { Component } from "react";
import NavBar from "./elements/NavBar";
import { setShouldSearch } from "../actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { search: "" };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.history.location.search) {
      this.setState({
        search: this.props.history.location.search.slice(3).replace(/%20/g, " ")
      });
    }
    if (!nextProps.history.location.search) {
      this.setState({ search: "" });
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <NavBar
            location={this.props.location}
            history={this.props.history}
            routes={this.props.routes}
          />
        </div>
        <div className="row header">
          <div
            className="col-sm-4 col-xs-12 title"
            onClick={() => this.props.history.push("/")}
          >
            <h1>RecipeShoppingApp</h1>
          </div>
          <div className="col-sm-6 col-xs-8" id="search">
            <form
              onSubmit={e => {
                e.preventDefault();
                if (e.target.search.value) {
                  this.props.shouldSearch();
                  this.props.history.push(`/search?q=${e.target.search.value}`);
                  // e.target.reset();
                }
              }}
            >
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for..."
                  name="search"
                  value={this.state.search}
                  onChange={e => this.setState({ search: e.target.value })}
                />
                <span className="input-group-btn">
                  <button className="btn btn-default" type="submit">
                    Search
                  </button>
                </span>
              </div>
            </form>
          </div>
          <div className="col-sm-2 col-xs-4" id="signup">
            {this.props.modal}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    shouldSearch: () => {
      dispatch(setShouldSearch(true));
    }
  };
};

Header.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired
};

export default connect(null, mapDispatchToProps)(Header);
