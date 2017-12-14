import React, { Component } from "react";
import Input from "../components/elements/Input";
import InputGroup from "../components/elements/InputGroup";
import Button from "../components/elements/Button";
import serialize from "form-serialize";

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { errorUsername: "", errorPassword: "" };
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
    } else {
      this.setState({ errorPassword: "" });
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
      <div>
        <h2>Login</h2>
        <form onSubmit={this.checkUsernamePassword}>
          {/* Username */}
          <InputGroup
            name="Username"
            labelText="Username"
            className={this.state.errorUsername ? "has-error has-feedback" : ""}
          >
            <Input name="Username" />
            {this.state.errorUsername}
          </InputGroup>
          {/* Password */}
          <InputGroup
            name="Password"
            labelText="Password"
            className={this.state.errorPassword ? "has-error has-feedback" : ""}
          >
            <Input name="Password" type="password" />
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

export default LoginContainer;
