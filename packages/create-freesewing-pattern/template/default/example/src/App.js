import React, { Component } from "react";
import freesewing from "freesewing";
import "./App.css";

import ExampleComponent from "{{name}}";

class App extends Component {
  render() {
    console.log(freesewing);
    console.log({ ExampleComponent });
    return <p>hi there</p>;
  }
}

export default App;
