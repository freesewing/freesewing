import PrimaryNavigation from './primary'

const Aside = ({ app, slug, mobileOnly=false, before=[], after=[]}) => (
  <aside className={`
    fixed top-0 right-0 h-screen w-screen
    overflow-y-auto z-20
    bg-base-100 text-base-content md:bg-base-50
    transition-all
    ${app.primaryMenu ? '' : 'translate-x-[-100%]'} transition-transform
    md:flex md:sticky md:flex-row-reverse
    md:relative md:transform-none
    px-8 py-24
    shrink-0
    md:w-24 md:px-2 md:justify-center
    lg:w-max lg:pr-2 lg:border-r-2
    xl:w-max xl:border-0
    2xl:pr-8
    ${mobileOnly ? 'block md:hidden' : ''}
  `}>
    {before}
    <PrimaryNavigation app={app} active={slug}/>
    {after}
  </aside>
)

export default Aside
