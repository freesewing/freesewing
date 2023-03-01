// Hooks
import React, { useState, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useRouter } from 'next/router'
import { useHotkeys } from 'react-hotkeys-hook'
// Components
import { LayoutWrapper, ns as layoutNs } from 'site/components/wrappers/layout.mjs'
import { DocsLayout } from 'site/components/layouts/docs.mjs'
import { Toaster } from 'site/components/toast/index.mjs'
// Add feeds
import { Feeds } from 'site/components/feeds.mjs'

export const ns = [...new Set([...layoutNs])]

/* This component should wrap all page content */
export const PageWrapper = ({
  title = 'FIXME: No title set',
  noSearch = false,
  app = false,
  layout = DocsLayout,
  footer = true,
  crumbs = false,
  children = [],
}) => {
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => (app.primaryMenu ? app.setPrimaryMenu(false) : null),
    onSwipedRight: () => (app.primaryMenu ? null : app.setPrimaryMenu(true)),
    trackMouse: true,
  })

  const router = useRouter()
  const slug = router.asPath.slice(1)

  useEffect(() => app.setSlug(slug), [slug, app])

  // Trigger search with /
  useHotkeys('/', (evt) => {
    evt.preventDefault()
    setSearch(true)
  })

  // Always close modal when Escape key is hit
  useHotkeys('esc', (evt) => {
    evt.preventDefault()
    app.setModal(false)
  })

  const [search, setSearch] = useState(false)

  const childProps = {
    app: app,
    title: title,
    footer,
    crumbs: crumbs,
    search,
    setSearch,
    toggleSearch: () => setSearch(!search),
    noSearch: noSearch,
  }

  const Layout = layout

  return (
    <div
      ref={swipeHandlers.ref}
      onMouseDown={swipeHandlers.onMouseDown}
      data-theme={app.theme}
      key={app.theme} // This forces the data-theme update
    >
      <Feeds lang={app.locale} />
      <LayoutWrapper {...childProps}>
        {Layout ? <Layout {...childProps}>{children}</Layout> : children}
      </LayoutWrapper>
      {app.modal ? (
        <div
          className={`fixed top-0 left-0 m-0 p-0 shadow drop-shadow-lg w-full h-screen
              bg-base-100 bg-opacity-90 z-50 hover:cursor-pointer
              flex flex-row items-center justify-center
            `}
          onClick={() => app.setModal(false)}
        >
          {app.modal}
        </div>
      ) : null}
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'bg-base-100 text-base-content',
        }}
      />
    </div>
  )
}
