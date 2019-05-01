import React from "react";
import { storiesOf } from "@storybook/react";
import Preamble from ".";

const props = {
  raiseEvent: (type, data) =>
    console.log(`Action of type ${type} triggered, data passed is`, data),
  id: "example",
  value: 120,
  displayValue: "12cm",
  name: "examplePctDegCountOption",
  dflt: 50,
  title: "This is the title. I'm wrapped in an h4 tag",
  desc:
    "This is the description. I'm wrapped in a p tag. This component is used within other components, and not very useful on its own."
};

storiesOf("Low level/OptionPreamble", module).add("Preamble", () => (
  <Preamble {...props} />
));
