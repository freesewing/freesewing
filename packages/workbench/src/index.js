import React, { Component } from "react";
import PropTypes from "prop-types";
import storage from "./utils/storage";
import { i18n, strings } from "@freesewing/i18n";
import "./scss/style.scss";
import NavBar from "./components/NavBar";
import ButtonPicker from "./components/ButtonPicker";
import Settings from "./components/settings/";
import { IntlProvider } from "react-intl";
//import { IntlProvider, addLocaleData } from "react-intl";
//import en from "react-intl/locale-data/en";
//import de from "react-intl/locale-data/de";
//import es from "react-intl/locale-data/es";
//import fr from "react-intl/locale-data/fr";
//import nl from "react-intl/locale-data/nl";
import createTheme from "@freesewing/mui-theme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Button from "@material-ui/core/Button";
require("typeface-roboto-condensed");
require("@freesewing/css-theme");

//addLocaleData([...en, ...de, ...es, ...fr, ...nl]);

export default class Workbench extends Component {
  static propTypes = {
    freesewing: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      language: this.getLanguage(),
      pattern: this.getPattern(),
      settings: false,
      gist: {},
      theme: "light"
    };
  }

  Storage = new storage();

  saveToStorage = key => {
    if (key === "language") this.Storage.set("language", this.state.language);
    else if (key === "pattern") this.Storage.set("pattern", this.state.pattern);
    else if (key === "gist")
      this.Storage.set(this.state.pattern, JSON.stringify(this.state.gist));
    else {
      this.Storage.set("language", this.state.language);
      this.Storage.set("pattern", this.state.pattern);
      this.Storage.set(this.state.pattern, JSON.stringify(this.state.gist));
    }
  };

  getLanguage = () => {
    let lang = this.Storage.get("language");
    if (Object.keys(i18n).indexOf(lang) !== -1) return lang;
    return false;
  };
  setLanguage = language =>
    this.setState({ language }, () => this.saveToStorage("language"));

  getPattern = () => {
    let pattern = this.Storage.get("pattern");
    if (Object.keys(this.props.freesewing.patterns).indexOf(pattern) !== -1)
      return pattern;
    return false;
  };
  setPattern = pattern =>
    this.setState({ pattern }, () => this.saveToStorage("pattern"));

  getGist = () => {
    let gist = this.Storage.get(JSON.parse(this.state.pattern));
    if (typeof gist === "object") return gist;
    return false;
  };
  setGist = gist => this.setState({ gist }, () => this.saveToStorage("gist"));

  toggleSettings = () => {
    let settings = !this.state.settings;
    this.setState({ settings });
  };

  updateGist = (key, value) => {
    if (key.substring(0, 7) === "options.")
      return updateOption(key.substring(7), value);
    let gist = this.state.gist;
    gist[key] = value;
    this.setState({ gist }, () => this.saveToStorage("gist"));
  };

  toggleDarkmode = () => {
    let theme = "light";
    if (this.state.theme === "light") theme = "dark";
    this.setState({ theme });
  };

  render() {
    let main = null;
    let navbar = null;
    if (!this.state.language) {
      navbar = <NavBar empty={true} />;
      let keys = Object.keys(i18n);
      let values = {};
      for (let lang of keys) values[lang] = i18n[lang][lang];
      main = (
        <ButtonPicker
          setChoice={this.setLanguage}
          keys={keys}
          values={values}
        />
      );
    } else {
      if (!this.state.pattern) {
        navbar = (
          <NavBar
            clearLanguage={() => this.setLanguage(false)}
            language={i18n[this.state.language][this.state.language]}
            locale={this.state.language}
            pattern={false}
          />
        );
        let keys = Object.keys(this.props.freesewing.patterns);
        let values = {};
        for (let pattern of keys) values[pattern] = pattern;
        main = (
          <ButtonPicker
            setChoice={this.setPattern}
            keys={keys}
            values={values}
            msgKey="app.chooseAPattern"
          />
        );
      } else {
        navbar = (
          <NavBar
            clearLanguage={() => this.setLanguage(false)}
            language={i18n[this.state.language][this.state.language]}
            locale={this.state.language}
            clearPattern={() => this.setPattern(false)}
            pattern={this.state.pattern}
            toggleSettings={this.toggleSettings}
          />
        );
        if (this.state.settings)
          main = (
            <Settings
              pattern={this.state.pattern}
              gist={this.state.gist}
              freesewing={this.props.freesewing}
              updateGist={this.updateGist}
            />
          );
        else
          main = (
            <div>
              Language is set
              <pre>{JSON.stringify(this.state, null, 2)}</pre>
            </div>
          );
      }
    }

    return (
      <IntlProvider
        locale={this.state.language || "en"}
        messages={strings[this.state.language]}
      >
        <MuiThemeProvider theme={createTheme(true)}>
          <React.Fragment>
            {navbar}
            <Button variant="contained" color="primary">
              test
            </Button>
            {main}
          </React.Fragment>
        </MuiThemeProvider>
      </IntlProvider>
    );
  }
}
