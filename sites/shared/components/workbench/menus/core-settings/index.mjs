//Dependencies
import { loadSettingsConfig, defaultSamm } from './config.mjs'
// Components
import { SettingsIcon, TrashIcon } from 'shared/components/icons.mjs'
import { WorkbenchMenu } from '../shared/index.mjs'
import { MenuItem } from '../shared/menu-item.mjs'
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
    />
  )
}

export const ClearAllButton = ({ setSettings, compact, className }) => {
  const { t } = useTranslation('core-settings')
  const title = t('clearSettings')
  return (
    <div
      className={`${compact ? 'tooltip tooltip-bottom tooltip-primary' : 'text-center mt-8'}`}
      data-tip={title}
    >
      <button
        className={`${
          className ||
          'justify-self-center btn-outline btn btn-primary' + (compact ? ' btn-sm' : '')
        }`}
        onClick={() => setSettings({})}
        title={compact && title}
      >
        <TrashIcon />
        {compact ? '' : title}
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
        DynamicDocs,
        getDocsPath: (setting) => `site/draft/core-settings${setting ? `/${setting}` : ''}`,
        Icon: SettingsIcon,
        inputs,
        language,
        name: 'coreSettings',
        ns,
        passProps,
        updateFunc: update.settings,
        values,
        Item: CoreSetting,
      }}
    />
  )
}
