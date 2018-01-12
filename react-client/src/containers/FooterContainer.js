import React, { Component } from "react";

class FooterContainer extends Component {
  render() {
    return (
      <footer id="footer">
        <div className="row">
          <div className="col-xs-12 pull-right" style={{ textAlign: "right" }}>
            <p>
              Developed By <a href="http://github.com/yxlau">Yi-Xuan Lau</a> &{" "}
              <a href="http://www.chuck-michael.com">Chuck Michael</a>
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

export default FooterContainer;
