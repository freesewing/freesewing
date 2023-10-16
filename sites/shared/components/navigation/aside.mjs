import { MainSections, ActiveSection, ns as navNs } from './primary.mjs'

export const ns = navNs

export const AsideNavigation = ({ mobileOnly = false, before = [], after = [] }) => (
  <aside
    className={`
    hidden lg:block
    min-h-screen
    z-20
    bg-base-100 text-base-content
    px-0 pb-20 shrink-0 pt-8

    lg:w-auto
    lg:justify-center
    lg:bg-base-300 lg:bg-opacity-10
    ${mobileOnly ? 'block lg:hidden w-full ' : ''}
  `}
  >
    <div className="w-screen lg:w-auto lg:sticky lg:top-28 max-h-screen overflow-y-auto">
      {before}
      <MainSections />
      <div className="mt-4 pt-4">
        <ActiveSection />
      </div>
      {after}
    </div>
  </aside>
)
