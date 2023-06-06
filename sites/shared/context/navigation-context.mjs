import orderBy from 'lodash.orderby'
import get from 'lodash.get'
import React, { useState } from 'react'
import { useNavigation } from 'site/hooks/use-navigation.mjs'
import { objUpdate } from 'shared/utils.mjs'

const defaultNavigationContext = {
  path: [],
  title: 'FIXME: No title (default)',
  locale: 'en',
  crumbs: [],
}

export const NavigationContext = React.createContext(defaultNavigationContext)

const createCrumbs = (path, nav) =>
  path.map((crumb, i) => {
    const entry = get(nav, path.slice(0, i + 1), { t: 'no-actual-title', s: path.join('/') })
    const val = { t: entry.t, s: entry.s }
    if (entry.o) val.o = entry.o

    return val
  })

const createSections = (nav) => {
  const sections = {}
  for (const slug of Object.keys(nav)) {
    const entry = nav[slug]
    const val = { t: entry.t, s: entry.s }
    if (entry.o) val.o = entry.o
    if (!entry.h) sections[slug] = val
  }

  return orderBy(sections, ['o', 't'])
}

const buildNavState = (value, siteNav, extra = []) => {
  for (const [path, data] of extra) {
    siteNav = objUpdate(siteNav, path, data)
  }
  const obj = {
    siteNav,
    crumbs: createCrumbs(value.path, siteNav),
    sections: createSections(siteNav),
    slug: value.path.join('/'),
  }
  obj.title = obj.crumbs.length > 0 ? obj.crumbs.slice(-1)[0].t : ''

  return obj
}

export const NavigationContextProvider = ({ children }) => {
  function setNavigation(newValues) {
    setValue({
      ...value,
      ...newValues,
      setNavigation,
      addPages,
    })
  }

  const [value, setValue] = useState({
    ...defaultNavigationContext,
    setNavigation,
  })
  const [extraPages, setExtraPages] = useState([])

  const siteNav = useNavigation({ path: value.path, locale: value.locale }, extraPages)
  const navState = buildNavState(value, siteNav)

  const addPages = (extra) => {
    setExtraPages([...extraPages, ...extra])
  }

  return (
    <NavigationContext.Provider value={{ ...value, ...navState }}>
      {children}
    </NavigationContext.Provider>
  )
}
