import React, { useMemo, useState } from 'react'

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
const unshift = (prefix, path) => {
  if (Array.isArray(path)) return [prefix, ...path]
  else return [prefix, ...path.split('.')]
}

/**
 * This holds the editor state, and provides helper setter methods
 *
 * @params {object} init - Initial pattern settings
 * @return {array} return - And array with get, set, and update methods
 */
export const useEditorState = (hooks, methods, init = {}) => {
  const [state, setState] = useState(init)
  const { objUpdate } = methods
  /*
   * Helper methods for specific state updates
   */
  const update = useMemo(
    () => ({
      /*
       * This allows raw access to the entire state object
       */
      state: (path, val) => setState((cur) => objUpdate({ ...cur }, path, val)),
      /*
       * These hold an object, so we take a path
       */
      settings: (path, val) =>
        setState((cur) => objUpdate({ ...cur }, unshift('settings', path), val)),
      ui: (path, val) => setState((cur) => objUpdate({ ...cur }, unshift('ui', path), val)),
      /*
       * These only hold a string, so we only take a value
       */
      design: (val) => setState((cur) => objUpdate({ ...cur }, 'design', val)),
      view: (val) => setState((cur) => objUpdate({ ...cur }, 'view', val)),
    }),
    [setState]
  )

  return [state, setState, update]
}
