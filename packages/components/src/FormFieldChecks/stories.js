import React from "react";
import { storiesOf } from "@storybook/react";
import FormFieldChecks from ".";

const props = {
  updateValue: (name, value) =>
    console.log(`Updated option ${name}, value is now: ${value}`),
  name: "exampleChecksOption",
  checks: {
    apple: "Apple",
    banana: "Banana",
    cherry: "Cherry"
  },
  dflt: []
};

storiesOf("FormFieldChecks", module)
  .add("Basic", () => <FormFieldChecks {...props} />)
  .add("Apple", () => <FormFieldChecks {...props} dflt={["apple"]} />)
  .add("Banana", () => <FormFieldChecks {...props} dflt={["banana"]} />)
  .add("Cherry", () => <FormFieldChecks {...props} dflt={["cherry"]} />);
