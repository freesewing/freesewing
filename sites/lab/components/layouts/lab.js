import ThemePicker from 'shared/components/theme-picker.js'
import LocalePicker from 'shared/components/locale-picker.js'
import VersionPicker from 'site/components/version-picker.js'

export const BeforeNav = ({ app }) => (
  <>
    <div className="md:hidden flex flex-row flex-wrap sm:flex-nowrap gap-2 mb-2">
      <ThemePicker app={app} />
      <LocalePicker app={app} />
    </div>
    <div className="md:hidden flex flex-row flex-wrap sm:flex-nowrap gap-2 mb-2">
      <VersionPicker app={app} />
    </div>
  </>
)

const LabLayout = ({ app, AltMenu, children=[] }) => (
  <div className="py-24 lg:py-36 flex flex-row">
    <div className="w-full px-8">
      {children}
    </div>
    <aside className={`
      fixed top-0 right-0
      pt-20 pb-8 px-8
      md:pt-0
      md:relative md:transform-none
      h-screen w-screen
      bg-base-100
      md:bg-base-50
      md:flex
      md:sticky
      overflow-y-scroll
      z-20
      bg-base-100 text-base-content
      transition-all
      xl:w-1/4
      ${app.primaryMenu ? '' : 'translate-x-[-100%]'} transition-transform
      md:flex-row
      md:w-80
      lg:w-96
      shrink-0
    `}>
      <BeforeNav app={app}/>
      {AltMenu}
    </aside>
  </div>
)

export default LabLayout
