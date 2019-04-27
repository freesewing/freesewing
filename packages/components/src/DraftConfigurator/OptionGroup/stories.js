import React from "react";
import { storiesOf } from "@storybook/react";
import OptionGroup from ".";

const options = {
  armholeDrop: { pct: 10, min: 1, max: 75 },
  backlineBend: { pct: 50, min: 50, max: 100 },
  chestEase: { pct: 8, min: 0, max: 20 },
  hipsEase: { pct: 8, min: 0, max: 20 },
  lengthBonus: { pct: 10, min: -20, max: 60 },
  necklineBend: { pct: 100, min: 40, max: 100 },
  necklineDrop: { pct: 20, min: 10, max: 35 },
  stretchFactor: { pct: 5, min: 0, max: 15 },
  shoulderStrapWidth: { pct: 15, min: 10, max: 40 },
  shoulderStrapPlacement: { pct: 40, min: 20, max: 80 }
};

const props = {
  triggerAction: (type, data) =>
    console.log(`Action of type ${type} triggered, data passed is`, data),
  updateValue: (type, data) =>
    console.log(`Update ${type} with new value`, data),
  gist: {
    settings: {
      options: {}
    }
  },
  pattern: {
    config: {
      name: "aaron",
      options: options
    }
  },
  dflts: { options: {} },
  options: Object.keys(options)
};

storiesOf("Low level/OptionGroup", module).add("Simon metric", () => (
  <OptionGroup pattern="simon" {...props} units="metric" />
));
