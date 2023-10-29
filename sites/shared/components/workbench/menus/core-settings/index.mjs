//  __SDEFILE__ - This file is a dependency for the stand-alone environment
//Dependencies
import { loadSettingsConfig, defaultSamm } from './config.mjs'
// Components
import { SettingsIcon, TrashIcon } from 'shared/components/icons.mjs'
import { WorkbenchMenu } from '../shared/index.mjs'
import { MenuItem } from '../shared/menu-item.mjs'
import { DynamicMdx } from 'shared/components/mdx/dynamic.mjs'
// input components and event handlers
import { inputs, handlers } from './inputs.mjs'
// values
import { values } from './values.mjs'

import { useTranslation } from 'next-i18next'

export const ns = ['core-settings', 'modal']

/** A wrapper for {@see MenuItem} to handle core settings-specific business */
const CoreSetting = ({ name, config, control, updateFunc, current, passProps, ...rest }) => {
  // is toggling allowed?
  const allowToggle = control > 3 && config.list?.length === 2

  const handlerArgs = {
    updateFunc,
    current,
    config,
    ...passProps,
  }
  // get the appropriate event handler if there is one
  const handler = handlers[name] ? handlers[name](handlerArgs) : updateFunc

  return (
    <MenuItem
      {...{
        name,
        config,
        control,
        current,
        passProps,
        ...rest,
        allowToggle,
        updateFunc: handler,
      }}
      docs={
        <DynamicMdx
          language={rest.language}
          slug={`docs/about/site/draft/core-settings/${name.toLowerCase()}`}
        />
      }
    />
  )
}

export const ClearAllButton = ({ setSettings, compact = false }) => {
  const { t } = useTranslation('core-settings')
  return (
    <div className={`${compact ? '' : 'text-center mt-8'}`}>
      <button
        className={`justify-self-center btn btn-error btn-outline ${compact ? 'btn-sm' : ''}`}
        onClick={() => setSettings({})}
      >
        <TrashIcon />
        {t('clearSettings')}
      </button>
    </div>
  )
}

/**
 * The core settings menu
 * @param  {Object} options.update        settings and ui update functions
 * @param  {Object} options.settings      core settings
 * @param  {Object} options.patternConfig the configuration from the pattern
 * @param  {String} options.language      the menu language
 * @param  {Object} options.account       the user account data
 */
export const CoreSettings = ({ update, settings, patternConfig, language, account, design }) => {
  const settingsConfig = loadSettingsConfig({
    language,
    units: settings.units,
    sabool: settings.sabool,
    parts: patternConfig.draftOrder,
  })

  const passProps = {
    samm: typeof settings.samm === 'undefined' ? defaultSamm(settings.units) : settings.samm,
    units: settings.units,
  }

  return (
    <WorkbenchMenu
      {...{
        config: settingsConfig,
        control: account.control,
        currentValues: settings,
        Icon: SettingsIcon,
        inputs,
        language,
        name: 'coreSettings',
        ns,
        passProps,
        design,
        updateFunc: update.settings,
        values,
        Item: CoreSetting,
      }}
    />
  )
}
