import React from "react";
import { storiesOf } from "@storybook/react";
import Bool from ".";

const props = {
  updateOption: (name, value) =>
    console.log(`Updated option ${name}, value is now: ${value}`),
  name: "exampleBoolOption"
};
const noyes = ["No", "Yes"];

storiesOf("Draft/Options/Bool", module)
  .add("Default", () => <Bool {...props} />)
  .add("Default: false", () => <Bool {...props} dflt={false} />)
  .add("Default: true", () => <Bool {...props} dflt={true} />)
  .add("With labels, No", () => <Bool {...props} dflt={false} labels={noyes} />)
  .add("With labels, Yes", () => (
    <Bool {...props} dflt={true} labels={noyes} />
  ));
