import { useTranslation } from 'next-i18next'
import {
  DesignOptions,
  ns as designMenuNs,
} from 'shared/components/workbench/menus/design-options/index.mjs'
import {
  CoreSettings,
  ns as coreMenuNs,
} from 'shared/components/workbench/menus/core-settings/index.mjs'
import { CutSettings, ns as cutNs } from './settings.mjs'
import { ShowButtonsToggle } from 'shared/components/workbench/pattern/movable/transform-buttons.mjs'
import { ClearIcon } from 'shared/components/icons.mjs'
export const ns = [...coreMenuNs, ...designMenuNs, ...cutNs, 'workbench']

const CutActions = ({ update, ui, materialSettings }) => {
  // get translation for the menu
  const { t } = useTranslation(['workbench'])

  const resetLayout = () => update.ui(['layouts', 'cut', materialSettings.activeMaterial])

  return (
    <div className="mt-2 mb-4">
      <div className="flex justify-evenly flex-col lg:flex-row">
        <ShowButtonsToggle update={update} ui={ui} />
        <button className="btn btn-primary btn-outline" onClick={resetLayout}>
          <ClearIcon />
          <span className="ml-2">{t('reset')}</span>
        </button>
      </div>
    </div>
  )
}

export const CutMenu = ({
  design,
  patternConfig,
  settings,
  ui,
  update,
  language,
  account,
  DynamicDocs,
  materialSettings,
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
      <CutActions update={update} ui={ui} materialSettings={materialSettings} />
      <CutSettings {...menuProps} ui={ui} materialSettings={materialSettings} />
      <DesignOptions {...menuProps} />
      <CoreSettings {...menuProps} />
    </nav>
  )
}
