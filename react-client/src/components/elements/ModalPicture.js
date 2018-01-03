import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";

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
        <img
          src={this.props.src ? this.props.src : ""}
          onClick={this.toggleModal}
          className={this.props.className}
          alt={this.props.alt}
        />

        <Modal show={this.state.isOpen} onClose={this.toggleModal}>
          <img
            src={this.props.src ? this.props.src : ""}
            className="fullScreen"
            alt={this.props.alt}
          />
        </Modal>
      </div>
    );
  }
}

ModalButton.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string.isRequired
};

export default ModalButton;
