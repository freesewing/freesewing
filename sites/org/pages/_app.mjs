import 'shared/styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import React from 'react'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
import { siteConfig } from 'site/site.config.mjs'
import { ContextWrapper } from 'shared/components/wrappers/context.mjs'

Bugsnag.start({
  apiKey: siteConfig.bugsnag.key,
  collectUserIp: false,
  plugins: [new BugsnagPluginReact()],
})

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)

const FreeSewingOrg = ({ Component, pageProps }) => (
  <ErrorBoundary>
    <ContextWrapper>
      <Component {...pageProps} />
    </ContextWrapper>
  </ErrorBoundary>
)

export default appWithTranslation(FreeSewingOrg)
