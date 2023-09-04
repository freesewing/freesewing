// Hooks
import { useContext } from 'react'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'

export const Ribbon = () => {
  const { loading } = useContext(LoadingStatusContext)

  return (
    <div
      className={`flex flex-col justify-between p-0 transition-transform
      ${loading ? 'theme-gradient loading h-1' : 'h-0 -translate-y-1'}
    `}
    ></div>
  )
}
