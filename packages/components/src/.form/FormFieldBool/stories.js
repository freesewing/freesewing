import React from "react";
import { storiesOf } from "@storybook/react";
import FormFieldBool from ".";

const props = {
  updateValue: (name, value) =>
    console.log(`Updated option ${name}, value is now: ${value}`),
  name: "exampleBoolOption"
};
const noyes = ["No", "Yes"];

storiesOf("Low level/Form/FormFieldBool", module)
  .add("Basic", () => <FormFieldBool {...props} />)
  .add("False", () => <FormFieldBool {...props} dflt={false} />)
  .add("True", () => <FormFieldBool {...props} dflt={true} />)
  .add("No", () => <FormFieldBool {...props} dflt={false} labels={noyes} />)
  .add("Yes", () => <FormFieldBool {...props} dflt={true} labels={noyes} />);
