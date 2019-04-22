import React from "react";
import { storiesOf } from "@storybook/react";
import FormFieldList from ".";

const props = {
  updateOption: (name, value) =>
    console.log(`Updated option ${name}, value is now: ${value}`),
  name: "exampleListOption",
  list: {
    apple: "Apple",
    banana: "Banana",
    cherry: "Cherry"
  }
};

storiesOf("FormFieldList", module)
  .add("Basic", () => <FormFieldList {...props} />)
  .add("Apple", () => <FormFieldList {...props} dflt="apple" />)
  .add("Banana", () => <FormFieldList {...props} dflt="banana" />)
  .add("Cherry", () => <FormFieldList {...props} dflt="cherry" />);
