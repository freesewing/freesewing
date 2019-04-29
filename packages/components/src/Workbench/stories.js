import React from "react";
import { storiesOf } from "@storybook/react";
import Workbench from ".";
import freesewing from "@freesewing/core";
import aaron from "@freesewing/aaron";
import { patternInfo } from "@freesewing/patterns";

const props = {
  freesewing,
  pattern: aaron,
  info: patternInfo.aaron
};
console.log(patternInfo, props);
storiesOf("Workbench", module).add("Aaron", () => <Workbench {...props} />);
