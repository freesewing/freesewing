// Components
import { OptionsIcon } from 'shared/components/icons.mjs'
import { optionsMenuStructure } from 'shared/utils.mjs'
import { optionType, formatMm } from 'shared/utils.mjs'
import {
  BoolInput,
  ConstantInput,
  SliderInput,
  DegInput,
  ListInput,
  PctInput,
} from '../shared/inputs.mjs'
import {
  BoolOptionValue,
  ConstantOptionValue,
  CountOptionValue,
  DegOptionValue,
  ListOptionValue,
  MmOptionValue,
  PctOptionValue,
} from './values.mjs'
import { WorkbenchMenu } from '../shared/index.mjs'
import { MenuItem } from '../shared/menu-item.mjs'

export const ns = ['design-options']

const PctOptionInput = (props) => {
  const { config, settings, changed } = props
  const currentOrDefault = changed ? props.current : config.dflt / 100
  return (
    <PctInput {...props}>
      <div className="flex flex-row justify-around">
        <span className={changed ? 'text-accent' : 'text-secondary'}>
          {config.toAbs && settings.measurements
            ? formatMm(config.toAbs(currentOrDefault, settings))
            : ' '}
        </span>
      </div>
    </PctInput>
  )
}

// Facilitate lookup of the input component
const inputs = {
  bool: BoolInput,
  constant: ConstantInput,
  count: SliderInput,
  deg: DegInput,
  list: ListInput,
  mm: () => <span>FIXME: Mm options are deprecated. Please report this </span>,
  pct: PctOptionInput,
}

// Facilitate lookup of the value component
const values = {
  bool: BoolOptionValue,
  constant: ConstantOptionValue,
  count: CountOptionValue,
  deg: DegOptionValue,
  list: ListOptionValue,
  mm: MmOptionValue,
  pct: PctOptionValue,
}

// Emojis for option groups :)
const emojis = {
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
export const DesignOption = ({ config, settings, ...rest }) => {
  const type = optionType(config)
  const Input = inputs[type]
  const Value = values[type]
  const allowOverride = ['pct', 'count', 'deg'].includes(type)

  // Hide option?
  if (config?.hide || (typeof config?.hide === 'function' && config.hide(settings))) return null

  return (
    <MenuItem
      {...{
        config,
        ...rest,
        Input,
        Value,
        allowOverride,
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
        name: 'design-options:designOptions',
        language,
        ns: menuNs,
        passProps: { settings },
        updateFunc: (name, value) => update.settings(['options', name], value),
      }}
    />
  )
}
