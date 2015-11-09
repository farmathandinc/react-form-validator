import React, {Component, PropTypes} from "react";
import ReactDOM, {findDOMNode} from "react-dom";
import _ from "underscore";

import {SubmitButton} from "./SubmitButton";
import Input from "./Input"

export default class UIFormController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      fieldValidity: {}
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

  _validateInput(key, isValid) {

    this.state.fieldValidity[key] = isValid

    console.log(this.state.fieldValidity);

    var validate = this._validateForm(this.state.fieldValidity);
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

  _generateForm(inputs, validator) {
    return inputs.map((input, index) => {
      return <Input
                key={index}
                name={input.name}
                ref={input.name}
                label={input.label}
                rule={input.rule ? input.rule : ""}
                parentInputValidator={validator} />
    })
  }
}
