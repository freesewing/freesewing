import React from "react";
import { IntlProvider, addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import de from "react-intl/locale-data/de";
import es from "react-intl/locale-data/es";
import fr from "react-intl/locale-data/fr";
import nl from "react-intl/locale-data/nl";
import { strings } from "@freesewing/i18n";

const withLanguage = (WrappedComponent, lang = "en", store = false) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.setLanguage = this.setLanguage.bind(this);
      this.state = { language: lang };
    }

    setLanguage(l) {
      this.setState({ language: l });
    }

    render() {
      const localeData = { en, de, es, fr, nl };
      addLocaleData(localeData[this.state.language]);
      return (
        <IntlProvider
          locale={this.state.language}
          messages={strings[this.state.language]}
        >
          <WrappedComponent
            language={this.state.language}
            setLanguage={this.setLanguage}
            {...this.props}
          />
        </IntlProvider>
      );
    }
  };
};

export default withLanguage;
