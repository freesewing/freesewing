import { useState, useEffect } from 'react'

// See: https://usehooks.com/useLocalStorage/

function useLocalStorage(key, initialValue) {
  const prefix = 'fs_'
  const [storedValue, setStoredValue] = useState(initialValue);
  const [ready, setReady] = useState(false);

  const setValue = (value) => {
    if (typeof window === 'undefined') return null // SSR has no window object
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(prefix + key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const item = window.localStorage.getItem(prefix + key)
    if (item) {
      setValue(item ? JSON.parse(item) : initialValue);
    }
    setReady(true);
  }, [])

  return [storedValue, setValue, ready]
}

export default useLocalStorage
