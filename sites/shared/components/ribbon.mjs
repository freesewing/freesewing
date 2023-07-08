// Hooks
import { useContext } from 'react'
// Context
import { LoadingContext } from 'shared/context/loading-context.mjs'

export const Ribbon = () => {
  const { loading } = useContext(LoadingContext)

  return (
    <div
      className={`flex flex-col justify-between p-0 transition-transform
      ${loading ? 'theme-gradient loading h-1' : 'h-0 -translate-y-1'}
    `}
    ></div>
  )
}
