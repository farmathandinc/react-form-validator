import React, {Component, PropTypes} from "react";
import ReactDOM, {findDOMNode} from "react-dom";

import InputContainer from "./InputContainer";

export default class Input extends InputContainer {
  render() {
    return (
      <div className="input-container">
        <label>{this.props.label}</label>
        <div className="input-inner-container">
          <input
            ref="input"
            onChange={this._onChangeHandler.bind(this)}
            name={this.props.name}
            value={this.state.value} />
          {this.state.checkMark}
        </div>
        {this._renderErrorMessages()}
      </div>
    )
  }
}