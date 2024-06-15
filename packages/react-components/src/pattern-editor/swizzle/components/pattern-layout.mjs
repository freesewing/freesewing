import { PanZoomContextProvider } from 'shared/components/workbench/pattern/pan-zoom-context.mjs'
import { MenuWrapper } from 'shared/components/workbench/menus/shared/menu-wrapper.mjs'

export const ns = ['common', 'core-settings', 'ui-settings']

/**
 * A layout for views that include a drafted pattern
 *
 * @param {object} settings - The pattern settings/state
 * @param {object} ui - The UI settings/state
 * @param {object} update - Object holding methods to manipulate state
 * @param {integer} control - The control value
 * @param {function} Design - The Design contructor
 * @param {object] pattern - The drafted pattern
 */
export const PatternLayout = (props) => {
  //  settings,
  //  ui,
  //  update,
  //  control,
  //  account,
  //  design,
  //  title,
  //  pattern,
  //  menu,
  //  setSettings,
  //  saveAs,
  //  Header = false,
  const {
    Header = false,
    menu = null,
    title = '',
    control,
    Design,
    pattern,
    settings,
    ui,
    update,
  } = props
  const { ZoomContextProvider } = props.components

  return <p>Layout here</p>
  return (
    <ZoomContextProvider>
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
              saveAs,
            }}
          />
        ) : null}
        <div className="flex lg:flex-row grow lg:max-h-[90vh] max-h-[calc(100vh-3rem)] h-full py-4 lg:mt-6">
          <div className="lg:w-2/3 flex flex-col h-full grow px-4">
            {title}
            {pattern}
          </div>
          {menu ? menu : null}
        </div>
      </div>
    </ZoomContextProvider>
  )
}

//{menu && <MenuWrapper order={1}>{menu}</MenuWrapper>}
