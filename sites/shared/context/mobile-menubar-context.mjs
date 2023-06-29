import React, { useState, useContext, useEffect, useCallback } from 'react'

/**
 * A context for holding elements from various places that should be presented
 * cohesively in mobile, e.g. sidebar menus and toolbars
 *
 * There are two ways of presenting menus on the menubar:
 * 1) Menus:    These are larger interfaces that should be placed in a modal on mobile
 *              They will be presented as buttons on the menubar which will open a modal when clicked
 *              example: workbench nav menu
 * 2) Actions:  These are smaller and will be presented directly on the menubar
 *              example: zoom buttons
 */
export const MobileMenubarContext = React.createContext(null)

/**
 * A provider for the {@link MobileMenubarContext}
 * */
export const MobileMenubarContextProvider = ({ children }) => {
  const [menus, setMenus] = useState({})
  const [actions, setActions] = useState({})

  /**
   * Add a menu to the menubar
   * @type Function
   * @param {String} key - the key for this menu in the menus object
   * @param {Object} menuProps - the properties of this menu
   * @param {React.Component} menuProps.Icon - the icon for the menu button
   * @param {ReactElement} menuProps.menuContent - the content of the menu to be displayed in a modal
   * @param {Number} menuProps.order - the sort order of this menu
   * */
  const addMenu = useCallback(
    (key, menuProps) => {
      setMenus((oldMenus) => ({ ...oldMenus, [key]: menuProps }))
    },
    [setMenus]
  )

  /**
   * Remove a menu from the menubar
   * @type Function
   * @param {String} key - the key that was used to add the menu to the menubar
   */
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

  /**
   * Add an action to the menubar
   * @param {String} key - the key for this action in the actions object
   * @param {Object} actionProps - the properties of this action
   * @param {ReactElement} actionProps.actionContent - the content of the action to be displayed in a modal
   * @param {Number} actionProps.order - the sort order of this action
   */
  const addAction = useCallback(
    (key, actionProps) => {
      setActions((oldActions) => ({
        ...oldActions,
        [key]: actionProps,
      }))
    },
    [setActions]
  )

  /**
   * Remove an action from the menubar
   * @type Function
   * @param {String} key - the key that was used to add the action to the menubar
   */
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

/**
 * A hook to add content as a menu in the mobile menubar and handle remove on unmount
 * @param {String} key - the key for this menu in the menus object
 * @param {Object} menuProps - the properties of this menu
 * @param {React.Component} menuProps.Icon - the icon for the menu button
 * @param {ReactElement} menuProps.menuContent - the content of the menu to be displayed in a modal
 * @param {Number} menuProps.order - the sort order of this menu
 * */
export const useMobileMenu = (key, menuProps) => {
  const { addMenu, removeMenu } = useContext(MobileMenubarContext)

  useEffect(() => {
    addMenu(key, menuProps)

    return () => removeMenu(key)
  }, [menuProps, key, addMenu, removeMenu])
}

/**
 * A hook to add content as an action to the mobile menubar and handle removal on unmount
 * @param @param {String} key - the key for this action in the actions object
 * @param {Object} actionProps - the properties of this action
 * @param {ReactElement} actionProps.actionContent - the content of the action to be displayed in a modal
 * @param {Number} actionProps.order - the sort order of this action
 */
export const useMobileAction = (key, content) => {
  const { addAction, removeAction } = useContext(MobileMenubarContext)

  useEffect(() => {
    addAction(key, content)

    return () => removeAction(key)
  }, [...Object.values(content), key, addAction, removeAction])
}
