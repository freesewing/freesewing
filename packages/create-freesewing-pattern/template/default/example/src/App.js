import React, { Component } from "react";
import freesewing from "@freesewing/core";
import { Workbench } from "@freesewing/components";

import "typeface-roboto-condensed";
import "@freesewing/css-theme";
import "./App.css";

import Pattern from "pattern";

class App extends Component {
  render() {
    console.log(freesewing);
    console.log({ Pattern });
    return <Workbench />;
  }
}

export default App;
