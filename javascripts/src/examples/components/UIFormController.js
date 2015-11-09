import React, {Component, PropTypes} from "react";
import ReactDOM, {findDOMNode} from "react-dom";
import _ from "underscore";

import {SubmitButton} from "./SubmitButton";

export default class UIFormController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValues: {},
      isFormValid: false
    }
  }

  _renderSubmitButton() {
    return <SubmitButton disabled={!this.state.isFormValid} />
  }

  _onSubmitHandler(e) {
    e.preventDefault();
    var results = this._getInputValues(this.refs);
    console.log(results);
  }

  _getInputValues(refs) {
    var results = {};
    Object.keys(refs).forEach(name => {
      results[name] = findDOMNode(this.refs[name].refs.input).value;
    }.bind(this))

    return results;
  }

  _validateInput(isValid) {

    var fieldValidity = {}

    Object.keys(this.refs).forEach(key => {
      fieldValidity[key] = isValid
    }.bind(this))

    console.log(fieldValidity);

    var validate = this._validateForm(fieldValidity);
    if (validate) {
      this.setState({ isFormValid: true });
    } else {
      this.setState({ isFormValid: false });
    }
  }

  _validateForm(formData) {

    var values = _.values(formData)

    if (_.contains(values, false)) {
      return false;
    } else {
      return true;
    }
  }
}
