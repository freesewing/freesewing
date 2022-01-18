import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useRouter } from 'next/router'
import { useHotkeys } from 'react-hotkeys-hook'
// Shared components
import Layout from 'shared/components/layouts/default'

/* This component should wrap all page content */
const AppWrapper= props => {

  const swipeHandlers = useSwipeable({
    onSwipedLeft: evt => (props.app.primaryMenu) ? props.app.setPrimaryMenu(false) : null,
    onSwipedRight: evt => (props.app.primaryMenu) ? null : props.app.setPrimaryMenu(true),
    trackMouse: true
  })

  const router = useRouter()
  props.app.setSlug(router.asPath.slice(1))

  // Trigger search with Ctrl+k
  useHotkeys('ctrl+k', (evt) => {
    evt.preventDefault()
    setSearch(true)
  })

  const [search, setSearch] = useState(false)

  const childProps = {
    app: props.app,
    title: props.title,
    search, setSearch, toggleSearch: () => setSearch(!search),
  }

  return (
    <div
      {...swipeHandlers}
      data-theme={props.app.theme}
      key={props.app.theme+Date.now()} // Thiis forces the data-theme update
    >
      {props.noLayout
        ? props.children
        : <Layout {...childProps}>{props.children}</Layout>
      }
    </div>
  )
}

export default AppWrapper

