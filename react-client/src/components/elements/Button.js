import React from "react";
import PropTypes from "prop-types";

const Button = props => {
  const { size, color, children, type, ...rest } = props;
  const sizeClass = size ? `btn-${size}` : "";

  return (
    <button type={type} className={`btn btn-${color} ${sizeClass}`} {...rest}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  color: "default",
  children: "Submit"
};

Button.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.string
};

export default Button;
