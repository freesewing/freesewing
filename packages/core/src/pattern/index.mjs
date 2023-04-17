import { Attributes } from '../attributes.mjs'
import { __addNonEnumProp, __macroName } from '../utils.mjs'
import { Part } from '../part.mjs'
import { Stack } from '../stack.mjs'
import { Point } from '../point.mjs'
import { Path } from '../path.mjs'
import { Snippet } from '../snippet.mjs'
import { Svg } from '../svg.mjs'
import { Store } from '../store.mjs'
import { Hooks } from '../hooks.mjs'
import { version } from '../../data.mjs'
import { __loadPatternDefaults } from '../config.mjs'
import { PatternConfig } from './pattern-config.mjs'
import { PatternDrafter } from './pattern-drafter.mjs'
import { PatternSampler } from './pattern-sampler.mjs'
import { PatternPlugins, getPluginName } from './pattern-plugins.mjs'
import { PatternRenderer } from './pattern-renderer.mjs'
import cloneDeep from 'lodash.clonedeep'

//////////////////////////////////////////////
//               CONSTRUCTOR                //
//////////////////////////////////////////////

/**
 * Constructor for a Pattern
 *
 * @constructor
 * @param {object} config - The Design config
 * @return {object} this - The Pattern instance
 */
export function Pattern(designConfig = {}) {
  // Enumerable properties
  this.designConfig = cloneDeep(designConfig) // The design configuration (unresolved)
  this.config = {} // Will hold the resolved pattern after calling __init()
  this.store = new Store() // Pattern-wide store
  this.setStores = [] // Per-set stores

  // Non-enumerable properties
  __addNonEnumProp(this, 'width', 0)
  __addNonEnumProp(this, 'height', 0)
  __addNonEnumProp(this, 'autoLayout', { stacks: {} })
  __addNonEnumProp(this, 'is', '')
  __addNonEnumProp(this, 'hooks', new Hooks())
  __addNonEnumProp(this, 'Point', Point)
  __addNonEnumProp(this, 'Path', Path)
  __addNonEnumProp(this, 'Snippet', Snippet)
  __addNonEnumProp(this, 'Attributes', Attributes)
  __addNonEnumProp(this, '__initialized', false)
  __addNonEnumProp(this, 'config.parts', {})
  __addNonEnumProp(this, 'config.resolvedDependencies', {})

  __addNonEnumProp(this, 'plugins', new PatternPlugins(this))
  __addNonEnumProp(this, '__configResolver', new PatternConfig(this)) // handles config resolution during __init() as well as runtime part adding

  return this
}

//////////////////////////////////////////////
//            PUBLIC METHODS                //
//////////////////////////////////////////////

/**
 * Allows adding parts to the config at runtime
 *
 * @param {object} part - The part to add
 * @param {boolean} resolveImmediately - Should the part be resolved now, or wait until the next call to {@link __init()}?
 * It is useful to resolve immediately if one part is being added at runtime
 * It might be useful to not resolve immediately if a number of parts will be added over multiple calls
 * @return {object} this - The Pattern instance
 */
Pattern.prototype.addPart = function (part, resolveImmediately = true) {
  if (
    this.__configResolver.isPartValid(part) &&
    !this.designConfig.parts.find((p) => p.name == part.name)
  ) {
    this.store.log.debug(`Adding Part \`${part.name}\` at runtime`)
    this.designConfig.parts.push(part)
    if (resolveImmediately) {
      if (this.__configResolver.addPart(part) && typeof this.draftQueue !== 'undefined')
        this.draftQueue.addPart(part.name)
    } else this.__initialized = false
  }
  return this
}

/**
 * Drafts this pattern, aka the raison d'etre of FreeSewing
 *
 * @return {object} this - The Pattern instance
 */
Pattern.prototype.draft = function () {
  this.__init()
  new PatternDrafter(this).draft()

  return this
}

Pattern.prototype.draftPartForSet = function (partName, set) {
  this.__init()
  return new PatternDrafter(this).draftPartForSet(partName, set)
}

/**
 * Return the initialized configuration
 *
 * @return {object} config - The initialized config
 */
Pattern.prototype.getConfig = function () {
  return this.__init().config
}

/**
 * Renders the pattern to SVG
 *
 * @return {string} svg - The rendered SVG
 */
Pattern.prototype.render = function () {
  return new PatternRenderer(this).render()
}

/** Returns props required to render this pattern through
 *  an external renderer (eg. a React component)
 *
 * @return {object} this - The Pattern instance
 */
Pattern.prototype.getRenderProps = function () {
  return new PatternRenderer(this).getRenderProps()
}

