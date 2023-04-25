// Dependencies
import React, { useState, useEffect } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
// Hooks
import { useTheme } from 'shared/hooks/use-theme.mjs'
// Components
import { SwipeWrapper } from 'shared/components/wrappers/swipes.mjs'
import { LayoutWrapper, ns as layoutNs } from 'site/components/wrappers/layout.mjs'
import { DocsLayout, ns as docsNs } from 'site/components/layouts/docs.mjs'
import { Feeds } from 'site/components/feeds.mjs'
import { Spinner } from 'shared/components/spinner.mjs'
import { ModalContextProvider, ModalContextConsumer } from 'shared/context/modal-context.mjs'

export const ns = [...new Set([...layoutNs, ...docsNs])]

/* This component should wrap all page content */
export const PageWrapper = ({
  noSearch = false,
  app = false,
  layout = DocsLayout,
  footer = true,
  children = [],
  title = <Spinner className="h-12 w-12 animate-spin text-primary" />,
}) => {
  /*
   * This forces a re-render upon initial bootstrap of the app
   * This is needed to avoid hydration errors because theme can't be set reliably in SSR
   */
  const [theme, setTheme] = useTheme()
  const [currentTheme, setCurrentTheme] = useState()
  useEffect(() => setCurrentTheme(theme), [currentTheme, theme])

  /*
   * Hotkeys (keyboard actions)
   */
  // Trigger search with /
  useHotkeys('/', (evt) => {
    evt.preventDefault()
    setSearch(true)
  })

  // Search state
  const [search, setSearch] = useState(false)

  // Helper object to pass props down (keeps things DRY)
  const childProps = {
    app: app,
    footer,
    search,
    setSearch,
    toggleSearch: () => setSearch(!search),
    noSearch: noSearch,
    title: app.state.title ? app.state.title : title,
  }

  // Make layout prop into a (uppercase) component
  const Layout = layout

  // Return wrapper
  return (
    <ModalContextProvider>
      <SwipeWrapper app={app}>
        <div
          data-theme={currentTheme} // This facilitates CSS selectors
          key={currentTheme} // This forces the data-theme update
        >
          <Feeds />
          <LayoutWrapper {...childProps}>
            {Layout ? <Layout {...childProps}>{children}</Layout> : children}
          </LayoutWrapper>
          <ModalContextConsumer />
        </div>
      </SwipeWrapper>
    </ModalContextProvider>
  )
}
