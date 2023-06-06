import { useState } from 'react'
import { PanZoomPattern } from 'shared/components/workbench/pan-zoom-pattern.mjs'
import { TestMenu, ns as menuNs } from './menu.mjs'
import { objUpdate } from 'shared/utils.mjs'

export const ns = []

export const TestView = ({
  design,
  pattern,
  setView,
  settings,
  ui,
  update,
  language,
  account,
  DynamicDocs,
}) => {
  if (!pattern) return null
  if (settings.sample) pattern.sample()
  else pattern.draft()

  const renderProps = pattern.getRenderProps()
  const patternConfig = pattern.getConfig()
  return (
    <div className="flex flex-row">
      <div className="w-2/3 shrink-0 grow lg:p-4 sticky top-0">
        <PanZoomPattern {...{ renderProps }} />
      </div>
      <div className="w-1/3 shrink grow-0 lg:p-4 max-w-2xl h-screen overflow-scroll">
        <TestMenu
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
          }}
        />
      </div>
    </div>
  )
}
