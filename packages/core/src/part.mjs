import { Bezier } from 'bezier-js'
import { Attributes } from './attributes.mjs'
import * as utils from './utils.mjs'
import { Point, pointsProxy } from './point.mjs'
import { Path, pathsProxy } from './path.mjs'
import { Snippet, snippetsProxy } from './snippet.mjs'
import { Hooks } from './hooks.mjs'

//////////////////////////////////////////////
//               CONSTRUCTOR                //
//////////////////////////////////////////////

/**
 * Constructor for a Part
 *
 * @constructor
 * @return {Part} this - The Part instance
 */
export function Part() {
  // Non-enumerable properties
  utils.__addNonEnumProp(this, 'freeId', 0)
  utils.__addNonEnumProp(this, 'topLeft', false)
  utils.__addNonEnumProp(this, 'bottomRight', false)
  utils.__addNonEnumProp(this, 'width', false)
  utils.__addNonEnumProp(this, 'height', false)
  utils.__addNonEnumProp(this, 'utils', utils)
  utils.__addNonEnumProp(this, 'layout', { move: { x: 0, y: 0 } })
  utils.__addNonEnumProp(this, 'Point', Point)
  utils.__addNonEnumProp(this, 'Path', Path)
  utils.__addNonEnumProp(this, 'Snippet', Snippet)
  utils.__addNonEnumProp(this, 'hooks', new Hooks())

  // Enumerable properties
  this.hidden = false
  this.attributes = new Attributes()
  this.points = {}
  this.paths = {}
  this.snippets = {}
  this.name = null

  return this
}

//////////////////////////////////////////////
//            PUBLIC METHODS                //
//////////////////////////////////////////////

/**
 * Returns a part as an object suitable for inclusion in renderprops
 *
 * @return {object} part - A plain object representing the part
 */
Part.prototype.asProps = function () {
  return {
    paths: this.paths,
    points: this.points,
    snippets: this.snippets,
    attributes: this.attributes,
    height: this.height,
    width: this.width,
    bottomRight: this.bottomRight,
    topLeft: this.topLeft,
  }
}

/**
 * Adds an attribute in a chainable way
 *
 * @param {string} name - Name of the attribute to add
 * @param {string} value - Value of the attribute to add
 * @param {bool} overwrite - Whether to overwrite an existing attrubute or not
 * @return {Part} this - The part instance
 */
Part.prototype.attr = function (name, value, overwrite = false) {
  if (overwrite) this.attributes.set(name, value)
  else this.attributes.add(name, value)

  return this
}

/**
 * Gets a free ID to use in the part
 *
 * @param {string} prefix - An optional prefix to apply to the ID
 * @return {string} id - A free ID to use
 */
Part.prototype.getId = function (prefix = '') {
  return this.__getIdClosure()(prefix)
}

/**
 * Hide the part
 *
 * @return {Part} part - The Part instance
 */
Part.prototype.hide = function () {
  this.hidden = true

  return this
}

/**
 * Set the hidden attribute
 *
 * @param {boolean} hidden - The value to set the hidden property to
 * @return {Part} this - The Part instance
 */
Part.prototype.setHidden = function (hidden = false) {
  if (hidden) this.hidden = true
  else this.hidden = false

  return this
}

/**
 * Returns an object that will be passed to draft method to be destructured
 *
 * @return {object} short - The so-called shorthand object with what you might need in your draft method
 */
