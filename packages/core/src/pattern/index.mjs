import { Attributes } from '../attributes.mjs'
import pack from 'bin-pack-with-constraints'
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
import { PatternDraftQueue } from './pattern-draft-queue.mjs'
import { PatternSampler } from './pattern-sampler.mjs'
import { PatternPlugins, getPluginName } from './pattern-plugins.mjs'
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
  __addNonEnumProp(this, 'macros', {})
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
  this.draftQueue = new PatternDraftQueue(this)
  this.__runHooks('preDraft')
  // Keep container for drafted parts fresh
  this.parts = []

  // Iterate over the provided sets of settings (typically just one)
  for (const set in this.settings) {
    this.activeSet = set
    this.setStores[set] = this.__createSetStore()
    this.setStores[set].log.debug(`Initialized store for set ${set}`)
    this.__runHooks('preSetDraft')
    this.setStores[set].log.debug(`📐 Drafting pattern for set ${set}`)

    // Create parts container
    this.parts[set] = {}

    // Handle snap for pct options
    this.__loadAbsoluteOptionsSet(set)

    this.draftQueue.start()
    while (this.draftQueue.hasNext()) {
      this.createPartForSet(this.draftQueue.next(), set)
    }
    this.__runHooks('postSetDraft')
  }
  this.__runHooks('postDraft')

  return this
}

Pattern.prototype.createPartForSet = function (partName, set = 0) {
  // gotta protect against attacks
  if (set === '__proto__') {
    throw new Error('malicious attempt at altering Object.prototype. Stopping action')
  }
  // Create parts
  this.setStores[set].log.debug(`📦 Creating part \`${partName}\` (set ${set})`)
  this.parts[set][partName] = this.__createPartWithContext(partName, set)

  // Handle inject/inheritance
  if (typeof this.config.inject[partName] === 'string') {
    this.setStores[set].log.debug(
      `Creating part \`${partName}\` from part \`${this.config.inject[partName]}\``
    )
    try {
      this.parts[set][partName].__inject(this.parts[set][this.config.inject[partName]])
    } catch (err) {
      this.setStores[set].log.error([
        `Could not inject part \`${this.config.inject[partName]}\` into part \`${partName}\``,
        err,
      ])
    }
  }
  if (this.__needs(partName, set)) {
    // Draft part
    const result = this.draftPartForSet(partName, set)
    if (typeof result !== 'undefined') this.parts[set][partName] = result
    // FIXME: THis won't work not that this is immutable
    // But is it still needed?
    // this.parts[set][partName].hidden === true ? true : !this.__wants(partName, set)
  } else {
    this.setStores[set].log.debug(
      `Part \`${partName}\` is not needed. Skipping draft and setting hidden to \`true\``
    )
    this.parts[set][partName].hidden = true
  }
}

Pattern.prototype.draftPartForSet = function (partName, set) {
  if (typeof this.config.parts?.[partName]?.draft === 'function') {
    this.activePart = partName
    this.setStores[set].set('activePart', partName)
    try {
      this.__runHooks('prePartDraft')
      const result = this.config.parts[partName].draft(this.parts[set][partName].shorthand())
      if (!this.__wants(partName, set)) {
        result.hide()
      }
      this.__runHooks('postPartDraft')
      if (typeof result === 'undefined') {
        this.setStores[set].log.error(
          `Result of drafting part ${partName} was undefined. Did you forget to return the part?`
        )
      }
      return result
    } catch (err) {
      this.setStores[set].log.error([`Unable to draft part \`${partName}\` (set ${set})`, err])
    }
  } else
    this.setStores[set].log.error(
      `Unable to draft pattern part __${partName}__. Part.draft() is not callable`
    )
}

/**
 * Return the initialized configuration
 *
 * @return {object} config - The initialized config
 */
Pattern.prototype.getConfig = function () {
  return this.__init().config
}

/** Returns props required to render this pattern through
 *  an external renderer (eg. a React component)
 *
 * @return {object} this - The Pattern instance
 */
