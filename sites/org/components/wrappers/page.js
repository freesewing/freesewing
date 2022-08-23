import React, { useState, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useRouter } from 'next/router'
import { useHotkeys } from 'react-hotkeys-hook'
// Layouts components
import LayoutWrapper from 'site/components/wrappers/layout'
import Docs from 'site/components/layouts/docs'
// Add feeds
import Feeds from 'site/components/feeds.js'

/* This component should wrap all page content */
const PageWrapper= ({
  title="FIXME: No title set",
  noSearch=false,
  app=false,
  layout=Docs,
  crumbs=false,
  children=[]
}) => {

  const swipeHandlers = useSwipeable({
    onSwipedLeft: evt => (app.primaryMenu) ? app.setPrimaryMenu(false) : null,
    onSwipedRight: evt => (app.primaryMenu) ? null : app.setPrimaryMenu(true),
    trackMouse: true
  })

  const router = useRouter()
  const slug = router.asPath.slice(1)

  useEffect(() => app.setSlug(slug), [slug])

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
    search, setSearch, toggleSearch: () => setSearch(!search),
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
        {Layout
          ? <Layout {...childProps}>{children}</Layout>
          : children
        }
      </LayoutWrapper>
    </div>
  )
}

export default PageWrapper

