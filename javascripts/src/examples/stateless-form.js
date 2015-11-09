/**
 * Stateless Form Example
 * Pure functions and microcompartmentelization of components
 */

import React, {Component, PropTypes} from "react";
import ReactDOM, {findDOMNode} from "react-dom";
import _ from "underscore";

import Input from "./components/Input";
import UIFormController from "./components/UIFormController";

import {inputsValidator} from "../validator";

export default class StatelessForm extends UIFormController { // Form State Manage
  render() {
    return (
      <form onSubmit={this._onSubmitHandler.bind(this)}>
        <Input label="Name" ref="name" rule="required" parentInputValidator={this._validateInput.bind(this)} />
        <Input label="Age" ref="age" rule="number" parentInputValidator={this._validateInput.bind(this)} />
        {this._renderSubmitButton()}
      </form>
    )
  }
}
