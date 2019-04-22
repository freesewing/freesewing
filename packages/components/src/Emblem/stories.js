import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import Emblem from ".";
import "../../../../dist/css-theme/theme.css";

storiesOf("Emblem", module).add(
  "FreeSewing",
  () => <Emblem t1="Free" t2="Sewing" />,
  { notes: { markdown: ` test **here**` } }
);
