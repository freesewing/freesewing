import React from "react";
import { storiesOf } from "@storybook/react";
import Pct from ".";

const props = {
  triggerAction: (type, data) =>
    console.log(`Action of type ${type} triggered, data passed is`, data),
  updateValue: (name, value) =>
    console.log(`Updated degree option ${name}, value is now: ${value}`),
  name: "exampleDegreeOption",
  dflt: 45,
  max: 90,
  title:
    "I am a pattern degree option. This is my title. I'm wrapped in an h4 tag",
  desc:
    "This is the description. I'm wrapped in a p tag. This component only sets the CSS class on a non-default value. It's up to you to supply the CSS to style it."
};

storiesOf("PatternOptionDegree", module)
  .add("Basic", () => <Pct {...props} />)
  .add("From 30 to 45", () => <Pct {...props} min={30} max={45} />)
  .add("Step: 10", () => <Pct {...props} step={10} max={180} dflt={90} />);
