import { configure } from "@storybook/react";
import { addParameters } from "@storybook/react";
import "../../../dist/css-theme/theme.css";

function loadStories() {
  // Load all 'stories.js' files under src
  const req = require.context("../src", true, /stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

//addParameters({
//  backgrounds: [
//    { name: 'Light', value: '#f8f9fa', default: true },
//    { name: 'Dark', value: '#212529' },
//  ],
//});

configure(loadStories, module);
