import { Attributes } from './attributes.mjs'
import * as utils from './utils.mjs'
import { Point } from './point.mjs'
import { Path } from './path.mjs'
import { Snippet } from './snippet.mjs'
import { Hooks } from './hooks.mjs'

export function Part() {
  // Non-enumerable properties
  utils.addNonEnumProp(this, 'freeId', 0)
  utils.addNonEnumProp(this, 'topLeft', false)
  utils.addNonEnumProp(this, 'bottomRight', false)
  utils.addNonEnumProp(this, 'width', false)
  utils.addNonEnumProp(this, 'height', false)
  utils.addNonEnumProp(this, 'utils', utils)
  utils.addNonEnumProp(this, 'layout', { move: { x: 0, y: 0 } })
  utils.addNonEnumProp(this, 'Point', Point)
  utils.addNonEnumProp(this, 'Path', Path)
  utils.addNonEnumProp(this, 'Snippet', Snippet)
  utils.addNonEnumProp(this, 'hooks', new Hooks())

  // Enumerable properties
  this.render = true // FIXME: Replace render with hide
  this.hide = false // FIXME: Replace render with hide
  this.attributes = new Attributes()
  this.points = {}
  this.paths = {}
  this.snippets = {}

  return this
}

Part.prototype.macroClosure = function (args) {
  let self = this
  let method = function (key, args) {
    let macro = utils.macroName(key)
    if (typeof self[macro] === 'function') self[macro](args)
  }

  return method
}

Part.prototype.runHooks = function (hookName, data = false) {
  if (data === false) data = this
  let hooks = this.hooks[hookName]
  if (hooks && hooks.length > 0) {
    for (let hook of hooks) {
      hook.method(data, hook.data)
    }
  }
}

/** Returns an unused ID */
Part.prototype.getId = function (prefix = '') {
  this.freeId += 1

  return prefix + this.freeId
}

/** Returns a value formatted for units provided in settings */
Part.prototype.unitsClosure = function (value) {
  const self = this
  const method = function (value) {
    if (typeof value !== 'number')
      self.context.store.log.warning(
        `Calling \`units(value)\` but \`value\` is not a number (\`${typeof value}\`)`
      )
    return utils.units(value, self.context.settings.units)
  }

  return method
}

/** Calculates the part's bounding box and sets it */
Part.prototype.boundary = function () {
  if (this.topLeft) return this // Cached

  let topLeft = new Point(Infinity, Infinity)
  let bottomRight = new Point(-Infinity, -Infinity)
  for (let key in this.paths) {
    try {
      let path = this.paths[key].boundary()
      if (path.render) {
        if (path.topLeft.x < topLeft.x) topLeft.x = path.topLeft.x
        if (path.topLeft.y < topLeft.y) topLeft.y = path.topLeft.y
        if (path.bottomRight.x > bottomRight.x) bottomRight.x = path.bottomRight.x
        if (path.bottomRight.y > bottomRight.y) bottomRight.y = path.bottomRight.y
      }
    } catch (err) {
      this.context.store.log.error(`Could not calculate boundary of \`paths.${key}\``)
      this.context.store.log.debug(
        `Since \`paths.${key}\` has no boundary, neither does \`parts.${this.name}\`. Ejecting part`
      )
      return false
    }
  }
  for (let key in this.points) {
    let point = this.points[key]
    let radius = point.attributes.get('data-circle')
    if (radius) {
      radius = parseFloat(radius)
      if (point.x - radius < topLeft.x) topLeft.x = point.x - radius
      if (point.y - radius < topLeft.y) topLeft.y = point.y - radius
      if (point.x + radius > bottomRight.x) bottomRight.x = point.x + radius
      if (point.y + radius > bottomRight.y) bottomRight.y = point.y + radius
    }
  }
  // Fix infinity if part has no paths
  if (topLeft.x === Infinity) topLeft.x = 0
  if (topLeft.y === Infinity) topLeft.y = 0
  if (bottomRight.x === -Infinity) bottomRight.x = 0
  if (bottomRight.y === -Infinity) bottomRight.y = 0
  // Add margin
  let margin = this.context.settings.margin
  if (this.context.settings.paperless && margin < 10) margin = 10
  this.topLeft = new Point(topLeft.x - margin, topLeft.y - margin)
  this.bottomRight = new Point(bottomRight.x + margin, bottomRight.y + margin)
  this.width = this.bottomRight.x - this.topLeft.x
  this.height = this.bottomRight.y - this.topLeft.y

  return this
}

