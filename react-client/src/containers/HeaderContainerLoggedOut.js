import React, { Component } from "react";
import NavBar from "../components/elements/NavBar";
import ModalButton from "../components/elements/ModalButton";
import LoginContainer from "./LoginContainer";

class HeaderContainerLoggedOut extends Component {
  constructor(props) {
    super(props);
    this.state = { search: "" };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.history.location.search) {
      this.setState({ search: this.props.history.location.search.slice(3) });
    }
    if (!nextProps.history.location.search) {
      this.setState({ search: "" });
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-sm-3 col-xs-12 title"
            onClick={() => this.props.history.push("/")}
          >
            <h4>Title here</h4>
          </div>
          <div className="col-sm-7 col-xs-8" id="search">
            <form
              onSubmit={e => {
                e.preventDefault();
                if (e.target.search.value) {
                  this.props.history.push(`/search?q=${e.target.search.value}`);
                  e.target.reset();
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
                    Go!
                  </button>
                </span>
              </div>
            </form>
          </div>
          <div className="col-sm-2 col-xs-4" id="signup">
            {/* <button className="btn btn-primary">Login/Signup</button> */}
            <ModalButton label="Login/Signup">
              <LoginContainer history={this.props.history} />
            </ModalButton>
          </div>
        </div>

        <div className="row">
          <NavBar
            location={this.props.location}
            history={this.props.history}
            routes={[{ name: "Home", path: "/" }]}
          />
        </div>
      </div>
    );
  }
}

export default HeaderContainerLoggedOut;
