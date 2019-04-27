import React from "react";
import { storiesOf } from "@storybook/react";
import FormFieldList from ".";

const props = {
  updateValue: (name, value) =>
    console.log(`Updated option ${name}, value is now: ${value}`),
  name: "exampleListOption",
  list: {
    apple: "Apple",
    banana: "Banana",
    cherry: "Cherry"
  }
};

storiesOf("Low level/Form/FormFieldList", module)
  .add("Basic", () => <FormFieldList {...props} />)
  .add("Apple", () => <FormFieldList {...props} dflt="apple" />)
  .add("Banana", () => <FormFieldList {...props} dflt="banana" />)
  .add("Cherry", () => <FormFieldList {...props} dflt="cherry" />);
