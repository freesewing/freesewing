import React from "react";
import { storiesOf } from "@storybook/react";
import Mm from ".";

const props = {
  raiseEvent: (type, data) =>
    console.log(`Action of type ${type} triggered, data passed is`, data),
  updateValue: (name, value) =>
    console.log(`Updated millimeter option ${name}, value is now: ${value}`),
  name: "examplePercentageOption",
  dflt: 50,
  units: "metric",
  title:
    "I am a pattern millimeter option. This is my title. I'm wrapped in an h4 tag",
  desc:
    "This is the description. I'm wrapped in a p tag. This component only sets the CSS class on a non-default value. It's up to you to supply the CSS to style it (we've made it green in this example)."
};

const maxNotOnStep =
  "Since our step is 0.1mm and our max value is 124.86 mm, it falls in between two steps (124.8mm and 124.9mm). Picking the max value would result in the rounded max value of 124.9mm, which is outside our max boundary. So we always round the max value down to the closest step. Also note that while the displayed value rounds to mm, under the hood we use 1/10th of a mm and the actual value passed for the max here is not 12.5cm but 124.8mm (12.48cm)";
const minNotOnStep =
  "Since our step is 0.1mm and our min value is 24.06 mm, it falls in between two steps (24mm and 24.1mm). Picking the min value would result in the rounded min value of 24mm, which is outside our min boundary. So we always round the min value up to the closest step. Also note that while the displayed value rounds to mm, under the hood we use 1/10th of a mm and the actual value passed for the min here is not 2.4cm but 24.1mm (2.41cm)";

storiesOf("Low level/PatternOptionMillimeter", module)
  .add("Metric", () => <Mm {...props} />)
  .add("Max: 12.486 cm", () => (
    <Mm {...props} max={124.86} desc={maxNotOnStep} />
  ))
  .add("Min: 2.406 cm", () => <Mm {...props} min={24.06} desc={minNotOnStep} />)
  .add("Negative", () => <Mm {...props} min={-40} dflt={0} />)
  .add("Imperial", () => <Mm {...props} units="imperial" />)
  .add("Imperial negative", () => (
    <Mm {...props} min={-40} dflt={0} units="imperial" />
  ));
