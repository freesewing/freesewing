import React, { useState } from "react";
import PropTypes from "prop-types";
import { IntlProvider } from "react-intl";
import Button from "@material-ui/core/Button";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";
import { i18n, strings } from "@freesewing/i18n";
import { Navbar, withGist } from "@freesewing/components";
import { defaultGist, storage } from "@freesewing/utils";
import { dark, light } from "@freesewing/mui-theme";

import "./scss/style.scss";
//import ButtonPicker from "./components/ButtonPicker";
//import Settings from "./components/settings/";

require("typeface-roboto-condensed");
require("@freesewing/css-theme");

//addLocaleData([...en, ...de, ...es, ...fr, ...nl]);

const Workbench = props => {
  const [language, setLanguage] = useState(props.language);
  const [pattern, setPattern] = useState(false);
  const [settings, setSettings] = useState(false);
  const [theme, setTheme] = useState("light");

  const themes = { dark, light };

  const loadLanguage = () => {
    let l = storage.get("language");
    if (Object.keys(i18n).indexOf(l) === -1) l = "en";
    setLanguage(l);
    return l;
  };

  const updateLanguage = l => {
    setLanguage(l);
    storage.set("language", l);
  };

  const loadPattern = () => {
    let p = storage.get("pattern");
    if (Object.keys(props.freesewing.patterns).indexOf(p) === -1)
      p = props.pattern;
    setPattern(p);
    return p;
  };

  const updatePattern = p => {
    setPattern(p);
    store.set("pattern", p);
  };

  const toggleSettings = () => setSettings(!settings);

  const toggleDarkmode = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  return (
    <IntlProvider locale={language} messages={strings[language]}>
      <MuiThemeProvider theme={createMuiTheme(themes[theme])}>
        <React.Fragment>
          <Navbar />
          <Button variant="contained" color="primary">
            test
          </Button>
        </React.Fragment>
      </MuiThemeProvider>
    </IntlProvider>
  );
};

Workbench.propTypes = {
  freesewing: PropTypes.object,
  language: PropType.string
};

Workbench.defaultProps = {
  language: "en"
};

export default Workbench;
