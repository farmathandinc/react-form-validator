/**
 * Stateful Form example
 */

import React, {Component, PropTypes} from "react"
import ReactDOM, {findDOMNode} from "react-dom"
import _ from "underscore"

import {inputsValidator} from "../validator"

export default class StatefulForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValues: {},
      fieldValidity: {},
      isFormValid: false
    }
  }

  render() {
    var countryList = [
      {value: "usa", name: "USA"},
      {value: "canada", name: "Canada"},
      {value: "china", name: "China"}
    ];

    return (
      <form onSubmit={this._onSubmitHandler.bind(this)}>
        <Input
          label="Name*"
          name="name"
          parentHandler={this._fetchValueFromInput.bind(this)}
          rule="required" />

        <Input
          label="Email"
          name="email"
          parentHandler={this._fetchValueFromInput.bind(this)} />

        <Input
          label="Age*"
          name="age"
          parentHandler={this._fetchValueFromInput.bind(this)}
          rule={["number", "required"]} />

        <Input
          label="Income"
          name="income"
          parentHandler={this._fetchValueFromInput.bind(this)}
          rule="number" />

        <Select
          options={countryList}
          label="Country*"
          name="country"
          rule="required"
          parentHandler={this._fetchValueFromInput.bind(this)} />

        <Checkbox
          name="marital_status"
          label="Married?"
          parentHandler={this._fetchValueFromInput.bind(this)} />

        <button type="submit" style={{ display: "block", marginTop: "20px" }} disabled={!this.state.isFormValid}>Submit</button>
        <em>{this.state.isFormValid ? "" : "Make sure you filled in the required fields"}</em>
      </form>
    )
  }

  _onSubmitHandler(e) {
    e.preventDefault();
    // no op
  }

  _fetchValueFromInput(key, value, isValid) {

    this.state.fieldValidity[key] = isValid;
    this.state.inputValues[key] = value;

    var validate = this._validateForm(this.state.fieldValidity)
    if (validate) {
      this.setState({ isFormValid: true });
    } else {
      this.setState({ isFormValid: false });
    }

  }

  _validateForm(formData) {

    var values = _.values(formData);

    if (_.contains(values, false)) {
      return false;
    } else {
      return true;
    }
  }

}

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      isInputValid: false,
      errorMessage: [],
      checkMark: null
    }
  }

  componentDidMount() {
    this.setState({ value: this.state.value });
    if (!this.props.rule) {
      this.props.parentHandler(this.props.name, this.state.value, true);
    } else if (this.props.rule !== "required") {
      this.props.parentHandler(this.props.name, this.state.value, true);
    } else {
      this.props.parentHandler(this.props.name, this.state.value, this.state.isInputValid);
    }
  }

  render() {
    return (
      <div className="input-container">
        <label>{this.props.label}</label>
        <div className="input-inner-container">
          <input
            name={this.props.name}
            ref={this.props.name}
            type="text"
            onChange={this._onChangeHandler.bind(this)}
            value={this.state.value} />

            {this.state.checkMark}
        </div>
        {this._renderErrorMessages()}
      </div>
    )
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
    console.log(this.props.rule)
    var validator = inputsValidator(value, rule)
    console.log(rule);
    var validCheckMark = <i className="check-mark fa fa-check" />

    if (this.props.rule && validator.result) {
      this.setState({
        isInputValid: true,
        value: value,
        errorMessage: validator.error,
        checkMark: value === "" ? null : validCheckMark
      });
      this.props.parentHandler(this.props.name, value, true);


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
        this.props.parentHandler(this.props.name, value, false);
        this.setState({ checkMark: null });
      } else {
        this.props.parentHandler(this.props.name, value, true);
        this.setState({ checkMark: validCheckMark});
      }


    } else if (this.props.rule && !validator.result) {
      this.setState({
        isInputValid: false,
        value: value,
        errorMessage: validator.error,
        checkMark: null
      });

      this.props.parentHandler(this.props.name, value, false);


    } else { // if there are no rules present then it will always be true
      this.setState({
        isInputValid: true,
        value: value,
        checkMark: value === "" ? null : validCheckMark
      });
      this.props.parentHandler(this.props.name, value, true);
    }

  }
}

class Select extends Input {
  render() {
    return (
      <div className="input-container">
        <label>{this.props.label}</label>
        <div className="input-inner-container">
          <select
            name={this.props.name}
            value={this.state.value}
            onChange={this._onChangeHandler.bind(this)}>

            <option value={null} disabled={true}>Please Select</option>

            {this.props.options.map((option, index) => {
              return <option key={index} value={option.value}>{option.name}</option>
            })}

          </select>
          {this.state.checkMark}
        </div>

        {this._renderErrorMessages()}

      </div>
    )
  }
}

class Checkbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: false
    }
  }
  componentDidMount() {
    this.props.parentHandler(this.props.name, this.state.value, true);
  }
  render() {
    return (
      <div className="input-container">
        <label>{this.props.label}</label>
        <div className="input-inner-container">
          <input
            name={this.props.name}
            type="checkbox"
            onChange={this._onChangeHandler.bind(this)}
            checked={this.state.value} />
        </div>
      </div>
    )
  }

  _onChangeHandler(e) {
    //e.preventDefault();
    var value = e.target.checked;
    this.setState({ value: value })
    this.props.parentHandler(this.props.name, value, true);
  }
}
