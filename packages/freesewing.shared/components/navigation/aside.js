import PrimaryNavigation from './primary'

const Aside = ({ app, slug, mobileOnly=false }) => (
  <aside className={`
    fixed top-0 right-0 h-screen w-screen
    overflow-y-auto z-20
    bg-base-100 text-base-content md:bg-base-50
    transition-all
    ${app.primaryMenu ? '' : 'translate-x-[-100%]'} transition-transform
    md:flex md:sticky md:flex-row-reverse
    md:relative md:transform-none
    px-8 py-24

    md:w-40
    lg:w-1/2 lg:min-w-80 lg:pr-2 lg:border-r-2
    xl:w-1/3 xl:min-w-80 xl:pr-2 xl:border-0
    2xl:min-w-96 2xl:pr-8
    ${mobileOnly ? 'block md:hidden' : ''}
  `}>
    <PrimaryNavigation app={app} active={slug}/>
  </aside>
)

export default Aside
