import React, {Component, PropTypes} from "react";
import ReactDOM, {findDOMNode} from "react-dom";

export const SubmitButton = ({ label, disabled }) => (
  <button disabled={disabled} type="submit">{label}</button>
)

SubmitButton.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool
}

SubmitButton.defaultProps = {
  label: "Submit",
  disabled: false
}
