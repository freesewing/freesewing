import set from 'lodash.set'
import unset from 'lodash.unset'
import createPersistedState from 'use-persisted-state'

const defaultStorage = {}

/*
 * The useStorage hook - Keeps state in local storage
 */
export function useStorage(name = 'fs-storage', defaultValue = {}) {
  /*
   * Persisted state setup
   */
  const usePersistedState = createPersistedState(name)
  const [storage, setStorage] = usePersistedState(defaultStorage)

  /*
   * Helper methods for partial state updates
   */
  const updateStorage = (path, value) => setStorage(set({ ...storage }, path, value))
  const unsetStorage = (path) => setStorage(unset({ ...storage }, path))

  return { storage, setStorage, updateStorage, unsetStorage }
}
