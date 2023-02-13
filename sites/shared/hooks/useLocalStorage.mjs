import { useState, useEffect } from 'react'

const prefix = 'fs_'

// See: https://usehooks.com/useLocalStorage/
export function useLocalStorage(key, initialValue) {
  // use this to track whether it's mounted. useful for doing other effects outside this hook
  // and for making sure we don't write the initial value over the current value
  const [ready, setReady] = useState(false)

  // State to store our value
  const [storedValue, setValue] = useState(initialValue)

  // set to localstorage every time the storedValue changes
  // we do it this way instead of a callback because
  // getting the current state inside `useCallback` didn't seem to be working
  useEffect(() => {
    if (ready) {
      window.localStorage.setItem(prefix + key, JSON.stringify(storedValue))
    }
  }, [storedValue, key, ready])

  // read from local storage on mount
  useEffect(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(prefix + key)
      // Parse stored json or if none return initialValue
      const valToSet = item ? JSON.parse(item) : initialValue
      setValue(valToSet)
      setReady(true)
    } catch (error) {
      console.log(error)
    }
  }, [setReady, setValue, key, initialValue])

  return [storedValue, setValue, ready]
}
