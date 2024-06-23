/*************************************************************************
 *                                                                       *
 * FreeSewing's pattern editor allows swizzling hooks                    *
 *                                                                       *
 * To 'swizzle' means to replace the default implementation of a         *
 * hook with a custom one. It allows one to customize                    *
 * the pattern editor.                                                   *
 *                                                                       *
 * This file holds the 'swizzleHooks' method that will return            *
 * the various hooks that can be swizzled, or their default              *
 * implementation.                                                       *
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
import { useAccount } from './use-account.mjs'
import { useBackend } from './use-backend.mjs'
import { useControlState } from './use-control-state.mjs'
import {
  useReactEditorState,
  useStorageEditorState,
  useSessionEditorState,
  useUrlEditorState,
} from './use-editor-state.mjs'

/*
 * We support different state backend, so let's handle those
 */
const stateBackends = {
  react: useReactEditorState,
  storage: useStorageEditorState,
  session: useSessionEditorState,
  url: useUrlEditorState,
}

/**
 * This object holds all hooks that can be swizzled
 */
const defaultHooks = (config) => ({
  useAccount,
  useBackend,
  useControlState,
  useEditorState: stateBackends[config.stateBackend] || useReactEditorState,
})

/*
 * This method returns hooks that can be swizzled
 * So either the passed-in methods, or the default ones
 */
export const swizzleHooks = (hooks = {}, config) => {
  /*
   * We need to return the resulting hooks, swizzled or not
   * So we put this in this object so we can pass that down
   */
  const all = {}
  for (const [name, hook] of Object.entries(defaultHooks(config))) {
    all[name] = hooks[name] ? hooks[name] : hook
  }

  /*
   * Return all hooks
   */
  return all
}
