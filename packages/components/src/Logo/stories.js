import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import Logo from ".";

storiesOf("Logo", module)
  .add("Default", () => <Logo />)
  .add("Custom size", () => <Logo size={100} />)
  .add("Custom color", () => (
    <div style={{ color: "green" }}>
      <Logo />
    </div>
  ))
  .add("Embedded", () => <Logo embed={true} />);
