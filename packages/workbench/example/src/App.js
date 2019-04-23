import React from "react";
import Workbench from "../../workbench";
import freesewing from "@freesewing/core";
//import Aaron from "@freesewing/aaron";
//import Brian from "@freesewing/brian";
//import plugins from "@freesewing/plugin-bundle";

export default props => {
  console.log(freesewing);
  return <Workbench freesewing={freesewing} patterns={{}} plugins={{}} />;
};
