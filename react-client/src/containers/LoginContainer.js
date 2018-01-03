import React, { Component } from "react";
import Input from "../components/elements/Input";
import InputGroup from "../components/elements/InputGroup";
import Button from "../components/elements/Button";
import serialize from "form-serialize";
import { connect } from "react-redux";
import { getLogin } from "../actions";

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { errorEmail: "", errorPassword: "" };
  }

  checkEmailPassword = e => {
    e.preventDefault();
    const form = e.target;
    let data = serialize(form, { hash: true });
    // Check Password
    if (!data.password) {
      this.setState({ errorPassword: "No Password Entered" });
    } else if (data.password.length < 8) {
      data.password = "";
      this.setState({
        errorPassword: "Password must be at least 8 characters long"
      });
    } else {
      this.setState({ errorPassword: "" });
    }
    // Check Email
    if (!data.email) {
      this.setState({ errorEmail: "No Email Entered" });
    } else if (data.email.length < 8) {
      data.email = "";
      this.setState({
        errorEmail: "Email must be at least 8 characters long"
      });
    } else {
      this.setState({ errorEmail: "" });
    }
    // If conditions met, send data
    if (data.email && data.password) {
      this.props.getLogin(data);
    }
  };
  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.checkEmailPassword}>
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
            className={this.state.errorPassword ? "has-error has-feedback" : ""}
          >
            <Input name="password" type="password" autoComplete="password" />
            {this.state.errorPassword}
          </InputGroup>
          <br />
          {/* Submit */}
          <Button type="submit" color="primary">
            Login
          </Button>
          {/* To Signup */}
          <Button onClick={() => this.props.history.push("/signup")}>
            Need An Account?
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getLogin: form => {
      dispatch(getLogin(form));
    }
  };
};

export default connect(null, mapDispatchToProps)(LoginContainer);
