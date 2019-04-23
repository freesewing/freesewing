import React from "react";
import { storiesOf } from "@storybook/react";
import FormFieldSlider from ".";

const props = {
  updateValue: (name, value) =>
    console.log(`Updated option ${name}, value is now: ${value}`),
  name: "exampleSliderOption"
};

storiesOf("FormFieldSlider", module)
  .add("Basic", () => <FormFieldSlider {...props} />)
  .add("From 1 to 10", () => <FormFieldSlider {...props} min={1} max={10} />)
  .add("Step: 1", () => (
    <FormFieldSlider {...props} min={1} max={10} step={1} />
  ))
  .add("Defalt: 7", () => (
    <FormFieldSlider {...props} min={1} max={10} dflt={7} />
  ));
