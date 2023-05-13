// Hooks
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
//Dependencies
import { loadSettingsConfig } from './config.mjs'
// Components
import { SettingsIcon, ClearIcon, HelpIcon } from 'shared/components/icons.mjs'
import Link from 'next/link'
import {
  Li,
  Ul,
  SumButton,
  SumDiv,
  Summary,
  Deg,
  SecText,
  Details,
  TopSummary,
  TopSumTitle,
} from '../index.mjs'
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

const CoreTitle = ({ name, t, changed, current = null, open = false, emoji = '' }) => (
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
  patternConfig,
  settingsConfig,
  changed,
}) => {
  const drillProps = { name, config, current, update, t, units, changed }

  const Input = inputs[name]
  const Value = values[name]

  // aabool setting needs the samm setting
  if (name === 'sabool') drillProps.samm = samm

  const buttons = []
  const openButtons = [
    <Link href={`/docs/core-settings/${name}`} className="btn btn-xs btn-ghost px-0">
      <HelpIcon className="w-4 h-4" />
    </Link>,
  ]
  if (changed) {
    buttons.push(
      <button
        className="btn btn-accent"
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

  return (
    <Collapse
      color={changed ? 'accent' : 'secondary'}
      openTitle={<CoreTitle open {...titleProps} />}
      title={<CoreTitle {...titleProps} />}
      buttons={buttons}
      openButtons={openButtons}
    >
      <Input {...drillProps} />
    </Collapse>
  )
}

export const ns = ['i18n', 'core-settings']

export const CoreSettings = ({ design, update, settings, patternConfig, language, account }) => {
  // FIXME: Update this namespace
  const { t } = useTranslation(['i18n', 'core-settings', design])

  const settingsConfig = loadSettingsConfig({
    language,
    control: account?.control,
    sabool: settings.sabool,
    parts: patternConfig.draftOrder,
  })
  // Default control level is 2 (in case people are not logged in)
  const control = account.control || 2

  return (
    <Collapse
      bottom
      color="primary"
      title={
        <div className="w-full flex flex-row gap2 items-center justify-between">
          <span className="font-bold">{t('core-settings:coreSettings.t')}</span>
          <SettingsIcon className="w-6 h-6 text-primary" />
        </div>
      }
      openTitle={t('core-settings:coreSettings')}
      openButtons={[
        <Link href="/docs/core-settings/${name}" className="btn btn-xs btn-ghost px-0">
          <HelpIcon className="w-4 h-4" />
        </Link>,
      ]}
    >
      <p>{t('core-settings:coreSettings.d')}</p>
      {Object.keys(settingsConfig)
        .filter((name) => settingsConfig[name].control <= control)
        .map((name) => (
          <Setting
            key={name}
            {...{ name, design, update, t, patternConfig }}
            config={settingsConfig[name]}
            current={settings[name]}
            changed={wasChanged(settings[name], name, settingsConfig)}
            samm={typeof settings.samm === 'undefined' ? settingsConfig.samm.dflt : settings.samm}
            units={settings.units}
          />
        ))}
    </Collapse>
  )
}
