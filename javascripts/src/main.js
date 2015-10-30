import React, {Component} from "react"
import ReactDOM, {findDOMNode} from "react-dom"

import {inputsValidator} from "./validator"

class App extends Component {
  render() {
    return (
      <div>
        <Form />
      </div>
    )
  }
}

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValues: {},
      isFormValid: false
    }
  }

  render() {
    console.log("is form valid", this.state.isFormValid);
    return (
      <form onSubmit={this._onSubmitHandler.bind(this)}>
        <Input
          label="Name"
          name="name"
          parentHandler={this._fetchValueFromInput.bind(this)}
          rule="required" />
        <Input
          label="Email"
          name="email"
          parentHandler={this._fetchValueFromInput.bind(this)} />
        <Input
          label="Age"
          name="age"
          parentHandler={this._fetchValueFromInput.bind(this)}
          rule={["number", "required"]} />
      </form>
    )
  }

  _onSubmitHandler(e) {
    e.preventDefault();
    // no op

  }
  _fetchValueFromInput(key, value, isValid) {
    if (isValid) {
      this.setState({ isFormValid: true })
    }
    this.state.inputValues[key] = value;

  }

  _validateForm() {

  }

}

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      isInputValid: false,
      errorMessage: []
    }
  }

  componentDidMount() {
    if (!this.props.rule) {
      this.setState({ isInputValid: true })
    }
    this.props.parentHandler(this.props.name, this.state.value, this.state.isInputValid);
  }

  render() {
    //console.log("error state messages", this.state.errorMessage);
    return (
      <div className="input-container">
        <label>{this.props.label}</label>
        <input
          name={this.props.name}
          type="text"
          onChange={this._onChangeHandler.bind(this)}
          value={this.state.value} />
        {this._renderErrorMessages()}
      </div>
    )
  }

  _onChangeHandler(e) {
    this._validateInput(e.target.value, this.props.rule)
  }

  _renderErrorMessages() {
    console.log("am i here");
    var errorMessageState = this.state.errorMessage;

    if (Array.isArray(errorMessageState)) {
      console.log("array of errors", errorMessageState);
      return errorMessageState.map((message, index) => {
        return <span key={index} style={{ display: "block", color: "red" }}>{message}</span>
      })
    } else {
      console.log("is it hitting here");
      return <span style={{ display: "block", color: "red" }}>{errorMessageState}</span>
    }
  }

  _validateInput(value, rule) {
    var validator = inputsValidator(value, rule)
    if (this.props.rule && validator.result) {
      this.setState({ isInputValid: true, value: value, errorMessage: validator.error });
      this.props.parentHandler(this.props.name, value, true);

    } else if (this.props.rule && !validator.result) {

      this.setState({ isInputValid: false, value: value});

      if (Array.isArray(validator)) {

        var errResponse = []; // mutable array that would collect the err messages

        validator.forEach(response => {
          errResponse.push(response.error)
          this.setState({ errorMessage: errResponse});
        }.bind(this))

      } else {
        this.setState({ errorMessage: validator.error });
      }

      this.props.parentHandler(this.props.name, value, false);

    } else { // if there are no rules present then it will always be true
      this.setState({ isInputValid: true, value: value });
      this.props.parentHandler(this.props.name, value, true);
    }

  }
}

const mountNode = document.getElementById("app")

ReactDOM.render(<App />, mountNode)
