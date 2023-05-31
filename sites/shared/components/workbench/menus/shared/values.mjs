import { formatMm, formatFraction128 } from 'shared/utils.mjs'

/*********************************************************************************************************
 * This file contains the base components to be used for displaying values in menu titles in the workbench
 * Values that deal with more specific use cases should wrap one of the below components
 *********************************************************************************************************/

/** The basis of it all. Handles the changed/unchanged styling for the wrapped value */
export const HighlightedValue = ({ changed, children }) => (
  <span className={changed ? 'text-info' : ''}> {children} </span>
)

/**
 * A wrapper for displaying the correct value based on whether or not the value has changed
 * @param  {Number|String|Boolean} options.current the current value, if it has been changed
 * @param  {Number|String|Boolean} options.dflt    the default value
 * @param  {Boolean} options.changed  has the value been changed?
 */
export const PlainValue = ({ current, dflt, changed }) => (
  <HighlightedValue changed={changed}> {changed ? current : dflt} </HighlightedValue>
)

/**
 * Displays the correct, translated value for a list
 * @param  {String|Boolean} options.current the current value, if it has been changed
 * @param  {Function} options.t       a translation function
 * @param  {Object} options.config  the item config
 * @param  {Boolean} options.changed has the value been changed?
 */
export const ListValue = ({ current, t, config, changed }) => {
  // get the values
  const val = changed ? current : config.dflt

  // key will be based on a few factors
  let key
  // are valueTitles configured?
  if (config.valueTitles) key = config.valueTitles[val]
  // if not, is the value a string
  else if (typeof val === 'string') key = val
  // otherwise stringify booleans
  else if (val) key = 'yes'
  else key = 'no'

  const translated = config.doNotTranslate ? key : t(key)

  return <HighlightedValue changed={changed}>{translated}</HighlightedValue>
}

/** Displays the corrent, translated value for a boolean */
export const BoolValue = ListValue

/** Displays a formated mm value based on the current units */
export const MmValue = ({ current, config, units, changed }) => (
  <HighlightedValue changed={changed}>
    <span
      dangerouslySetInnerHTML={{
        __html: changed
          ? formatMm(current, units)
          : units === 'imperial'
          ? formatFraction128(config.dflt)
          : `${config.dflt}cm`,
      }}
    />
  </HighlightedValue>
)
