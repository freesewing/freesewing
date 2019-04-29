import React from "react";
import { storiesOf } from "@storybook/react";
import Workbench from ".";
import freesewing from "@freesewing/core";
import aaron, { config } from "@freesewing/aaron";

const props = {
  freesewing,
  pattern: aaron,
  config: config
};

console.log("story", config, props);
storiesOf("Workbench", module).add("Aaron", () => <Workbench {...props} />);