/**
 * Handles pattern sampling
 *
 * @return {object} this - The Pattern instance
 */
Pattern.prototype.sample = function () {
  return new PatternSampler(this).sample()
}

/**
 * Handles measurement sampling
 *
 * @return {object} this - The Pattern instance
 */
Pattern.prototype.sampleMeasurement = function (measurementName) {
  return new PatternSampler(this).sampleMeasurement(measurementName)
}

/**
 * Handles models sampling
 *
 * @return {object} this - The Pattern instance
 */
Pattern.prototype.sampleModels = function (models, focus = false) {
  return new PatternSampler(this).sampleModels(models, focus)
}

/**
 * Handles option sampling
 *
 * @return {object} this - The Pattern instance
 */
Pattern.prototype.sampleOption = function (optionName) {
  return new PatternSampler(this).sampleOption(optionName)
}

/**
 * Adds a lifecycle hook method to the pattern
 *
 * @param {string} hook - Name of the lifecycle hook
 * @param {function} method - The method to run
 * @param {object} data - Any data to pass to the hook method
 * @return {object} this - The Pattern instance
 */
Pattern.prototype.on = function (hook, method, data) {
  this.plugins.on(hook, method, data)

  return this
}

/**
 * Loads a plugin
 *
 * @param {object} plugin - The plugin to load
 * @param {object} data - Any data to pass to the plugin
 * @return {object} this - The Pattern instance
 */
Pattern.prototype.use = function (plugin, data) {
  this.plugins.use(plugin, data, this.settings)

  return this
}

//////////////////////////////////////////////
//            PRIVATE METHODS               //
//////////////////////////////////////////////

/**
 * Creates a store for a set (of settings)
 *
 * @private
 * @return {Store} store - A new store populated with relevant data/methods
 */
Pattern.prototype.__createSetStore = function () {
  const store = new Store()
  store.set('data', this.store.data)
  store.extend([...this.plugins.__storeMethods])

  return store
}

/**
 * Merges (sets of) settings with the default settings
 *
 * @private
 * @param {Array} sets - An array of settings objects
 * @return {object} this - The Pattern instance
 */
Pattern.prototype.__applySettings = function (sets) {
  if (!Array.isArray(sets)) throw 'Sets should be an array of settings objects'
  if (sets.length === 0) sets.push({}) // Required to load default settings
  this.settings = []
  for (let i = 0; i < sets.length; i++) {
    // Don't mutate the input itself
    const set = { ...sets[i] }
    if (!set.options) set.options = {}
    if (!set.measurements) set.measurements = {}
    this.settings.push({
      ...__loadPatternDefaults(),
      ...set,
      // Force creation of a new objects
      // so we don't reference the original
      options: { ...set.options },
      measurements: { ...set.measurements },
    })
  }

  return this
}

/**
 * Initializes the pattern coniguration and settings
 *
 * @return {object} this - The Pattern instance
 */
Pattern.prototype.__init = function () {
  if (this.__initialized) return this

  this.__runHooks('preInit')
  // Say hello
  this.store.log.info(
    `New \`${this.designConfig?.data?.name || 'No Name'}:` +
      `${this.designConfig?.data?.version || 'No version'}\` ` +
      `pattern using \`@freesewing/core:${version}\``
  )

  /*
   * We allow late-stage updating of the design config (adding parts for example)
   * so we need to do the things we used to do in the contructor at a later stage.
   * This methods does that, and resolves the design config + user settings
   */
  this.__resolveParts() // Resolves parts
    .__resolveConfig() // Gets the config from the resolver
    .__loadConfigData() // Makes config data available in store
    .__loadOptionDefaults() // Merges default options with user provided ones

  this.plugins.loadConfigPlugins(this.config, this.settings) // Loads plugins

  this.store.log.info(`Pattern initialized. Draft order is: ${this.config.draftOrder.join(', ')}`)
  this.__runHooks('postInit')

  this.__initialized = true

  return this
}

/**
 * Checks whether a part is hidden in the config
 *
 * @private
 * @param {string} partName - Name of the part to check
 * @return {bool} hidden - true if the part is hidden, or false if not
 */
Pattern.prototype.__isPartHidden = function (partName) {
  const partHidden = this.parts?.[this.activeSet]?.[partName]?.hidden || false
  if (Array.isArray(this.settings[this.activeSet || 0].only)) {
    if (this.settings[this.activeSet || 0].only.includes(partName)) return partHidden
  }
  if (this.config.partHide?.[partName]) return true

  return partHidden
}

/**
 * Checks whether a stack is hidden in the config
 *
 * @private
 * @param {string} stackName - Name of the stack to check
 * @return {bool} hidden - true if the part is hidden, or false if not
 */
