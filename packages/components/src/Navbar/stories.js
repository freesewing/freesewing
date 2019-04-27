import React from "react";
import { storiesOf } from "@storybook/react";
import Navbar from ".";
import LanguageIcon from "@material-ui/icons/Translate";
import DarkModeIcon from "@material-ui/icons/Brightness3";
import Avatar from '@material-ui/core/Avatar';

const props = {
  triggerAction: (type, data) =>
    console.log(`Action of type ${type} triggered, data passed is`, data),
  updateValue: (type, data) =>
    console.log(`Update ${type} with new value`, data),
};
const navs = {
  left: [
    {
      type: "link",
      href: "https://freesewing.org/",
      text: "app.patterns"
    },
    {
      type: "link",
      href: "https://freesewing.org/",
      text: "app.docs"
    },
    {
      type: "link",
      href: "https://freesewing.org/",
      text: "app.community"
    },
  ],
  right: [
    {
      type: "link",
      href: "https://freesewing.org/",
      text: "app.account",
    },
    {
      type: "link",
      href: "https://freesewing.org/",
      text: <LanguageIcon className="nav-icon"/>,
      title: 'Languages'
    },
    {
      type: "link",
      href: "https://freesewing.org/",
      text: <DarkModeIcon className="nav-icon moon"/>,
      title: 'Dark mode'
    },
  ],
}


storiesOf("Navbar", module)
  .add("Basic", () => <Navbar navs={navs}/>)
