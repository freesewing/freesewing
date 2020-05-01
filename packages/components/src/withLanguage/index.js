import React from 'react'
import { IntlProvider } from 'react-intl'
import { strings } from '@freesewing/i18n'

const withLanguage = (WrappedComponent, lang = 'en', store = false, translations = {}) => {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.strings = strings
      this.setLanguage = this.setLanguage.bind(this)
      this.addTranslations = this.addTranslations.bind(this)
      this.state = {
        language: lang,
        strings: this.strings[lang]
      }
    }

    setLanguage(l) {
      this.setState({
        language: l,
        strings: this.strings[l]
      })
    }

    addTranslations(translations) {
      this.setState({
        language: this.state.language,
        strings: {
          ...this.strings[this.state.language],
          ...translations
        }
      })
    }

    render() {
      return (
        <IntlProvider
          locale={this.state.language}
          messages={{
            ...this.state.strings,
            ...translations
          }}
        >
          <WrappedComponent
            language={this.state.language}
            setLanguage={this.setLanguage}
            addTranslations={this.addTranslations}
            {...this.props}
          />
        </IntlProvider>
      )
    }
  }
}

export default withLanguage
