import React from "react";
import { storiesOf } from "@storybook/react";
import Emblem from ".";

storiesOf("Emblem", module).add("FreeSewing", () => (
  <Emblem t1="Free" t2="Sewing" />
));
