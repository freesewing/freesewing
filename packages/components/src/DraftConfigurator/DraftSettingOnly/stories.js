import React from "react";
import { storiesOf } from "@storybook/react";
import Sa from ".";

const props = {
  raiseEvent: (type, data) =>
    console.log(`Action of type ${type} triggered, data passed is`, data),
  updateValue: (name, value) =>
    console.log(`Updated setting ${name}, value is now: ${value}`),
  title: "Only (known as contents on the website) title",
  desc:
    "This is the only description. I'm wrapped in a p tag. This component only sets the CSS class on a non-default value. It's up to you to supply the CSS to style it.",
  labels: {
    dflt: "Default",
    custom: "Custom"
  },
  dflt: "dflt",
  customDflt: [],
  parts: {
    front: "Front",
    back: "Back",
    sleeve: "Sleeve",
    pocket: "Pocket"
  }
};

storiesOf("Low level/DraftSettingOnly", module)
  .add("Default", () => <Sa {...props} />)
  .add("Default, all parts preselected", () => (
    <Sa {...props} customDflt={Object.keys(props.parts)} />
  ))
  .add("Custom, some parts preselected", () => (
    <Sa
      {...props}
      dflt="custom"
      customDflt={Object.keys(props.parts).slice(2)}
    />
  ));
