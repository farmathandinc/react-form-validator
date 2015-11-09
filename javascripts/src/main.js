import React, {Component, PropTypes} from "react"
import ReactDOM, {findDOMNode} from "react-dom"

import StatefulForm from "./examples/stateful-form"
import StatelessForm from "./examples/stateless-form"


class App extends Component {
  render() {
    return (
      <main>
        <h1>Example 1 (Stateful)</h1>
        <p>This example stores the form data object in the state</p>
        <StatefulForm />

        <h1>Example 2 (Stateless)</h1>
        <p>This example does NOT store the form data object in state, rather fetches via findDOMNode refs with the onSubmit method</p>
        <StatelessForm />
      </main>
    )
  }
}


const mountNode = document.getElementById("app");

ReactDOM.render(<App />, mountNode);
