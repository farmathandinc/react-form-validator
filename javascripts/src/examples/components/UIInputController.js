import React, {Component, PropTypes} from "react";
import ReactDOM, {findDOMNode} from "react-dom";

import {inputsValidator} from "../../validator"

export default class UIInputController extends Component { // Input State Manager
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      isInputValid: false,
      errorMessage: [],
      checkMark: null
    }
  }

  componentDidMount() {
    this.setState({ value: this.props.value ? this.props.value : this.state.value });

    if (!this.props.rule) {
      this.props.parentInputValidator(this.props.name, true);
    } else if (this.props.rule !== "required") {
      this.props.parentInputValidator(this.props.name, true);
    } else {
      this.props.parentInputValidator(this.props.name, this.state.isInputValid);
    }
  }

  _onChangeHandler(e) {
    this._validateInput(e.target.value, this.props.rule)
  }

  _renderErrorMessages() {
    var errorMessageState = this.state.errorMessage;

    if (Array.isArray(errorMessageState)) {
      return errorMessageState.map((message, index) => {
        return <span key={index} style={{ display: "block", color: "red" }}>{message}</span>
      })
    } else {
      return <span style={{ display: "block", color: "red" }}>{errorMessageState}</span>
    }
  }

  _validateInput(value, rule) {
    var validator = inputsValidator(value, rule)
    var validCheckMark = <i className="check-mark fa fa-check" />

    if (this.props.rule && validator.result) {
      this.setState({
        isInputValid: true,
        value: value,
        errorMessage: validator.error,
        checkMark: value === "" ? null : validCheckMark
      });
      this.props.parentInputValidator(this.props.name, true);


    } else if (this.props.rule && Array.isArray(validator)) {

      this.setState({ isInputValid: false, value: value});
      var errResponse = []; // mutable array that would collect the err messages
      validator.forEach(response => {
        if (response.error) {
          errResponse.push(response.error)
        }
        this.setState({ errorMessage: errResponse});
      }.bind(this))

      if (errResponse.length > 0) {
        this.props.parentInputValidator(this.props.name, false);
        this.setState({ checkMark: null });
      } else {
        this.props.parentInputValidator(this.props.name, true);
        this.setState({ checkMark: validCheckMark});
      }


    } else if (this.props.rule && !validator.result) {
      this.setState({
        isInputValid: false,
        value: value,
        errorMessage: validator.error,
        checkMark: null
      });

      this.props.parentInputValidator(this.props.name, false);


    } else { // if there are no rules present then it will always be true
      this.setState({
        isInputValid: true,
        value: value,
        checkMark: value === "" ? null : validCheckMark
      });
      this.props.parentInputValidator(this.props.name, true);
    }

  }

}
