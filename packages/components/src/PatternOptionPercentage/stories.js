import React from "react";
import { storiesOf } from "@storybook/react";
import Pct from ".";

const props = {
  triggerAction: (type, data) =>
    console.log(`Action of type ${type} triggered, data passed is`, data),
  updateValue: (name, value) =>
    console.log(`Updated percentage option ${name}, value is now: ${value}`),
  name: "examplePercentageOption",
  dflt: 50,
  title:
    "I am a pattern percentage option. This is my title. I'm wrapped in an h4 tag",
  desc:
    "This is the description. I'm wrapped in a p tag. This component only sets the CSS class on a non-default value. It's up to you to supply the CSS to style it."
};

storiesOf("PatternOptionPercentage", module)
  .add("Basic", () => <Pct {...props} />)
  .add("From 20 to 80", () => <Pct {...props} min={20} max={80} />)
  .add("Step: 5", () => <Pct {...props} step={5} />);
