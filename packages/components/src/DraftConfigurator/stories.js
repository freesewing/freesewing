import React from "react";
import { storiesOf } from "@storybook/react";
import GistConfigurator from ".";
//import { IntlProvider } from "react-intl";
//import { strings } from "@freesewing/i18n";

const props = {
  triggerAction: (type, data) =>
    console.log(`Action of type ${type} triggered, data passed is`, data),
  updateValue: (type, data) =>
    console.log(`Update ${type} with new value`, data),
};

storiesOf("DraftConfigurator", module)
  .add("Simon metric", () => (
    <GistConfigurator pattern="simon" {...props} units="metric" />
  ))
  .add("Trayvon imperial", () => (
    <GistConfigurator pattern="trayvon" {...props} units="imperial" />
  ));
