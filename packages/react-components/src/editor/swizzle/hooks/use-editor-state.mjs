import { useMemo, useState, useEffect } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import useSessionStorageState from 'use-session-storage-state'
import { useQueryState, createParser } from 'nuqs'

/**
 * react
 * This holds the editor state, using React state.
 * It also provides helper methods to manipulate state.
 *
 * @params {object} init - Initial pattern settings
 * @return {array} return - And array with get, set, and update methods
 */
export const useReactEditorState = (Swizzled, init = {}, setEphemeralState) => {
  const [state, setState] = useState(init)
  const update = useMemo(
    () => Swizzled.methods.stateUpdateFactory(setState, setEphemeralState),
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
export const useStorageEditorState = (Swizzled, init = {}, setEphemeralState) => {
  const [state, setState] = useLocalStorageState('fs-editor', { defaultValue: init })
  const update = useMemo(
    () => Swizzled.methods.stateUpdateFactory(setState, setEphemeralState),
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
export const useSessionEditorState = (Swizzled, init = {}, setEphemeralState) => {
  const [state, setState] = useSessionStorageState('fs-editor', { defaultValue: init })
  const update = useMemo(
    () => Swizzled.methods.stateUpdateFactory(setState, setEphemeralState),
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
export const useUrlEditorState = (Swizzled, init = {}, setEphemeralState) => {
  const [state, setState] = useQueryState('s', pojoParser)
  const update = useMemo(
    () => Swizzled.methods.stateUpdateFactory(setState, setEphemeralState),
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
