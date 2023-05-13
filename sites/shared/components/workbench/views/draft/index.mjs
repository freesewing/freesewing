import { Pattern } from 'shared/components/workbench/pattern/index.mjs'
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
}) => (
  <div className="flex flex-row items-top">
    <div className="w-2/3 shrink-0 grow lg:p-4">
      <Pattern {...{ pattern, setView, settings, ui, update }} />
    </div>
    <div className="w-1/3 shrink grow-0 lg:p-4 max-w-2xl">
      <DraftMenu {...{ design, pattern, patternConfig, settings, ui, update, language, account }} />
    </div>
  </div>
)
