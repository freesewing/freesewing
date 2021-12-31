import React, { useState, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useRouter } from 'next/router'
//import Head from 'next/head'
//import { useHotkeys } from 'react-hotkeys-hook'
//import themes from '@/shared/themes'
//import config from '@/site/freesewing.config.js'
// Shared components
import Layout from 'shared/components/layouts/default'
//import ProgressBar from '@/shared/components/progress-bar'
//import Navbar from '@/shared/components/sections/navbar'
//import Footer from '@/site/components/footer'
//import useNavigation from '@/shared/hooks/useNavigation'
//


/* This component should wrap all page content */
const AppWrapper= props => {

  const swipeHandlers = useSwipeable({
    onSwipedLeft: evt => (props.app.primaryMenu) ? props.app.setPrimaryMenu(false) : null,
    onSwipedRight: evt => (props.app.primaryMenu) ? null : props.app.setPrimaryMenu(true),
    trackMouse: true
  })

  const router = useRouter()
  props.app.setSlug(router.asPath.slice(1))
  //const locale = router.locale || config.language
  //const tree = useNavigation(locale, path)

  // Trigger search with Ctrl+k
  //useHotkeys('ctrl+k', (evt) => {
  //  evt.preventDefault()
  //  setSearch(true)
  //})

  //const [menu, setMenu] = useState(false)
  //const [search, setSearch] = useState(false)

  //useEffect(() => {
  //  themeChange(false)
  //}, [menu])

  const childProps = {
    app: props.app,
    title: props.title,
  }
  //  menu, setMenu, toggleMenu: () => setMenu(!menu),
  //  search, setSearch, toggleSearch: () => setSearch(!search),
  //  path, tree,
  //  title: props.title,
  //  t: props.t ? props.t : (x) => x,
  //  locale, languages: config.languages,
  //}


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

