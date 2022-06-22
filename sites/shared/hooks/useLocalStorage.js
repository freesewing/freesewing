import { useState, useEffect, useRef, useReducer } from 'react'

// See: https://usehooks.com/useLocalStorage/
function useLocalStorage(key, initialValue, reducer) {
  const prefix = 'fs_'
  const [storedValue, setStoredValue] = typeof reducer == 'function' ? useReducer(reducer, initialValue) : useState(initialValue);
  // use this to track whether it's mounted. useful for doing other effects outside this hook
  const [ready, setReady] = useState(false);
  const readyInternal = useRef(false);
  const setValue = setStoredValue

  // set to localstorage every time the storedValue changes
  useEffect(() => {
    if (readyInternal.current) {
      window.localStorage.setItem(prefix + key, JSON.stringify(storedValue))
    }
  }, [storedValue])

  // get the item from localstorage after the component has mounted. empty brackets mean it runs one time
  useEffect(() => {
    readyInternal.current = true;
    const item = window.localStorage.getItem(prefix + key)
    let valueToSet = storedValue;
    if (item) {
      valueToSet = JSON.parse(item)
    }

    if (reducer) {
      valueToSet = {value: valueToSet, type: 'replace'}
    }

    setValue(valueToSet)
    setReady(true);
  }, [])

  return [storedValue, setValue, ready]
}

export default useLocalStorage
