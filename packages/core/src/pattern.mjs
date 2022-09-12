import { Attributes } from './attributes.mjs'
import pack from 'bin-pack'
import {
  addNonEnumProp,
  macroName,
  sampleStyle,
  capitalize,
  addPartConfig,
  mergeDependencies,
} from './utils.mjs'
import { Part } from './part.mjs'
import { Point } from './point.mjs'
import { Path } from './path.mjs'
import { Snippet } from './snippet.mjs'
import { Svg } from './svg.mjs'
import { Store } from './store.mjs'
import { Hooks } from './hooks.mjs'
import { version } from '../data.mjs'
import { loadPatternDefaults } from './config.mjs'

export function Pattern(config) {
  // Non-enumerable properties
  addNonEnumProp(this, 'plugins', {})
  addNonEnumProp(this, 'width', 0)
  addNonEnumProp(this, 'height', 0)
  addNonEnumProp(this, 'autoLayout', { parts: {} })
  addNonEnumProp(this, 'is', '')
  addNonEnumProp(this, 'hooks', new Hooks())
  addNonEnumProp(this, 'Point', Point)
  addNonEnumProp(this, 'Path', Path)
  addNonEnumProp(this, 'Snippet', Snippet)
  addNonEnumProp(this, 'Attributes', Attributes)
  addNonEnumProp(this, 'macros', {})
  addNonEnumProp(this, '__parts', {})
  addNonEnumProp(this, '__inject', {})
  addNonEnumProp(this, '__dependencies', {})
  addNonEnumProp(this, '__resolvedDependencies', {})
  addNonEnumProp(this, '__draftOrder', [])
  addNonEnumProp(this, '__hide', {})

  // Enumerable properties
  this.config = config // Design config
  this.parts = {} // Drafted parts container
  this.store = new Store() // Store for sharing data across parts

  return this
}

/*
 * We allow late-stage updating of the design config (adding parts for example)
 * so we need to do the things we used to do in the contructor at a later stage.
 * This methods does that, and resolves the design config + user settings
 * Defer some things that used to happen in the constructor to
 * and in doing so creating a pattern we can draft
 */
Pattern.prototype.init = function () {
  // Resolve configuration
  this.__resolveParts() // Resolves parts
    .__resolveDependencies() // Resolves dependencies
    .__resolveDraftOrder() // Resolves draft order
    .__loadPlugins() // Loads plugins
    .__filterOptionalMeasurements() // Removes required m's from optional list
    .__loadConfigData() // Makes config data available in store
    .__loadOptionDefaults() // Merges default options with user provided ones

  // Say hello
  this.store.log.info(
    `New \`${this.store.get('data.name', 'No Name')}:` +
      `${this.store.get(
        'data.version',
        'No version'
      )}\` pattern using \`@freesewing/core:${version}\``
  )
  this.store.log.info(`Pattern initialized. Draft order is: ${this.__draftOrder.join(', ')}`)

  return this
}

Pattern.prototype.__loadConfigData = function () {
  if (this.config.data) this.store.set('data', this.config.data)

  return this
}

Pattern.prototype.__createPartWithContext = function (name) {
  // Context object to add to Part closure
  const part = new Part()
  part.name = name
  part.context = {
    parts: this.parts,
    config: this.config,
    settings: this.settings,
    store: this.store,
    macros: this.macros,
  }

  for (const macro in this.macros) {
    part[macroName(macro)] = this.macros[macro]
  }

  return part
}

