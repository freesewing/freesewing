import { DesignOptions } from 'shared/components/workbench/menus/design-options/index.mjs'
import { CoreSettings } from 'shared/components/workbench/menus/core-settings/index.mjs'
import { XrayMenu } from 'shared/components/workbench/menus/xray/index.mjs'

export const DraftMenu = ({ design, pattern, patternConfig, settings, ui, update }) => (
  <nav className="grow mb-12">
    <DesignOptions {...{ design, patternConfig, settings, update }} />
    <CoreSettings {...{ patternConfig, settings, update }} />
    {ui.renderer === 'react' && <XrayMenu {...{ ui, update }} />}
  </nav>
)
