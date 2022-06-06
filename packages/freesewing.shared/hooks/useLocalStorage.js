import { useState, useEffect } from 'react'

// See: https://usehooks.com/useLocalStorage/
function useLocalStorage(key, initialValue) {
  const prefix = 'fs_'
  const [storedValue, setStoredValue] = useState(initialValue);
  // use this to track whether it's mounted. useful for doing other effects outside this hook
  const [ready, setReady] = useState(false);

  const setValue = (value) => {
    if (!ready) return null
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
    const item = window.localStorage.getItem(prefix + key)
    if (item) {
      setValue(JSON.parse(item));
    }
    setReady(true);
  }, [])

  return [storedValue, setValue, ready]
}

export default useLocalStorage
