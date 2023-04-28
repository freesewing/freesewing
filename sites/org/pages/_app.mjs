import 'shared/styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import React from 'react'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
import { freeSewingConfig } from 'site/freesewing.config.mjs'
import { Toaster as DefaultToaster } from 'react-hot-toast'
import { ContextWrapper } from 'shared/components/wrappers/context.mjs'

Bugsnag.start({
  apiKey: freeSewingConfig.bugsnag.key,
  collectUserIp: false,
  plugins: [new BugsnagPluginReact()],
})

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)

const FreeSewingOrg = ({ Component, pageProps }) => (
  <ErrorBoundary>
    <ContextWrapper>
      <Component {...pageProps} />
      <DefaultToaster
        position="bottom-right"
        toastOptions={{
          className: 'bg-base-100 text-base-content',
          success: {
            className: 'bg-success text-success-content',
          },
          error: {
            className: 'bg-error text-error-content',
          },
          loading: {
            className: 'bg-warning text-warning-content',
          },
          custom: {
            className: 'bg-accent text-accent-content',
          },
        }}
      />
    </ContextWrapper>
  </ErrorBoundary>
)

export default appWithTranslation(FreeSewingOrg)
