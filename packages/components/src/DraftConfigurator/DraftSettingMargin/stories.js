import React from "react";
import { storiesOf } from "@storybook/react";
import Margin from ".";

const props = {
  raiseEvent: (type, data) =>
    console.log(`Action of type ${type} triggered, data passed is`, data),
  updateValue: (name, value) =>
    console.log(`Updated setting ${name}, value is now: ${value}`),
  name: "margin",
  dflt: 2,
  title: "Margin",
  desc:
    "This is the margin description. I'm wrapped in a p tag. This component only sets the CSS class on a non-default value. It's up to you to supply the CSS to style it."
};

storiesOf("Low level/DraftSettingMargin", module)
  .add("Metric", () => <Margin {...props} units="metric" />)
  .add("Imperial", () => <Margin {...props} units="imperial" />);
