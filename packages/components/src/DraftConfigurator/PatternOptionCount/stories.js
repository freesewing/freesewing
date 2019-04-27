import React from "react";
import { storiesOf } from "@storybook/react";
import Count from ".";

const props = {
  triggerAction: (type, data) =>
    console.log(`Action of type ${type} triggered, data passed is`, data),
  updateValue: (name, value) =>
    console.log(`Updated percentage option ${name}, value is now: ${value}`),
  name: "exampleCountOption",
  dflt: 50,
  title:
    "I am a pattern count option. This is my title. I'm wrapped in an h4 tag",
  desc:
    "This is the description. I'm wrapped in a p tag. This component only sets the CSS class on a non-default value. It's up to you to supply the CSS to style it."
};

storiesOf("Low level/PatternOptionCount", module)
  .add("Basic", () => <Count {...props} />)
  .add("From 20 to 80", () => <Count {...props} min={20} max={80} />)
  .add("Step: 5", () => <Count {...props} step={5} />);
