import { PanZoomPattern as ShowPattern } from 'shared/components/workbench/pan-zoom-pattern.mjs'
import { DraftMenu, ns as menuNs } from './menu.mjs'
import { PatternWithMenu, ns as wrapperNs } from '../pattern-with-menu.mjs'

export const ns = [...menuNs, ...wrapperNs]

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
      output = <div dangerouslySetInnerHTML={{ __html }} />
    } catch (err) {
      console.log(err)
    }
  } else {
    renderProps = pattern.getRenderProps()
    output = <ShowPattern {...{ renderProps }} />
  }

  return (
    <PatternWithMenu
      {...{
        settings,
        ui,
        update,
        control: account.control,
        pattern: output,
        setSettings,
        menu: (
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
              renderProps,
              view,
              setView,
            }}
          />
        ),
      }}
    />
  )
}
