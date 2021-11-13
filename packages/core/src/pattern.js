import { macroName, sampleStyle, capitalize } from './utils'
import Part from './part'
import Point from './point'
import Path from './path'
import Snippet from './snippet'
import Svg from './svg'
import pack from 'bin-pack'
import Store from './store'
import Hooks from './hooks'
import Attributes from './attributes'
import { version } from '../package.json'

export default function Pattern(config = { options: {} }) {
  // Events store and raise methods
  this.events = {
    info: [],
    warning: [],
    error: [],
    debug: [],
  }
  const events = this.events
  this.raise = {
    info: function (data) {
      events.info.push(data)
    },
    warning: function (data) {
      events.warning.push(data)
    },
    error: function (data) {
      events.error.push(data)
    },
    debug: function (data) {
      events.debug.push(data)
    },
  }
  this.raise.debug(
    `New \`@freesewing/${config.name}:${config.version}\` pattern using \`@freesewing/core:${version}\``
  )

  this.config = config // Pattern configuration
  this.width = 0 // Will be set after render
  this.height = 0 // Will be set after render
  this.is = '' // Will be set when drafting/sampling
  this.debug = true // Will be set when applying settings

  this.store = new Store(this.raise) // Store for sharing data across parts
  this.parts = {} // Parts container
  this.hooks = new Hooks() // Hooks container
  this.Point = Point // Point constructor
  this.Path = Path // Path constructor
  this.Snippet = Snippet // Snippet constructor
  this.Attributes = Attributes // Attributes constructor

  // Default settings
  this.settings = {
    complete: true,
    idPrefix: 'fs-',
    locale: 'en',
    units: 'metric',
    margin: 2,
    layout: true,
    debug: true,
    options: {},
    absoluteOptions: {},
  }

  if (typeof this.config.dependencies === 'undefined') this.config.dependencies = {}
  if (typeof this.config.inject === 'undefined') this.config.inject = {}
  if (typeof this.config.hide === 'undefined') this.config.hide = []
  this.config.resolvedDependencies = this.resolveDependencies(this.config.dependencies)
  this.config.draftOrder = this.draftOrder(this.config.resolvedDependencies)

  // Convert options
  for (let i in config.options) {
    let option = config.options[i]
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

  // Macros
  this.macros = {}

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
    this.raise.warning('Pattern initialized without any settings')
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
    if (this.debug) this.raise.debug(`Running \`${hookName}\` hooks`)
    for (let hook of hooks) {
      hook.method(data, hook.data)
    }
  }
}

/**
 *  The default draft method with pre- and postDraft hooks
 */
