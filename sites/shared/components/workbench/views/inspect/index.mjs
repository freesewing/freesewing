import { useState } from 'react'
import { InspectorPattern } from './inspector/pattern.mjs'
import { DraftMenu, ns as menuNs } from './menu.mjs'
import { objUpdate } from 'shared/utils.mjs'
import { ViewHeader } from '../view-header.mjs'
import { PanZoomContextProvider } from 'shared/components/workbench/pattern/pan-zoom-context.mjs'

export const ns = menuNs

export const InspectView = ({
  design,
  pattern,
  patternConfig,
  settings,
  ui,
  update,
  language,
  account,
  DynamicDocs,
  setView,
  view,
}) => {
  // State for inspector
  const [inspect, setInspect] = useState({
    show: {},
    reveal: {},
  })

  const inspector = {
    show: (data) => {
      const newInspect = { ...inspect }
      newInspect.show[data.id] = data
      setInspect(newInspect)
    },
    hide: (id) => {
      const newInspect = { ...inspect }
      delete newInspect.show[id]
      delete newInspect.reveal[id]
      setInspect(newInspect)
    },
    reveal: (id) => {
      const newInspect = { ...inspect }
      if (newInspect.reveal[id]) delete newInspect.reveal[id]
      else newInspect.reveal[id] = 1
      setInspect(newInspect)
    },
    update: (path, val) => {
      const newInspect = objUpdate({ ...inspect }, path, val)
      setInspect(newInspect)
    },
    data: inspect,
    pattern: pattern,
  }

  let output = null
  let renderProps = false
  if (ui.renderer === 'svg') {
    try {
      const __html = pattern.render()
      output = <div dangerouslySetInnerHTML={{ __html }} />
    } catch (err) {
      console.log(err)
    }
  } else {
    renderProps = pattern.getRenderProps()
    output = <InspectorPattern {...{ renderProps, inspector }} />
  }

  return (
    <PanZoomContextProvider>
      <div className="flex flex-col">
        <ViewHeader
          {...{
            settings,
            ui,
            update,
            control: account.control,
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
                settings,
                ui,
                update,
                language,
                account,
                DynamicDocs,
                inspector,
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
