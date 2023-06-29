// Hooks
import { useContext } from 'react'
import { LoadingContext } from 'shared/context/loading-context.mjs'
import { Ribbon } from 'shared/components/ribbon.mjs'

export const HeaderWrapper = ({ show, children }) => {
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
      ${show || loading ? '' : 'translate-y-36 lg:-translate-y-36'}
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
  'lg:top-24': 'group-[.header-shown]/layout:lg:top-24',
}
export const shownHeaderSelector = (cls) => shownHeaderClasses[cls]
