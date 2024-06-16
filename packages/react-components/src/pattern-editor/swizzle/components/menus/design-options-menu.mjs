import { useCallback, useMemo } from 'react'
// REMOVEME
// Components
//import { OptionsIcon } from 'shared/components/icons.mjs'
//import { optionsMenuStructure, optionType } from 'shared/utils.mjs'
//import { values } from './values.mjs'
//import { inputs } from './inputs.mjs'
//import { WorkbenchMenu } from '../shared/index.mjs'
//import { MenuItem } from '../shared/menu-item.mjs'
//import { DynamicMdx } from 'shared/components/mdx/dynamic.mjs'

//import { formatMm, formatPercentage } from 'shared/utils.mjs'
//import { ListValue, HighlightedValue, PlainValue, BoolValue } from '../shared/values'
//import { mergeOptions } from '@freesewing/core'

/**
 * The design options menu
 * @param  {String}  options.design        the name of the design
 * @param  {Object}  options.patternConfig the configuration from the pattern
 * @param  {Object}  options.settings      core settings
 * @param  {Object}  options.update        settings and ui update functions
 * @param  {String}  options.language      the menu language
 * @param  {Object}  options.account       the user account data
 */
export const DesignOptionsMenu = (props) => {
  //  design,
  //  patternConfig,
  //  settings,
  //  update,
  //  language,
  //  account,
  //  isFirst = true,
  //}) => {
  const { config, isFirst = true, update } = props
  const { menuOptionType } = props.methods
  const {
    BoolNoIcon,
    BoolYesIcon,
    ButtonFrame,
    DesignIcon,
    MenuBoolInput,
    MenuBoolValue,
    MenuConstantInput,
    MenuConstantOptionValue,
    MenuCountOptionValue,
    MenuDegInput,
    MenuDegOptionValue,
    MenuHighlightValue,
    MenuItem,
    MenuItemGroup,
    MenuListInput,
    MenuListOptionValue,
    MenuMmOptionValue,
    MenuPctInput,
    MenuPctOptionValue,
    MenuSliderInput,
    OptionsIcon,
  } = props.components

  const structure = useMemo(
    () =>
      props.methods.menuOptionsStructure(props.Design.patternConfig.options, props.state.settings),
    [props.Design.patternConfig, props.state.settings]
  )
  const updateHandler = useCallback(
    (name, value) => update.settings(['options', ...name], value),
    [update.settings]
  )

  const drillProps = {
    components: props.components,
    hooks: props.hooks,
    methods: props.methods,
  }
  const inputs = {
    bool: (props) => <MenuBoolInput {...props} {...drillProps} />,
    constant: (props) => <MenuConstantInput {...props} {...drillProps} />,
    count: (props) => (
      <MenuSliderInput {...props} {...drillProps} config={{ ...props.config, step: 1 }} />
    ),
    deg: (props) => <MenuDegInput {...props} {...drillProps} />,
    list: (props) => <MenuListInput {...props} {...drillProps} isDesignOption />,
    mm: () => <span>FIXME: Mm options are deprecated. Please report this </span>,
    pct: (props) => <MenuPctInput {...props} {...drillProps} />,
  }
  const values = {
    bool: (props) => <MenuBoolValue {...props} {...drillProps} />,
    constant: (props) => <MenuConstantOptionValue {...props} {...drillProps} />,
    count: (props) => <MenuCountOptionValue {...props} {...drillProps} />,
    deg: (props) => <MenuDegOptionValue {...props} {...drillProps} />,
    list: (props) => <MenuListOptionValue {...props} {...drillProps} />,
    mm: (props) => <MenuMmOptionValue {...props} {...drillProps} />,
    pct: (props) => <MenuPctOptionValue {...props} {...drillProps} />,
  }

  return (
    <MenuItemGroup
      {...{
        structure,
        control: props.control,
        currentValues: props.state.settings.options || {},
        Icon: OptionsIcon,
        Item: (props) => (
          <DesignOption {...props} {...{ menuOptionType, inputs, values, MenuItem }} />
        ),
        isFirst,
        name: 'design-options:designOptions',
        language: props.locale,
        passProps: { settings: props.state.settings, patternConfig: props.Design.patternConfig },
        updateHandler,
        isDesignOptionsGroup: true,
        components: props.components,
        methods: props.methods,
        state: props.state,
        config: props.config,
        Design: props.Design,
        inputs,
        values,
      }}
    />
  )
}

/**
 * A wrapper for {@see MenuItem} to handle design option-specific business
 * @param  {Object}    options.config   the config for the item
 * @param  {Object}    options.settings core settings
 * @param  {Object} options.rest     the rest of the props
 */
const DesignOption = ({
  config,
  settings,
  control,
  menuOptionType,
  inputs,
  values,
  MenuItem,
  ...rest
}) => {
  const type = menuOptionType(config)
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
