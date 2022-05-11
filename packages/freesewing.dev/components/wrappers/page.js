import React, { useState, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useRouter } from 'next/router'
import { useHotkeys } from 'react-hotkeys-hook'
// Layouts components
import Docs from 'site/components/layouts/docs'

const layouts = {
  docs: Docs,
}

/* This component should wrap all page content */
const PageWrapper= ({
  title="FIXME: No title set",
  noSearch=false,
  app=false,
  layout=false,
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
    search, setSearch, toggleSearch: () => setSearch(!search),
    noSearch: noSearch,
  }

  const Layout = layouts[layout]

  return (
    <div
      ref={swipeHandlers.ref}
      onMouseDown={swipeHandlers.onMouseDown}
      data-theme={app.theme}
      key={app.theme} // Thiis forces the data-theme update
    >
      {layout
        ? <Layout {...childProps}>{children}</Layout>
        : children
      }
    </div>
  )
}

export default PageWrapper

