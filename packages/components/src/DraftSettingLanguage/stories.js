import React from "react";
import { storiesOf } from "@storybook/react";
import Lang from ".";

const props = {
  triggerAction: (type, data) =>
    console.log(`Action of type ${type} triggered, data passed is`, data),
  updateValue: (name, value) =>
    console.log(`Updated setting ${name}, value is now: ${value}`),
  name: "exampleDraftSettingLanguage",
  dflt: "en",
  title:
    "I am a language draft setting. This is my title. I'm wrapped in an h4 tag",
  desc:
    "This is the description. I'm wrapped in a p tag. This component only sets the CSS class on a non-default value. It's up to you to supply the CSS to style it.",
  languages: {
    de: "German",
    en: "English",
    es: "Spanish",
    fr: "French",
    nl: "Dutch"
  }
};

storiesOf("DraftSettingLanguage", module).add("Basic", () => (
  <Lang {...props} />
));
