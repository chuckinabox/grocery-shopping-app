import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    return (
      <div
        className="backdrop"
        id="backdrop"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          if (e.target.id === "backdrop") {
            this.props.onClose();
          }
        }}
      >
        <div className="modal text-left" onClick={e => e.stopPropagation()}>
          <div className="top-right text-right">
            <Button onClick={this.props.onClose}>X</Button>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
