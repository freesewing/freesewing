import React from "react";
import freesewing from "@freesewing/core";
import Workbench from "@freesewing/components/Workbench";
import "typeface-roboto-condensed";
import "@freesewing/css-theme";

import Pattern from "pattern";

const App = props => {
  let instance = new Pattern();
  let config = instance.config;
  return (
    <Workbench
      freesewing={freesewing}
      Pattern={Pattern}
      config={config}
      userLanguage="en"
    />
  );
};

export default App;
