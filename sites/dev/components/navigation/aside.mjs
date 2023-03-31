import { MainSections, ActiveSection } from './primary.mjs'

export const AsideNavigation = ({ app, slug, mobileOnly = false, before = [], after = [] }) => (
  <aside
    className={`
    fixed top-0 right-0 h-screen
    overflow-y-auto z-20
    bg-base-100 text-base-content
    ${app.primaryMenu ? '' : 'translate-x-[-120%]'} transition-transform
    px-6 pb-20 pt-8 shrink-0

    lg:w-auto
    lg:sticky lg:relative lg:transform-none
    lg:justify-center
    lg:border-r-2 lg:border-base-200 lg:bg-base-200 lg:bg-opacity-50
    ${mobileOnly ? 'block lg:hidden w-full ' : ''}
  `}
  >
    <div>
      {before}
      <MainSections app={app} active={slug} />
      <ActiveSection app={app} active={slug} />
      {after}
    </div>
  </aside>
)
