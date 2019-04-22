import React from "react";
import { storiesOf } from "@storybook/react";
import List from ".";

const props = {
  triggerAction: (type, data) =>
    console.log(`Action of type ${type} triggered, data passed is`, data),
  updateValue: (name, value) =>
    console.log(`Updated pct/deg/count option ${name}, value is now: ${value}`),
  name: "exampleListOption",
  dflt: "banana",
  title:
    "I am a pattern list option. This is my title. I'm wrapped in an h4 tag",
  desc:
    "This is the description. I'm wrapped in a p tag. This component only sets the CSS class on a non-default value. It's up to you to supply the CSS to style it.",
  list: {
    apple: "Apple",
    banana: "Banana",
    cherry: "Cherry"
  }
};

storiesOf("PatternOptionList", module).add("Basic", () => <List {...props} />);
