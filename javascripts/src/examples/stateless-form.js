/**
 * Stateless Form Example
 * Pure functions and microcompartmentelization of components
 */

import React, {Component, PropTypes} from "react";
import ReactDOM, {findDOMNode} from "react-dom";

import UIFormController from "./components/UIFormController";

export default class StatelessForm extends UIFormController { // Form State Manage
  render(): ReactElement {

    var formInputs = [
      {label: "Name", name: "name", rule: "required"},
      {label: "Age", name: "age", rule: "number"},
    ];

    return (
      <form onSubmit={this._onSubmitHandler.bind(this)}>
        {this._generateForm(formInputs, this._validateInput.bind(this))}
        {this._renderSubmitButton()}
      </form>
    )
  }
}
