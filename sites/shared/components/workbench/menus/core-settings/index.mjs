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
  SaBoolSettingValue,
  SaMmSettingValue,
  ScaleSettingValue,
  UnitsSettingValue,
} from './values.mjs'

// Facilitate lookup of the value component
const values = {
  complete: CompleteSettingValue,
  locale: LocaleSettingValue,
  margin: MarginSettingValue,
  only: OnlySettingValue,
  paperless: PaperlessSettingValue,
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
  sabool: SaBoolSettingInput,
  samm: SaMmSettingInput,
  scale: ScaleSettingInput,
  units: UnitsSettingInput,
}

export const CoreTitle = ({ name, t, current = null, open = false, emoji = '' }) => (
  <div className={`flex flex-row gap-1 items-center w-full ${open ? '' : 'justify-between'}`}>
    <span className="font-medium">
      <span role="img" className="pr-2">
        {emoji}
      </span>
      {t(`core-settings:${name}.t`)}
      {open ? ':' : ''}
    </span>
    <span className="font-bold">{current}</span>
  </div>
)

const wasChanged = (current, name, settingsConfig) => {
  if (typeof current === 'undefined') return false
  if (current === settingsConfig[name].dflt) return false

  return true
}

export const Setting = ({
  name,
  config,
  current,
  update,
  t,
  samm,
  units,
  changed,
  loadDocs,
  control,
}) => {
  const drillProps = { name, config, current, update, t, units, changed }

  const Input = inputs[name]
  const Value = values[name]

  // sabool setting needs the samm setting
  if (name === 'sabool') drillProps.samm = samm

  const buttons = []
  const openButtons = []
  if (loadDocs)
    openButtons.push(
      <button
        className="btn btn-xs btn-ghost px-0"
        key="help"
        onClick={(evt) => loadDocs(evt, name)}
      >
        <HelpIcon className="w-4 h-4" />
      </button>
    )
  if (changed) {
    buttons.push(
      <button
        className="btn btn-accent"
        key="clear"
        onClick={(evt) => {
          evt.stopPropagation()
          update.settings([name], config.dflt)
        }}
      >
        <ClearIcon />
      </button>
    )
    openButtons.push(
      <button
        className="btn btn-ghost btn-xs px-0"
        key="clear"
        onClick={(evt) => {
          evt.stopPropagation()
          update.settings([name], config.dflt)
        }}
      >
        <ClearIcon />
      </button>
    )
  }

  const titleProps = { name, t, current: <Value {...drillProps} />, emoji: config.emoji }

  const boolSettings = ['sabool', 'paperless', 'details']

  if (control > 4) {
    // Save gurus some clicks
    if (boolSettings.includes(name))
      return (
        <Collapse
          color={changed ? 'accent' : 'primary'}
          title={<CoreTitle {...titleProps} />}
          onClick={() => update.settings([name], current ? 0 : 1)}
        />
      )
    if (name === 'units')
      return (
        <Collapse
          color={changed ? 'accent' : 'primary'}
          title={<CoreTitle {...titleProps} />}
          onClick={() => update.settings([name], current === 'metric' ? 'imperial' : 'metric')}
        />
      )
    if (name === 'renderer')
      return (
        <Collapse
          color={changed ? 'accent' : 'primary'}
          title={<CoreTitle {...titleProps} />}
          onClick={() => update.ui([name], current === 'svg' ? 'react' : 'svg')}
        />
      )
  }

  return (
    <Collapse
      color={changed ? 'accent' : 'primary'}
      openTitle={<CoreTitle open {...titleProps} />}
      title={<CoreTitle {...titleProps} />}
      buttons={buttons}
      openButtons={openButtons}
    >
      <Input {...drillProps} />
    </Collapse>
  )
}

export const ns = ['i18n', 'core-settings', 'modal']

export const CoreSettings = ({
  design,
  update,
  settings,
  patternConfig,
  language,
  DynamicDocs,
  control,
}) => {
  // FIXME: Update this namespace
  const { t } = useTranslation(['i18n', 'core-settings', design])
  const { setModal } = useContext(ModalContext)

  // For the simplest experience, not core settings are shown at all
  if (control < 2) return null

  const settingsConfig = loadSettingsConfig({
    language,
    control,
    sabool: settings.sabool,
    parts: patternConfig.draftOrder,
  })

  const loadDocs = DynamicDocs
    ? (evt, setting = false) => {
        evt.stopPropagation()
        let path = `site/draft/core-settings`
        if (setting) path += `/${setting}`
        setModal(
          <ModalWrapper>
            <div className="max-w-prose">
              <DynamicDocs path={path} language={language} />
            </div>
          </ModalWrapper>
        )
      }
    : false

  return (
    <>
      <div className="px-2 mt-8">
        {control > 4 ? (
          <div className="border-t border-solid border-base-300 pb-2 mx-36"></div>
        ) : (
          <>
            <h5 className="flex flex-row gap-2 items-center">
              <SettingsIcon />
              <span>{t('core-settings:coreSettings')}</span>
            </h5>
            <p>{t('core-settings:coreSettings.d')}</p>
          </>
        )}
      </div>
      {Object.keys(settingsConfig)
        .filter((name) => settingsConfig[name].control <= control)
        .map((name) => (
          <Setting
            key={name}
            {...{ name, design, update, t, patternConfig, loadDocs, control }}
            config={settingsConfig[name]}
            current={settings[name]}
            changed={wasChanged(settings[name], name, settingsConfig)}
            samm={typeof settings.samm === 'undefined' ? settingsConfig.samm.dflt : settings.samm}
            units={settings.units}
          />
        ))}
    </>
  )
}
