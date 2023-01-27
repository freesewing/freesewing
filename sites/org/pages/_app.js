import 'shared/styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import React from 'react'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
import { freeSewingConfig } from 'site/freesewing.config.js'

Bugsnag.start({
  apiKey: freeSewingConfig.bugsnag.key,
  collectUserIp: false,
  plugins: [new BugsnagPluginReact()],
})

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)

const FreeSewingOrg = ({ Component, pageProps }) => (
  <ErrorBoundary>
    <Component {...pageProps} bugsnag={Bugsnag} />
  </ErrorBoundary>
)

export default appWithTranslation(FreeSewingOrg)
