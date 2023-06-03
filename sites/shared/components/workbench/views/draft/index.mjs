import { useState } from 'react'
import { PanZoomPattern as ShowPattern } from 'shared/components/workbench/pan-zoom-pattern.mjs'
import { InspectorPattern } from './inspector/pattern.mjs'
import { DraftMenu, ns as menuNs } from './menu.mjs'
import { objUpdate } from 'shared/utils.mjs'

export const ns = menuNs

export const DraftView = ({
  design,
  pattern,
  patternConfig,
  setView,
  settings,
  ui,
  update,
  language,
  account,
  DynamicDocs,
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
  if (ui.renderer === 'svg') {
    try {
      const __html = pattern.render()
      output = <div dangerouslySetInnerHTML={{ __html }} />
    } catch (err) {
      console.log(err)
    }
  } else {
    output = ui.inspect ? (
      <InspectorPattern renderProps={pattern.getRenderProps()} inspector={inspector} />
    ) : (
      <ShowPattern renderProps={pattern.getRenderProps()} />
    )
  }

  return (
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
          }}
        />
      </div>
    </div>
  )
}
