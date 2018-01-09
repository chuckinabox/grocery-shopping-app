import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Collapse, Well } from "react-bootstrap";

class CollapseElement extends Component {
  constructor(...args) {
    super(...args);

    this.state = { open: true };
  }

  componentWillMount() {
    this.setState({ open: this.props.defaultopenvalue });
  }

  render() {
    return (
      <div>
        <div
          className={
            this.state.open ? this.props.openClass : this.props.closeClass
          }
        >
          <Button
            onClick={() => {
              this.setState({ open: !this.state.open });
              this.props.setopen(!this.state.open);
            }}
          >
            {this.state.open ? (
              <span className="glyphicon glyphicon-minus" />
            ) : (
              this.props.title
            )}
          </Button>
        </div>
        <Collapse in={this.state.open}>
          <div>
            <Well>{this.props.children}</Well>
          </div>
        </Collapse>
      </div>
    );
  }
}

CollapseElement.propTypes = {
  defaultopenvalue: PropTypes.bool,
  setopen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  openClass: PropTypes.string,
  closeClass: PropTypes.string
};

export default CollapseElement;
