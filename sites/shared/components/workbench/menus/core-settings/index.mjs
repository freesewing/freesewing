// Hooks
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Context
import { ModalContext } from 'shared/context/modal-context.mjs'
//Dependencies
import { loadSettingsConfig } from './config.mjs'
// Components
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { SettingsIcon, ClearIcon, HelpIcon } from 'shared/components/icons.mjs'
import { Collapse } from 'shared/components/collapse.mjs'
import {
  CompleteSettingInput,
  LocaleSettingInput,
  MarginSettingInput,
  OnlySettingInput,
  PaperlessSettingInput,
  RendererSettingInput,
  SaBoolSettingInput,
  SaMmSettingInput,
  ScaleSettingInput,
  UnitsSettingInput,
} from './inputs.mjs'
import {
  CompleteSettingValue,
  LocaleSettingValue,
  MarginSettingValue,
  OnlySettingValue,
  PaperlessSettingValue,
  RendererSettingValue,
  SaBoolSettingValue,
  SaMmSettingValue,
  ScaleSettingValue,
  UnitsSettingValue,
} from './values.mjs'
import { WorkbenchMenu } from '../shared/index.mjs'

// Facilitate lookup of the value component
const values = {
  complete: CompleteSettingValue,
  locale: LocaleSettingValue,
  margin: MarginSettingValue,
  only: OnlySettingValue,
  paperless: PaperlessSettingValue,
  renderer: RendererSettingValue,
  sabool: SaBoolSettingValue,
  samm: SaMmSettingValue,
  scale: ScaleSettingValue,
  units: UnitsSettingValue,
}

// Facilitate lookup of the input component
const inputs = {
  complete: CompleteSettingInput,
  locale: LocaleSettingInput,
  margin: MarginSettingInput,
  only: OnlySettingInput,
  paperless: PaperlessSettingInput,
  renderer: RendererSettingInput,
  sabool: SaBoolSettingInput,
  samm: SaMmSettingInput,
  scale: ScaleSettingInput,
  units: UnitsSettingInput,
}

export const ns = ['core-settings', 'modal']

export const CoreSettings = ({
  design,
  update,
  settings,
  patternConfig,
  language,
  account,
  DynamicDocs,
}) => {
  const { setModal } = useContext(ModalContext)

  const settingsConfig = loadSettingsConfig({
    language,
    control: account.control,
    sabool: settings.sabool,
    parts: patternConfig.draftOrder,
  })
  // Default control level is 2 (in case people are not logged in)
  const control = account.control || 2

  return (
    <WorkbenchMenu
      {...{
        updater: update.settings,
        ns,
        Icon: SettingsIcon,
        name: 'coreSettings',
        config: settingsConfig,
        control,
        inputs,
        values,
        currentValues: settings,
        passProps: {
          samm: typeof settings.samm === 'undefined' ? settingsConfig.samm.dflt : settings.samm,
          units: settings.units,
        },
        language,
        DynamicDocs,
        getDocsPath: (setting) => `site/draft/core-settings${setting ? `/${setting}` : ''}`,
      }}
    />
  )
}
