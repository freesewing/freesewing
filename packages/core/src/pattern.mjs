import { Attributes } from './attributes.mjs'
import pack from 'bin-pack'
import { __addNonEnumProp, __macroName } from './utils.mjs'
import { Part } from './part.mjs'
import { Stack } from './stack.mjs'
import { Point } from './point.mjs'
import { Path } from './path.mjs'
import { Snippet } from './snippet.mjs'
import { Svg } from './svg.mjs'
import { Store } from './store.mjs'
import { Hooks } from './hooks.mjs'
import { version } from '../data.mjs'
import { __loadPatternDefaults } from './config.mjs'

const DISTANCE_DEBUG = false

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
export function Pattern(designConfig) {
  // Non-enumerable properties
  __addNonEnumProp(this, 'plugins', {})
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
  __addNonEnumProp(this, '__designParts', {})
  __addNonEnumProp(this, '__inject', {})
  __addNonEnumProp(this, '__dependencies', {})
  __addNonEnumProp(this, '__resolvedDependencies', {})
  __addNonEnumProp(this, '__resolvedParts', [])
  __addNonEnumProp(this, '__storeMethods', new Set())
  __addNonEnumProp(this, '__mutated', {
    optionDistance: {},
    partDistance: {},
    partHide: {},
    partHideAll: {},
  })
  __addNonEnumProp(this, '__draftOrder', [])
  __addNonEnumProp(this, '__hide', {})

  // Enumerable properties
  this.designConfig = designConfig // The design configuration (unresolved)
  this.config = {} // Will hold the resolved pattern after calling __init()
  this.store = new Store() // Pattern-wide store
  this.setStores = [] // Per-set stores

  return this
}

//////////////////////////////////////////////
//            PUBLIC METHODS                //
//////////////////////////////////////////////

/**
 * FIXME: Allows adding parts to the config at runtime
 *
 * @param {object} part - The part to add
 * @return {object} this - The Pattern instance
 */
Pattern.prototype.addPart = function (part) {
  if (typeof part?.draft === 'function') {
    if (part.name) {
      this.designConfig.parts.push(part)
      this.__initialized = false
    } else this.store.log.error(`Part must have a name`)
  } else this.store.log.error(`Part must have a draft() method`)

  return this
}

/**
 * Drafts this pattern, aka the raison d'etre of FreeSewing
 *
 * @return {object} this - The Pattern instance
 */
