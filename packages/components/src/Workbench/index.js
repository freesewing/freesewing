import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withGist from "../withGist";
import { FormattedMessage, IntlProvider } from "react-intl";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { strings } from "@freesewing/i18n";
import Navbar from "../Navbar";
import { defaultGist, storage } from "@freesewing/utils";
import { dark, light } from "@freesewing/mui-theme";
import Logo from "../Logo";
import withLanguage from "../withLanguage";
import LanguageIcon from "@material-ui/icons/Translate";
import DarkModeIcon from "@material-ui/icons/Brightness3";
import LanguageChooser from "./LanguageChooser";
import DraftPattern from "./DraftPattern";
import Welcome from "./Welcome";

const Workbench = props => {
  const [display, setDisplay] = useState("welcome");
  const [pattern, setPattern] = useState(false);
  const [settings, setSettings] = useState(false);
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (props.from) props.importGist(props.from);
  }, [props.from]);

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
  const raiseEvent = (type = null, data = null) => {
    console.log("FIXME: Event raised", type, data);
  };

  const navs = {
    left: {
      docs: {
        type: "link",
        href: "https://freesewing.dev/",
        text: "app.docs"
      },
      help: {
        type: "link",
        href: "https://gitter.im/freesewing/freesewing/",
        text: "app.askForHelp"
      }
    },
    right: {
      version: {
        type: "link",
        href: "https://github.com/freesewing/freesewing",
        text: "v" + props.freesewing.version
      },
      language: {
        type: "button",
        onClick: () => setDisplay("languages"),
        text: <LanguageIcon className="nav-icon" />,
        title: "Languages"
      },
      dark: {
        type: "button",
        onClick: toggleDarkMode,
        text: <DarkModeIcon className="nav-icon moon" />,
        title: "Toggle dark mode"
      }
    }
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
    case "draft":
      main = (
        <DraftPattern
          freesewing={props.freesewing}
          Pattern={props.Pattern}
          config={props.config}
          gist={props.gist}
          updateGist={props.updateGist}
          raiseEvent={raiseEvent}
          units={props.units}
        />
      );
      break;
    default:
      main = <Welcome language={props.language} setDisplay={setDisplay} />;
  }

  const themes = { dark, light };

  return (
    <MuiThemeProvider theme={createMuiTheme(themes[theme])}>
      <div
        className={
          theme === "light" ? "theme-wrapper light" : "theme-wrapper dark"
        }
      >
        {display !== "welcome" ? (
          <Navbar navs={navs} home={() => setDisplay("welcome")} />
        ) : null}
        {main}
      </div>
    </MuiThemeProvider>
  );
};

Workbench.propTypes = {
  freesewing: PropTypes.object.isRequired,
  Pattern: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  from: PropTypes.object
};

Workbench.defaultProps = {
  from: { settings: { embed: true } }
};

export default withLanguage(
  withGist(Workbench, {
    gist: defaultGist,
    store: true
  }),
  "en"
);