Pattern.prototype.getRenderProps = function () {
  this.store.log.info('Gathering render props')
  // Run pre-render hook
  let svg = new Svg(this)
  svg.hooks = this.plugins.hooks

  this.__pack()
  svg.__runHooks('preRender')

  let props = { svg }
  props.width = this.width
  props.height = this.height
  props.autoLayout = this.autoLayout
  props.settings = this.settings
  props.parts = []
  for (const set of this.parts) {
    const setParts = {}
    for (let p in set) {
      if (!set[p].hidden) {
        setParts[p] = {
          ...set[p].asProps(),
          store: this.setStores[set[p].set],
        }
      } else if (this.setStores[set.set]) {
        this.setStores[set.set].log.info(
          `Part${p} is hidden in set ${set.set}. Not adding to render props`
        )
      }
    }
    props.parts.push(setParts)
  }
  props.stacks = {}
  for (let s in this.stacks) {
    if (!this.__isStackHidden(s)) {
      props.stacks[s] = this.stacks[s].asProps()
    } else this.store.log.info(`Stack ${s} is hidden. Skipping in render props.`)
  }
  props.logs = {
    pattern: this.store.logs,
    sets: this.setStores.map((store) => ({
      debug: store.logs.debug,
      info: store.logs.info,
      error: store.logs.error,
      warning: store.logs.warning,
    })),
  }

  svg.__runHooks('postRender')
  return props
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
 * Renders the pattern to SVG
 *
 * @return {string} svg - The rendered SVG
 */
Pattern.prototype.render = function () {
  this.svg = new Svg(this)
  this.svg.hooks = this.plugins.hooks

  return this.__pack().svg.render()
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
 * Instantiates a new Part instance and populates it with the pattern context
 *
 * @private
 * @param {string} name - The name of the part
 * @param {int} set - The index of the settings set in the list of sets
 * @return {Part} part - The instantiated Part
 */
Pattern.prototype.__createPartWithContext = function (name, set) {
  // Context object to add to Part closure
  const part = new Part()
  part.name = name
  part.set = set
  part.stack = this.config.parts[name]?.stack || name
  part.context = {
    parts: this.parts[set],
    config: this.config,
    settings: this.settings[set],
    store: this.setStores[set],
    macros: this.plugins.macros,
  }

  if (this.settings[set]?.partClasses) {
    part.attr('class', this.settings[set].partClasses)
  }

  for (const macro in this.plugins.macros) {
    part[__macroName(macro)] = this.plugins.macros[macro]
  }

  return part
}

/**
 * Instantiates a new Stack instance and populates it with the pattern context
 *
 * @private
 * @param {string} name - The name of the stack
 * @return {Stack} stack - The instantiated Stack
 */
Pattern.prototype.__createStackWithContext = function (name) {
  // Context object to add to Stack closure
  const stack = new Stack()
  stack.name = name
  stack.context = {
    config: this.config,
    settings: this.settings,
    setStores: this.setStores,
  }

  return stack
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
 * Generates an array of settings.absoluteOptions objects for sampling a list option
 *
 * @private
 * @param {string} optionName - Name of the option to sample
 * @return {Array} sets - The list of settings objects
 */
Pattern.prototype.__loadAbsoluteOptionsSet = function (set) {
  for (const optionName in this.settings[set].options) {
    const option = this.config.options[optionName]
    if (
      typeof option !== 'undefined' &&
      typeof option.snap !== 'undefined' &&
      option.toAbs instanceof Function
    ) {
      this.settings[set].absoluteOptions[optionName] = this.__snappedPercentageOption(
        optionName,
        set
      )
      this.setStores[set].log.debug(
        `🧲 Snapped __${optionName}__ to \`${this.settings[set].absoluteOptions[optionName]}\` for set __${set}__`
      )
    }
  }

  return this
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
 * Packs stacks in a 2D space and sets pattern size
 *
 * @private
 * @return {Pattern} this - The Pattern instance
 */
Pattern.prototype.__pack = function () {
  this.__runHooks('preLayout')
  for (const set in this.settings) {
    if (this.setStores[set].logs.error.length > 0) {
      this.setStores[set].log.warning(`One or more errors occured. Not packing pattern parts`)
      return this
    }
  }
  // First, create all stacks
  this.stacks = {}
  for (const set in this.settings) {
    for (const [name, part] of Object.entries(this.parts[set])) {
      const stackName =
        this.settings[set].stackPrefix +
        (typeof part.stack === 'function' ? part.stack(this.settings[set], name) : part.stack)
      if (typeof this.stacks[stackName] === 'undefined')
        this.stacks[stackName] = this.__createStackWithContext(stackName, set)
      this.stacks[stackName].addPart(part)
    }
  }

  let bins = []
  for (const [key, stack] of Object.entries(this.stacks)) {
    // Avoid multiple render calls to cause addition of transforms
    stack.attributes.remove('transform')
    if (!this.__isStackHidden(key)) {
      stack.home()
      if (this.settings[0].layout === true)
        bins.push({ id: key, width: stack.width, height: stack.height })
      else {
        if (this.width < stack.width) this.width = stack.width
        if (this.height < stack.height) this.height = stack.height
      }
    }
  }
  if (this.settings[0].layout === true) {
    // some plugins will add a width constraint to the settings, but we can safely pass undefined if not
    let size = pack(bins, { inPlace: true, maxWidth: this.settings[0].maxWidth })
    for (let bin of bins) {
      this.autoLayout.stacks[bin.id] = { move: {} }
      let stack = this.stacks[bin.id]
      if (bin.x !== 0 || bin.y !== 0) {
        stack.attr('transform', `translate(${bin.x}, ${bin.y})`)
      }
      this.autoLayout.stacks[bin.id].move = {
        x: bin.x + stack.layout.move.x,
        y: bin.y + stack.layout.move.y,
      }
    }
    this.width = size.width
    this.height = size.height
  } else if (typeof this.settings[0].layout === 'object') {
    this.width = this.settings[0].layout.width
    this.height = this.settings[0].layout.height
    for (let stackId of Object.keys(this.settings[0].layout.stacks)) {
      // Some parts are added by late-stage plugins
      if (this.stacks[stackId]) {
        let transforms = this.settings[this.activeStack || 0].layout.stacks[stackId]
        this.stacks[stackId].generateTransform(transforms)
      }
    }
  }

  this.__runHooks('postLayout')
  return this
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
 * Returns the absolute value of a snapped percentage option
 *
 * @private
 * @param {string} optionName - The name of the option
 * @param {int} set - The index of the set in the list of settings
 * @return {float} abs - The absolute value of the snapped option
 */
Pattern.prototype.__snappedPercentageOption = function (optionName, set) {
  const conf = this.config.options[optionName]
  const abs = conf.toAbs(this.settings[set].options[optionName], this.settings[set])
  // Handle units-specific config - Side-step immutability for the snap conf
  let snapConf = conf.snap
  if (!Array.isArray(snapConf) && snapConf.metric && snapConf.imperial)
    snapConf = snapConf[this.settings[set].units]
  // Simple steps
  if (typeof snapConf === 'number') return Math.ceil(abs / snapConf) * snapConf
  // List of snaps
  if (Array.isArray(snapConf) && snapConf.length > 1) {
    for (const snap of snapConf
      .sort((a, b) => a - b)
      .map((snap, i) => {
        const margin =
          i < snapConf.length - 1
            ? (snapConf[Number(i) + 1] - snap) / 2 // Look forward
            : (snap - snapConf[i - 1]) / 2 // Final snap, look backward

        return {
          min: snap - margin,
          max: snap + Number(margin),
          snap,
        }
      }))
      if (abs <= snap.max && abs >= snap.min) return snap.snap
  }

  return abs
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
