import { useEffect, useState } from 'react'

const useKeyPress = (targetKey=false) => {

  const [keyPressed, setKeyPressed] = useState(false)

  const downHandler = ({ key }) => {
    if (key === targetKey) setKeyPressed(true)
  }
  const upHandler = ({ key }) => {
    if (key === targetKey) setKeyPressed(false)
  }

  useEffect(() => {
    if (window) {
      window.addEventListener("keydown", downHandler)
      window.addEventListener("keyup", upHandler)

      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener("keydown", downHandler)
        window.removeEventListener("keyup", upHandler)
      }
    }
  }, [])

  return keyPressed
}

export default useKeyPress
