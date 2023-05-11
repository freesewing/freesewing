import { Pattern } from 'shared/components/workbench/pattern/index.mjs'
import { DraftMenu } from './menu.mjs'

export const DraftView = ({ design, pattern, patternConfig, setView, settings, ui, update }) => (
  <div className="flex flex-row items-top">
    <div className="w2/3 shrink-0 grow lg:p-4">
      <Pattern {...{ pattern, setView, settings, ui, update }} />
    </div>
    <div className="w1/3 shrink-0 grow border-l-2 border-dotted border-secondary lg:p-4">
      <DraftMenu {...{ design, pattern, patternConfig, settings, ui, update }} />
    </div>
  </div>
)
