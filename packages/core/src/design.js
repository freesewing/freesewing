import Pattern from './pattern'

const addOptions = (part, config) => {
  if (part.options) {
    for (const optionName in part.options) {
      config.options[optionName] = part.options[optionName]
    }
  }
  if (part.from) addOptions(part.from, config)

  return config
}

/*
 * The Design constructor. Returns a Pattern constructor
 * So it's sort of a super-constructor
 */
export default function Design(config, plugins = false, conditionalPlugins = false) {
  // Add part options to config
  if (!config.options) config.options = {}
  if (config.parts) {
    for (const partName in config.parts) {
      config = addOptions(config.parts[partName], config)
    }
  }
  // Ensure all options have a hide() method
  config.options = optionsWithHide(config.options)

  // A place to store deprecation and other warnings before we even have a pattern instantiated
  config.warnings = []

  /*
   * The newer way to initalize a design is to pass one single parameter
   * The old way passed multiple parameters.
   * So let's figure out which is which and be backwards compatible
   *
   * This mitigation should be removed in v3 when we drop support for the legacy way
   */
  config = migrateConfig(config, plugins, conditionalPlugins)

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
 * Helper method to handle the legacy way of passing configuration
 * to the design constructor
 */
const migrateConfig = (config, plugins, conditionalPlugins) => {

  // Migrate plugins
  if (plugins && config.plugins) config.warnings.push(
    'Passing plugins to the Design constructor both as a second parameter and in the config is unsupported',
    'Ignoring plugins passed as parameter. Only config.plugins will be used.'
  )
  else if (plugins && !config.plugins) {
    config.plugins = plugins
    config.warnings.push(
      'Passing a plugins parameter to the Design constructure is deprecated',
      'Please store them in the `plugins` key of the config object that is the first parameter'
    )
  } else if (!config.plugins) config.plugins = []

  // Migrate conditional plugins
  if (conditionalPlugins && config.conditionalPlugins) config.warnings.push(
    'Passing conditionalPlugins to the Design constructor both as a third parameter and in the config is unsupported.',
    'Ignoring conditionalPlugins passes as parameter. Only config.conditionalPlugins will be used.',
  )
  else if (conditionalPlugins && !config.conditionalPlugins) {
    config.conditionalPlugins = conditionalPlugins
    config.warnings.push(
      'Passing a conditionalPlugins parameter to the Design constructure is deprecated.',
      'Please store them in the `conditionalPlugins` key of the config object that is the first parameter'
    )
  }
  else if (!config.conditionalPlugins) config.conditionalPlugins = []

  return config
}

/*
 * A default hide() method for options that lack it
 * Since this will always return false, the option will never be hidden
 */
const hide = () => false // The default hide() method

/*
 * Helper method to add the default hide() method to options who lack one
 */
const optionsWithHide = options => {
  if (options) {
    for (const option in options) {
      if (typeof options[option] === 'object') options[option] = { hide, ...options[option] }
    }
  }

  return options
}

