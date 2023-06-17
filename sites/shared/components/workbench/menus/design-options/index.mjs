// Components
import { OptionsIcon } from 'shared/components/icons.mjs'
import { optionsMenuStructure, optionType } from 'shared/utils.mjs'

import { values } from './values.mjs'
import { inputs } from './inputs.mjs'
import { WorkbenchMenu } from '../shared/index.mjs'
import { MenuItem } from '../shared/menu-item.mjs'

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
 * @param  {Boolean|React.component} options.DynamicDocs   A docs component
 */
export const DesignOptions = ({
  design,
  patternConfig,
  settings,
  update,
  language,
  account,
  isFirst = true,
  DynamicDocs = false,
}) => {
  const menuNs = [`o_${design}`, ...ns]
  const optionsMenu = optionsMenuStructure(patternConfig.options)
  const getDocsPath = (option) =>
    `patterns/${design}/options${option ? '/' + option.toLowerCase() : ''}`

  return (
    <WorkbenchMenu
      {...{
        config: optionsMenu,
        control: account.control,
        currentValues: settings.options,
        DynamicDocs,
        emojis,
        getDocsPath,
        Icon: OptionsIcon,
        Item: DesignOption,
        isFirst,
        name: 'design-options:designOptions',
        language,
        ns: menuNs,
        passProps: { settings, patternConfig },
        updateFunc: (name, value) => update.settings(['options', ...name], value),
      }}
    />
  )
}