Part.prototype.shorthand = function () {
  const complete = this.context.settings?.complete ? true : false
  const paperless = this.context.settings?.paperless === true ? true : false
  const sa = this.context.settings?.complete ? this.context.settings?.sa || 0 : 0
  const shorthand = {
    complete,
    context: this.context,
    getId: this.__getIdClosure(),
    log: this.context.store.log,
    paperless,
    part: this,
    sa,
    scale: this.context.settings?.scale,
    store: this.context.store,
    units: this.__unitsClosure(),
    utils: utils,
    Bezier: Bezier,
  }
  // We'll need this
  let self = this

  // Wrap the Point constructor so objects can log
  shorthand.Point = function (x, y) {
    Point.apply(this, [x, y])
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

  // Proxy points, paths, snippets, measurements, options, and absoluteOptions
  shorthand.points = new Proxy(this.points, pointsProxy(self.points, self.context.store.log))
  shorthand.paths = new Proxy(this.paths, pathsProxy(self.paths, self.context.store.log))
  shorthand.snippets = new Proxy(
    this.snippets,
    snippetsProxy(self.snippets, self.context.store.log)
  )
  shorthand.measurements = new Proxy(this.context.settings.measurements, {
    get: function (measurements, name) {
      if (typeof measurements[name] === 'undefined')
        self.context.store.log.warning(
          `Tried to access \`measurements.${name}\` but it is \`undefined\``
        )
      return Reflect.get(...arguments)
    },
    set: (measurements, name, value) => (self.context.settings.measurements[name] = value),
  })
  shorthand.options = new Proxy(this.context.settings.options, {
    get: function (options, name) {
      if (typeof options[name] === 'undefined')
        self.context.store.log.warning(
          `Tried to access \`options.${name}\` but it is \`undefined\``
        )
      return Reflect.get(...arguments)
    },
    set: (options, name, value) => (self.context.settings.options[name] = value),
  })
  shorthand.absoluteOptions = new Proxy(this.context.settings.absoluteOptions, {
    get: function (absoluteOptions, name) {
      if (typeof absoluteOptions[name] === 'undefined')
        self.context.store.log.warning(
          `Tried to access \`absoluteOptions.${name}\` but it is \`undefined\``
        )
      return Reflect.get(...arguments)
    },
    set: (absoluteOptions, name, value) => (self.context.settings.absoluteOptions[name] = value),
  })

  // Macro closure at the end as it includes the shorthand object
  shorthand.macro = this.__macroClosure(shorthand)

  return shorthand
}

/**
 * Unhide the part
 *
 * @return {Part} part - The Part instance
 */
Part.prototype.unhide = function () {
  this.hidden = false

  return this
}

/**
 * Returns a value formatted for units set in settings
 *
 * @param {float} input - The value to format
 * @return {string} result - The input formatted for the units set in settings
 */
Part.prototype.units = function (input) {
  return utils.units(input, this.context.settings.units)
}

//////////////////////////////////////////////
//            PRIVATE METHODS               //
//////////////////////////////////////////////

/**
 * Calculates the part's bounding box and mutates the part to set it
 *
 * @private
 * @return {Part} this - The part instance
 */
Part.prototype.__boundary = function () {
  if (this.topLeft) return this // Cached

  let topLeft = new Point(Infinity, Infinity)
  let bottomRight = new Point(-Infinity, -Infinity)
  for (let key in this.paths) {
    try {
      let path = this.paths[key].__boundary()
      if (!path.hidden) {
        if (path.topLeft.x < topLeft.x) topLeft.x = path.topLeft.x
        if (path.topLeft.y < topLeft.y) topLeft.y = path.topLeft.y
        if (path.bottomRight.x > bottomRight.x) bottomRight.x = path.bottomRight.x
        if (path.bottomRight.y > bottomRight.y) bottomRight.y = path.bottomRight.y
      }
    } catch (err) {
      this.context.store.log.error(`Could not calculate boundary of \`paths.${key}\``)
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

  this.topLeft = topLeft
  this.bottomRight = bottomRight
  this.width = this.bottomRight.x - this.topLeft.x
  this.height = this.bottomRight.y - this.topLeft.y

  return this
}

/**
 * Returns a closure holding a getId method (returns an ID unused in this part)
 *
 * @return {function} getId - The getId function
 */
Part.prototype.__getIdClosure = function () {
  const self = this
  const method = function (prefix = '') {
    self.freeId += 1

    return prefix + self.freeId
  }

  return method
}

/**
 * Copies point/path/snippet data from part orig into this
 * Also sets the freeId
 *
 * @private
 * @param {object} orig - The original part to inject into this
 * @return {Part} this - The part instance
 */
Part.prototype.__inject = function (orig) {
  const findBasePoint = (p) => {
    for (let i in orig.points) {
      if (orig.points[i] === p) return i
    }
  }

  this.freeId = orig.freeId
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

/**
 * Returns a closure holding the macro method
 *
 * @private
 * @return {function} method - The closured macro method
 */
Part.prototype.__macroClosure = function (props) {
  const self = this
  const method = function (key, args) {
    const macro = utils.__macroName(key)
    if (typeof self[macro] === 'function') self[macro](args, props)
    else self.context.store.log.warning('Unknown macro `' + key + '` used in ' + self.name)
  }

  return method
}

/**
 * Returns a method to format values in the units provided in settings
 *
 * @private
 * @return {function} method - The closured units method
 */
Part.prototype.__unitsClosure = function () {
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
