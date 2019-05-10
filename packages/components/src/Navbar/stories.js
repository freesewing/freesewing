import React from "react";
import { storiesOf } from "@storybook/react";
import Navbar from ".";
import LanguageIcon from "@material-ui/icons/Translate";
import DarkModeIcon from "@material-ui/icons/Brightness3";

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
    }
  ],
  right: [
    {
      type: "link",
      href: "https://freesewing.org/",
      text: "app.account"
    },
    {
      type: "link",
      href: "https://freesewing.org/",
      text: <LanguageIcon className="nav-icon" />,
      title: "Languages"
    },
    {
      type: "link",
      href: "https://freesewing.org/",
      text: <DarkModeIcon className="nav-icon moon" />,
      title: "Dark mode"
    }
  ]
};

storiesOf("Navbar", module).add("Basic", () => <Navbar navs={navs} />);
