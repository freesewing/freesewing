import { PanZoomContextProvider } from 'shared/components/workbench/pattern/pan-zoom-context.mjs'
import { ViewHeader, ns as headerNs } from './view-header.mjs'
import { MenuWrapper } from 'shared/components/workbench/menus/shared/menu-wrapper.mjs'

export const ns = headerNs

export const PatternWithMenu = ({
  settings,
  ui,
  update,
  control,
  title,
  pattern,
  menu,
  setSettings,
}) => (
  <PanZoomContextProvider>
    <div className="flex flex-col h-full">
      <ViewHeader
        {...{
          settings,
          ui,
          update,
          control,
          setSettings,
        }}
      />
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
