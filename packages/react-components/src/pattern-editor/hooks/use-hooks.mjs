/*************************************************************************
 *                                                                       *
 * FreeSewing's pattern editor useHooks hook, with swizzle support       *
 *                                                                       *
 * To 'swizzle' means to replace the default implementation of a         *
 * method with a custom one. It allows one to customize                  *
 * the pattern editor.                                                   *
 *                                                                       *
 * This file holds the 'useHooks' hook that will load the various        *
 * hook methods that can be swizzled, as well as their default versions  *
 * that can be overridden.                                               *
 *                                                                       *
 * To use a custom version, simply pas it as a prop into the editor      *
 * under the 'hooks' key. So to pass a custom 'useAccount' method        *
 * (used for loading the user's account data) you do:                    *
 *                                                                       *
 * <PatternEditor hooks={{ useAccount: myCustomHook }} />                *
 *                                                                       *
 *************************************************************************/

/*
 * Import of components that can be swizzled
 */
// useAccount
import { useAccount } from '../swizzle/hooks/use-account.mjs'
import { useBackend } from '../swizzle/hooks/use-backend.mjs'
import { useControlState } from '../swizzle/hooks/use-control-state.mjs'
import { useEditorState } from '../swizzle/hooks/use-editor-state.mjs'

/**
 * This object holds all hooks that can be swizzled
 */
const defaultHooks = {
  useAccount,
  useBackend,
  useControlState,
  useEditorState,
}

/*
 * This hook returns hooks that can be swizzled (so meta)
 * So either the passed-in methods, or the default ones
 */
export const useHooks = (hooks = {}, methods) => {
  /*
   * We need to pass down the resulting hooks, swizzled or not
   * So we put this in this object so we can pass that down
   */
  const all = {}
  for (let [name, hook] of Object.entries(defaultHooks)) {
    if (hooks[name]) hook = hooks[name]
    all[name] = (...params) => hook(all, methods, ...params)
  }

  /*
   * Return all hooks
   */
  return all
}
