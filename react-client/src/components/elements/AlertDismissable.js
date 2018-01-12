import React, { Component } from "react";
import { Alert, Button } from "react-bootstrap";

class AlertDismissable extends Component {
  constructor(...args) {
    super(...args);

    this.handleAlertShow = this.handleAlertShow.bind(this);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);

    this.state = {
      alertVisible: true
    };
  }

  handleAlertDismiss() {
    this.setState({ alertVisible: false });
  }

  handleAlertShow() {
    this.setState({ alertVisible: true });
  }

  render() {
    if (this.state.alertVisible) {
      let errorTexts = <p>No Text??</p>;
      if (this.props.error.text) {
        errorTexts = this.props.error.text.map(info => (
          <p key={info}>{info}</p>
        ));
      }
      return (
        <Alert
          bsStyle="danger"
          className="alert"
          onDismiss={this.handleAlertDismiss}
        >
          {this.props.error ? (
            <span>
              <h4>
                {this.props.error.title
                  ? this.props.error.title
                  : "Oh snap! You got an error!"}
              </h4>
              {errorTexts}
            </span>
          ) : (
            ""
          )}
          <p>
            <Button onClick={this.handleAlertDismiss}>Close Error</Button>
          </p>
        </Alert>
      );
    }

    return null;
  }
}

export default AlertDismissable;
