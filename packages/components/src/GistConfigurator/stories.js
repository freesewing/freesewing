import React from "react";
import { storiesOf } from "@storybook/react";
import GistConfigurator from ".";
//import { IntlProvider } from "react-intl";
//import { strings } from "@freesewing/i18n";

const props = {
  triggerAction: (type, data) =>
    console.log(`Action of type ${type} triggered, data passed is`, data)
};

storiesOf("GistConfigurator", module)
  .add("Simon metric", () => (
    <GistConfigurator pattern="simon" gist={false} units="metric" />
  ))
  .add("Trayvon imperial", () => (
    <GistConfigurator pattern="trayvon" gist={false} units="imperial" />
  ));
