import React, { Component } from "react";
import Button from "../components/elements/Button";
import Input from "../components/elements/Input";
import InputGroup from "../components/elements/InputGroup";
import serialize from "form-serialize";

class SignupContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorUsername: "",
      errorPassword: "",
      errorPasswordConfirm: ""
    };
  }

  checkUsernamePassword = e => {
    e.preventDefault();
    const form = e.target;
    let data = serialize(form, { hash: true });
    // Check Password
    if (!data.Password) {
      this.setState({ errorPassword: "No Password Entered" });
    } else if (data.Password.length < 8) {
      data.Password = "";
      this.setState({
        errorPassword: "Password must be at least 8 characters long"
      });
    } else if (data.Password !== data.PasswordConfirm) {
      data.Password = "";
      this.setState({
        errorPassword: "Passwords must match",
        errorPasswordConfirm: "Passwords must match"
      });
    } else {
      this.setState({ errorPassword: "", errorPasswordConfirm: "" });
    }
    // Check Username
    if (!data.Username) {
      this.setState({ errorUsername: "No Username Entered" });
    } else if (data.Username.length < 8) {
      data.Username = "";
      this.setState({
        errorUsername: "Username must be at least 8 characters long"
      });
    } else {
      this.setState({ errorUsername: "" });
    }
    // If conditions met, send data
    if (data.Username && data.Password) {
      console.log("Send DAta");
    }
  };
  render() {
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
          <form onSubmit={this.checkUsernamePassword}>
            <InputGroup
              name="Username"
              labelText="Username"
              className={
                this.state.errorUsername ? "has-error has-feedback" : ""
              }
            >
              <Input name="Username" />
              {this.state.errorUsername}
            </InputGroup>
            <InputGroup
              name="Password"
              labelText="Password"
              className={
                this.state.errorPassword ? "has-error has-feedback" : ""
              }
            >
              <Input name="Password" type="password" />
              {this.state.errorPassword}
            </InputGroup>
            <InputGroup
              name="PasswordConfirm"
              labelText="Password Confirm"
              className={
                this.state.errorPasswordConfirm ? "has-error has-feedback" : ""
              }
            >
              <Input name="PasswordConfirm" type="password" />
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

export default SignupContainer;
