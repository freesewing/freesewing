import { loadNavigation } from 'site/lib/load-navigation.mjs'
// Hooks
import { useState, useEffect } from 'react'
import { useBugsnag } from 'shared/hooks/use-bugsnag.mjs'
// Dependencies
import get from 'lodash.get'
import set from 'lodash.set'
import unset from 'lodash.unset'

const defaultState = {
  loading: false,
  modal: null,
  menu: {
    main: null,
  },
}

/*
 * The useApp hook
 */
export function useApp(props = {}) {
  const { bugsnag = false, page = {}, loadState = {} } = props
  const { path = [] } = page

  const reportError = useBugsnag(props?.bugsnag)

  // React state
  const [state, setState] = useState(() => ({ ...defaultState, ...loadState }))

  useEffect(() => {
    // Force update of navigation info (nav, title, crumbs) on each page change
    if (path.length > 0) setState({ ...state, ...loadNavigation(path) })
  }, [path, state.slug, state.title])

  /*
   * Helper methods for partial state updates
   */
  const updateState = (path, value) => setState(set({ ...state }, path, value))
  const unsetState = (path) => setState(unset({ ...state }, path))

  /*
   * Helper methods for specific state updates
   */
  const closeModal = () => updateState('modal', null)
  const closeMenu = (name) =>
    get(state, `menu.${name}`, false) ? updateState(`menu.${name}`, false) : null
  const startLoading = () => updateState('loading', true)
  const stopLoading = () => updateState('loading', false)

  return {
    // All-purpose React state object
    state,
    setState,
    updateState,
    unsetState,

    // Helper methods
    closeModal,
    closeMenu,
    startLoading,
    stopLoading,

    // Bugsnag helper
    reportError,
  }
}
