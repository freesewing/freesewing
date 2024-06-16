/** Displays that constant values are not implemented in the front end */
export const MenuConstantOptionValue = () => (
  <span className="text-error">FIXME: No ConstantOptionvalue implemented</span>
)

/** Displays a count value*/
export const MenuCountOptionValue = ({ config, current, changed }) => (
  <MenuShowValue {...{ current, changed, dflt: config.count }} />
)

/** Displays a degree value */
export const MenuDegOptionValue = ({ config, current, changed, components }) => {
  const { MenuHighlightValue } = components

  return (
    <MenuHighlightValue changed={changed}>
      {' '}
      {changed ? current : config.deg}&deg;
    </MenuHighlightValue>
  )
}

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
    t={(input) => props.t(`${props.design}:${props.config.name}.${input}.t`)}
  />
)

/**
 * Displays the correct, translated value for a list
 * @param  {String|Boolean} options.current the current value, if it has been changed
 * @param  {Function} options.t       a translation function
 * @param  {Object} options.config  the item config
 * @param  {Boolean} options.changed has the value been changed?
 */
export const MenuListValue = ({ current, t, config, changed, components }) => {
  const { BoolNoIcon, BoolYesIcon, MenuHighlightValue } = components
  // get the values
  const val = changed ? current : config.dflt

  // key will be based on a few factors
  let key
  // are valueTitles configured?
  if (config.valueTitles) key = config.valueTitles[val]
  // if not, is the value a string
  else if (typeof val === 'string') key = val
  // otherwise stringify booleans
  else if (val) key = <BoolYesIcon />
  else key = <BoolNoIcon />

  const translated = config.doNotTranslate || typeof key !== 'string' ? key : t(key)

  return <MenuHighlightValue changed={changed}>{translated}</MenuHighlightValue>
}

/** Displays the corrent, translated value for a boolean */
export const MenuBoolValue = MenuListValue

/** Displays the MmOptions are not supported */
export const MenuMmOptionValue = () => (
  <span className="text-error">FIXME: No Mm Options are not supported</span>
)

/** Displays a formated mm value based on the current units */
export const MenuMmValue = ({ current, config, units, changed, components, methods }) => {
  const { MenuHighlightValue } = components

  return (
    <MenuHighlightValue changed={changed}>
      <span
        dangerouslySetInnerHTML={{
          __html: methods.formatMm(changed ? current : config.dflt, units),
        }}
      />
    </MenuHighlightValue>
  )
}

/** Displays the current percentage value, and the absolute value if configured */
export const MenuPctOptionValue = ({
  config,
  current,
  settings,
  changed,
  patternConfig,
  components,
  methods,
}) => {
  const { MenuHighlightValue } = components
  const val = changed ? current : config.pct / 100

  return (
    <MenuHighlightValue changed={changed}>
      {methods.formatPercentage(val)}
      {config.toAbs && settings?.measurements
        ? ` | ${methods.formatMm(
            config.toAbs(val, settings, mergeOptions(settings, patternConfig.options))
          )}`
        : null}
    </MenuHighlightValue>
  )
}

/**
 * A component to display a value, highligting it if it changed
 * @param  {Number|String|Boolean} options.current - The current value, if it has been changed
 * @param  {Number|String|Boolean} options.dflt - The default value
 * @param  {Boolean} options.changed - Has the value been changed?
 */
export const MenuShowValue = ({ current, dflt, changed, components }) => {
  const { MenuHighlightValue } = components

  return <MenuHighlightValue changed={changed}> {changed ? current : dflt} </MenuHighlightValue>
}
