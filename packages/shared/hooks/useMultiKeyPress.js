import { useState, useEffect } from "react"

const useMultiKeyPress = () => {
  const [keysPressed, setKeyPressed] = useState(new Set([]));

  const downHandler = ({ key }) => {
    setKeyPressed(keysPressed.add(key))
  }

  const upHandler = ({ key }) => {
    keysPressed.delete(key);
    setKeyPressed(keysPressed);
  }

  useEffect(() => {
    if (window) {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      }
    }
  }, [])

  return keysPressed
}

export default useMultiKeyPress
