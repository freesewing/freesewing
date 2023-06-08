import {
  DesignOptions,
  ns as designMenuNs,
} from 'shared/components/workbench/menus/design-options/index.mjs'
import {
  CoreSettings,
  ns as coreMenuNs,
} from 'shared/components/workbench/menus/core-settings/index.mjs'
import { UiSettings, ns as uiNs } from 'shared/components/workbench/menus/ui-settings/index.mjs'
import { Inspector, ns as inspectorNs } from './inspector/menu.mjs'

export const ns = [...coreMenuNs, ...designMenuNs, ...uiNs, inspectorNs]

export const DraftMenu = ({
  design,
  patternConfig,
  settings,
  ui,
  update,
  language,
  account,
  DynamicDocs,
  inspector = false,
  renderProps,
}) => {
  const control = account.control
  const menuProps = {
    design,
    patternConfig,
    settings,
    update,
    language,
    account,
    DynamicDocs,
    control,
  }

  return (
    <nav className="grow mb-12">
      {ui.inspect ? <Inspector {...menuProps} {...{ ui, inspector, renderProps }} /> : null}
      <DesignOptions {...menuProps} />
      <CoreSettings {...menuProps} />
      <UiSettings {...menuProps} ui={ui} />
    </nav>
  )
}
