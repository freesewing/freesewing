import React from "react";
import { storiesOf } from "@storybook/react";
import Complete from ".";

const props = {
  raiseEvent: (type, data) =>
    console.log(`Action of type ${type} triggered, data passed is`, data),
  updateValue: (name, value) =>
    console.log(`Updated setting ${name}, value is now: ${value}`),
  dflt: true,
  title: "Complete (known as 'detail' in the frontend) title",
  desc:
    "This is the complete description. I'm wrapped in a p tag. This component only sets the CSS class on a non-default value. It's up to you to supply the CSS to style it.",
  labels: ["No", "Yes"]
};

storiesOf("Low level/DraftSettingComplete", module).add("Basic", () => (
  <Complete {...props} />
));
