// Hooks
import { useContext } from 'react'
import { LoadingContext } from 'shared/context/loading-context.mjs'
import { Ribbon } from 'shared/components/ribbon.mjs'

export const HeaderWrapper = ({ setSearch, show, children }) => {
  const { loading } = useContext(LoadingContext)
  return (
    <header
      className={`
      fixed bottom-0 lg:bottom-auto lg:top-0 left-0
      bg-neutral
      w-full
      z-30
      transition-transform
      duration-300 ease-in-out
      ${show || loading ? '' : 'bottom-0 lg:top-0 left-0 translate-y-36 lg:-translate-y-36'}
      drop-shadow-xl
    `}
    >
      {' '}
      {children}
      <Ribbon />
    </header>
  )
}
