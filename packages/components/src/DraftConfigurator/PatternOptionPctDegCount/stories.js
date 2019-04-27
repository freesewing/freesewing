import React from "react";
import { storiesOf } from "@storybook/react";
import PctDegCount from ".";

const props = {
  triggerAction: (type, data) =>
    console.log(`Action of type ${type} triggered, data passed is`, data),
  updateValue: (name, value) =>
    console.log(`Updated pct/deg/count option ${name}, value is now: ${value}`),
  name: "examplePctDegCountOption",
  dflt: 50,
  title: "This is the title. I'm wrapped in an h4 tag",
  desc:
    "This is the description. I'm wrapped in a p tag. This component is the base for the percentage, degree, and count pattern options."
};

storiesOf("Low level/PatternOptionPctDegCount", module).add("Percentage", () => (
  <PctDegCount {...props} type="pct" />
));
storiesOf("Low level/PatternOptionPctDegCount", module).add("Degree", () => (
  <PctDegCount {...props} type="deg" />
));
storiesOf("Low level/PatternOptionPctDegCount", module).add("Count", () => (
  <PctDegCount {...props} type="count" />
));
