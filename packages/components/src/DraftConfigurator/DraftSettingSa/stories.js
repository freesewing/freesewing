import React from "react";
import { storiesOf } from "@storybook/react";
import Sa from ".";

const props = {
  triggerAction: (type, data) =>
    console.log(`Action of type ${type} triggered, data passed is`, data),
  updateValue: (name, value) =>
    console.log(`Updated setting ${name}, value is now: ${value}`),
  name: "sa",
  dflt: "dflt",
  title: "Seam allowance",
  desc:
    "This is the seam allowance description. I'm wrapped in a p tag. This component only sets the CSS class on a non-default value. It's up to you to supply the CSS to style it.",
  labels: {
    none: "No seam allowance",
    dflt: "Standard seam allowance",
    custom: "Custom seam allowance"
  }
};

storiesOf("Low level/DraftSettingSa", module)
  .add("Metric", () => <Sa {...props} units="metric" />)
  .add("Imperial", () => <Sa {...props} units="imperial" />);
