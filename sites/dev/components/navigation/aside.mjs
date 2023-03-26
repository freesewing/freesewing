import { MainSections, ActiveSection } from './primary.mjs'
import Link from 'next/link'

export const AsideNavigation = ({ app, mobileOnly = false, before = [], after = [] }) => (
  <aside
    className={`
    fixed top-0 right-0 h-screen
    overflow-y-auto z-20
    bg-base-100 text-base-content
    ${app.state.primaryMenu ? '' : 'translate-x-[-120%]'} transition-transform
    px-0 pb-20 pt-8 shrink-0

    lg:w-auto
    lg:sticky lg:relative lg:transform-none
    lg:justify-center
    lg:border-r-2 lg:border-base-200 lg:bg-base-200 lg:bg-opacity-50
    lg:mt-16
    ${mobileOnly ? 'block lg:hidden w-full ' : ''}
  `}
  >
    {before}
    <MainSections app={app} />
    <ActiveSection app={app} />
    {after}
  </aside>
)
