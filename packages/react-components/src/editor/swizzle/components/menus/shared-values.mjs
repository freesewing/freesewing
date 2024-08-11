/** Displays that constant values are not implemented in the front end */
export const MenuConstantOptionValue = () => (
  <span className="text-error">FIXME: No ConstantOptionvalue implemented</span>
)

/** Displays a count value*/
export const MenuCountOptionValue = ({ Swizzled, config, current, changed }) => (
  <Swizzled.components.MenuShowValue {...{ current, changed, dflt: config.count }} />
)

/** Displays a degree value */
export const MenuDegOptionValue = ({ config, current, changed, Swizzled }) => (
  <Swizzled.components.MenuHighlightValue changed={changed}>
    {' '}
    {changed ? current : config.deg}&deg;
  </Swizzled.components.MenuHighlightValue>
)

/**
 * A component to highlight a changed value
 * @param {Boolean} changed - Whether the value is changed or not
 * @param {Function} children - The React children
 */
export const MenuHighlightValue = ({ changed, children }) => (
  <span className={changed ? 'text-accent' : ''}> {children} </span>
)

/** Displays a list option value */
export const MenuListOptionValue = (props) => (
  <MenuListValue
    {...props}
    t={(input) => props.Swizzled.methods.t(`${props.design}:${props.config.name}.${input}.t`)}
  />
)

/**
 * Displays the correct, translated value for a list
 * @param  {String|Boolean} options.current the current value, if it has been changed
 * @param  {Function} options.t       a translation function
 * @param  {Object} options.config  the item config
 * @param  {Boolean} options.changed has the value been changed?
 * @param {object} props.Swizzled - An object holding swizzled code
 */
export const MenuListValue = ({ current, config, changed, Swizzled }) => {
  // get the values
  const val = changed ? current : config.dflt

  // key will be based on a few factors
  let key
  // are valueTitles configured?
  if (config.valueTitles) key = config.valueTitles[val]
  // if not, is the value a string
  else if (typeof val === 'string') key = val
  // otherwise stringify booleans
  else if (val) key = <Swizzled.components.BoolYesIcon />
  else key = <Swizzled.components.BoolNoIcon />

  const translated =
    config.doNotTranslate || typeof key !== 'string' ? key : Swizzled.methods.t(key)

  return (
    <Swizzled.components.MenuHighlightValue changed={changed}>
      {translated}
    </Swizzled.components.MenuHighlightValue>
  )
}

/** Displays the corrent, translated value for a boolean */
export const MenuBoolValue = MenuListOptionValue

/** Displays the MmOptions are not supported */
export const MenuMmOptionValue = () => (
  <span className="text-error">FIXME: No Mm Options are not supported</span>
)

/** Displays a formated mm value based on the current units */
export const MenuMmValue = ({ current, config, units, changed, Swizzled }) => (
  <Swizzled.components.MenuHighlightValue changed={changed}>
    <span
      dangerouslySetInnerHTML={{
        __html: Swizzled.methods.formatMm(changed ? current : config.dflt, units),
      }}
    />
  </Swizzled.components.MenuHighlightValue>
)

/** Displays the current percentage value, and the absolute value if configured
 *
 **************************************************************************
 * SliderIcon  Title                                                 THIS *
 * min%                                                              max% *
 * ----------------------0----------------------------------------------- *
 * msg                                               PencilIcon ResetIcon *
 **************************************************************************
 * */
export const MenuPctOptionValue = ({
  config,
  current,
  settings,
  changed,
  patternConfig,
  Swizzled,
}) => {
  const val = changed ? current : config.pct / 100

  return (
    <Swizzled.components.MenuHighlightValue changed={changed}>
      {Swizzled.methods.formatPercentage(val)}
      {config.toAbs && settings?.measurements
        ? ` | ${Swizzled.methods.formatMm(
            config.toAbs(val, settings, mergeOptions(settings, patternConfig.options))
          )}`
        : null}
    </Swizzled.components.MenuHighlightValue>
  )
}

/**
 * A component to display a value, highligting it if it changed
 * @param  {Number|String|Boolean} options.current - The current value, if it has been changed
 * @param  {Number|String|Boolean} options.dflt - The default value
 * @param  {Boolean} options.changed - Has the value been changed?
 */
export const MenuShowValue = ({ Swizzled, current, dflt, changed, components }) => {
  const { MenuHighlightValue } = Swizzled.components

  return <MenuHighlightValue changed={changed}> {changed ? current : dflt} </MenuHighlightValue>
}

export const MenuScaleSettingValue = ({ Swizzled, current, config, changed }) => (
  <Swizzled.components.MenuHighlightValue current={current} dflt={config.dflt} changed={changed} />
)

export const MenuOnlySettingValue = ({ Swizzled, current, config }) => (
  <Swizzled.components.MenuHighlightValue
    current={current?.length}
    dflt={config.parts.length}
    changed={current !== undefined}
  />
)
