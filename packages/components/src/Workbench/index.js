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
import Footer from "../Footer";
import Measurements from "./Measurements";

const Workbench = props => {
  const [display, setDisplay] = useState("welcome");
  const [pattern, setPattern] = useState(false);
  const [theme, setTheme] = useState("light");
  const [measurements, setMeasurements] = useState(null);
  useEffect(() => {
    let m = getMeasurements();
    setMeasurements(m);
    props.updateGist(m, "settings", "measurements");
  }, []);
  useEffect(() => {
    if (props.from) props.importGist(props.from);
  }, [props.from]);
  useEffect(() => {
    if (props.language !== props.gist.settings.locale)
      props.updateGist(props.language, "settings", "locale");
  }, [props.language]);

  const getMeasurements = () =>
    storage.get(props.config.name + "-measurements");
  const saveMeasurements = data => {
    storage.set(props.config.name + "-measurements", data);
    props.updateGist(data, "settings", "measurements");
  };
  const updateMeasurement = (name, val) => {
    let updatedMeasurements = { ...measurements };
    updatedMeasurements[name] = val;
    setMeasurements(updatedMeasurements);
    saveMeasurements(updatedMeasurements);
  };
  const preloadMeasurements = model => {
    let updatedMeasurements = {
      ...measurements,
      ...model
    };
    setMeasurements(updatedMeasurements);
    saveMeasurements(updatedMeasurements);
  };
  const measurementsMissing = () => {
    let required = props.config.measurements;
    if (measurements === null) return true;
    for (let m of required) {
      if (typeof measurements[m] === "undefined") return true;
    }

    return false;
  };
  const showLanguageChooser = () => setDisplay("language");
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
      draft: {
        type: "button",
        onClick: () => setDisplay("draft"),
        text: "cfp.draftYourPattern",
        active: display === "draft" ? true : false
      },
      sample: {
        type: "button",
        onClick: () => setDisplay("sample"),
        text: "cfp.testYourPattern",
        active: display === "sample" ? true : false
      },
      measurements: {
        type: "button",
        onClick: () => setDisplay("measurements"),
        text: "app.measurements",
        active: display === "measurements" ? true : false
      }
    },
    right: {
      version: {
        type: "link",
        href: "https://github.com/freesewing/freesewing/releases",
        text: "v" + props.freesewing.version
      },
      language: {
        type: "button",
        onClick: () => setDisplay("languages"),
        text: <LanguageIcon className="nav-icon" />,
        title: "Languages",
        active: display === "languages" ? true : false
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
      if (measurementsMissing()) setDisplay("measurements");
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
    case "sample":
      if (measurementsMissing()) setDisplay("measurements");
      main = <p>Sample: TODO</p>;
      break;
    case "measurements":
      main = (
        <Measurements
          measurements={measurements}
          required={props.config.measurements}
          units={props.units}
          updateMeasurement={updateMeasurement}
          preloadMeasurements={preloadMeasurements}
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
        {display !== "welcome" ? <Footer language={props.language} /> : null}
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
