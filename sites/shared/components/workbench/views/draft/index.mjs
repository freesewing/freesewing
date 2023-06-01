import { PanZoomPattern as ReactPattern } from 'shared/components/workbench/pan-zoom-pattern.mjs'
import { DraftMenu, ns as menuNs } from './menu.mjs'

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
  let output = null
  if (ui.renderer === 'svg') {
    try {
      const __html = pattern.render()
      output = <div dangerouslySetInnerHTML={{ __html }} />
    } catch (err) {
      console.log(err)
    }
  } else output = <ReactPattern renderProps={pattern.getRenderProps()} />

  return (
    <div className="flex flex-row">
      <div className="w-2/3 shrink-0 grow lg:p-4 sticky top-0">
        <pre>{JSON.stringify(ui, null, 2)}</pre>
        {output}
      </div>
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
          }}
        />
      </div>
    </div>
  )
}
