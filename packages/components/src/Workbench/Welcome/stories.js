import React from "react";
import { storiesOf } from "@storybook/react";
import Welcome from ".";

const props = {
  language: "en"
};

storiesOf("Welcome", module).add("Basic", () => <Welcome {...props} />);
