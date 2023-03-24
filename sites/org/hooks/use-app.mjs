// Hooks
import { useState } from 'react'
import { useBugsnag } from 'site/hooks/use-bugsnag.mjs'
import { useRouter } from 'next/router'
// Dependencies
import set from 'lodash.set'
import unset from 'lodash.unset'

const defaultState = {
  loading: false,
  modal: null,
}

/*
 * The useApp hook
 */
export function useApp({ bugsnag }) {
  const router = useRouter()
  const reportError = useBugsnag(bugsnag)

  // React state
  const [state, setState] = useState({
    ...defaultState,
    slug: useRouter().asPath.slice(1),
  })

  /*
   * Helper methods for partial state updates
   */
  const updateState = (path, value) => setState(set({ ...state }, path, value))
  const unsetState = (path) => setState(unset({ ...state }, path))

  /*
   * Helper methods for specific state updates
   */
  const clearModal = () => updateState('modal', null)
  const startLoading = () => updateState('loading', true)
  const stopLoading = () => updateState('loading', false)

  return {
    // All-purpose React state object
    state,
    setState,
    updateState,
    unsetState,

    // Helper methods
    clearModal,
    startLoading,
    stopLoading,

    // Bugsnag helper
    reportError,
  }
}
