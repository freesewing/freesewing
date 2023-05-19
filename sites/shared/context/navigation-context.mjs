import React, { useState } from 'react'
import { useNavigation } from 'site/hooks/use-navigation.mjs'

const defaultNavigationContext = {
  path: [],
  title: 'FIXME: No title (default)',
  locale: 'en',
  crumbs: [],
}

export const NavigationContext = React.createContext(defaultNavigationContext)

export const NavigationContextProvider = ({ children }) => {
  function setNavigation(newValues) {
    setValue({
      ...value,
      ...newValues,
      setNavigation,
    })
  }

  const [value, setValue] = useState({
    ...defaultNavigationContext,
    setNavigation,
  })

  const navState = useNavigation({
    path: value.path,
    locale: value.locale,
  })

  return (
    <NavigationContext.Provider value={{ ...value, ...navState }}>
      {children}
    </NavigationContext.Provider>
  )
}
