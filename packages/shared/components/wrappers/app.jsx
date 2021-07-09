import React, { useState, useEffect } from 'react'
import {themeChange} from "theme-change"
import Head from 'next/head'
import { useHotkeys } from 'react-hotkeys-hook'
import themes from 'shared/themes'
// Shared components
import ProgressBar from 'shared/components/progress-bar'
import Navbar from 'shared/components/sections/navbar'
import Footer from 'shared/components/sections/footer'
import Layout from 'shared/components/layouts/default'

/* This component should wrap all page content */
const AppWrapper= props => {

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

  const stateProps = {
    menu, setMenu, toggleMenu: () => setMenu(!menu),
    search, setSearch, toggleSearch: () => setSearch(!search),
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <ProgressBar />
      {!props.noNavbar && <Navbar {...stateProps}/>}
      {props.noLayout
        ? props.children
        : <Layout {...props} {...stateProps}>{props.children}</Layout>
      }
      {!props.noFooter && <Footer />}
    </div>
  )
}

export default AppWrapper

