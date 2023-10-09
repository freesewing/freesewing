import { useState, useEffect } from 'react'

export const LoadingBar = ({ duration = 1000, color = 'primary' }) => {
  const [started, setStarted] = useState(false)
  useEffect(() => {
    setTimeout(() => setStarted(true), 100)
  }, [])

  return (
    <div className={`w-full bg-base-200 rounded-full h-2.5 mb-4 bg-${color} bg-opacity-30`}>
      <div
        className={`bg-${color} h-2.5 rounded-full transition-all ${
          started ? 'w-full' : 'w-0'
        } duration-[${duration}ms]`}
      ></div>
    </div>
  )
}
