import React, { useState } from "react";
import PropTypes from "prop-types";
import withGist from "../withGist";
import { patternList } from "@freesewing/patterns";
import { FormattedMessage, IntlProvider } from "react-intl";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { i18n, strings } from "@freesewing/i18n";
import Navbar from "../Navbar";
import { defaultGist, storage } from "@freesewing/utils";
import { dark, light } from "@freesewing/mui-theme";
import Logo from "../Logo";
import withLanguage from "../withLanguage";
import LanguageIcon from "@material-ui/icons/Translate";
import DarkModeIcon from "@material-ui/icons/Brightness3";
import LanguageChooser from "./LanguageChooser";
import Pattern from "./Pattern";

const Workbench = props => {
  const [display, setDisplay] = useState("pattern");
  const [pattern, setPattern] = useState(false);
  const [settings, setSettings] = useState(false);
  const [theme, setTheme] = useState("light");

  const showLanguageChooser = () => setDisplay("language");
  const toggleSettings = () => setSettings(!settings);

  const updatePattern = p => {
    setPattern(p);
    store.set("pattern", p);
  };

  const toggleDarkMode = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  const raiseEvent = (type, data) => {
    console.log("Event raised", type, data);
  };

  const navs = {
    left: [
      {
        type: "link",
        href: "https://freesewing.dev/",
        text: "app.docs"
      },
      {
        type: "link",
        href: "https://gitter.im/freesewing/freesewing/",
        text: "app.askForHelp"
      }
    ],
    right: [
      {
        type: "link",
        href: "https://github.com/freesewing/freesewing",
        text: "v" + props.freesewing.version
      },
      {
        type: "button",
        onClick: () => setDisplay("languages"),
        text: <LanguageIcon className="nav-icon" />,
        title: "Languages"
      },
      {
        type: "button",
        onClick: toggleDarkMode,
        text: <DarkModeIcon className="nav-icon moon" />,
        title: "Toggle dark mode"
      }
    ]
  };

  let main = null;
  switch (display) {
    case "languages":
      main = (
        <LanguageChooser
          setLanguage={props.setLanguage}
          setDisplay={setDisplay}
        />
      );
      break;
    default:
      main = (
        <Pattern
          freesewing={props.freesewing}
          Pattern={props.pattern}
          info={props.info}
          gist={props.gist}
          updateGist={props.updateGist}
          raiseEvent={raiseEvent}
        />
      );
  }

  // Load defaults into gist
  console.log(props);
  //props.loadGistDefaults({options: props.info.config.options});

  const themes = { dark, light };
  return (
    <MuiThemeProvider theme={createMuiTheme(themes[theme])}>
      <div
        className={
          theme === "light" ? "theme-wrapper light" : "theme-wrapper dark"
        }
      >
        <Navbar navs={navs} />
        {main}
      </div>
    </MuiThemeProvider>
  );
};

Workbench.propTypes = {
  pattern: PropTypes.oneOf(patternList),
  units: PropTypes.oneOf(["metric", "imperial"]).isRequired
};

export default withLanguage(
  withGist(Workbench, {
    gist: defaultGist,
    store: true
  }),
  "nl"
);
