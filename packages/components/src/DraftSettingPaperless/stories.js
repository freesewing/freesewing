import React from "react";
import { storiesOf } from "@storybook/react";
import Paperless from ".";

const props = {
  triggerAction: (type, data) =>
    console.log(`Action of type ${type} triggered, data passed is`, data),
  updateValue: (name, value) =>
    console.log(`Updated setting ${name}, value is now: ${value}`),
  name: "paperless",
  dflt: false,
  title: "Paperless title",
  desc:
    "This is the paperless description. I'm wrapped in a p tag. This component only sets the CSS class on a non-default value. It's up to you to supply the CSS to style it.",
  labels: ["No", "Yes"]
};

storiesOf("DraftSettingPaperless", module).add("Basic", () => (
  <Paperless {...props} />
));
