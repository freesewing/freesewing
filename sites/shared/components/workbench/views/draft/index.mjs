import { PanZoomPattern as ShowPattern } from 'shared/components/workbench/pan-zoom-pattern.mjs'
import { DraftMenu, ns as menuNs } from './menu.mjs'
import { ViewHeader, ns as headerNs } from 'shared/components/workbench/views/view-header.mjs'
import { PanZoomContextProvider } from 'shared/components/workbench/pattern/pan-zoom-context.mjs'

export const ns = [menuNs, ...headerNs]

export const DraftView = ({
  design,
  pattern,
  patternConfig,
  settings,
  setSettings,
  ui,
  update,
  language,
  account,
  DynamicDocs,
  setView,
  view,
}) => {
  let output = null
  let renderProps = false
  if (ui.renderer === 'svg') {
    try {
      const __html = pattern.render()
      output = (
        <ShowPattern>
          <div className="w-full h-full" dangerouslySetInnerHTML={{ __html }} />
        </ShowPattern>
      )
    } catch (err) {
      console.log(err)
    }
  } else {
    renderProps = pattern.getRenderProps()
    output = <ShowPattern {...{ renderProps }} />
  }

  return (
    <PanZoomContextProvider>
      <div className="flex flex-col">
        <ViewHeader
          {...{
            settings,
            setSettings,
            ui,
            update,
            control: account.control,
            setSettings,
          }}
        />
        <div className="flex flex-row">
          <div className="w-2/3 shrink-0 grow lg:p-4 sticky top-0">{output}</div>
          <div className="w-1/3 shrink grow-0 lg:p-4 max-w-2xl h-screen overflow-scroll">
            <DraftMenu
              {...{
                design,
                pattern,
                patternConfig,
                setSettings,
                settings,
                ui,
                update,
                language,
                account,
                DynamicDocs,
                renderProps,
                view,
                setView,
              }}
            />
          </div>
        </div>
      </div>
    </PanZoomContextProvider>
  )
}
