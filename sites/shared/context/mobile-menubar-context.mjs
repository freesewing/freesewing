import React, { useState, useContext, useEffect, useCallback } from 'react'

export const MobileMenubarContext = React.createContext(null)

export const MobileMenubarContextProvider = ({ children }) => {
  const [menus, setMenus] = useState({})
  const [actions, setActions] = useState({})

  const addMenu = useCallback(
    (key, menuProps) => {
      setMenus((oldMenus) => ({ ...oldMenus, [key]: menuProps }))
    },
    [setMenus]
  )

  const removeMenu = useCallback(
    (key) => {
      setMenus((oldMenus) => {
        const newMenus = { ...oldMenus }
        delete newMenus[key]
        return newMenus
      })
    },
    [setMenus]
  )

  const addAction = useCallback(
    (key, content) => {
      setActions((oldActions) => ({
        ...oldActions,
        [key]: content,
      }))
    },
    [setActions]
  )

  const removeAction = useCallback(
    (key) => {
      setActions((oldActions) => {
        const newActions = { ...oldActions }
        delete newActions[key]
        return newActions
      })
    },
    [setActions]
  )

  const value = {
    menus,
    addMenu,
    removeMenu,
    actions,
    addAction,
    removeAction,
  }

  return <MobileMenubarContext.Provider value={value}>{children}</MobileMenubarContext.Provider>
}

export const useMobileMenu = (key, menuProps) => {
  const { addMenu, removeMenu } = useContext(MobileMenubarContext)

  useEffect(() => {
    addMenu(key, menuProps)

    return () => removeMenu(key)
  }, [menuProps, key, addMenu, removeMenu])
}

export const useMobileAction = (key, content) => {
  const { addAction, removeAction } = useContext(MobileMenubarContext)

  useEffect(() => {
    addAction(key, content)

    return () => removeAction(key)
  }, [...Object.values(content), key, addAction, removeAction])
}
