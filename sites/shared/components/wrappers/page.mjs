//  __SDEFILE__ - This file is a dependency for the stand-alone environment
// Dependencies
import React, { useState, useEffect, useContext } from 'react'
import { ogUrl, nsMerge } from 'shared/utils.mjs'
import { siteConfig } from 'site/site.config.mjs'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useTheme } from 'shared/hooks/use-theme.mjs'
// Components
import Head from 'next/head'
import { SwipeWrapper } from 'shared/components/wrappers/swipes.mjs'
import { LayoutWrapper, ns as layoutNs } from 'shared/components/wrappers/layout.mjs'
import { DefaultLayout, ns as defaultLayoutNs } from 'site/components/layouts/default.mjs'
import { Feeds } from 'site/components/feeds.mjs'
import { ModalContext } from 'shared/context/modal-context.mjs'

export const ns = nsMerge(layoutNs, defaultLayoutNs, 'status', 'hodl')

/* This component should wrap all page content */
export const PageWrapper = (props) => {
  /*
   * Deconstruct props
   */
  const {
    layout = DefaultLayout,
    footer = true,
    header = true,
    locale = 'en',
    children = [],
    path = [],
  } = props
  // Title is typically set in props.t but check props.title too
  const pageTitle = props.t ? props.t : props.title ? props.title : null

  /*
   * Slug should come from page props.path not from context
   * which won't be available in SSR
   */
  const slug = path.join('/')

  /*
   * Contexts
   */
  const { modalContent } = useContext(ModalContext)
  const { LoadingStatus } = useContext(LoadingStatusContext)

  /*
   * This forces a re-render upon initial bootstrap of the app
   * This is needed to avoid hydration errors because theme can't be set reliably in SSR
   */
  const { theme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState()
  useEffect(() => setCurrentTheme(theme), [currentTheme, theme])

  // Helper object to pass props down (keeps things DRY)
  const childProps = { footer, header, pageTitle, slug }

  // Make layout prop into a (uppercase) component
  const Layout = layout

  // Return wrapper
  return (
    <SwipeWrapper>
      {pageTitle && (
        <Head>
          <meta property="og:title" content={pageTitle} key="title" />
          {props.intro && (
            <meta property="og:description" content={props.intro} key="description" />
          )}
          <meta property="og:title" content={pageTitle} key="title" />
          <meta property="og:type" content="article" key="type" />
          <meta property="og:article:author" content="Joost De Cock" key="author" />
          <meta
            property="og:image"
            content={`${ogUrl({ site: siteConfig.tld, title: pageTitle, intro: props.intro })}`}
            key="image"
          />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="2400" />
          <meta property="og:image:height" content="1260" />
          <meta
            property="og:url"
            content={`https://FreeSewing.${siteConfig.tld}/${path.join('/')}`}
            key="url"
          />
          <meta property="og:locale" content={locale} key="locale" />
          <meta property="og:site_name" content={`FreeSewing.${siteConfig.tld}`} key="site" />
          <title>{pageTitle}</title>
        </Head>
      )}
      <div
        data-theme={currentTheme} // This facilitates CSS selectors
        key={currentTheme} // This forces the data-theme update
      >
        <LoadingStatus />
        <Feeds />
        <LayoutWrapper {...childProps}>
          {Layout ? <Layout {...childProps}>{children}</Layout> : children}
        </LayoutWrapper>
        {typeof modalContent === 'function' ? modalContent() : modalContent}
      </div>
    </SwipeWrapper>
  )
}
