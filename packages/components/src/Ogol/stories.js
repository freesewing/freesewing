import React from "react";
import { storiesOf } from "@storybook/react";
import Ogol from ".";
import { dark as backgrounds } from "../../.storybook/backgrounds";

storiesOf("Ogol", module)
  .add("Default", () => <Ogol />, { backgrounds })
  .add("Custom color", () => <Ogol color="yellow" />, { backgrounds })
  .add("Custom size", () => <Ogol size={200} />, { backgrounds });
