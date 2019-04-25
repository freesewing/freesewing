import React from "react";
import { storiesOf } from "@storybook/react";
import DraftSettings from ".";

const props = {
  triggerAction: (type, data) =>
    console.log(`Action of type ${type} triggered, data passed is`, data),
  updateValue: (type, data) =>
    console.log(`Update ${type} with new value`, data),
  gist: {
    settings: {
      options: {}
    }
  },
  languages: {
    de: "German",
    en: "English",
    es: "Spanish",
    fr: "French",
    nl: "Dutch"
  },
  language: "en"
};

storiesOf("DraftSettings", module)
  .add("Simon metric", () => (
    <DraftSettings pattern="simon" gist={false} units="metric" {...props} />
  ))
  .add("Trayvon imperial", () => (
    <DraftSettings pattern="trayvon" gist={false} units="imperial" {...props} />
  ));
