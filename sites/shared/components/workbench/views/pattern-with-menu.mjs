import { PanZoomContextProvider } from 'shared/components/workbench/pattern/pan-zoom-context.mjs'
import { MenuWrapper } from 'shared/components/workbench/menus/shared/menu-wrapper.mjs'

export const ns = ['common', 'core-settings', 'ui-settings']

/** a layout for views that include a drafted pattern, a sidebar menu, and a header you pass it */
export const PatternWithMenu = ({
  settings,
  ui,
  update,
  control,
  account,
  design,
  title,
  pattern,
  menu,
  setSettings,
  Header = false,
}) => (
  <PanZoomContextProvider>
    <div className="flex flex-col h-full">
      {Header ? (
        <Header
          {...{
            settings,
            ui,
            update,
            control,
            account,
            design,
            setSettings,
          }}
        />
      ) : null}
      <div className="flex lg:flex-row grow lg:max-h-[90vh] max-h-[calc(100vh-3rem)] h-full py-4 lg:mt-6">
        <div className="lg:w-2/3 flex flex-col h-full grow px-4">
          {title}
          {pattern}
        </div>
        {menu && <MenuWrapper order={1}>{menu}</MenuWrapper>}
      </div>
    </div>
  </PanZoomContextProvider>
)
