import { MainSections, ActiveSection, ns as navNs } from './primary.mjs'

export const ns = navNs

export const AsideNavigation = ({ app, mobileOnly = false, before = [], after = [] }) => (
  <aside
    className={`
    fixed top-0 right-0 h-screen
    overflow-y-auto z-20
    bg-base-100 text-base-content
    ${app.state?.menu?.main ? '' : 'translate-x-[-120%]'} transition-transform
    px-0 pb-20 pt-8 shrink-0

    lg:w-auto
    lg:sticky lg:relative lg:transform-none
    lg:justify-center
    lg:border lg:border-dashed lg:border-l-0 lg:border-t-0 lg:border-b-0 lg:border-r-1 lg:border-base-300
    lg:bg-base-300 lg:bg-opacity-10
    lg:pt-16
    ${mobileOnly ? 'block lg:hidden w-full ' : ''}
  `}
  >
    <div className="w-screen lg:w-auto">
      {before}
      <MainSections app={app} />
      <div className=" border border-l-0 border-r-0 border-b-0 border-dashed border-base-300 mt-4 pt-4">
        <ActiveSection app={app} />
      </div>
      {after}
    </div>
  </aside>
)
