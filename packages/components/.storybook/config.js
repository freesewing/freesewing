import React from "react";
import { configure } from "@storybook/react";
import "../../css-theme/dist/theme.css";
import { addParameters, addDecorator } from "@storybook/react";
import { IntlProvider } from "react-intl";
import { strings } from "@freesewing/i18n";

function loadStories() {
  // Load all 'stories.js' files under src
  const req = require.context("../src", true, /stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => (
  <IntlProvider locale="en" messages={strings.en}>
    {story()}
  </IntlProvider>
));

//addParameters({
//  backgrounds: [
//    { name: 'Light', value: '#f8f9fa', default: true },
//    { name: 'Dark', value: '#212529' },
//  ],
//});

configure(loadStories, module);
