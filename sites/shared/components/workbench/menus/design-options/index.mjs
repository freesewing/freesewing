//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { useCallback, useMemo } from 'react'
// Components
import { OptionsIcon } from 'shared/components/icons.mjs'
import { optionsMenuStructure, optionType } from 'shared/utils.mjs'
import { values } from './values.mjs'
import { inputs } from './inputs.mjs'
import { WorkbenchMenu } from '../shared/index.mjs'
import { MenuItem } from '../shared/menu-item.mjs'
import { DynamicMdx } from 'shared/components/mdx/dynamic.mjs'

export const ns = ['design-options']

// Emojis for option groups :)
export const emojis = {
  advanced: '🤓',
  fit: '👕',
  style: '💃🏽',
  dflt: '🕹️',
  groupDflt: '📁',
}

/**
 * A wrapper for {@see MenuItem} to handle design option-specific business
 * @param  {Object}    options.config   the config for the item
 * @param  {Object}    options.settings core settings
 * @param  {Object} options.rest     the rest of the props
 */
const DesignOption = ({ config, settings, control, ...rest }) => {
  const type = optionType(config)
  const Input = inputs[type]
  const Value = values[type]
  const allowOverride = ['pct', 'count', 'deg'].includes(type)
  const allowToggle =
    (control > 3 && type === 'bool') || (type == 'list' && config.list.length === 2)

  // Hide option?
  if (config?.hide || (typeof config?.hide === 'function' && config.hide(settings))) return null

  return (
    <MenuItem
      {...{
        config,
        control,
        ...rest,
        Input,
        Value,
        allowOverride,
        allowToggle,
      }}
      docs={
        <DynamicMdx
          language={rest.language}
          slug={`docs/designs/${rest.design}/options/${rest.name.toLowerCase()}`}
        />
      }
    />
  )
}

/**
 * The design options menu
 * @param  {String}  options.design        the name of the design
 * @param  {Object}  options.patternConfig the configuration from the pattern
 * @param  {Object}  options.settings      core settings
 * @param  {Object}  options.update        settings and ui update functions
 * @param  {String}  options.language      the menu language
 * @param  {Object}  options.account       the user account data
 */
export const DesignOptions = ({
  design,
  patternConfig,
  settings,
  update,
  language,
  account,
  isFirst = true,
}) => {
  const menuNs = [design, ...ns]
  const optionsMenu = useMemo(
    () => optionsMenuStructure(patternConfig.options, settings),
    [patternConfig, settings]
  )
  const updateFunc = useCallback(
    (name, value) => update.settings(['options', ...name], value),
    [update]
  )

  return (
    <WorkbenchMenu
      {...{
        config: optionsMenu,
        control: account.control,
        currentValues: settings.options,
        emojis,
        Icon: OptionsIcon,
        Item: DesignOption,
        isFirst,
        name: 'design-options:designOptions',
        language,
        ns: menuNs,
        passProps: { settings, patternConfig },
        updateFunc,
        values,
        isDesignOptionsGroup: true,
        design,
      }}
    />
  )
}
