import {
  DesignOptions,
  ns as designMenuNs,
} from 'shared/components/workbench/menus/design-options/index.mjs'
import {
  CoreSettings,
  ns as coreMenuNs,
} from 'shared/components/workbench/menus/core-settings/index.mjs'
import { PrintSettings, ns as printMenuNs } from './settings.mjs'
export const ns = [...coreMenuNs, ...designMenuNs, ...printMenuNs]

export const PrintMenu = ({
  design,
  patternConfig,
  settings,
  ui,
  update,
  language,
  account,
  DynamicDocs,
  inspector = false,
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
      <PrintSettings {...menuProps} ui={ui} />
      <DesignOptions {...menuProps} />
      <CoreSettings {...menuProps} />
    </nav>
  )
}
