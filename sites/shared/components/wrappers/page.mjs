// Dependencies
import React, { useState, useEffect, useContext } from 'react'
// Hooks
import { useTheme } from 'shared/hooks/use-theme.mjs'
// Components
import Head from 'next/head'
import { SwipeWrapper } from 'shared/components/wrappers/swipes.mjs'
import { LayoutWrapper, ns as layoutNs } from 'shared/components/wrappers/layout.mjs'
import { DefaultLayout, ns as defaultLayoutNs } from 'site/components/layouts/default.mjs'
import { Feeds } from 'site/components/feeds.mjs'
import { ModalContext } from 'shared/context/modal-context.mjs'

export const ns = [...new Set([...layoutNs, ...defaultLayoutNs])]

/* This component should wrap all page content */
export const PageWrapper = (props) => {
  /*
   * Deconstruct props
   */
  const { layout = DefaultLayout, footer = true, header = false, children = [], path = [] } = props
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

  /*
   * This forces a re-render upon initial bootstrap of the app
   * This is needed to avoid hydration errors because theme can't be set reliably in SSR
   */
  const [theme] = useTheme()
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
        </Head>
      )}
      <div
        data-theme={currentTheme} // This facilitates CSS selectors
        key={currentTheme} // This forces the data-theme update
      >
        <Feeds />
        <LayoutWrapper {...childProps}>
          {Layout ? <Layout {...childProps}>{children}</Layout> : children}
        </LayoutWrapper>
        {typeof modalContent === 'function' ? modalContent() : modalContent}
      </div>
    </SwipeWrapper>
  )
}
