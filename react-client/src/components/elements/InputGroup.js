import React from "react";
import PropTypes from "prop-types";

const InputGroup = ({ name, labelText, children, className }) => (
  <div className={className ? `form-group ${className}` : "form-group"}>
    <label htmlFor={name}>{labelText}</label>
    {children}
  </div>
);

InputGroup.propTypes = {
  name: PropTypes.string,
  labelText: PropTypes.node.isRequired,
  className: PropTypes.string,
  children: PropTypes.node
};

export default InputGroup;
