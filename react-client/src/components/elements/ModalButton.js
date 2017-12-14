import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import Button from "./Button";

class ModalButton extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div className="ModalButton text-right">
        <Button
          color={this.props.color ? this.props.color : "primary"}
          onClick={this.toggleModal}
          size={this.props.size}
        >
          {this.props.label ? this.props.label : "Click Me"}
        </Button>

        <Modal show={this.state.isOpen} onClose={this.toggleModal}>
          {this.props.children}
        </Modal>
      </div>
    );
  }
}

ModalButton.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default ModalButton;
