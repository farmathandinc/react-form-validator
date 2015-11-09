/**
 * Stateless Form Example
 * Pure functions and microcompartmentelization of components
 */

import React, {Component, PropTypes} from "react"
import ReactDOM, {findDOMNode} from "react-dom"
import _ from "underscore"

import {inputsValidator} from "../validator"

export default class StatelessForm extends Component {
  render() {
    return (
      <form onSubmit={this._onSubmitHandler.bind(this)}>
        <InputContainer label="Name" ref="name" />
        <InputContainer label="Age" ref="age" />
        <SubmitButton />
      </form>
    )
  }

  _onSubmitHandler(e) {
    e.preventDefault();
    var results = this._getInputValues(this.refs);
    console.log(results);
  }

  _getInputValues(refs) {
    var results = {};
    window.findDOMNode = findDOMNode;
    Object.keys(refs).forEach(name => {
      results[name] = findDOMNode(this.refs.name.refs.input).value;
    }.bind(this))

    return results;
  }
}

class InputContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" }
  }

  render() {
    return (
      <div className="input-container">
        <label>{this.props.label}</label>
        <input ref="input" name={this.props.name} defaultValue={this.props.defaultValue} />
      </div>
    )
  }
}

// const InputContainer = ({ label, name, defaultValue }) => (
//   <div className="input-container">
//     <label>{label}</label>
//     <input name={name} defaultValue={defaultValue} />
//   </div>
// )

InputContainer.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.string
}

InputContainer.defaultProps = {
  label: "",
  name: "",
  defaultValue: ""
}


const SubmitButton = ({ label }) => (
  <button type="submit">{label}</button>
)

SubmitButton.propTypes = {
  label: PropTypes.string
}

SubmitButton.defaultProps = {
  label: "Submit"
}
