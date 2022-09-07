import { Pattern } from './pattern.mjs'
import { addPartConfig } from './utils.mjs'


/*
 * The Design constructor. Returns a Pattern constructor
 * So it's sort of a super-constructor
 */
export function Design(config) {

  // Initialize config with defaults
  config = {
    measurements: [],
    optionalMeasurements: [],
    options: {},
    parts: [],
    plugins: [],
    // A place to store deprecation and other warnings before we even have a pattern instantiated
    events: {
      debug: [],
      error: [],
      info: [],
      suggestion: [],
      warning: [],
    },
    ...config
  }
  const raiseEvent = function (data, type) {
    config.events[type].push(data)
  }
  // Polyfill for pattern raise methods
  const raise = {
    debug: data => raiseEvent(`[early] `+data, 'debug'),
    error: data => raiseEvent(`[early] `+data, 'error'),
    info: data => raiseEvent(`[early] `+data, 'info'),
    suggestion: data => raiseEvent(`[early] `+data, 'suggestion'),
    warning: data => raiseEvent(`[early] `+data, 'warning'),
  }
  const parts = {}
  for (const part of config.parts) {
    if (typeof part === 'object') {
      parts[part.name] = part
      config = addPartConfig(parts[part.name], config, raise )
    }
    else throw("Invalid part configuration. Part is not an object")
  }
  // Replace config.parts with the resolved config
  config.parts = parts

  // Ensure all options have a hide() method and menu property
  config.options = completeOptions(config.options)


  const pattern = function (settings) {
    Pattern.call(this, config)

    return this.init().apply(settings)
  }

  // Set up inheritance
  pattern.prototype = Object.create(Pattern.prototype)
  pattern.prototype.constructor = pattern

  // Make config available without need to instantiate pattern
  pattern.config = config

  return pattern
}

/*
 * A default hide() method for options that lack it
 * As this always return false, the option will never be hidden
 */
const hide = () => false

/*
 * Helper method to add the default hide() method to options who lack one
 * as well as set the `menu` property to false (if it's missing)
 */
const completeOptions = options => {
  if (options) {
    for (const option in options) {
      if (typeof options[option] === 'object') {
        options[option] = { hide, menu: false, ...options[option] }
      }
    }
  }

  return options
}

