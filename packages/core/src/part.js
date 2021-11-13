import * as utils from './utils'
import Point from './point'
import Path from './path'
import Snippet from './snippet'
import Attributes from './attributes'
import Hooks from './hooks'

function Part() {
  this.attributes = new Attributes()
  this.points = {}
  this.paths = {}
  this.snippets = {}
  this.freeId = 0
  this.topLeft = false
  this.bottomRight = false
  this.width = false
  this.height = false
  this.render = true
  this.utils = utils

  this.Point = Point
  this.Path = Path
  this.Snippet = Snippet

  this.hooks = new Hooks() // Hooks container

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
  let self = this
  let method = function (value) {
    if (self.context.settings.debug && typeof value !== 'number')
      self.context.raise.debug(
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
      this.context.raise.error(`Could not calculate boundary of \`paths.${key}\``)
      this.context.raise.debug(
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
  else this.attr('transform', `translate(${this.topLeft.x * -1}, ${this.topLeft.y * -1})`)

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

    return false
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
  let complete = this.context.settings.complete ? true : false
  let paperless = this.context.settings.paperless === true ? true : false
  let sa = this.context.settings.complete ? this.context.settings.sa || 0 : 0
  const shorthand = {
    sa,
    store: this.context.store,
    macro: this.macroClosure(),
    units: this.unitsClosure(),
    utils: utils,
    complete,
    paperless,
    events: this.context.events,
    raise: this.context.raise,
  }

  if (this.context.settings.debug) {
    // We'll need this
    let self = this

    // Wrap the Point constructor so objects can raise events
    shorthand.Point = function (x, y) {
      Point.apply(this, [x, y, true])
      Object.defineProperty(this, 'raise', { value: self.context.raise })
    }
    shorthand.Point.prototype = Object.create(Point.prototype)
    // Wrap the Path constructor so objects can raise events
    shorthand.Path = function () {
      Path.apply(this, [true])
      Object.defineProperty(this, 'raise', { value: self.context.raise })
    }
    shorthand.Path.prototype = Object.create(Path.prototype)
    // Wrap the Snippet constructor so objects can raise events
    shorthand.Snippet = function (def, anchor) {
      Snippet.apply(this, [def, anchor, true])
      Snippet.apply(this, arguments)
      Object.defineProperty(this, 'raise', { value: self.context.raise })
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
          self.context.raise.warning(
            `\`points.${name}\` was set with a value that is not a \`Point\` object`
          )
        if (value.x == null || !utils.isCoord(value.x))
          self.context.raise.warning(
            `\`points.${name}\` was set with a \`x\` parameter that is not a \`number\``
          )
        if (value.y == null || !utils.isCoord(value.y))
          self.context.raise.warning(
            `\`points.${name}\` was set with a \`y\` parameter that is not a \`number\``
          )
        try {
          value.name = name
        } catch (err) {
          self.context.raise.warning(`Could not set \`name\` property on \`points.${name}\``)
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
          self.context.raise.warning(
            `\`paths.${name}\` was set with a value that is not a \`Path\` object`
          )
        try {
          value.name = name
        } catch (err) {
          self.context.raise.warning(`Could not set \`name\` property on \`paths.${name}\``)
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
          self.context.raise.warning(
            `\`snippets.${name}\` was set with a value that is not a \`Snippet\` object`
          )
        if (typeof value.def !== 'string')
          self.context.raise.warning(
            `\`snippets.${name}\` was set with a \`def\` parameter that is not a \`string\``
          )
        if (value.anchor instanceof Point !== true)
          self.context.raise.warning(
            `\`snippets.${name}\` was set with an \`anchor\` parameter that is not a \`Point\``
          )
        try {
          value.name = name
        } catch (err) {
          self.context.raise.warning(`Could not set \`name\` property on \`snippets.${name}\``)
        }
        return (self.snippets[name] = value)
      },
    }
    shorthand.snippets = new Proxy(this.snippets || {}, snippetsProxy)
    // Proxy the measurements object
    const measurementsProxy = {
      get: function (measurements, name) {
        if (typeof measurements[name] === 'undefined')
          self.context.raise.warning(
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
          self.context.raise.warning(`Tried to access \`options.${name}\` but it is \`undefined\``)
        return Reflect.get(...arguments)
      },
      set: (options, name, value) => (self.context.settings.options[name] = value),
    }
    shorthand.options = new Proxy(this.context.settings.options || {}, optionsProxy)
    // Proxy the absoluteOptions object
    const absoluteOptionsProxy = {
      get: function (absoluteOptions, name) {
        if (typeof absoluteOptions[name] === 'undefined')
          self.context.raise.warning(
            `Tried to access \`absoluteOptions.${name}\` but it is \`undefined\``
          )
        return Reflect.get(...arguments)
      },
      set: (absoluteOptions, name, value) => (self.context.settings.absoluteOptions[name] = value),
    }
    shorthand.absoluteOptions = new Proxy(this.context.settings.absoluteOptions || {}, absoluteOptionsProxy)
  } else {
    shorthand.Point = Point
    shorthand.Path = Path
    shorthand.Snippet = Snippet
    shorthand.points = this.points || {}
    shorthand.paths = this.paths || {}
    shorthand.snippets = this.snippets || {}
    shorthand.measurements = this.context.settings.measurements || {}
    shorthand.options = this.context.settings.options || {}
    shorthand.absoluteOptions = this.context.settings.absoluteOptions || {}
  }

  return shorthand
}

export default Part
