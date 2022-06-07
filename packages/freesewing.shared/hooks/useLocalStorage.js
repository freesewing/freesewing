import { useState, useEffect, useRef } from 'react'

// See: https://usehooks.com/useLocalStorage/
function useLocalStorage(key, initialValue) {
  const prefix = 'fs_'
  const [storedValue, setStoredValue] = useState(initialValue);
  // use this to track whether it's mounted. useful for doing other effects outside this hook
  const [ready, setReady] = useState(false);
  const readyInternal = useRef(false);

  const setValue = function (value) {
    if (!readyInternal.current) {
      return null
    }

    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(prefix + key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  // get the item from localstorage after the component has mounted. empty brackets mean it runs one time
  useEffect(() => {
    readyInternal.current = true;
    const item = window.localStorage.getItem(prefix + key)
    if (item) {
      setValue(JSON.parse(item));
    } else if (storedValue) {
      setValue(storedValue)
    }
    setReady(true);
  }, [])

  return [storedValue, setValue, ready]
}

export default useLocalStorage
