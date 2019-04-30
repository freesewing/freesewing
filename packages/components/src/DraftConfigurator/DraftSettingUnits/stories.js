import React from "react";
import { storiesOf } from "@storybook/react";
import Units from ".";

const props = {
  raiseEvent: (type, data) =>
    console.log(`Action of type ${type} triggered, data passed is`, data),
  updateValue: (name, value) =>
    console.log(`Updated setting ${name}, value is now: ${value}`),
  name: "paperless",
  dflt: "metric",
  title: "Units title",
  desc:
    "This is the units description. I'm wrapped in a p tag. This component only sets the CSS class on a non-default value. It's up to you to supply the CSS to style it.",
  list: {
    metric: "Metric",
    imperial: "Imperial"
  }
};

storiesOf("Low level/DraftSettingUnits", module).add("Basic", () => (
  <Units {...props} />
));
