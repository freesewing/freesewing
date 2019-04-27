import React from "react";
import { storiesOf } from "@storybook/react";
import PatternOptions from ".";

const props = {
  triggerAction: (type, data) =>
    console.log(`Action of type ${type} triggered, data passed is`, data),
  updateValue: (type, data) =>
    console.log(`Update ${type} with new value`, data),
  gist: {
    settings: {
      options: {}
    }
  }
};

storiesOf("Low level/PatternOptions", module)
  .add("Simon metric", () => (
    <PatternOptions pattern="simon" gist={false} units="metric" {...props} />
  ))
  .add("Trayvon imperial", () => (
    <PatternOptions
      pattern="trayvon"
      gist={false}
      units="imperial"
      {...props}
    />
  ));
