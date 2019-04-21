import React from "react";
import { storiesOf } from "@storybook/react";
import Ogol from ".";
import "../../../../dist/css-theme/theme.css";
import { dark as backgrounds } from "../../.storybook/backgrounds";

storiesOf("Graphics/Ogol", module)
  .add("Default", () => <Ogol />, { backgrounds })
  .add("Custom color", () => <Ogol color="green" />, { backgrounds })
  .add("Custom size", () => <Ogol size={200} />, { backgrounds });
