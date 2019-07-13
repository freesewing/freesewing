import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withGist from "../withGist";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Navbar from "../Navbar";
import defaultGist from "@freesewing/utils/defaultGist";
import storage from "@freesewing/utils/storage";
import { dark, light } from "@freesewing/mui-theme";
import withLanguage from "../withLanguage";
import LanguageIcon from "@material-ui/icons/Translate";
import DarkModeIcon from "@material-ui/icons/Brightness3";
import LanguageChooser from "./LanguageChooser";
import DraftPattern from "./DraftPattern";
import SamplePattern from "./SamplePattern";
import Welcome from "./Welcome";
import Footer from "../Footer";
import Measurements from "./Measurements";

const Workbench = props => {
  const [display, setDisplay] = useState(null);
  const [pattern, setPattern] = useState(false);
  const [theme, setTheme] = useState("light");
  const [measurements, setMeasurements] = useState(null);
  useEffect(() => {
    let m = getMeasurements();
    setMeasurements(m);
    props.updateGist(m, "settings", "measurements");
    setDisplay(getDisplay());
    props.setLanguage(props.userLanguage || "en");
  }, []);
  useEffect(
    () => {
      if (props.from) props.importGist(props.from);
    },
    [props.from]
  );
  useEffect(
    () => {
      if (props.language !== props.gist.settings.locale)
        props.updateGist(props.language, "settings", "locale");
    },
    [props.language]
  );

  const getDisplay = () => storage.get(props.config.name + "-display");
  const saveDisplay = d => {
    setDisplay(d);
    storage.set(props.config.name + "-display", d);
  };
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
    if (required.length < 1) return false;
    if (measurements === null) return true;
    for (let m of required) {
      if (typeof measurements[m] === "undefined") return true;
    }

    return false;
  };
  const toggleDarkMode = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };
  const raiseEvent = (type = null, data = null) => {};

  const navs = {
    left: {
      draft: {
        type: "button",
        onClick: () => saveDisplay("draft"),
        text: "cfp.draftYourPattern",
        active: display === "draft" ? true : false
      },
      sample: {
        type: "button",
        onClick: () => saveDisplay("sample"),
        text: "cfp.testYourPattern",
        active: display === "sample" ? true : false
      },
      measurements: {
        type: "button",
        onClick: () => saveDisplay("measurements"),
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
        onClick: () => saveDisplay("languages"),
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
  // FIXME:
  navs.mleft = navs.left;
  navs.mright = navs.right;
  let main = null;
  switch (display) {
    case "languages":
      main = (
        <LanguageChooser
          setLanguage={props.setLanguage}
          setDisplay={saveDisplay}
        />
      );
      break;
    case "draft":
      if (measurementsMissing()) saveDisplay("measurements");
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
      if (measurementsMissing()) saveDisplay("measurements");
      main = (
        <SamplePattern
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
    case "measurements":
      main = (
        <Measurements
          measurements={measurements}
          required={props.config.measurements}
          units={props.units}
          updateMeasurement={updateMeasurement}
          preloadMeasurements={preloadMeasurements}
          language={props.language}
        />
      );
      break;
    default:
      main = <Welcome language={props.language} setDisplay={saveDisplay} />;
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
          <Navbar navs={navs} home={() => saveDisplay("welcome")} />
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
