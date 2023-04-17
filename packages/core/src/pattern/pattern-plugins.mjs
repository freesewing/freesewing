import { Hooks } from '../hooks.mjs'

/**
 * Get the name of the given plugin config
 *
 * @param  {(Object|Object[])} plugin the plugin to get the name of
 * @return {(string|false)} the name, or false if there isn't one
 */
export function getPluginName(plugin) {
  const toCheck = Array.isArray(plugin) ? plugin[0] : plugin
  return toCheck.name || toCheck.plugin?.name || false
}

export function PatternPlugins(pattern) {
  this.store = pattern.store

  this.plugins = {}
  this.hooks = new Hooks()
  this.macros = {}
  this.__storeMethods = new Set()
}

/**
 * Loads a plugin
 *
 * @param {object} plugin - The plugin to load
 * @param {object} data - Any data to pass to the plugin
 * @return {object} this - The Pattern instance
 */
PatternPlugins.prototype.use = function (plugin, data, settings = [{}]) {
  const name = getPluginName(plugin)
  if (!this.plugins?.[name])
    return plugin.plugin && plugin.condition
      ? this.__useIf(plugin, data, settings) // Conditional plugin
      : this.__loadPlugin(plugin, data) // Regular plugin

  this.store.log.info(`Plugin \`${name}\` was requested, but it's already loaded. Skipping.`)

  return this
}

/**
 * Adds a lifecycle hook method to the pattern
 *
 * @param {string} hook - Name of the lifecycle hook
 * @param {function} method - The method to run
 * @param {object} data - Any data to pass to the hook method
 * @return {object} this - The Pattern instance
 */
PatternPlugins.prototype.on = function (hook, method, data) {
  for (const added of this.hooks[hook]) {
    // Don't add it twice
    if (added.method === method) return this
  }
  this.hooks[hook].push({ method, data })

  return this
}

/**
 * Loads the plugins that are part of the config
 *
 * @private
 * @return {Pattern} this - The Pattern instance
 */
PatternPlugins.prototype.loadConfigPlugins = function (config, settings) {
  if (!config.plugins) return this
  for (const plugin in config.plugins)
    this.use(config.plugins[plugin], config.plugins[plugin]?.data, settings)
  return this
}

/**
 * Loads a plugin
 *
 * @private
 * @param {object} plugin - The plugin object, or an object with `plugin` and `condition` keys
 * @param {object} data - Any plugin data to load
 * @return {Pattern} this - The Pattern instance
 */
PatternPlugins.prototype.__loadPlugin = function (plugin, data) {
  const name = getPluginName(plugin)
  this.plugins[name] = plugin
  if (plugin.hooks) this.__loadPluginHooks(plugin, data)
  if (plugin.macros) this.__loadPluginMacros(plugin)
  if (plugin.store) this.__loadPluginStoreMethods(plugin)
  this.store.log.info(`Loaded plugin \`${plugin.name}:${plugin.version}\``)

  return this
}

/**
 * Loads a plugin's hooks
 *
 * @private
 * @param {object} plugin - The plugin object
 * @param {object} data - Any plugin data to load
 * @return {Pattern} this - The Pattern instance
 */
PatternPlugins.prototype.__loadPluginHooks = function (plugin, data) {
  // console.log('hooks', plugin)
  for (let hook of Object.keys(this.hooks)) {
    if (typeof plugin.hooks[hook] === 'function') {
      this.on(hook, plugin.hooks[hook], data)
    } else if (Array.isArray(plugin.hooks[hook])) {
      for (let method of plugin.hooks[hook]) {
        this.on(hook, method, data)
      }
    }
  }

  return this
}

/**
 * Loads a plugin's macros
 *
 * @private
 * @param {object} plugin - The plugin object
 * @return {Pattern} this - The Pattern instance
 */
PatternPlugins.prototype.__loadPluginMacros = function (plugin) {
  // console.log('macros', plugin)
  for (let macro in plugin.macros) {
    if (typeof plugin.macros[macro] === 'function') {
      this.__macro(macro, plugin.macros[macro])
    }
  }
}

/**
 * Loads a plugin's store methods
 *
 * @private
 * @param {object} plugin - The plugin object
 * @return {Pattern} this - The Pattern instance
 */
PatternPlugins.prototype.__loadPluginStoreMethods = function (plugin) {
  if (Array.isArray(plugin.store)) {
    for (const method of plugin.store) this.__storeMethods.add(method)
  } else this.store.log.warning(`Plugin store methods should be an Array`)

  // console.log('store', plugin, this.__storeMethods)
  return this
}

/**
 * Sets a method for a macro
 *
 * @private
 * @param {string} macro - Name of the macro to run
 * @param {function} method - The macro method
 * @return {object} this - The Pattern instance
 */
PatternPlugins.prototype.__macro = function (key, method) {
  this.macros[key] = method

  return this
}

/**
 * Loads a conditional plugin
 *
 * @private
 * @param {object} plugin - An object with `plugin` and `condition` keys
 * @return {Pattern} this - The Pattern instance
 */
PatternPlugins.prototype.__useIf = function (plugin, settings = [{}]) {
  let load = 0
  for (const set of settings) {
    if (plugin.condition(set)) load++
  }
  if (load > 0) {
    this.store.log.info(
      `Condition met: Loaded plugin \`${plugin.plugin.name}:${plugin.plugin.version}\``
    )
    this.__loadPlugin(plugin.plugin, plugin.data)
  } else {
    this.store.log.info(
      `Condition not met: Skipped loading plugin \`${plugin.plugin.name}:${plugin.plugin.version}\``
    )
  }

  return this
}
