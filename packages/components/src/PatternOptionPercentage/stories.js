import React from "react";
import { storiesOf } from "@storybook/react";
import Pct from ".";
import "./stories.css";

const props = {
  triggerAction: (type, data) =>
    console.log(`Action of type ${type} triggered, data passed is`, data),
  updateOption: (name, value) =>
    console.log(`Updated percentage option ${name}, value is now: ${value}`),
  name: "examplePercentageOption",
  dflt: 50
};

storiesOf("PatternOptionPercentage", module).add("Basic", () => (
  <Pct
    {...props}
    title="This is the title. I'm wrapped in an h4 tag"
    desc="This is the description. I'm wrapped in a p tag. This component only sets the CSS class on a non-default value. It's up to you to supply the CSS to style it (we've made it green in this example)."
  />
));