Pattern.prototype.__isStackHidden = function (stackName) {
  if (!this.stacks[stackName]) return true
  const parts = this.stacks[stackName].getPartNames()
  for (const partName of parts) {
    if (!this.__isPartHidden(partName)) return false
  }

  return true
}

/**
 * Loads data from the design config into the store
 *
 * @private
 * @return {Pattern} this - The Pattern instance
 */
Pattern.prototype.__loadConfigData = function () {
  if (this.designConfig.data) this.store.set('data', this.designConfig.data)

  return this
}

/**
 * Merges defaults for options with user-provided options
 *
 * @private
 * @return {Pattern} this - The Pattern instance
 */
Pattern.prototype.__loadOptionDefaults = function () {
  if (!this.config.options) this.config.options = {}
  if (Object.keys(this.config.options).length < 1) return this
  for (const i in this.settings) {
    for (const [name, option] of Object.entries(this.config.options)) {
      // Don't overwrite user-provided settings.options
      if (typeof this.settings[i].options[name] === 'undefined') {
        if (typeof option === 'object') {
          if (typeof option.pct !== 'undefined') this.settings[i].options[name] = option.pct / 100
          else if (typeof option.mm !== 'undefined') this.settings[i].options[name] = option.mm
          else if (typeof option.deg !== 'undefined') this.settings[i].options[name] = option.deg
          else if (typeof option.count !== 'undefined')
            this.settings[i].options[name] = option.count
          else if (typeof option.bool !== 'undefined') this.settings[i].options[name] = option.bool
          else if (typeof option.dflt !== 'undefined') this.settings[i].options[name] = option.dflt
          else {
            let err = 'Unknown option type: ' + JSON.stringify(option)
            this.store.log.error(err)
            throw new Error(err)
          }
        } else this.settings[i].options[name] = option
      }
    }
  }

  return this
}

/**
 * Determines whether a part is needed, depending on the 'only' setting and the configured dependencies
 *
 * @private
 * @param {string} partName - Name of the part
 * @param {int} set - The index of the set of settings
 * @return {bool} needs - true if the part is needed, or false if not
 */
Pattern.prototype.__needs = function (partName, set = 0) {
  // If only is unset, all parts are needed
  if (
    typeof this.settings[set].only === 'undefined' ||
    this.settings[set].only === false ||
    (Array.isArray(this.settings[set].only) && this.settings[set].only.length === 0)
  )
    return true

  // Make only to always be an array
  const only =
    typeof this.settings[set].only === 'string'
      ? [this.settings[set].only]
      : this.settings[set].only

  // Walk the only parts, checking each one for a match in its dependencies
  for (const part of only) {
    if (part === partName) return true
    if (this.config.resolvedDependencies[part]?.indexOf(partName) !== -1) return true
  }

  return false
}

/**
 * Gets the configuration for the config resolver and sets it on the pattern
 * @private
 * @return  {Pattern} this - The Pattern instance
 */
Pattern.prototype.__resolveConfig = function () {
  this.config = this.__configResolver.asConfig()
  return this
}

/**
 * Resolves parts and their dependencies
 *
 * @private
 * @return {Pattern} this - The Pattern instance
 */
Pattern.prototype.__resolveParts = function () {
  this.designConfig.parts.forEach((p) => this.__configResolver.addPart(p))

  // Print final part distances.
  this.__configResolver.logPartDistances()

  return this
}

/**
 * Runs subscriptions to a given lifecycle hook
 *
 * @private
 * @param {string} hookName - Name of the lifecycle hook
 * @param {obhect} data - Any data to pass to the hook method
 * @return {Pattern} this - The Pattern instance
 */
Pattern.prototype.__runHooks = function (hookName, data = false) {
  if (data === false) data = this
  let hooks = this.plugins.hooks[hookName]
  if (hooks.length > 0) {
    this.store.log.debug(`Running \`${hookName}\` hooks`)
    for (let hook of hooks) {
      hook.method(data, hook.data)
    }
  }
}

/**
 * Determines whether a part is wanted, depending on the 'only' setting and the configured dependencies
 *
 * @private
 * @param {string} partName - Name of the part
 * @param {int} set - The index of the set of settings
 * @return {bool} wants - true if the part is wanted, or false if not
 */
Pattern.prototype.__wants = function (partName, set = 0) {
  // Hidden parts are not wanted
  if (this.__isPartHidden(partName)) return false
  else if (typeof this.settings[set].only === 'string') return this.settings[set].only === partName
  else if (Array.isArray(this.settings[set].only)) {
    for (const part of this.settings[set].only) {
      if (part === partName) return true
    }
    return false
  }

  return true
}
