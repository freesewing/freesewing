import React from 'react'
import { mergeOptions } from '@freesewing/core'
import { formatMm, formatPercentage } from '@freesewing/utils'
import { BoolYesIcon, BoolNoIcon } from '@freesewing/react/components/Icon'

/**
 * this method is here to capture deprecated use of the translation method
 *
 * @param {string} key - The translation key
 * @retunr {string} key - Returns the key as-is
 */
const t = (key) => {
  console.log('FIXME: t method called in react/components/Editor/components/menus/Value.mjs')
  return key
}

/**
 * Displays that constant values are not implemented in the front end
 */
export const MenuConstantOptionValue = () => (
  <span className="text-error">FIXME: No ConstantOptionvalue implemented</span>
)

/**
 * Displays a count value
 *
 * @param {object} config - The option config
 * @param {number} current - The current (count) value
 * @param {bool} changed - Whether or not the value is non-default
 */
export const MenuCountOptionValue = ({ config, current, changed }) => (
  <MenuShowValue {...{ current, changed, dflt: config.count }} />
)

/**
 * Displays a degree value
 *
 * @param {object} config - The option config
 * @param {number} current - The current (count) value
 * @param {bool} changed - Whether or not the value is non-default
 */
export const MenuDegOptionValue = ({ config, current, changed }) => (
  <MenuHighlightValue changed={changed}> {changed ? current : config.deg}&deg;</MenuHighlightValue>
)

/**
 * A component to highlight a changed value
 *
 * @param {Boolean} changed - Whether the value is non-default
 * @param {Function} children - The React children
 */
export const MenuHighlightValue = ({ changed, children }) => (
  <span className={changed ? 'tw-text-accent' : ''}> {children} </span>
)

/**
 * Displays a list option value
 */
export const MenuListOptionValue = (props) => <MenuListValue {...props} t={t} />

/**
 * Displays the correct, translated value for a list
 * @param  {String|Boolean} options.current the current value, if it has been changed
 * @param  {Function} options.t       a translation function
 * @param  {Object} options.config  the item config
 * @param  {Boolean} options.changed has the value been changed?
 */
export const MenuListValue = ({ current, config, changed }) => {
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

  const translated = config.doNotTranslate || key

  return <MenuHighlightValue changed={changed}>{translated}</MenuHighlightValue>
}

/**
 * Displays the corrent, translated value for a boolean
 */
export const MenuBoolValue = MenuListOptionValue

/**
 * Displays the MmOptions are not supported
 */
export const MenuMmOptionValue = ({ config, changed, current, state }) => (
  <MenuHighlightValue changed={changed}>
    <span
      dangerouslySetInnerHTML={{
        __html: formatMm(changed ? current : config.dflt, state.settings?.units),
      }}
    />
  </MenuHighlightValue>
)

/**
 * Displays a formated mm value based on the current units
 */
export const MenuMmValue = ({ current, config, units, changed }) => (
  <MenuHighlightValue changed={changed}>
    <span
      dangerouslySetInnerHTML={{
        __html: formatMm(changed ? current : config.dflt, units),
      }}
    />
  </MenuHighlightValue>
)

/**
 * Displays the current percentage value, and the absolute value if configured
 */
export const MenuPctOptionValue = ({ config, current, settings, changed, patternConfig }) => {
  const val = changed ? current : config.pct / 100

  return (
    <MenuHighlightValue changed={changed}>
      {formatPercentage(val)}
      {config.toAbs && settings?.measurements
        ? ` | ${formatMm(
            config.toAbs(val, settings, mergeOptions(settings, patternConfig.options))
          )}`
        : null}
    </MenuHighlightValue>
  )
}

/**
 * A component to display a value, highligting it if it changed
 *
 * @param  {Number|String|Boolean} options.current - The current value, if it has been changed
 * @param  {Number|String|Boolean} options.dflt - The default value
 * @param  {Boolean} options.changed - Has the value been changed?
 */
export const MenuShowValue = ({ current, dflt, changed }) => {
  return <MenuHighlightValue changed={changed}> {changed ? current : dflt} </MenuHighlightValue>
}

/**
 * Displays the value for core's scale setting
 *
 * @param {number} current - The current (count) value
 * @param  {Object} options.config  the item config
 * @param {bool} changed - Whether or not the value is non-default
 */
export const MenuScaleSettingValue = ({ current, config, changed }) => (
  <MenuHighlightValue changed={changed}>
    {typeof current === 'undefined' ? config.dflt : current}
  </MenuHighlightValue>
)

/**
 * Displays the value for core's only setting
 *
 * @param {object} config - The option config
 * @param {number} current - The current (count) value
 * @param {bool} changed - Whether or not the value is non-default
 */
export const MenuOnlySettingValue = ({ current, config }) => (
  <MenuHighlightValue changed={current !== undefined}>
    {current === undefined ? '-' : current.length}
  </MenuHighlightValue>
)
