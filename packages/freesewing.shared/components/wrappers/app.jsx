import React, { useState, useEffect } from 'react'
import {themeChange} from "theme-change"
import Head from 'next/head'
import { useHotkeys } from 'react-hotkeys-hook'
import themes from '@/shared/themes'
import { useRouter } from 'next/router'
import config from '@/site/freesewing.config.js'
// Shared components
import ProgressBar from '@/shared/components/progress-bar'
import Navbar from '@/shared/components/sections/navbar'
import Footer from '@/site/components/footer'
import Layout from '@/shared/components/layouts/default'
import useNavigation from '@/shared/hooks/useNavigation'

/* This component should wrap all page content */
const AppWrapper= props => {
  const router = useRouter()
  const path = router.asPath
  const locale = router.locale || config.language
  const tree = useNavigation(locale, path)

  // Trigger search with Ctrl+k
  useHotkeys('ctrl+k', (evt) => {
    evt.preventDefault()
    setSearch(true)
  })

  const [menu, setMenu] = useState(false)
  const [search, setSearch] = useState(false)

  useEffect(() => {
    themeChange(false)
  }, [menu])

  const childProps = {
    menu, setMenu, toggleMenu: () => setMenu(!menu),
    search, setSearch, toggleSearch: () => setSearch(!search),
    path, tree,
    title: props.title,
    t: props.t,
    locale, languages: config.languages,
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <ProgressBar />
      {!props.noNavbar && <Navbar {...childProps}/>}
      {props.noLayout
        ? props.children
        : <Layout {...childProps}>{props.children}</Layout>
      }
      {!props.noFooter && !menu && <Footer />}
    </div>
  )
}
      //<pre>{JSON.stringify(tree, null ,2)}</pre>

export default AppWrapper

