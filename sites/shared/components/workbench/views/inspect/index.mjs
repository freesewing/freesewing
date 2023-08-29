import { useState } from 'react'
import { InspectorPattern } from './inspector/pattern.mjs'
import { DraftMenu, ns as menuNs } from './menu.mjs'
import { objUpdate } from 'shared/utils.mjs'
import { PatternWithMenu, ns as wrapperNs } from '../pattern-with-menu.mjs'
import { V3Wip } from 'shared/components/v3-wip.mjs'

export const ns = [...menuNs, ...wrapperNs]

export const InspectView = ({
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
    <PatternWithMenu
      {...{
        settings,
        ui,
        update,
        control: account.control,
        account,
        design,
        setSettings,
        pattern: output,
        menu: (
          <>
            <V3Wip />
            <DraftMenu
              {...{
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
                inspector,
                renderProps,
                view,
                setView,
              }}
            />
          </>
        ),
      }}
    />
  )
}
