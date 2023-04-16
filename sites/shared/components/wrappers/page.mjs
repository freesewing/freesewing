// Dependencies
import React, { useState, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useHotkeys } from 'react-hotkeys-hook'
// Hooks
import { useTheme } from 'shared/hooks/use-theme.mjs'
// Components
import { LayoutWrapper, ns as layoutNs } from 'site/components/wrappers/layout.mjs'
import { DocsLayout, ns as docsNs } from 'site/components/layouts/docs.mjs'
import { Feeds } from 'site/components/feeds.mjs'
import { Spinner } from 'shared/components/spinner.mjs'

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
   * Swipe handling for the entire site
   */
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => (app.state?.menu?.main ? app.updateState('menu.main', false) : null),
    onSwipedRight: () => (app.state?.menu?.main ? null : app.updateState('menu.main', true)),
    trackMouse: true,
  })

  /*
   * Hotkeys (keyboard actions)
   */
  // Trigger search with /
  useHotkeys('/', (evt) => {
    evt.preventDefault()
    setSearch(true)
  })

  // Always close modal when Escape key is hit
  useHotkeys('esc', (evt) => {
    evt.preventDefault()
    app.updateState('modal', null)
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
    <div
      ref={swipeHandlers.ref}
      onMouseDown={swipeHandlers.onMouseDown}
      data-theme={currentTheme} // This facilitates CSS selectors
      key={currentTheme} // This forces the data-theme update
    >
      <Feeds />
      <LayoutWrapper {...childProps}>
        {Layout ? <Layout {...childProps}>{children}</Layout> : children}
      </LayoutWrapper>
      {app.state.modal ? app.state.modal : null}
    </div>
  )
}
