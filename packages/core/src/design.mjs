import Pattern from './pattern.mjs'
import { addPartConfig } from './utils.mjs'


/*
 * The Design constructor. Returns a Pattern constructor
 * So it's sort of a super-constructor
 */
export default function Design(config) {

  // Merge config with defaults
  config = {
    parts: [],
    options: {},
    measurements: [],
    optionalMeasurements: [],
    plugins: [],
    conditionalPlugins: [],
    ...config
  }
  const parts = {}
  for (const part of config.parts) {
    if (typeof part === 'object') {
      parts[part.name] = part
      config = addPartConfig(parts[part.name], config)
    }
    else throw("Invalid part configuration. Part is not an object")
  }
  // Replace config.parts with the resolved config
  config.parts = parts

  // Ensure all options have a hide() method and menu property
  config.options = completeOptions(config.options)

  // A place to store deprecation and other warnings before we even have a pattern instantiated
  config.warnings = []

  const pattern = function (settings) {
    Pattern.call(this, config)

    // Load plugins
    if (Array.isArray(config.plugins)) for (const plugin of config.plugins) this.use(plugin)
    else if (config.plugins) this.use(config.plugins)

    // Load conditional plugins
    if (Array.isArray(config.conditionalPlugins))
      for (const plugin of config.conditionalPlugins) this.useIf(plugin, settings)
    else if (config.conditionalPlugins.plugin && config.conditionalPlugins.condition)
      this.useIf(config.conditionalPlugins, settings)

    this.apply(settings)

    return this
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

