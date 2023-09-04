// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useContext } from 'react'
import { Ribbon } from 'shared/components/ribbon.mjs'

export const HeaderWrapper = ({ show, children }) => {
  const { loading } = useContext(LoadingStatusContext)
  return (
    <header
      className={`
      fixed bottom-0 md:bottom-auto md:top-0 left-0
      bg-neutral
      w-full
      z-30
      transition-transform
      duration-300 ease-in-out
      ${show || loading ? '' : 'translate-y-36 md:-translate-y-36'}
      drop-shadow-xl
    `}
    >
      {' '}
      {children}
      <Ribbon />
    </header>
  )
}

// can't use string interpolation or tailwind won't account for these classes
const shownHeaderClasses = {
  'bottom-16': 'group-[.header-shown]/layout:bottom-16',
  'md:top-24': 'group-[.header-shown]/layout:md:top-24',
}
export const shownHeaderSelector = (cls) => shownHeaderClasses[cls]