Pattern.prototype.draft = function () {
  if (this.is !== 'sample') {
    this.is = 'draft'
    if (this.debug) this.raise.debug(`Drafting pattern`)
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
  for (let partName of this.config.draftOrder) {
    if (this.debug) this.raise.debug(`Creating part \`${partName}\``)
    this.parts[partName] = new this.Part(partName)
    if (typeof this.config.inject[partName] === 'string') {
      if (this.debug)
        this.raise.debug(
          `Injecting part \`${this.config.inject[partName]}\` into part \`${partName}\``
        )
      try {
        this.parts[partName].inject(this.parts[this.config.inject[partName]])
      } catch (err) {
        this.raise.error([
          `Could not inject part \`${this.config.inject[partName]}\` into part \`${partName}\``,
          err,
        ])
      }
    }
    if (this.needs(partName)) {
      let method = 'draft' + capitalize(partName)
      if (typeof this[method] !== 'function') {
        this.raise.error(`Method \`pattern.${method}\` is callable`)
        throw new Error('Method "' + method + '" on pattern object is not callable')
      }
      try {
        this.parts[partName] = this[method](this.parts[partName])
      } catch (err) {
        this.raise.error([`Unable to draft part \`${partName}\``, err])
      }
      if (typeof this.parts[partName] === 'undefined') {
        this.raise.error(
          `Result of \`pattern.${method}\` was \`undefined\`. Did you forget to return the \`Part\` object?`
        )
      }
      try {
        this.parts[partName].render =
          this.parts[partName].render === false ? false : this.wants(partName)
      } catch (err) {
        this.raise.error([`Unable to set \`render\` property on part \`${partName}\``, err])
      }
    } else {
      if (this.debug)
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
  if (this.debug) this.raise.debug(`Sampling option \`${optionName}\``)
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
  if (this.debug) this.raise.debug(`Sampling measurement \`${measurementName}\``)
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
  if (this.debug) this.raise.debug(`Sampling models`)
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
  this.hooks[hook].push({ method, data })

  return this
}

Pattern.prototype.use = function (plugin, data) {
  if (this.debug) this.raise.debug(`Loaded plugin \`${plugin.name}:${plugin.version}\``)
  if (plugin.hooks) this.loadPluginHooks(plugin, data)
  if (plugin.macros) this.loadPluginMacros(plugin)

  return this
}

Pattern.prototype.useIf = function (plugin, settings) {
  if (plugin.condition(settings)) {
    if (this.debug)
      this.raise.debug(
        `Condition met: Loaded plugin \`${plugin.plugin.name}:${plugin.plugin.version}\``
      )
    this.loadPluginHooks(plugin.plugin, plugin.data)
  } else {
    if (this.debug)
      this.raise.debug(
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
      let part = this.parts[bin.id]
      if (bin.x !== 0 || bin.y !== 0) part.attr('transform', `translate(${bin.x}, ${bin.y})`)
    }
    this.width = size.width
    this.height = size.height
  } else if (typeof this.settings.layout === 'object') {
    this.width = this.settings.layout.width
    this.height = this.settings.layout.height
    for (let partId of Object.keys(this.settings.layout.parts)) {
      let transforms = this.settings.layout.parts[partId]
      // Moving
      if (typeof transforms.move === 'object') {
        this.parts[partId].attributes.set(
          'transform',
          'translate(' + transforms.move.x + ', ' + transforms.move.y + ')'
        )
      }
      // Mirrorring
      let center = this.parts[partId].topLeft.shiftFractionTowards(
        this.parts[partId].bottomRight,
        0.5
      )
      let anchor = { x: 0, y: 0 }
      if (transforms.flipX) {
        let dx = anchor.x - center.x
        let transform = `translate(${center.x * -1}, ${center.y * -1})`
        transform += ' scale(-1, 1)'
        transform += ` translate(${center.x * -1 + 2 * dx}, ${center.y})`
        this.parts[partId].attributes.add('transform', transform)
      }
      if (transforms.flipY) {
        let dy = anchor.y - center.y
        let transform = `translate(${center.x * -1}, ${center.y * -1})`
        transform += ' scale(1, -1)'
        transform += ` translate(${center.x}, ${center.y * -1 + 2 * dy})`
        this.parts[partId].attributes.add('transform', transform)
      }
      if (transforms.rotate) {
        let transform = `rotate(${transforms.rotate}, ${center.x - anchor.x}, ${
          center.y - anchor.y
        })`
        this.parts[partId].attributes.add('transform', transform)
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
  graph = this.config.dependencies,
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

/** Resolves part dependencies into a flat array */
Pattern.prototype.resolveDependencies = function (graph = this.config.dependencies) {
  for (let i in this.config.inject) {
    let dependency = this.config.inject[i]
    if (typeof this.config.dependencies[i] === 'undefined') this.config.dependencies[i] = dependency
    else if (this.config.dependencies[i] !== dependency) {
      if (typeof this.config.dependencies[i] === 'string')
        this.config.dependencies[i] = [this.config.dependencies[i], dependency]
      else if (Array.isArray(this.config.dependencies[i])) {
        if (this.config.dependencies[i].indexOf(dependency) === -1)
          this.config.dependencies[i].push(dependency)
      } else {
        this.raise.error('Part dependencies should be a string or an array of strings')
        throw new Error('Part dependencies should be a string or an array of strings')
      }
    }
    // Parts both in the parts and dependencies array trip up the dependency resolver
    if (Array.isArray(this.config.parts)) {
      let pos = this.config.parts.indexOf(this.config.inject[i])
      if (pos !== -1) this.config.parts.splice(pos, 1)
    }
  }

  // Include parts outside the dependency graph
  if (Array.isArray(this.config.parts)) {
    for (let part of this.config.parts) {
      if (typeof this.config.dependencies[part] === 'undefined') this.config.dependencies[part] = []
    }
  }

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
    if (Array.isArray(this.config.resolvedDependencies[this.settings.only])) {
      for (let dependency of this.config.resolvedDependencies[this.settings.only]) {
        if (dependency === partName) return true
      }
    }
  } else if (Array.isArray(this.settings.only)) {
    for (let part of this.settings.only) {
      if (part === partName) return true
      for (let dependency of this.config.resolvedDependencies[part]) {
        if (dependency === partName) return true
      }
    }
  }

  return false
}

/* Checks whether a part is hidden in the config */
Pattern.prototype.isHidden = function (partName) {
  if (Array.isArray(this.config.hide)) {
    if (this.config.hide.indexOf(partName) !== -1) return true
  }

  return false
}

/** Determines whether a part is wanted by the user
 * This depends on the 'only' setting
 */
Pattern.prototype.wants = function (partName) {
  if (typeof this.settings.only === 'undefined' || this.settings.only === false) {
    if (this.isHidden(partName)) return false
  } else if (typeof this.settings.only === 'string') {
    if (this.settings.only === partName) return true
    return false
  } else if (Array.isArray(this.settings.only)) {
    for (let part of this.settings.only) {
      if (part === partName) return true
    }
    return false
  }

  return true
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
  let props = { svg }
  props.width = this.width
  props.height = this.height
  props.settings = this.settings
  props.events = {
    debug: this.events.debug,
    info: this.events.info,
    warning: this.events.warning,
    error: this.events.error,
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