// Merges default for options with user-provided options
Pattern.prototype.__loadOptionDefaults = function () {
  if (Object.keys(this.config.options).length < 1) return this
  for (const [name, option] of Object.entries(this.config.options)) {
    // Don't overwrite user-provided settings.options
    if (typeof this.settings.options[name] === 'undefined') {
      if (typeof option === 'object') {
        if (typeof option.pct !== 'undefined') this.settings.options[name] = option.pct / 100
        else if (typeof option.mm !== 'undefined') this.settings.options[name] = option.mm
        else if (typeof option.deg !== 'undefined') this.settings.options[name] = option.deg
        else if (typeof option.count !== 'undefined') this.settings.options[name] = option.count
        else if (typeof option.bool !== 'undefined') this.settings.options[name] = option.bool
        else if (typeof option.dflt !== 'undefined') this.settings.options[name] = option.dflt
        else {
          let err = 'Unknown option type: ' + JSON.stringify(option)
          this.store.log.error(err)
          throw new Error(err)
        }
      } else this.settings.options[name] = option
    }
  }

  return this
}

/* Utility method to get the (initialized) config */
Pattern.prototype.getConfig = function () {
  this.init()
  return this.config
}

/* Utility method to get the (initialized) part list */
Pattern.prototype.getPartList = function () {
  this.init()
  return Object.keys(this.config.parts) || []
}

