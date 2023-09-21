/**
 * Return an object holding the defaults for a design configuration
 *
 * @function
 * @private
 * @return {object} defaults - The default design configuration
 */
export const __loadDesignDefaults = () => ({
  parts: [],
  data: {},
})

/**
 * Return an object holding the defaults for pattern settings
 *
 * @function
 * @private
 * @return {object} defaults - The default pattern settings
 */
export const __loadPatternDefaults = () => ({
  complete: true,
  expand: true,
  idPrefix: 'fs-',
  stackPrefix: '',
  locale: 'en',
  units: 'metric',
  margin: 2,
  scale: 1,
  layout: true,
  options: {},
  absoluteOptions: {},
  measurements: {},
})
