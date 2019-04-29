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

const Workbench = props => {
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