Pattern.prototype.draft = function () {
  this.__init()
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

    for (const partName of this.config.draftOrder) {
      // Create parts
      this.setStores[set].log.debug(`📦 Creating part \`${partName}\` (set ${set})`)
      this.parts[set][partName] = this.__createPartWithContext(partName, set)

      // Handle inject/inheritance
      if (typeof this.__inject[partName] === 'string') {
        this.setStores[set].log.debug(
          `Creating part \`${partName}\` from part \`${this.__inject[partName]}\``
        )
        try {
          this.parts[set][partName].__inject(this.parts[set][this.__inject[partName]])
        } catch (err) {
          this.setStores[set].log.error([
            `Could not inject part \`${this.__inject[partName]}\` into part \`${partName}\``,
            err,
          ])
        }
      }
      if (this.__needs(partName, set)) {
        // Draft part
        if (typeof this.__designParts?.[partName]?.draft === 'function') {
          this.activePart = partName
          try {
            this.__runHooks('prePartDraft')
            const result = this.__designParts[partName].draft(this.parts[set][partName].shorthand())
            this.__runHooks('postPartDraft')
            if (typeof result === 'undefined') {
              this.setStores[set].log.error(
                `Result of drafting part ${partName} was undefined. Did you forget to return the part?`
              )
            } else this.parts[set][partName] = result
          } catch (err) {
            this.setStores[set].log.error([
              `Unable to draft part \`${partName}\` (set ${set})`,
              err,
            ])
          }
        } else
          this.setStores[set].log.error(
            `Unable to draft pattern part __${partName}__. Part.draft() is not callable`
          )
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
    this.__runHooks('postSetDraft')
  }
  this.__runHooks('postDraft')

  return this
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
  svg.hooks = this.hooks
  svg.__runHooks('preRender')

  this.__pack()
  // Run post-layout hook
  this.__runHooks('postLayout')
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
      } else if (this.setStores[set?.set]) {
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

  return props
}

/**
 * Handles pattern sampling
 *
 * @return {object} this - The Pattern instance
 */
Pattern.prototype.sample = function () {
  this.__init()
  if (this.settings[0].sample.type === 'option') {
    return this.sampleOption(this.settings[0].sample.option)
  } else if (this.settings[0].sample.type === 'measurement') {
    return this.sampleMeasurement(this.settings[0].sample.measurement)
  } else if (this.settings[0].sample.type === 'models') {
    return this.sampleModels(this.settings[0].sample.models, this.settings[0].sample.focus || false)
  }
}

/**
 * Handles measurement sampling
 *
 * @return {object} this - The Pattern instance
 */
Pattern.prototype.sampleMeasurement = function (measurementName) {
  this.store.log.debug(`Sampling measurement \`${measurementName}\``)
  this.__runHooks('preSample')
  this.__applySettings(this.__measurementSets(measurementName))
  this.__init()
  this.__runHooks('postSample')

  return this.draft()
}

/**
 * Handles models sampling
 *
 * @return {object} this - The Pattern instance
 */
Pattern.prototype.sampleModels = function (models, focus = false) {
  this.store.log.debug(`Sampling models \`${Object.keys(models).join(', ')}\``)
  this.__runHooks('preSample')
  this.__applySettings(this.__modelSets(models, focus))
  this.__init()
  this.__runHooks('postSample')

  return this.draft()
}

/**
 * Handles option sampling
 *
 * @return {object} this - The Pattern instance
 */
Pattern.prototype.sampleOption = function (optionName) {
  this.store.log.debug(`Sampling option \`${optionName}\``)
  this.__runHooks('preSample')
  this.__applySettings(this.__optionSets(optionName))
  this.__init()
  this.__runHooks('postSample')

  return this.draft()
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
  for (const added of this.hooks[hook]) {
    // Don't add it twice
    if (added.method === method) return this
  }
  this.hooks[hook].push({ method, data })

  return this
}

/**
 * Renders the pattern to SVG
 *
 * @return {string} svg - The rendered SVG
 */
Pattern.prototype.render = function () {
  this.svg = new Svg(this)
  this.svg.hooks = this.hooks

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
  const name = getPluginName(plugin)
  if (!this.plugins?.[name])
    return plugin.plugin && plugin.condition
      ? this.__useIf(plugin, data) // Conditional plugin
      : this.__loadPlugin(plugin, data) // Regular plugin

  this.store.log.info(`Plugin \`${name}\` was requested, but it's already loaded. Skipping.`)

  return this
}

//////////////////////////////////////////////
//            PRIVATE METHODS               //
//////////////////////////////////////////////

/**
 * Adds a part as a simple dependency
 *
 * @private
 * @param {string} name - The name of the dependency
 * @param {object} part - The part configuration
 * @param {object} dep - The dependency configuration
 * @return {object} this - The Pattern instance
 */
Pattern.prototype.__addDependency = function (name, part, dep) {
  this.__dependencies[name] = mergeDependencies(dep.name, this.__dependencies[name])
  if (typeof this.__designParts[dep.name] === 'undefined') {
    this.config = this.__addPartConfig(this.__designParts[dep.name])
  }

  return this
}

/**
 * Resolves/Adds a part's design configuration to the pattern config
 *
 * @private
 * @param {Part} part - The part of which to resolve the config
 * @param {onject} config - The global config
 * @param {Store} store - The store, used for logging
 * @return {object} config - The mutated global config
 */
Pattern.prototype.__addPartConfig = function (part) {
  if (this.__resolvedParts.includes(part.name)) return this

  // Add parts, using set to keep them unique in the array
  this.designConfig.parts = [...new Set(this.designConfig.parts).add(part)]

  return this.__addPartOptions(part)
    .__addPartMeasurements(part)
    .__addPartOptionalMeasurements(part)
    .__addPartPlugins(part)
}

/**
 * Resolves/Adds a part's configured measurements to the global config
 *
 * @private
 * @param {Part} part - The part of which to resolve the config
 * @param {array} list - The list of resolved measurements
 * @return {Pattern} this - The Pattern instance
 */
Pattern.prototype.__addPartMeasurements = function (part, list = false) {
  if (!this.config.measurements) this.config.measurements = []
  if (!list) list = this.config.measurements
  if (part.measurements) {
    for (const m of part.measurements) {
      if (list.indexOf(m) === -1) {
        list.push(m)
        this.store.log.debug(`🟠  __${m}__ measurement is required in \`${part.name}\``)
      }
    }
  }
  if (part.from) this.__addPartMeasurements(part.from, list)
  if (part.after) {
    if (Array.isArray(part.after)) {
      for (const dep of part.after) this.__addPartMeasurements(dep, list)
    } else this.__addPartMeasurements(part.after, list)
  }

  // Weed out duplicates
  this.config.measurements = [...new Set(list)]

  return this
}

/**
 * Resolves/Adds a part's configured optional measurements to the global config
 *
 * @private
 * @param {Part} part - The part of which to resolve the config
 * @param {array} list - The list of resolved optional measurements
 * @return {Pattern} this - The Pattern instance
 */
Pattern.prototype.__addPartOptionalMeasurements = function (part, list = false) {
  if (!this.config.optionalMeasurements) this.config.optionalMeasurements = []
  if (!list) list = this.config.optionalMeasurements
  if (part.optionalMeasurements) {
    for (const m of part.optionalMeasurements) {
      // Don't add it's a required measurement for another part
      if (this.config.measurements.indexOf(m) === -1) {
        if (list.indexOf(m) === -1) {
          list.push(m)
          this.store.log.debug(`🟡  __${m}__ measurement is optional in \`${part.name}\``)
        }
      }
    }
  }
  if (part.from) this.__addPartOptionalMeasurements(part.from, list)
  if (part.after) {
    if (Array.isArray(part.after)) {
      for (const dep of part.after) this.__addPartOptionalMeasurements(dep, list)
    } else this.__addPartOptionalMeasurements(part.after, list)
  }

  // Weed out duplicates
  if (list.length > 0) this.config.optionalMeasurements = [...new Set(list)]

  return this
}

/**
 * Resolves/Adds a part's configured options to the global config
 *
 * @private
 * @param {Part} part - The part of which to resolve the config
 * @return {Pattern} this - The Pattern instance
 */
Pattern.prototype.__addPartOptions = function (part) {
  if (!this.config.options) this.config.options = {}
  if (part.options) {
    for (const optionName in part.options) {
      if (!this.__mutated.optionDistance[optionName]) {
        this.__mutated.optionDistance[optionName] = this.__mutated.partDistance?.[part.name] || 0
        // Keep design parts immutable in the pattern or risk subtle bugs
        this.config.options[optionName] = Object.freeze(part.options[optionName])
        this.store.log.debug(`🔵  __${optionName}__ option loaded from part \`${part.name}\``)
      } else {
        if (DISTANCE_DEBUG)
          this.store.log.debug(
            'optionDistance for ' +
              optionName +
              ' is ' +
              this.__mutated.optionDistance[optionName] +
              ', and partDistance for ' +
              part.name +
              ' is ' +
              this.__mutated.partDistance[part.name]
          )
        if (this.__mutated.optionDistance[optionName] > this.__mutated.partDistance[part.name]) {
          this.config.options[optionName] = part.options[optionName]
          this.store.log.debug(`🟣  __${optionName}__ option overwritten by \`${part.name}\``)
        }
      }
    }
  }
  if (part.from) this.__addPartOptions(part.from)
  if (part.after) {
    if (Array.isArray(part.after)) {
      for (const dep of part.after) this.__addPartOptions(dep)
    } else this.__addPartOptions(part.after)
  }

  return this
}

function getPluginName(plugin) {
  if (Array.isArray(plugin)) {
    if (plugin[0].name) return plugin[0].name
    if (plugin[0].plugin.name) return plugin[0].plugin.name
  } else {
    if (plugin.name) return plugin.name
    if (plugin.plugin?.name) return plugin.plugin.name
  }

  return false
}

/**
 * Resolves/Adds a part's configured plugins to the global config
 *
 * @private
 * @param {Part} part - The part of which to resolve the config
 * @return {Pattern} this - The Pattern instance
 */
Pattern.prototype.__addPartPlugins = function (part) {
  if (!part.plugins) return this
  if (!this.config.plugins) this.config.plugins = {}
  const plugins = { ...this.config.plugins }
  // Side-step immutability of the part object to ensure plugins is an array
  let partPlugins = part.plugins
  if (!Array.isArray(partPlugins)) partPlugins = [partPlugins]
  // Go through list of part plugins
  for (let plugin of partPlugins) {
    const name = getPluginName(plugin)
    this.store.log.debug(
      plugin.plugin
        ? `🔌  Resolved __${name}__ conditional plugin in \`${part.name}\``
        : `🔌  Resolved __${name}__ plugin in \`${part.name}\``
    )
    // Handle [plugin, data] scenario
    if (Array.isArray(plugin)) {
      const pluginObj = { ...plugin[0], data: plugin[1] }
      plugin = pluginObj
    }
    if (!plugins[name]) {
      // New plugin, so we load it
      plugins[name] = plugin
      this.store.log.info(
        plugin.condition
          ? `New plugin conditionally added: \`${name}\``
          : `New plugin added: \`${name}\``
      )
    } else {
      // Existing plugin, takes some more work
      if (plugin.plugin && plugin.condition) {
        // Multiple instances of the same plugin with different conditions
        // will all be added, so we need to change the name.
        if (plugins[name]?.condition) {
          plugins[name + '_'] = plugin
          this.store.log.info(
            `Plugin \`${name}\` was conditionally added again. Renaming to ${name}_.`
          )
        } else
          this.store.log.info(
            `Plugin \`${name}\` was requested conditionally, but is already added explicitly. Not loading.`
          )
      }
    }
  }

  this.config.plugins = { ...plugins }

  return this
}

/**
 * Creates a store for a set (of settings)
 *
 * @private
 * @return {Store} store - A new store populated with relevant data/methods
 */
Pattern.prototype.__createSetStore = function () {
  const store = new Store()
  store.set('data', this.store.data)
  store.extend([...this.__storeMethods])

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
  for (const i in sets) {
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
  part.stack = this.__designParts[name]?.stack || name
  part.context = {
    parts: this.parts[set],
    config: this.config,
    settings: this.settings[set],
    store: this.setStores[set],
    macros: this.macros,
  }

  if (this.settings[set]?.partClasses) {
    part.attr('class', this.settings[set].partClasses)
  }

  for (const macro in this.macros) {
    part[__macroName(macro)] = this.macros[macro]
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
 * Filter optional measurements out id they are also required measurments
 *
 * @private
 * @return {Pattern} this - The Pattern instance
 */
Pattern.prototype.__filterOptionalMeasurements = function () {
  if (!this.config.optionalMeasurements) {
    this.config.optionalMeasurements = []
    return this
  }
  this.config.optionalMeasurements = this.config.optionalMeasurements.filter(
    (m) => this.config.measurements.indexOf(m) === -1
  )

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
    .__resolveDependencies() // Resolves dependencies
    .__resolveDraftOrder() // Resolves draft order
    .__loadPlugins() // Loads plugins
    .__loadConfigData() // Makes config data available in store
    .__filterOptionalMeasurements() // Removes required m's from optional list
    .__loadOptionDefaults() // Merges default options with user provided ones

  this.store.log.info(`Pattern initialized. Draft order is: ${this.__draftOrder.join(', ')}`)
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
  if (Array.isArray(this.settings[this.activeSet || 0].only)) {
    if (this.settings[this.activeSet || 0].only.includes(partName)) return false
  }
  if (this.__designParts?.[partName]?.hide) return true
  if (this.__designParts?.[partName]?.hideAll) return true
  if (this.__mutated.partHide?.[partName]) return true
  if (this.__mutated.partHideAll?.[partName]) return true
  if (this.parts?.[this.activeSet]?.[partName]?.hidden) return true

  return false
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
  if (Array.isArray(this.settings[this.activeStack || 0].only)) {
    for (const partName of parts) {
      if (this.settings[this.activeStack || 0].only.includes(partName)) return false
    }
    return true
  }
  for (const partName of parts) {
    if (this.__designParts?.[partName]?.hide) return true
    if (this.__designParts?.[partName]?.hideAll) return true
    if (this.__mutated.partHide?.[partName]) return true
    if (this.__mutated.partHideAll?.[partName]) return true
    if (this.parts?.[this.activeSet]?.[partName]?.hidden) return true
  }

  return false
}

/**
 * Generates an array of settings.options objects for sampling a list option
 *
 * @private
 * @param {string} optionName - Name of the option to sample
 * @return {Array} sets - The list of settings objects
 */
Pattern.prototype.__listOptionSets = function (optionName) {
  let option = this.config.options[optionName]
  const base = this.__setBase()
  const sets = []
  let run = 1
  for (const choice of option.list) {
    const settings = {
      ...base,
      options: {
        ...base.options,
      },
      idPrefix: `sample-${run}`,
      partClasses: `sample-${run}`,
    }
    settings.options[optionName] = choice
    sets.push(settings)
    run++
  }

  return sets
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
 * Loads a plugin
 *
 * @private
 * @param {object} plugin - The plugin object, or an object with `plugin` and `condition` keys
 * @param {object} data - Any plugin data to load
 * @return {Pattern} this - The Pattern instance
 */
Pattern.prototype.__loadPlugin = function (plugin, data) {
  this.plugins[plugin.name] = plugin
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
Pattern.prototype.__loadPluginHooks = function (plugin, data) {
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
Pattern.prototype.__loadPluginMacros = function (plugin) {
  for (let macro in plugin.macros) {
    if (typeof plugin.macros[macro] === 'function') {
      this.__macro(macro, plugin.macros[macro])
    }
  }
}

/**
 * Loads the plugins that are part of the config
 *
 * @private
 * @return {Pattern} this - The Pattern instance
 */
Pattern.prototype.__loadPlugins = function () {
  if (!this.config.plugins) return this
  for (const plugin in this.config.plugins)
    this.use(this.config.plugins[plugin], this.config.plugins[plugin]?.data)

  return this
}

/**
 * Loads a plugin's store methods
 *
 * @private
 * @param {object} plugin - The plugin object
 * @return {Pattern} this - The Pattern instance
 */
Pattern.prototype.__loadPluginStoreMethods = function (plugin) {
  if (Array.isArray(plugin.store)) {
    for (const method of plugin.store) this.__storeMethods.add(method)
  } else this.store.log.warning(`Plugin store methods should be an Array`)

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
Pattern.prototype.__macro = function (key, method) {
  this.macros[key] = method

  return this
}

/**
 * Generates an array of settings objects for sampling a measurement
 *
 * @private
 * @param {string} measurementName - The name of the measurement to sample
 * @return {Array} sets - The list of settings objects
 */
Pattern.prototype.__measurementSets = function (measurementName) {
  let val = this.settings[0].measurements[measurementName]
  if (val === undefined)
    this.store.log.error(
      `Cannot sample measurement \`${measurementName}\` because it's \`undefined\``
    )
  let step = val / 50
  val = val * 0.9
  const sets = []
  const base = this.__setBase()
  for (let run = 1; run < 11; run++) {
    const settings = {
      ...base,
      measurements: {
        ...base.measurements,
      },
      idPrefix: `sample-${run}`,
      partClasses: `sample-${run}`,
    }
    settings.measurements[measurementName] = val
    sets.push(settings)
    val += step
  }

  return sets
}

/**
 * Generates an array of settings objects for sampling a list of models
 *
 * @private
 * @param {object} models - The models to sample
 * @param {string} focus - The ID of the model that should be highlighted
 * @return {Array} sets - The list of settings objects
 */
Pattern.prototype.__modelSets = function (models, focus = false) {
  const sets = []
  const base = this.__setBase()
  let run = 1
  // If there's a focus, do it first so it's at the bottom of the SVG
  if (focus) {
    sets.push({
      ...base,
      measurements: models[focus],
      idPrefix: `sample-${run}`,
      partClasses: `sample-${run} sample-focus`,
    })
    run++
    delete models[focus]
  }
  for (const measurements of Object.values(models)) {
    sets.push({
      ...base,
      measurements,
      idPrefix: `sample-${run}`,
      partClasses: `sample-${run}`,
    })
  }

  return sets
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
    if (this.__resolvedDependencies[part]) {
      for (const dependency of this.__resolvedDependencies[part]) {
        if (dependency === partName) return true
      }
    }
  }

  return false
}

/**
 * Generates an array of settings objects for sampling an option
 *
 * @private
 * @param {string} optionName - The name of the option to sample
 * @return {Array} sets - The list of settings objects
 */
Pattern.prototype.__optionSets = function (optionName) {
  let option = this.config.options[optionName]
  if (typeof option?.list === 'object') return this.__listOptionSets(optionName)
  const sets = []
  let factor = 1
  let step, val
  if (typeof option.min === 'undefined' || typeof option.max === 'undefined') {
    const min = option * 0.9
    const max = option * 1.1
    option = { min, max }
  }
  if (typeof option.pct !== 'undefined') factor = 100
  val = option.min / factor
  step = (option.max / factor - val) / 9
  const base = this.__setBase()
  for (let run = 1; run < 11; run++) {
    const settings = {
      ...base,
      options: {
        ...base.options,
      },
      idPrefix: `sample-${run}`,
      partClasses: `sample-${run}`,
    }
    settings.options[optionName] = val
    sets.push(settings)
    val += step
  }

  return sets
}

/**
 * Packs stacks in a 2D space and sets pattern size
 *
 * @private
 * @return {Pattern} this - The Pattern instance
 */
Pattern.prototype.__pack = function () {
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
        (typeof part.stack === 'function' ? part.stack(this.settings, name) : part.stack)
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
    let size = pack(bins, { inPlace: true })
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

  return this
}

/**
 * Recursively solves part dependencies for a part
 *
 * @private
 * @param {object} seen - Object to keep track of seen dependencies
 * @param {string} part - Name of the part
 * @param {object} graph - Dependency graph, used to call itself recursively
 * @param {array} deps - List of dependencies
 * @return {Array} deps - The list of dependencies
 */
Pattern.prototype.__resolveDependency = function (
  seen,
  part,
  graph = this.dependencies,
  deps = []
) {
  if (typeof seen[part] === 'undefined') seen[part] = true
  if (typeof graph[part] === 'string') graph[part] = [graph[part]]
  if (Array.isArray(graph[part])) {
    if (graph[part].length === 0) return []
    else {
      if (deps.indexOf(graph[part]) === -1) deps.push(...graph[part])
      for (let apart of graph[part]) deps.concat(this.__resolveDependency(seen, apart, graph, deps))
    }
  }

  return deps
}

/**
 * Resolves the draft order based on the configuation
 *
 * @private
 * @param {object} graph - The object of resolved dependencies, used to call itself recursively
 * @return {Pattern} this - The Pattern instance
 */
Pattern.prototype.__resolveDraftOrder = function (graph = this.__resolvedDependencies) {
  let sorted = []
  let visited = {}
  Object.keys(graph).forEach(function visit(name, ancestors) {
    if (!Array.isArray(ancestors)) ancestors = []
    ancestors.push(name)
    visited[name] = true
    if (typeof graph[name] !== 'undefined') {
      graph[name].forEach(function (dep) {
        if (visited[dep]) return
        visit(dep, ancestors.slice(0))
      })
    }
    if (sorted.indexOf(name) < 0) sorted.push(name)
  })

  // Don't forget about parts without dependencies
  for (const part in this.__designParts) {
    if (sorted.indexOf(part) === -1) sorted.push(part)
  }

  this.__draftOrder = sorted
  this.config.draftOrder = sorted

  return this
}

/**
 * Resolves parts and their dependencies
 *
 * @private
 * @param {int} count - The count is used to call itself recursively
 * @param {int} distance - Keeps track of how far the dependency is from the pattern
 * @return {Pattern} this - The Pattern instance
 */
Pattern.prototype.__resolveParts = function (count = 0, distance = 0) {
  if (count === 0) {
    for (const part of this.designConfig.parts) {
      // Keep design parts immutable in the pattern or risk subtle bugs
      this.__designParts[part.name] = Object.freeze(part)
    }
  }
  distance++
  if (DISTANCE_DEBUG) this.store.log.debug('Distance incremented to ' + distance)
  for (const part of this.designConfig.parts) {
    if (typeof this.__mutated.partDistance[part.name] === 'undefined') {
      this.__mutated.partDistance[part.name] = distance
      if (DISTANCE_DEBUG)
        this.store.log.debug(
          'Base partDistance for ' + part.name + ' is ' + this.__mutated.partDistance[part.name]
        )
    }
  }
  for (const [name, part] of Object.entries(this.__designParts)) {
    const current_part_distance = this.__mutated.partDistance[part.name]
    const proposed_dependent_part_distance = current_part_distance + 1
    // Hide when hideAll is set
    if (part.hideAll) this.__mutated.partHide[part.name] = true
    // Inject (from)
    if (part.from) {
      if (DISTANCE_DEBUG) this.store.log.debug('Processing ' + part.name + ' "from:"')
      this.__setFromHide(part, name, part.from.name)
      this.__designParts[part.from.name] = part.from
      this.__inject[name] = part.from.name
      if (
        typeof this.__mutated.partDistance[part.from.name] === 'undefined' ||
        this.__mutated.partDistance[part.from.name] < proposed_dependent_part_distance
      ) {
        this.__mutated.partDistance[part.from.name] = proposed_dependent_part_distance
        if (DISTANCE_DEBUG)
          this.store.log.debug(
            '"from:" partDistance for ' +
              part.from.name +
              ' is ' +
              this.__mutated.partDistance[part.from.name]
          )
      }
    }
    // Simple dependency (after)
    if (part.after) {
      if (DISTANCE_DEBUG) this.store.log.debug('Processing ' + part.name + ' "after:"')
      if (Array.isArray(part.after)) {
        for (const dep of part.after) {
          this.__setAfterHide(part, name, dep.name)
          this.__designParts[dep.name] = dep
          this.__addDependency(name, part, dep)
          if (
            typeof this.__mutated.partDistance[dep.name] === 'undefined' ||
            this.__mutated.partDistance[dep.name] < proposed_dependent_part_distance
          ) {
            this.__mutated.partDistance[dep.name] = proposed_dependent_part_distance
            if (DISTANCE_DEBUG)
              this.store.log.debug(
                '"after:" partDistance for ' +
                  dep.name +
                  ' is ' +
                  this.__mutated.partDistance[dep.name]
              )
          }
        }
      } else {
        this.__setAfterHide(part, name, part.after.name)
        this.__designParts[part.after.name] = part.after
        this.__addDependency(name, part, part.after)
        if (
          typeof this.__mutated.partDistance[part.after.name] === 'undefined' ||
          this.__mutated.partDistance[part.after.name] < proposed_dependent_part_distance
        ) {
          this.__mutated.partDistance[part.after.name] = proposed_dependent_part_distance
          if (DISTANCE_DEBUG)
            this.store.log.debug(
              '"after:" partDistance for ' +
                part.after.name +
                ' is ' +
                this.__mutated.partDistance[part.after.name]
            )
        }
      }
    }
  }
  // Did we discover any new dependencies?
  const len = Object.keys(this.__designParts).length
  // If so, resolve recursively
  if (len > count) {
    if (DISTANCE_DEBUG) this.store.log.debug('Recursing...')
    return this.__resolveParts(len, distance)
  }
  // Print final part distances.
  for (const part of this.designConfig.parts) {
    let qualifier = ''
    if (DISTANCE_DEBUG) qualifier = 'final '
    this.store.log.debug(
      '⚪️  `' +
        part.name +
        '` ' +
        qualifier +
        'options priority is __' +
        this.__mutated.partDistance[part.name] +
        '__'
    )
  }

  for (const part of Object.values(this.__designParts)) this.__addPartConfig(part)

  return this
}

/**
 * Resolves parts depdendencies into a flat array
 *
 * @private
 * @param {object} graph - The graph is used to call itsels recursively
 * @return {Pattern} this - The Pattern instance
 */
Pattern.prototype.__resolveDependencies = function (graph = false) {
  if (!graph) graph = this.__dependencies
  for (const i in this.__inject) {
    const dependency = this.__inject[i]
    if (typeof this.__dependencies[i] === 'undefined') this.__dependencies[i] = dependency
    else if (this.__dependencies[i] !== dependency) {
      if (typeof this.__dependencies[i] === 'string') {
        this.__dependencies[i] = [this.__dependencies[i], dependency]
      } else if (Array.isArray(this.__dependencies[i])) {
        if (this.__dependencies[i].indexOf(dependency) === -1)
          this.__dependencies[i].push(dependency)
      } else {
        this.store.log.error('Part dependencies should be a string or an array of strings')
        throw new Error('Part dependencies should be a string or an array of strings')
      }
    }
  }

  let resolved = {}
  let seen = {}
  for (let part in graph) resolved[part] = this.__resolveDependency(seen, part, graph)
  for (let part in seen) if (typeof resolved[part] === 'undefined') resolved[part] = []

  this.__resolvedDependencies = resolved
  this.config.resolvedDependencies = resolved

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
  let hooks = this.hooks[hookName]
  if (hooks.length > 0) {
    this.store.log.debug(`Running \`${hookName}\` hooks`)
    for (let hook of hooks) {
      hook.method(data, hook.data)
    }
  }
}

/**
 * Returns the base/defaults to generate a set of settings
 *
 * @private
 * @return {object} settings - The settings object
 */
Pattern.prototype.__setBase = function () {
  return {
    ...this.settings[0],
    measurements: { ...(this.settings[0].measurements || {}) },
    options: { ...(this.settings[0].options || {}) },
  }
}

/**
 * Sets visibility of a dependency based on its config
 *
 * @private
 * @param {Part} part - The part of which this is a dependency
 * @param {string} name - The name of the part
 * @param {string} depName - The name of the dependency
 * @param {int} set - The index of the set in the list of settings
 * @return {Pattern} this - The Pattern instance
 */
Pattern.prototype.__setFromHide = function (part, name, depName) {
  if (
    part.hideDependencies ||
    part.hideAll ||
    this.__mutated.partHide[name] ||
    this.__mutated.partHideAll[name]
  ) {
    this.__mutated.partHide[depName] = true
    this.__mutated.partHideAll[depName] = true
  }

  return this
}

/**
 * Sets visibility of an 'after' dependency based on its config
 *
 * @private
 * @param {Part} part - The part of which this is a dependency
 * @param {string} name - The name of the part
 * @param {string} depName - The name of the dependency
 * @param {int} set - The index of the set in the list of settings
 * @return {Pattern} this - The Pattern instance
 */
Pattern.prototype.__setAfterHide = function (part, name, depName) {
  if (this.__mutated.partHide[name] || this.__mutated.partHideAll[name]) {
    this.__mutated.partHide[depName] = true
    this.__mutated.partHideAll[depName] = true
  }

  return this
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
 * Loads a conditional plugin
 *
 * @private
 * @param {object} plugin - An object with `plugin` and `condition` keys
 * @return {Pattern} this - The Pattern instance
 */
Pattern.prototype.__useIf = function (plugin) {
  let load = 0
  for (const set of this.settings) {
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

//////////////////////////////////////////////
//         STATIC  PRIVATE FUNCTIONS        //
//////////////////////////////////////////////

/**
 * Merges dependencies into a flat list
 *
 * @private
 * @param {array} dep - New dependencies
 * @param {array} current - Current dependencies
 * @return {array} deps - Merged dependencies
 */
function mergeDependencies(dep = [], current = []) {
  // Current dependencies
  const list = []
  if (Array.isArray(current)) list.push(...current)
  else if (typeof current === 'string') list.push(current)

  if (Array.isArray(dep)) list.push(...dep)
  else if (typeof dep === 'string') list.push(dep)

  // Dependencies should be parts names (string) not the object
  const deps = []
  for (const part of [...new Set(list)]) {
    if (typeof part === 'object') deps.push(part.name)
    else deps.push(part)
  }

  return deps
}