/** Stacks part so that its top left corner is in (0,0) */
Part.prototype.stack = function () {
  if (this.topLeft !== false) return this
  else this.boundary()
  if (this.topLeft.x == 0 && this.topLeft.y == 0) return this
  else {
    this.attr('transform', `translate(${this.topLeft.x * -1}, ${this.topLeft.y * -1})`)
    this.layout.move.x = this.topLeft.x * -1
    this.layout.move.y = this.topLeft.y * -1
  }

  return this
}

/** Adds an attribute. This is here to make this call chainable in assignment */
Part.prototype.attr = function (name, value, overwrite = false) {
  if (overwrite) this.attributes.set(name, value)
  else this.attributes.add(name, value)

  return this
}

/** Copies point/path/snippet data from part orig into this */
Part.prototype.inject = function (orig) {
  const findBasePoint = (p) => {
    for (let i in orig.points) {
      if (orig.points[i] === p) return i
    }
  }

  for (let i in orig.points) this.points[i] = orig.points[i].clone()
  for (let i in orig.paths) {
    this.paths[i] = orig.paths[i].clone()
    // Keep link between points and path ops where possible
    for (let j in orig.paths[i].ops) {
      let op = orig.paths[i].ops[j]
      if (op.type !== 'close') {
        let toPoint = findBasePoint(op.to)
        if (toPoint) this.paths[i].ops[j].to = this.points[toPoint]
      }
      if (op.type === 'curve') {
        let cp1Point = findBasePoint(op.cp1)
        if (cp1Point) this.paths[i].ops[j].cp1 = this.points[cp1Point]
        let cp2Point = findBasePoint(op.cp2)
        if (cp2Point) this.paths[i].ops[j].cp2 = this.points[cp2Point]
      }
    }
  }
  for (let i in orig.snippets) {
    this.snippets[i] = orig.snippets[i].clone()
  }

  return this
}

Part.prototype.units = function (input) {
  return utils.units(input, this.context.settings.units)
}

