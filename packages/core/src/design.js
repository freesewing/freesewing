import Pattern from './pattern'

export default function Design(config, plugins = false, conditionalPlugins = false) {
  const pattern = function (settings) {
    Pattern.call(this, config)
    // Load plugins
    if (Array.isArray(plugins)) for (let plugin of plugins) this.use(plugin)
    else if (plugins) this.use(plugins)
    // Load conditional plugins
    if (Array.isArray(conditionalPlugins))
      for (let plugin of conditionalPlugins) this.useIf(plugin, settings)
    else if (conditionalPlugins.plugin && conditionalPlugins.condition)
      this.useIf(conditionalPlugins, settings)

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
