// Hooks
import React, { useState, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useRouter } from 'next/router'
import { useHotkeys } from 'react-hotkeys-hook'
// Components
import Head from 'next/head'
import { LayoutWrapper } from 'site/components/wrappers/layout.mjs'
import { DocsLayout } from 'site/components/layouts/docs.mjs'
import { Modal } from 'shared/components/modal.mjs'
import { Loader } from 'shared/components/loader.mjs'

/* This component should wrap all page content */
export const PageWrapper = ({
  title = 'FIXME: No title set',
  noSearch = false,
  app = false,
  layout = DocsLayout,
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

  // Trigger search with Ctrl+k
  useHotkeys('ctrl+k', (evt) => {
    evt.preventDefault()
    setSearch(true)
  })

  const [search, setSearch] = useState(false)

  const childProps = {
    app: app,
    title: title,
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
      <Head>
        <meta property="og:title" content={`${title} - FreeSewing.dev`} key="title" />
        <title>{title} - FreeSewing.dev</title>
      </Head>
      <LayoutWrapper {...childProps}>
        {Layout ? <Layout {...childProps}>{children}</Layout> : children}
      </LayoutWrapper>
      {app.popup && <Modal cancel={() => app.setPopup(false)}>{app.popup}</Modal>}
      {app.loading && <Loader />}
    </div>
  )
}
