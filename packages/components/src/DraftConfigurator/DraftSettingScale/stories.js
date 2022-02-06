import React from "react";
import { storiesOf } from "@storybook/react";
import Scale from ".";

const props = {
  raiseEvent: (type, data) =>
    console.log(`Action of type ${type} triggered, data passed is`, data),
  updateValue: (name, value) =>
    console.log(`Updated setting ${name}, value is now: ${value}`),
  name: "scale",
  dflt: 2,
  title: "Scale",
  desc:
    "This is the scale description. I'm wrapped in a p tag. This component only sets the CSS class on a non-default value. It's up to you to supply the CSS to style it."
};

storiesOf("Low level/DraftSettingScale", module)
  .add("Scale", () => <Scale {...props} />)
