import React, { Component } from "react";
import Button from "../components/elements/Button";
import Input from "../components/elements/Input";
import InputGroup from "../components/elements/InputGroup";
import serialize from "form-serialize";
import { connect } from "react-redux";
import { getSignup } from "../actions";

class SignupContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorUsername: "",
      errorEmail: "",
      errorPassword: "",
      errorPasswordConfirm: ""
    };
  }

  checkEmailPassword = e => {
    e.preventDefault();
    const form = e.target;
    let data = serialize(form, { hash: true });
    let passwordCheck = false;
    let emailCheck = false;
    let usernameCheck = false;
    // Check Username
    if (!data.username) {
      this.setState({ errorUsername: "No Username Entered." });
    } else if (data.username.length < 3) {
      this.setState({
        errorUsername: "Username must be at least 3 characters long."
      });
    } else {
      this.setState({ errorUsername: "" });
      usernameCheck = true;
    }
    // Check Email
    if (!data.email) {
      this.setState({ errorEmail: "No Email Entered." });
    } else if (data.email.length < 8) {
      this.setState({
        errorEmail: "Email must be at least 8 characters long."
      });
    } else {
      this.setState({ errorEmail: "" });
      emailCheck = true;
    }
    // Check Password
    if (!data.password) {
      this.setState({ errorPassword: "No Password Entered" });
    } else if (data.password.length < 8) {
      this.setState({
        errorPassword: "Password must be at least 8 characters long"
      });
    } else if (data.password !== data.password_confirmation) {
      this.setState({
        errorPassword: "Passwords must match.",
        errorPasswordConfirm: "Passwords must match."
      });
    } else {
      this.setState({ errorPassword: "", errorPasswordConfirm: "" });
      passwordCheck = true;
    }

    // If conditions met, send data
    if (usernameCheck && emailCheck && passwordCheck) {
      console.log("Send DAta");
      this.props.getSignup(data);
    }
  };
  render() {
    //Redirect if token set
    if (this.props.cookie) {
      return <p>{this.props.history.goBack()}</p>;
    }
    return (
      <div className="container ">
        <div className="row ">
          <div
            className="col-sm-3 col-xs-8 title "
            onClick={() => this.props.history.push("/")}
          >
            <h4>Title here</h4>
          </div>
          <div className="col-sm-2 col-sm-offset-6 col-xs-4">
            <Button color="primary" onClick={() => this.props.history.goBack()}>
              {" "}
              Back
            </Button>
          </div>
        </div>
        <div className="row">
          <h2>Signup</h2>
          <form onSubmit={this.checkEmailPassword}>
            {/* Username */}
            <InputGroup
              name="username"
              labelText="Username"
              className={
                this.state.errorUsername ? "has-error has-feedback" : ""
              }
            >
              <Input name="username" autoComplete="username" />
              {this.state.errorUsername}
            </InputGroup>
            {/* Email */}
            <InputGroup
              name="email"
              labelText="Email"
              className={this.state.errorEmail ? "has-error has-feedback" : ""}
            >
              <Input name="email" type="email" autoComplete="email" />
              {this.state.errorEmail}
            </InputGroup>
            {/* Password */}
            <InputGroup
              name="password"
              labelText="Password"
              className={
                this.state.errorPassword ? "has-error has-feedback" : ""
              }
            >
              <Input
                name="password"
                type="password"
                autoComplete="new-password"
              />
              {this.state.errorPassword}
            </InputGroup>
            {/* Password Confirm */}
            <InputGroup
              name="password_confirmation"
              labelText="Password Confirm"
              className={
                this.state.errorPasswordConfirm ? "has-error has-feedback" : ""
              }
            >
              <Input
                name="password_confirmation"
                type="password"
                autoComplete="new-password"
              />
              {this.state.errorPasswordConfirm}
            </InputGroup>
            <Button type="submit" color="primary">
              New User
            </Button>
          </form>
        </div>
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
    getSignup: form => {
      dispatch(getSignup(form));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
