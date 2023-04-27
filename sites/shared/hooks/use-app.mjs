// Hooks
import { useState, useEffect } from 'react'
import { useNavigation } from 'site/hooks/use-navigation.mjs'
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
  const { page = {}, loadState = {} } = props
  const { path = false } = page

  if (!path) throw 'You MUST pass a page.path prop to the useApp hook'

  const navState = useNavigation(path)

  // React state
  const [state, setState] = useState(() => ({ ...defaultState, ...loadState }))

  useEffect(() => {
    // Force update of navigation info (nav, title, crumbs) on each page change
    if (path) setState({ ...state, ...navState })
  }, [path, state.slug, state.title])

  /*
   * Helper methods for partial state updates
   */
  const updateState = (path, value) => setState(set({ ...state }, path, value))
  const unsetState = (path) => setState(unset({ ...state }, path))

  /*
   * Helper methods for specific state updates
   */
  const setModal = (content) => updateState('modal', content)
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
    setModal,
    closeModal,
    closeMenu,
    startLoading,
    stopLoading,
  }
}