/** Returns an object with shorthand access for pattern design */
Part.prototype.shorthand = function () {
  const complete = this.context.settings?.complete ? true : false
  const paperless = this.context.settings?.paperless === true ? true : false
  const sa = this.context.settings?.complete ? this.context.settings?.sa || 0 : 0
  const shorthand = {
    part: this,
    sa,
    scale: this.context.settings?.scale,
    store: this.context.store,
    macro: this.macroClosure(),
    units: this.unitsClosure(),
    utils: utils,
    complete,
    paperless,
    events: this.context.events,
    log: this.context.store.log,
    addCut: this.addCut,
    removeCut: this.removeCut,
  }
  // Add top-level store methods and add a part name parameter
  const partName = this.name
  for (const [key, method] of Object.entries(this.context.store)) {
    if (typeof method === 'function')
      shorthand[key] = function (...args) {
        return method(partName, ...args)
      }
  }

  // We'll need this
  let self = this

  // Wrap the Point constructor so objects can log
  shorthand.Point = function (x, y) {
    Point.apply(this, [x, y, true])
    Object.defineProperty(this, 'log', { value: self.context.store.log })
  }
  shorthand.Point.prototype = Object.create(Point.prototype)
  // Wrap the Path constructor so objects can log
  shorthand.Path = function () {
    Path.apply(this, [true])
    Object.defineProperty(this, 'log', { value: self.context.store.log })
  }
  shorthand.Path.prototype = Object.create(Path.prototype)
  // Wrap the Snippet constructor so objects can log
  shorthand.Snippet = function (def, anchor) {
    Snippet.apply(this, [def, anchor, true])
    Snippet.apply(this, arguments)
    Object.defineProperty(this, 'log', { value: self.context.store.log })
  }
  shorthand.Snippet.prototype = Object.create(Snippet.prototype)

  // Proxy the points object
  const pointsProxy = {
    get: function () {
      return Reflect.get(...arguments)
    },
    set: (points, name, value) => {
      // Constructor checks
      if (value instanceof Point !== true)
        self.context.store.log.warning(
          `\`points.${name}\` was set with a value that is not a \`Point\` object`
        )
      if (value.x == null || !utils.isCoord(value.x))
        self.context.store.log.warning(
          `\`points.${name}\` was set with a \`x\` parameter that is not a \`number\``
        )
      if (value.y == null || !utils.isCoord(value.y))
        self.context.store.log.warning(
          `\`points.${name}\` was set with a \`y\` parameter that is not a \`number\``
        )
      try {
        value.name = name
      } catch (err) {
        self.context.store.log.warning(`Could not set \`name\` property on \`points.${name}\``)
      }
      return (self.points[name] = value)
    },
  }
  shorthand.points = new Proxy(this.points || {}, pointsProxy)
  // Proxy the paths object
  const pathsProxy = {
    get: function () {
      return Reflect.get(...arguments)
    },
    set: (paths, name, value) => {
      // Constructor checks
      if (value instanceof Path !== true)
        self.context.store.log.warning(
          `\`paths.${name}\` was set with a value that is not a \`Path\` object`
        )
      try {
        value.name = name
      } catch (err) {
        self.context.store.log.warning(`Could not set \`name\` property on \`paths.${name}\``)
      }
      return (self.paths[name] = value)
    },
  }
  shorthand.paths = new Proxy(this.paths || {}, pathsProxy)
  // Proxy the snippets object
  const snippetsProxy = {
    get: function (target, prop, receiver) {
      return Reflect.get(...arguments)
    },
    set: (snippets, name, value) => {
      // Constructor checks
      if (value instanceof Snippet !== true)
        self.context.store.log.warning(
          `\`snippets.${name}\` was set with a value that is not a \`Snippet\` object`
        )
      if (typeof value.def !== 'string')
        self.context.store.log.warning(
          `\`snippets.${name}\` was set with a \`def\` parameter that is not a \`string\``
        )
      if (value.anchor instanceof Point !== true)
        self.context.store.log.warning(
          `\`snippets.${name}\` was set with an \`anchor\` parameter that is not a \`Point\``
        )
      try {
        value.name = name
      } catch (err) {
        self.context.store.log.warning(`Could not set \`name\` property on \`snippets.${name}\``)
      }
      return (self.snippets[name] = value)
    },
  }
  shorthand.snippets = new Proxy(this.snippets || {}, snippetsProxy)
  // Proxy the measurements object
  const measurementsProxy = {
    get: function (measurements, name) {
      if (typeof measurements[name] === 'undefined')
        self.context.store.log.warning(
          `Tried to access \`measurements.${name}\` but it is \`undefined\``
        )
      return Reflect.get(...arguments)
    },
    set: (measurements, name, value) => (self.context.settings.measurements[name] = value),
  }
  shorthand.measurements = new Proxy(this.context.settings.measurements || {}, measurementsProxy)
  // Proxy the options object
  const optionsProxy = {
    get: function (options, name) {
      if (typeof options[name] === 'undefined')
        self.context.store.log.warning(
          `Tried to access \`options.${name}\` but it is \`undefined\``
        )
      return Reflect.get(...arguments)
    },
    set: (options, name, value) => (self.context.settings.options[name] = value),
  }
  shorthand.options = new Proxy(this.context.settings.options || {}, optionsProxy)
  // Proxy the absoluteOptions object
  const absoluteOptionsProxy = {
    get: function (absoluteOptions, name) {
      if (typeof absoluteOptions[name] === 'undefined')
        self.context.store.log.warning(
          `Tried to access \`absoluteOptions.${name}\` but it is \`undefined\``
        )
      return Reflect.get(...arguments)
    },
    set: (absoluteOptions, name, value) => (self.context.settings.absoluteOptions[name] = value),
  }
  shorthand.absoluteOptions = new Proxy(
    this.context.settings.absoluteOptions || {},
    absoluteOptionsProxy
  )

  return shorthand
}

Part.prototype.generateTransform = function (transforms) {
  const { move, rotate, flipX, flipY } = transforms
  const generated = utils.generatePartTransform(move.x, move.y, rotate, flipX, flipY, this)

  for (var t in generated) {
    this.attr(t, generated[t], true)
  }
}

Part.prototype.isEmpty = function () {
  if (Object.keys(this.snippets).length > 0) return false

  if (Object.keys(this.paths).length > 0) {
    for (var p in this.paths) {
      if (this.paths[p].render && this.paths[p].length()) return false
    }
  }

  for (var p in this.points) {
    if (this.points[p].attributes.get('data-text')) return false
    if (this.points[p].attributes.get('data-circle')) return false
  }

  return true
}

export default Part