function snappedOption(option, pattern) {
  const conf = pattern.config.options[option]
  const abs = conf.toAbs(pattern.settings.options[option], pattern.settings)
  // Handle units-specific config
  if (!Array.isArray(conf.snap) && conf.snap.metric && conf.snap.imperial)
    conf.snap = conf.snap[pattern.settings.units]
  // Simple steps
  if (typeof conf.snap === 'number') return Math.ceil(abs / conf.snap) * conf.snap
  // List of snaps
  if (Array.isArray(conf.snap) && conf.snap.length > 1) {
    for (const snap of conf.snap
      .sort((a, b) => a - b)
      .map((snap, i) => {
        const margin =
          i < conf.snap.length - 1
            ? (conf.snap[Number(i) + 1] - snap) / 2 // Look forward
            : (snap - conf.snap[i - 1]) / 2 // Final snap, look backward

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

Pattern.prototype.runHooks = function (hookName, data = false) {
  if (data === false) data = this
  let hooks = this.hooks[hookName]
  if (hooks.length > 0) {
    this.store.log.debug(`Running \`${hookName}\` hooks`)
    for (let hook of hooks) {
      hook.method(data, hook.data)
    }
  }
}

/*
 * Allows adding a part at run-time
 */
Pattern.prototype.addPart = function (part) {
  if (typeof part?.draft === 'function') {
    if (part.name) {
      this.config.parts[part.name] = part
      // Add part-level config to config
      this.config = addPartConfig(part, this.config, this.store)
    } else this.store.log.error(`Part must have a name`)
  } else this.store.log.error(`Part must have a draft() method`)

  return this
}

/**
 *  The default draft method with pre- and postDraft hooks
 */
Pattern.prototype.draft = function () {
  // Late-stage initialization
  this.init()

  if (this.is !== 'sample') {
    this.is = 'draft'
    this.store.log.debug(`Drafting pattern`)
  }
  // Handle snap for pct options
  for (const i in this.settings.options) {
    if (
      typeof this.config.options[i] !== 'undefined' &&
      typeof this.config.options[i].snap !== 'undefined' &&
      this.config.options[i].toAbs instanceof Function
    ) {
      this.settings.absoluteOptions[i] = snappedOption(i, this)
    }
  }

  this.runHooks('preDraft')
  for (const partName of this.config.draftOrder) {
    // Create parts
    this.store.log.debug(`Creating part \`${partName}\``)
    this.parts[partName] = this.__createPartWithContext(partName)
    // Handle inject/inheritance
    if (typeof this.__inject[partName] === 'string') {
      this.store.log.debug(`Creating part \`${partName}\` from part \`${this.__inject[partName]}\``)
      try {
        this.parts[partName].inject(this.parts[this.__inject[partName]])
      } catch (err) {
        this.store.log.error([
          `Could not inject part \`${this.inject[partName]}\` into part \`${partName}\``,
          err,
        ])
      }
    }
    if (this.needs(partName)) {
      // Draft part
      if (typeof this.__parts?.[partName]?.draft === 'function') {
        try {
          const result = this.__parts[partName].draft(this.parts[partName].shorthand())
          if (typeof result === 'undefined') {
            this.store.log.error(
              `Result of drafting part ${partName} was undefined. Did you forget to return the part?`
            )
          } else this.parts[partName] = result
        } catch (err) {
          this.store.log.error([`Unable to draft part \`${partName}\``, err])
        }
      } else this.store.log.error(`Unable to draft pattern. Part.draft() is not callable`)
      try {
        this.parts[partName].render =
          this.parts[partName].render === false ? false : this.wants(partName)
      } catch (err) {
        this.store.log.error([`Unable to set \`render\` property on part \`${partName}\``, err])
      }
    } else {
      this.store.log.debug(
        `Part \`${partName}\` is not needed. Skipping draft and setting render to \`false\``
      )
      this.parts[partName].render = false
    }
  }
  this.runHooks('postDraft')

  return this
}

/**
 * Handles pattern sampling
 */
Pattern.prototype.sample = function () {
  // Late-stage initialization
  this.init()
  if (this.settings.sample.type === 'option') {
    return this.sampleOption(this.settings.sample.option)
  } else if (this.settings.sample.type === 'measurement') {
    return this.sampleMeasurement(this.settings.sample.measurement)
  } else if (this.settings.sample.type === 'models') {
    return this.sampleModels(this.settings.sample.models, this.settings.sample.focus || false)
  }
}

Pattern.prototype.sampleParts = function () {
  let parts = {}
  this.settings.complete = false
  this.settings.paperless = false
  this.draft()
  for (let i in this.parts) {
    parts[i] = new this.Part()
    parts[i].render = this.parts[i].render
  }
  return parts
}

Pattern.prototype.sampleRun = function (parts, anchors, run, runs, extraClass = false) {
  this.draft()
  for (let i in this.parts) {
    let anchor = false
    let dx = 0
    let dy = 0
    if (this.parts[i].points.anchor) {
      if (typeof anchors[i] === 'undefined') anchors[i] = this.parts[i].points.anchor
      else {
        if (!anchors[i].sitsOn(this.parts[i].points.anchor)) {
          dx = this.parts[i].points.anchor.dx(anchors[i])
          dy = this.parts[i].points.anchor.dy(anchors[i])
        }
      }
    }
    for (let j in this.parts[i].paths) {
      parts[i].paths[j + '_' + run] = this.parts[i].paths[j]
        .clone()
        .attr(
          'style',
          extraClass === 'sample-focus'
            ? this.settings.sample
              ? this.settings.sample.focusStyle || sampleStyle(run, runs)
              : sampleStyle(run, runs)
            : sampleStyle(
                run,
                runs,
                this.settings.sample ? this.settings.sample.styles || false : false
              )
        )
        .attr('data-sample-run', run)
        .attr('data-sample-runs', runs)
      if (this.parts[i].points.anchor)
        parts[i].paths[j + '_' + run] = parts[i].paths[j + '_' + run].translate(dx, dy)
      if (extraClass !== false) parts[i].paths[j + '_' + run].attributes.add('class', extraClass)
    }
  }
}

/**
 * Handles option sampling
 */
Pattern.prototype.sampleOption = function (optionName) {
  this.is = 'sample'
  this.store.log.debug(`Sampling option \`${optionName}\``)
  this.runHooks('preSample')
  let step, val
  let factor = 1
  let anchors = {}
  let parts = this.sampleParts()
  let option = this.config.options[optionName]
  if (typeof option.list === 'object') {
    return this.sampleListOption(optionName)
  }
  if (typeof option.min === 'undefined' || typeof option.max === 'undefined') {
    let min = option * 0.9
    let max = option * 1.1
    option = { min, max }
  }
  if (typeof option.pct !== 'undefined') factor = 100
  val = option.min / factor
  step = (option.max / factor - val) / 9
  for (let run = 1; run < 11; run++) {
    this.settings.options[optionName] = val
    this.sampleRun(parts, anchors, run, 10)
    val += step
  }
  this.parts = parts
  this.runHooks('postSample')

  return this
}

Pattern.prototype.sampleListOption = function (optionName) {
  let parts = this.sampleParts()
  let option = this.config.options[optionName]
  let anchors = {}
  let run = 1
  let runs = option.list.length
  for (let val of option.list) {
    this.settings.options[optionName] = val
    this.sampleRun(parts, anchors, run, runs)
    run++
  }
  this.parts = parts

  return this
}

/**
 * Handles measurement sampling
 */
Pattern.prototype.sampleMeasurement = function (measurementName) {
  this.is = 'sample'
  this.store.log.debug(`Sampling measurement \`${measurementName}\``)
  this.runHooks('preSample')
  let anchors = {}
  let parts = this.sampleParts()
  let val = this.settings.measurements[measurementName]
  if (val === undefined)
    this.store.log.error(
      `Cannot sample measurement \`${measurementName}\` because it's \`undefined\``
    )
  let step = val / 50
  val = val * 0.9
  for (let run = 1; run < 11; run++) {
    this.settings.measurements[measurementName] = val
    this.sampleRun(parts, anchors, run, 10)
    val += step
  }
  this.parts = parts
  this.runHooks('postSample')

  return this
}

/**
 * Handles models sampling
 */
Pattern.prototype.sampleModels = function (models, focus = false) {
  this.is = 'sample'
  this.store.log.debug(`Sampling models`)
  this.runHooks('preSample')
  let anchors = {}
  let parts = this.sampleParts()
  // If there's a focus, do it first so it's at the bottom of the SVG
  if (focus) {
    this.settings.measurements = models[focus]
    this.sampleRun(parts, anchors, -1, -1, 'sample-focus')
    delete models[focus]
  }
  let run = -1
  let runs = Object.keys(models).length
  for (let l in models) {
    run++
    this.settings.measurements = models[l]
    this.sampleRun(parts, anchors, run, runs)
  }
  this.parts = parts
  this.runHooks('postSample')

  return this
}

Pattern.prototype.render = function () {
  this.svg = new Svg(this)
  this.svg.hooks = this.hooks

  return this.pack().svg.render(this)
}

Pattern.prototype.on = function (hook, method, data) {
  for (const added of this.hooks[hook]) {
    // Don't add it twice
    if (added.method === method) return this
  }
  this.hooks[hook].push({ method, data })

  return this
}

Pattern.prototype.__loadPlugins = function () {
  for (const plugin of this.config.plugins) this.use(plugin, plugin.data)

  return this
}

Pattern.prototype.__loadPlugin = function (plugin, data, explicit = false) {
  this.plugins[plugin.name] = plugin
  if (plugin.hooks) this.__loadPluginHooks(plugin, data)
  if (plugin.macros) this.__loadPluginMacros(plugin)
  if (plugin.store) this.__loadPluginStoreMethods(plugin)
  this.store.log.info(`Loaded plugin \`${plugin.name}:${plugin.version}\``)

  return this
}

Pattern.prototype.use = function (plugin, data) {
  if (this.plugins?.[plugin.name]?.condition && !plugin.condition) {
    // Plugin was first loaded conditionally, and is now loaded explicitly
    this.store.log.info(
      `Plugin \`${plugin.plugin.name} was loaded conditionally earlier, but is now loaded explicitly.`
    )
    return this.__loadPlugin(plugin, data)
  }
  // New plugin
  else if (!this.plugins?.[plugin.name])
    return plugin.plugin && plugin.condition
      ? this.__useIf(plugin, data) // Conditional plugin
      : this.__loadPlugin(plugin, data) // Regular plugin

  this.store.log.info(
    `Plugin \`${
      plugin.plugin ? plugin.plugin.name : plugin.name
    }\` was requested, but it's already loaded. Skipping.`
  )

  return this
}

Pattern.prototype.__useIf = function (plugin, settings) {
  if (plugin.condition(settings)) {
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
}

Pattern.prototype.__loadPluginMacros = function (plugin) {
  for (let macro in plugin.macros) {
    if (typeof plugin.macros[macro] === 'function') {
      this.macro(macro, plugin.macros[macro])
    }
  }
}

Pattern.prototype.__loadPluginStoreMethods = function (plugin) {
  if (Array.isArray(plugin.store)) this.store = this.store.extend(...plugin.store)
  else this.store.log.warning(`Plugin store methods should be an Array`)
}

Pattern.prototype.macro = function (key, method) {
  this.macros[key] = method
}

/** Packs parts in a 2D space and sets pattern size */
Pattern.prototype.pack = function () {
  if (this.store.logs.error.length > 0) {
    this.store.log.warning(`One or more errors occured. Not packing pattern parts`)
    return this
  }
  let bins = []
  for (let key in this.parts) {
    let part = this.parts[key]
    // Avoid multiple render calls to cause stacking of transforms
    part.attributes.remove('transform')
    if (part.render) {
      part.stack()
      let width = part.bottomRight.x - part.topLeft.x
      let height = part.bottomRight.y - part.topLeft.y
      if (this.settings.layout === true) bins.push({ id: key, width, height })
      else {
        if (this.width < width) this.width = width
        if (this.height < height) this.height = height
      }
    }
  }
  if (this.settings.layout === true) {
    let size = pack(bins, { inPlace: true })
    for (let bin of bins) {
      this.autoLayout.parts[bin.id] = { move: {} }
      let part = this.parts[bin.id]
      if (bin.x !== 0 || bin.y !== 0) {
        part.attr('transform', `translate(${bin.x}, ${bin.y})`)
      }

      this.autoLayout.parts[bin.id].move = {
        x: bin.x + part.layout.move.x,
        y: bin.y + part.layout.move.y,
      }
    }
    this.width = size.width
    this.height = size.height
  } else if (typeof this.settings.layout === 'object') {
    this.width = this.settings.layout.width
    this.height = this.settings.layout.height
    for (let partId of Object.keys(this.settings.layout.parts)) {
      // Some parts are added by late-stage plugins
      if (this.parts[partId]) {
        let transforms = this.settings.layout.parts[partId]
        this.parts[partId].generateTransform(transforms)
      }
    }
  }

  return this
}

/** Determines the order to draft parts in, based on dependencies */
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
  for (const part in this.__parts) {
    if (sorted.indexOf(part) === -1) sorted.push(part)
  }

  this.__draftOrder = sorted
  this.config.draftOrder = sorted

  return this
}

/** Recursively solves part dependencies for a part */
Pattern.prototype.resolveDependency = function (seen, part, graph = this.dependencies, deps = []) {
  if (typeof seen[part] === 'undefined') seen[part] = true
  if (typeof graph[part] === 'string') graph[part] = [graph[part]]
  if (Array.isArray(graph[part])) {
    if (graph[part].length === 0) return []
    else {
      if (deps.indexOf(graph[part]) === -1) deps.push(...graph[part])
      for (let apart of graph[part]) deps.concat(this.resolveDependency(seen, apart, graph, deps))
    }
  }

  return deps
}

/** Adds a part as a simple dependency **/
Pattern.prototype.__addDependency = function (name, part, dep) {
  this.__dependencies[name] = mergeDependencies(dep.name, this.__dependencies[name])
  if (typeof this.__parts[dep.name] === 'undefined') {
    this.config = addPartConfig(this.__parts[dep.name], this.config, this.store)
  }

  return this
}

/** Filter optional measurements out if they are also required measurements */
Pattern.prototype.__filterOptionalMeasurements = function () {
  this.config.optionalMeasurements = this.config.optionalMeasurements.filter(
    (m) => this.config.measurements.indexOf(m) === -1
  )

  return this
}

/** Pre-Resolves part dependencies that are passed in 2022 style */
Pattern.prototype.__resolveParts = function (count = 0) {
  if (count === 0) {
    for (const part of this.config.parts) {
      this.__parts[part.name] = part
    }
  }
  for (const [name, part] of Object.entries(this.__parts)) {
    // Hide when hideAll is set
    if (part.hideAll) part.hide = true
    // Inject (from)
    if (part.from) {
      if (part.hideDependencies || part.hideAll) {
        part.from.hide = true
        part.from.hideAll = true
      }
      this.__parts[part.from.name] = part.from
      this.__inject[name] = part.from.name
    }
    // Simple dependency (after)
    if (part.after) {
      if (Array.isArray(part.after)) {
        for (const dep of part.after) {
          this.__parts[dep.name] = dep
          this.__addDependency(name, part, dep)
        }
      } else {
        if (part.hideDependencies) part.after.hide = true
        this.__parts[part.after.name] = part.after
        this.__addDependency(name, part, part.after)
      }
    }
  }
  // Did we discover any new dependencies?
  const len = Object.keys(this.__parts).length
  // If so, resolve recursively
  if (len > count) return this.__resolveParts(len)

  for (const [name, part] of Object.entries(this.__parts)) {
    this.config = addPartConfig(part, this.config, this.store)
  }

  return this
}

/** Resolves part dependencies into a flat array */
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
  for (let part in graph) resolved[part] = this.resolveDependency(seen, part, graph)
  for (let part in seen) if (typeof resolved[part] === 'undefined') resolved[part] = []

  this.__resolvedDependencies = resolved
  this.config.resolvedDependencies = resolved

  return this
}

/** Determines whether a part is needed
 * This depends on the 'only' setting and the
 * configured dependencies.
 */
Pattern.prototype.needs = function (partName) {
  // If only is unset, all parts are needed
  if (
    typeof this.settings.only === 'undefined' ||
    this.settings.only === false ||
    (Array.isArray(this.settings.only) && this.settings.only.length === 0)
  )
    return true

  // Make only to always be an array
  const only = typeof this.settings.only === 'string' ? [this.settings.only] : this.settings.only

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

/** Determines whether a part is wanted by the user
 * This depends on the 'only' setting
 */
Pattern.prototype.wants = function (partName) {
  // Hidden parts are not wanted
  if (this.isHidden(partName)) return false
  else if (typeof this.settings.only === 'string') return this.settings.only === partName
  else if (Array.isArray(this.settings.only)) {
    for (const part of this.settings.only) {
      if (part === partName) return true
    }
    return false
  }

  return true
}

/* Checks whether a part is hidden in the config */
Pattern.prototype.isHidden = function (partName) {
  if (Array.isArray(this.settings.only)) {
    if (this.settings.only.includes(partName)) return false
  }
  if (this.__parts?.[partName]?.hide) return true
  if (this.__parts?.[partName]?.hideAll) return true

  return false
}

/** Returns props required to render this pattern through
 *  an external renderer (eg. a React component)
 */
Pattern.prototype.getRenderProps = function () {
  // Run pre-render hook
  let svg = new Svg(this)
  svg.hooks = this.hooks
  svg.runHooks('preRender')

  this.pack()
  // Run post-layout hook
  this.runHooks('postLayout')
  let props = { svg }
  props.width = this.width
  props.height = this.height
  props.autoLayout = this.autoLayout
  props.settings = this.settings
  props.logs = {
    debug: this.store.logs.debug,
    info: this.store.logs.info,
    error: this.store.logs.error,
    warning: this.store.logs.warning,
  }
  props.parts = {}
  for (let p in this.parts) {
    if (this.parts[p].render) {
      props.parts[p] = {
        paths: this.parts[p].paths,
        points: this.parts[p].points,
        snippets: this.parts[p].snippets,
        attributes: this.parts[p].attributes,
        height: this.parts[p].height,
        width: this.parts[p].width,
        bottomRight: this.parts[p].bottomRight,
        topLeft: this.parts[p].topLeft,
      }
    }
  }

  return props
}

// Merges settings object with default settings
Pattern.prototype.__applySettings = function (settings) {
  this.settings = { ...loadPatternDefaults(), ...settings }

  return this
}
