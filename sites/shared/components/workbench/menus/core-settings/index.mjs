//Dependencies
import { loadSettingsConfig, defaultSamm } from './config.mjs'
// Components
import { SettingsIcon } from 'shared/components/icons.mjs'
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

/**
 * The core settings menu
 * @param  {Object} options.update        settings and ui update functions
 * @param  {Object} options.settings      core settings
 * @param  {Object} options.patternConfig the configuration from the pattern
 * @param  {String} options.language      the menu language
 * @param  {Object} options.account       the user account data
 * @param  {Boolean|React.Com options.DynamicDocs   A docs component
 */
export const CoreSettings = ({
  update,
  settings,
  patternConfig,
  language,
  account,
  DynamicDocs,
}) => {
  const settingsConfig = loadSettingsConfig({
    language,
    units: settings.units,
    sabool: settings.sabool,
    parts: patternConfig.draftOrder,
  })

  return (
    <WorkbenchMenu
      {...{
        config: settingsConfig,
        control: account.control,
        currentValues: settings,
        DynamicDocs,
        getDocsPath: (setting) => `site/draft/core-settings${setting ? `/${setting}` : ''}`,
        Icon: SettingsIcon,
        inputs,
        language,
        name: 'coreSettings',
        ns,
        passProps: {
          samm: typeof settings.samm === 'undefined' ? defaultSamm(settings.units) : settings.samm,
          units: settings.units,
        },
        updateFunc: update.settings,
        values,
      }}
    />
  )
}
