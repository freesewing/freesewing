// Dependencies
import React, { useState, useEffect, useContext } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
// Hooks
import { useTheme } from 'shared/hooks/use-theme.mjs'
// Components
import { SwipeWrapper } from 'shared/components/wrappers/swipes.mjs'
import { LayoutWrapper, ns as layoutNs } from 'site/components/wrappers/layout.mjs'
import { DocsLayout, ns as docsNs } from 'site/components/layouts/docs.mjs'
import { Feeds } from 'site/components/feeds.mjs'
import { Spinner } from 'shared/components/spinner.mjs'
import { ModalContext } from 'shared/context/modal-context.mjs'
import { NavigationContext } from 'shared/context/navigation-context.mjs'

export const ns = [...new Set([...layoutNs, ...docsNs])]

/* This component should wrap all page content */
export const PageWrapper = (props) => {
  /*
   * Deconstruct props
   */
  const {
    layout = DocsLayout,
    footer = true,
    header = false,
    children = [],
    path = [],
    locale = 'en',
  } = props
  // Title is typically set in props.t but check props.title too
  const pageTitle = props.t ? props.t : props.title ? props.title : null

  /*
   * This forces a re-render upon initial bootstrap of the app
   * This is needed to avoid hydration errors because theme can't be set reliably in SSR
   */
  const [theme, setTheme] = useTheme()
  const [currentTheme, setCurrentTheme] = useState()
  const [navupdates, setNavupdates] = useState(0)
  useEffect(() => setCurrentTheme(theme), [currentTheme, theme])

  /*
   * Contexts
   */
  const { modalContent } = useContext(ModalContext)
  const { title, setNavigation } = useContext(NavigationContext)

  /*
   * Update navigation context with title and path
   */
  useEffect(() => {
    if (navupdates < 5) {
      setNavigation({
        title: pageTitle,
        locale,
        path,
      })
      setNavupdates(navupdates + 1)
    } else console.warn('Suppressing navigation update in page wrapper to avoid render loop')
  }, [path, pageTitle])

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
  const childProps = { footer, header, pageTitle }

  // Make layout prop into a (uppercase) component
  const Layout = layout

  // Return wrapper
  return (
    <SwipeWrapper>
      <div
        data-theme={currentTheme} // This facilitates CSS selectors
        key={currentTheme} // This forces the data-theme update
      >
        <Feeds />
        <LayoutWrapper {...childProps}>
          {Layout ? <Layout {...childProps}>{children}</Layout> : children}
        </LayoutWrapper>
        {modalContent}
      </div>
    </SwipeWrapper>
  )
}
