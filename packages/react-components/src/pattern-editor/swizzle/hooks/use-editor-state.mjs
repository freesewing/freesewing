import React, { useMemo, useState, useEffect } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import useSessionStorageState from 'use-session-storage-state'
import { useQueryState, createParser } from 'nuqs'
import { useSearchParams } from 'next/navigation'

/**
 * Helper method to push a prefix to a set path
 *
 * By 'set path' we mean a path to be passed to the
 * objUpdate method, which uses lodash's set under the hood.
 *
 * @param {string} prefix - The prefix path to add
 * @param {string|array} path - The path to prefix either as array or a string in dot notation
 * @return {array} newPath - The prefixed path
 */
export const unshift = (prefix, path) => {
  if (Array.isArray(path)) return [prefix, ...path]
  else return [prefix, ...path.split('.')]
}

/*
 * This creates the helper object for state updates
 */
export const updateFactory = ({ setState, objUpdate }) => ({
  /*
   * This allows raw access to the entire state object
   */
  state: (path, val) => setState((cur) => objUpdate({ ...cur }, path, val)),
  /*
   * These hold an object, so we take a path
   */
  settings: (path = null, val = null) => {
    /*
     * Allow passing an array of update operations.
     * Note that we're not doing rigorous checking on the structure of the array.
     * If you mess it up, it's on you.
     */
    if (Array.isArray(path) && val === null) {
      for (const sub of path)
        setState((cur) => objUpdate({ ...cur }, unshift('settings', sub[0]), sub[1]))
    } else setState((cur) => objUpdate({ ...cur }, unshift('settings', path), val))
  },
  ui: (path, val) => setState((cur) => objUpdate({ ...cur }, unshift('ui', path), val)),
  /*
   * These only hold a string, so we only take a value
   */
  design: (val) => setState((cur) => objUpdate({ ...cur }, 'design', val)),
  view: (val) => setState((cur) => objUpdate({ ...cur }, 'view', val)),
  control: (val) => setState((cur) => objUpdate({ ...cur }, 'control', val)),
})

/**
 * react
 * This holds the editor state, using React state.
 * It also provides helper methods to manipulate state.
 *
 * @params {object} init - Initial pattern settings
 * @return {array} return - And array with get, set, and update methods
 */
export const useReactEditorState = (Swizzled, init = {}) => {
  const [state, setState] = useState(init)
  const update = useMemo(
    () => updateFactory({ setState, objUpdate: Swizzled.methods.objUpdate }),
    [setState]
  )

  return [state, setState, update]
}

/**
 * storage
 * This holds the editor state, using local storage.
 * It also provides helper methods to manipulate state.
 *
 * @params {object} init - Initial pattern settings
 * @return {array} return - And array with get, set, and update methods
 */
export const useStorageEditorState = (Swizzled, init = {}) => {
  const [state, setState] = useLocalStorageState('fs-editor', { defaultValue: init })
  const update = useMemo(
    () => updateFactory({ setState, objUpdate: Swizzled.methods.objUpdate }),
    [setState]
  )

  return [state, setState, update]
}

/**
 * session
 * This holds the editor state, using session storage.
 * It also provides helper methods to manipulate state.
 *
 * @params {object} init - Initial pattern settings
 * @return {array} return - And array with get, set, and update methods
 */
export const useSessionEditorState = (Swizzled, init = {}) => {
  const [state, setState] = useSessionStorageState('fs-editor', { defaultValue: init })
  const update = useMemo(
    () => updateFactory({ setState, objUpdate: Swizzled.methods.objUpdate }),
    [setState]
  )

  return [state, setState, update]
}

/**
 * url
 * This holds the editor state, using session storage.
 * It also provides helper methods to manipulate state.
 *
 * @params {object} init - Initial pattern settings
 * @return {array} return - And array with get, set, and update methods
 */
export const useUrlEditorState = (Swizzled, init = {}) => {
  const searchParams = useSearchParams()
  const [state, setState] = useQueryState('s', pojoParser)
  const update = useMemo(
    () => updateFactory({ setState, objUpdate: Swizzled.methods.objUpdate }),
    [setState]
  )

  /*
   * Set the initial state
   */
  useEffect(() => {
    // Handle state on a hard reload or cold start
    if (typeof URLSearchParams !== 'undefined') {
      let urlState = false
      try {
        const params = new URLSearchParams(document.location.search)
        const s = params.get('s')
        if (typeof s === 'string' && s.length > 0) urlState = JSON.parse(s)
        if (urlState) setState(urlState)
        else setState(init)
      } catch (err) {
        setState(init)
      }
    }
  }, [])

  return [state, setState, update]
}

/*
 * Our URL state library does not support storing Javascript objects out of the box.
 * But it allows us to pass a customer parser to handle them, so this is that parser
 */
const pojoParser = createParser({
  parse: (v) => {
    let val
    try {
      val = JSON.parse(v)
    } catch (err) {
      val = null
    }
    return val
  },
  serialize: (v) => {
    let val
    try {
      val = JSON.stringify(v)
    } catch (err) {
      val = null
    }
    return val
  },
})
