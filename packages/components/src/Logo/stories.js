import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
//import {muiTheme} from 'storybook-addon-material-ui';
import Logo from ".";

storiesOf("Graphics/Logo", module)
  // .addDecorator(muiTheme())
  .add("Default", () => <Logo />)
  .add("Custom size", () => <Logo size={100} />)
  .add("Custom color", () => (
    <div style={{ color: "green" }}>
      <Logo />
    </div>
  ))
  .add("Embedded", () => <Logo embed={true} />);
