import { Attributes } from './attributes.mjs'
import pack from 'bin-pack'
import {
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

/*
 * Makes sure an object passed to be attached as a part it not merely a method
 */
const decoratePartDependency = (obj, name) => (typeof obj === 'function') ? { draft: obj, name } : obj


export function Pattern(config = { options: {} }) {

  // Apply default settings
  this.settings = {
    complete: true,
    idPrefix: 'fs-',
    locale: 'en',
    units: 'metric',
    margin: 2,
    scale: 1,
    layout: true,
    debug: false,
    options: {},
    absoluteOptions: {},
  }

  // Object to hold events
  this.events = {
    debug: [],
    error: [],
    info: [],
    suggestion: [],
    warning: [],
  }

  // Keep track of loaded plugins
  this.plugins = {}

  // Raise methods - Make events and settings avialable in them
  const events = this.events
  const settings = this.settings
  this.raise = {
    debug: function (data) {
      // Debug only if debug is active
      if (settings.debug) events.debug.push(data)
    },
    error: function (data) {
      events.error.push(data)
    },
    info: function (data) {
      events.info.push(data)
    },
    suggestion: function (data) {
      events.info.push(data)
    },
    warning: function (data) {
      events.warning.push(data)
    },
  }

  // Say hi
  const name = config?.data?.name || 'No Name'
  const patversion = config?.data?.version || 'No Version'
  this.raise.info(
    `New \`${name}:${patversion}\` pattern using \`@freesewing/core:${version}\``
  )

  // More things that go in a pattern
  this.config = config // Pattern configuration
  this.width = 0 // Will be set after render
  this.height = 0 // Will be set after render
  this.is = '' // Will be set when drafting/sampling
  this.autoLayout = { parts: {} } // Will hold auto-generated layout
  this.cutList = {} // Will hold the cutlist
  this.store = new Store([[ 'log', this.raise]]) // Store for sharing data across parts
  this.parts = {} // Parts container
  this.hooks = new Hooks() // Hooks container
  this.Point = Point // Point constructor
  this.Path = Path // Path constructor
  this.Snippet = Snippet // Snippet constructor
  this.Attributes = Attributes // Attributes constructor
  this.initialized = 0 // Keep track of init calls
  this.macros = {} // Macros

  if (typeof this.config.dependencies === 'undefined') this.config.dependencies = {}
  if (typeof this.config.inject === 'undefined') this.config.inject = {}
  if (typeof this.config.hide === 'undefined') this.config.hide = []

  // Convert options
  this.addOptions(config.options)
  if (this.config.parts) {
    for (const partName in this.config.parts) {
      if (this.config.parts[partName].options) this.addOptions(this.config.parts[partName].options)
    }
  }

  // Context object to add to Part closure
  const context = {
    parts: this.parts,
    config: this.config,
    settings: this.settings,
    store: this.store,
    macros: this.macros,
    events: this.events,
    raise: this.raise,
  }

  // Part closure
  this.Part = function (name = false) {
    let part = new Part()
    part.context = context
    for (let macro in context.macros) {
      part[macroName(macro)] = context.macros[macro]
    }
    if (name) part.name = name

    return part
  }
}

// Converts/adds options
Pattern.prototype.addOptions = function(options={}) {
  for (const i in options) {
    // Add to config
    const option = options[i]
    this.config.options[i] = option
    if (typeof option === 'object') {
      if (typeof option.pct !== 'undefined') this.settings.options[i] = option.pct / 100
      else if (typeof option.mm !== 'undefined') this.settings.options[i] = option.mm
      else if (typeof option.deg !== 'undefined') this.settings.options[i] = option.deg
      else if (typeof option.count !== 'undefined') this.settings.options[i] = option.count
      else if (typeof option.bool !== 'undefined') this.settings.options[i] = option.bool
      else if (typeof option.dflt !== 'undefined') this.settings.options[i] = option.dflt
      else {
        let err = 'Unknown option type: ' + JSON.stringify(option)
        this.raise.error(err)
        throw new Error(err)
      }
    } else {
      this.settings.options[i] = option
    }
  }

  // Make it chainable
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


/*
 * Defer some things that used to happen in the constructor to
 * facilitate late-stage adding of parts
 */
Pattern.prototype.init = function () {
  this.initialized++
  // Resolve all dependencies
  this.dependencies = this.config.dependencies
  this.inject = this.config.inject
  this.__parts = this.config.parts
  this.preresolveDependencies()
  this.resolvedDependencies = this.resolveDependencies(this.dependencies)
  this.config.resolvedDependencies = this.resolvedDependencies
  this.config.draftOrder = this.draftOrder(this.resolvedDependencies)
  // Load plugins
  if (this.config.plugins) {
    for (const plugin of Object.values(this.config.plugins)) this.use(plugin)
  }

  // Make all parts uniform
  if (this.__parts) {
    for (const [key, value] of Object.entries(this.__parts)) {
      this.__parts[key] = decoratePartDependency(value)
    }
  }

  return this
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

// Merges settings object with this.settings
Pattern.prototype.apply = function (settings) {
  if (typeof settings !== 'object') {
    this.raise.warning('Pattern instantiated without any settings')
    return this
  }
  for (let key of Object.keys(settings)) {
    if (Array.isArray(settings[key])) {
      if (Array.isArray(this.settings[key])) {
        for (let entry of settings[key]) this.settings[key].push(entry)
      } else this.settings[key] = settings[key]
    } else if (typeof settings[key] === 'object') {
      this.settings[key] = {
        ...this.settings[key],
        ...settings[key],
      }
    } else this.settings[key] = settings[key]
  }
  if (!this.settings.debug) this.debug = false

  return this
}

Pattern.prototype.runHooks = function (hookName, data = false) {
  if (data === false) data = this
  let hooks = this.hooks[hookName]
  if (hooks.length > 0) {
    this.raise.debug(`Running \`${hookName}\` hooks`)
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
      this.config = addPartConfig(part, this.config, this.raise)
    }
    else this.raise.error(`Part must have a name`)
  }
  else this.raise.error(`Part must have a draft() method`)

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
    this.cutList = {}
    this.raise.debug(`Drafting pattern`)
  }
  // Handle snap for pct options
  for (let i in this.settings.options) {
    if (
      typeof this.config.options[i] !== 'undefined' &&
      typeof this.config.options[i].snap !== 'undefined' &&
      this.config.options[i].toAbs instanceof Function
    ) {
      this.settings.absoluteOptions[i] = snappedOption(i, this)
    }
  }

  this.runHooks('preDraft')
  // Don't forget about parts without any dependencies
  const allParts = [...new Set([
    ...this.config.draftOrder,
    ...Object.keys(this.__parts)
  ])]
  for (const partName of allParts) {
    // Create parts
    this.raise.debug(`Creating part \`${partName}\``)
    this.parts[partName] = new this.Part(partName)
    // Handle inject/inheritance
    if (typeof this.inject[partName] === 'string') {
      this.raise.debug(
        `Injecting part \`${this.inject[partName]}\` into part \`${partName}\``
      )
      try {
        this.parts[partName].inject(this.parts[this.inject[partName]])
      } catch (err) {
        this.raise.error([
          `Could not inject part \`${this.inject[partName]}\` into part \`${partName}\``,
          err,
        ])
      }
    }
    if (this.needs(partName)) {
      // Draft part
      if (typeof this.__parts?.[partName]?.draft === 'function') {
        try {
          this.parts[partName] = this.__parts[partName].draft(this.parts[partName])
          if (this.parts[partName].render) this.cutList[partName] = this.parts[partName].cut
        } catch (err) {
          this.raise.error([`Unable to draft part \`${partName}\``, err])
        }
      }
      else this.raise.error(`Unable to draft pattern. Part.draft() is not callable`)
      try {
        this.parts[partName].render =
          this.parts[partName].render === false ? false : this.wants(partName)
      } catch (err) {
        this.raise.error([`Unable to set \`render\` property on part \`${partName}\``, err])
      }
    } else {
      this.raise.debug(
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
  this.raise.debug(`Sampling option \`${optionName}\``)
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
  this.raise.debug(`Sampling measurement \`${measurementName}\``)
  this.runHooks('preSample')
  let anchors = {}
  let parts = this.sampleParts()
  let val = this.settings.measurements[measurementName]
  if (val === undefined)
    this.raise.error(`Cannot sample measurement \`${measurementName}\` because it's \`undefined\``)
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
  this.raise.debug(`Sampling models`)
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

Pattern.prototype.loadPlugin = function (plugin, data, explicit=false) {
  this.plugins[plugin.name] = plugin
  if (plugin.hooks) this.loadPluginHooks(plugin, data)
  if (plugin.macros) this.loadPluginMacros(plugin)
  if (plugin.store) this.loadPluginStoreMethods(plugin)
  this.raise.info(`Loaded plugin \`${plugin.name}:${plugin.version}\``)

  return this
}


Pattern.prototype.use = function (plugin, data) {
  // Existing plugin - But we may still need to load it
  // if it was previously loaded conditionally, and is now loaded explicitly
  if (this.plugins?.[plugin.name]?.condition && !plugin.condition) {
    this.raise.info(
      `Plugin \`${plugin.plugin.name} was loaded conditionally earlier, but is now loaded explicitly.`
    )
    return this.loadPlugin(plugin, data)
  }
  // New plugin?
  else if (!this.plugins?.[plugin.name]) return (plugin.plugin && plugin.condition)
    ? this.useIf(plugin, data) // Conditional plugin
    : this.loadPlugin(plugin, data)  // Regular plugin

  this.raise.info(
    `Plugin \`${plugin.plugin ? plugin.plugin.name : plugin.name}\` was requested, but it's already loaded. Skipping.`
  )

  return this
}

Pattern.prototype.useIf = function (plugin, settings) {
  if (plugin.condition(settings)) {
    this.raise.info(
      `Condition met: Loaded plugin \`${plugin.plugin.name}:${plugin.plugin.version}\``
    )
    this.loadPlugin(plugin.plugin, plugin.data)
  } else {
    this.raise.info(
      `Condition not met: Skipped loading plugin \`${plugin.plugin.name}:${plugin.plugin.version}\``
    )
  }

  return this
}

Pattern.prototype.loadPluginHooks = function (plugin, data) {
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

Pattern.prototype.loadPluginMacros = function (plugin) {
  for (let macro in plugin.macros) {
    if (typeof plugin.macros[macro] === 'function') {
      this.macro(macro, plugin.macros[macro])
    }
  }
}

Pattern.prototype.loadPluginStoreMethods = function (plugin) {
  if (Array.isArray(plugin.store)) this.store = this.store.extend(...plugin.store)
  else this.raise.warning(`Plugin store methods should be an Array`)
}

Pattern.prototype.macro = function (key, method) {
  this.macros[key] = method
}

/** Packs parts in a 2D space and sets pattern size */
Pattern.prototype.pack = function () {
  if (this.events.error.length > 0) {
    this.raise.warning(`One or more errors occured. Not packing pattern parts`)
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
        this.parts[partId].generateTransform(transforms);
      }
    }
  }

  return this
}

/** Determines the order to draft parts in, based on dependencies */
Pattern.prototype.draftOrder = function (graph = this.resolveDependencies()) {
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

  return sorted
}

/** Recursively solves part dependencies for a part */
Pattern.prototype.resolveDependency = function (
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
      for (let apart of graph[part]) deps.concat(this.resolveDependency(seen, apart, graph, deps))
    }
  }

  return deps
}

/** Adds a part as a simple dependency **/
Pattern.prototype.addDependency = function (name, part, dep) {
  // FIXME: This causes issues
  //if (part.hideDependencies || part.hideAll) {
  //  dep.hide = true
  //  dep.hideAll = true
  //}
  this.dependencies[name] = mergeDependencies(dep.name, this.dependencies[name])
  if (typeof this.__parts[dep.name] === 'undefined') {
    this.__parts[dep.name] = decoratePartDependency(dep)
    addPartConfig(this.__parts[dep.name], this.config, this.raise)
  }

  return this
}

/** Filter optional measurements out if they are also required measurements */
Pattern.prototype.filterOptionalMeasurements = function () {
  this.config.optionalMeasurements = this.config.optionalMeasurements.filter(
    m => this.config.measurements.indexOf(m) === -1
  )

  return this
}

/** Pre-Resolves part dependencies that are passed in 2022 style */
Pattern.prototype.preresolveDependencies = function (count=0) {
  if (!this.__parts) return
  for (const [name, part] of Object.entries(this.__parts)) {
    // Inject (from)
    if (part.from) {
      this.inject[name] = part.from.name
      if (typeof this.__parts[part.from.name] === 'undefined') {
        this.__parts[part.from.name] = decoratePartDependency(part.from)
        if (part.hideDependencies || part.hideAll) {
          this.__parts[part.from.name].hide = true
          this.__parts[part.from.name].hideAll = true
        }
        addPartConfig(this.__parts[part.from.name], this.config, this.raise)
      }
    }
    // Simple dependency (after)
    if (part.after) {
      if (Array.isArray(part.after)) {
        for (const dep of part.after) this.addDependency(name, part, dep)
      }
      else this.addDependency(name, part, part.after)
    }
  }
  // Did we discover any new dependencies?
  const len = Object.keys(this.__parts).length

  if (len > count) return this.preresolveDependencies(len)

  for (const [name, part] of Object.entries(this.__parts)) {
    addPartConfig(part, this.config, this.raise)
  }

  // Weed out doubles
  return this.filterOptionalMeasurements()
}

/** Resolves part dependencies into a flat array */
Pattern.prototype.resolveDependencies = function (graph = this.dependencies) {
  for (let i in this.inject) {
    let dependency = this.inject[i]
    if (typeof this.dependencies[i] === 'undefined') this.dependencies[i] = dependency
    else if (this.dependencies[i] !== dependency) {
      if (typeof this.dependencies[i] === 'string') {
        this.dependencies[i] = [this.dependencies[i], dependency]
      } else if (Array.isArray(this.dependencies[i])) {
        if (this.dependencies[i].indexOf(dependency) === -1)
          this.dependencies[i].push(dependency)
      } else {
        this.raise.error('Part dependencies should be a string or an array of strings')
        throw new Error('Part dependencies should be a string or an array of strings')
      }
    }
    // Parts both in the parts and dependencies array trip up the dependency resolver
    if (Array.isArray(this.__parts)) {
      let pos = this.__parts.indexOf(this.inject[i])
      if (pos !== -1) this.__parts.splice(pos, 1)
    }
  }

  // Include parts outside the dependency graph
  //if (typeof this.config.parts === 'object') {
  //  for (const part of Object.values(this.config.parts)) {
  //    if (typeof part === 'string' && typeof this.dependencies[part] === 'undefined') this.dependencies[part] = []
  //  }
  //}

  let resolved = {}
  let seen = {}
  for (let part in graph) resolved[part] = this.resolveDependency(seen, part, graph)
  for (let part in seen) if (typeof resolved[part] === 'undefined') resolved[part] = []

  return resolved
}

/** Determines whether a part is needed
 * This depends on the 'only' setting and the
 * configured dependencies.
 */
Pattern.prototype.needs = function (partName) {
  if (typeof this.settings.only === 'undefined' || this.settings.only === false) return true
  else if (typeof this.settings.only === 'string') {
    if (this.settings.only === partName) return true
    if (Array.isArray(this.resolvedDependencies[this.settings.only])) {
      for (let dependency of this.resolvedDependencies[this.settings.only]) {
        if (dependency === partName) return true
      }
    }
  } else if (Array.isArray(this.settings.only)) {
    for (let part of this.settings.only) {
      if (part === partName) return true
      for (let dependency of this.resolvedDependencies[part]) {
        if (dependency === partName) return true
      }
    }
  }

  return false
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

/** Determines whether a part is wanted by the user
 * This depends on the 'only' setting
 */
Pattern.prototype.wants = function (partName) {
  if (this.isHidden(partName)) return false
  else if (typeof this.settings.only === 'string') return (this.settings.only === partName)
  else if (Array.isArray(this.settings.only)) {
    for (const part of this.settings.only) {
      if (part === partName) return true
    }
    return false
  }

  return true
}

/**
 * Returns the cutList property
 */
Pattern.prototype.getCutList = function () {
  return this.cutList
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
  props.events = {
    debug: this.events.debug,
    info: this.events.info,
    error: this.events.error,
    warning: this.events.warning,
  }
  props.cutList = this.cutList
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
