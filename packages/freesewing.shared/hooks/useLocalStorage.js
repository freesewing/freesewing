import { useState } from 'react'

// See: https://usehooks.com/useLocalStorage/

function useLocalStorage(key, initialValue) {
  const prefix = 'fs_'
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue // SSR has no window object
    try {
      const item = window.localStorage.getItem(prefix + key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

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

  return [storedValue, setValue]
}

export default useLocalStorage
