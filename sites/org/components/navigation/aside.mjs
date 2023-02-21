import { PrimaryNavigation } from './primary.mjs'

export const AsideNavigation = ({ app, slug, mobileOnly = false, before = [], after = [] }) => (
  <aside
    className={`
    fixed top-0 right-0 h-screen w-screen
    overflow-y-auto z-20
    text-base-content
    transition-all
    bg-base-100 px-4 py-4
    md:bg-transparent md:px-0 md:py-0
    ${app.primaryMenu ? '' : 'translate-x-[-120%]'} transition-transform
    md:flex md:flex-col md:sticky md:top-16
    md:relative md:transform-none
    md:max-w-xl
    shrink-0
    md:w-full
    ${mobileOnly ? 'block md:hidden' : ''}
  `}
  >
    {before}
    <PrimaryNavigation app={app} active={slug} />
    {after}
  </aside>
)
