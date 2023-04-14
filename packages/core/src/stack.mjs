import { Attributes } from './attributes.mjs'
import { Point } from './point.mjs'
import * as utils from './utils.mjs'

export function Stack(name = null) {
  // Non-enumerable properties
  utils.__addNonEnumProp(this, 'freeId', 0)
  utils.__addNonEnumProp(this, 'layout', { move: { x: 0, y: 0 } })

  // Enumerable properties
  this.attributes = new Attributes()
  this.parts = new Set()
  this.name = name
  this.topLeft = false
  this.bottomRight = false
  this.width = false
  this.height = false

  return this
}

/* Adds a part to the stack */
Stack.prototype.addPart = function (part) {
  if (part) this.parts.add(part)

  return this
}

/* Returns a stack object suitbale for renderprops */
Stack.prototype.asProps = function () {
  return {
    ...this,
    parts: [...this.parts],
  }
}

/* Returns a list of parts in this stack */
Stack.prototype.getPartList = function () {
  return [...this.parts]
}

/* Returns a list of names of parts in this stack */
Stack.prototype.getPartNames = function () {
  return [...this.parts].map((p) => p.name)
}

/** Calculates the stack's bounding box and sets it */
Stack.prototype.home = function () {
  if (this.topLeft) return this // Cached
  this.topLeft = new Point(Infinity, Infinity)
  this.bottomRight = new Point(-Infinity, -Infinity)
  for (const part of this.getPartList()) {
    part.__boundary()

    const transforms = part.attributes.get('transform')
    let tl = part.topLeft
    let br = part.bottomRight
    let tr = new Point(br.x, tl.y)
    let bl = new Point(tl.x, br.y)

    if (transforms) {
      const combinedTransform =
        typeof transforms === 'string' ? transforms : utils.combineTransforms(transforms)

      tl = utils.applyTransformToPoint(combinedTransform, part.topLeft.copy())
      br = utils.applyTransformToPoint(combinedTransform, part.bottomRight.copy())
      bl = utils.applyTransformToPoint(
        combinedTransform,
        new Point(part.topLeft.x, part.bottomRight.y)
      )
      tr = utils.applyTransformToPoint(
        combinedTransform,
        new Point(part.bottomRight.x, part.topLeft.y)
      )
    }

    this.topLeft.x = Math.min(this.topLeft.x, tl.x, br.x, bl.x, tr.x)
    this.topLeft.y = Math.min(this.topLeft.y, tl.y, br.y, bl.y, tr.y)
    this.bottomRight.x = Math.max(this.bottomRight.x, tl.x, br.x, bl.x, tr.x)
    this.bottomRight.y = Math.max(this.bottomRight.y, tl.y, br.y, bl.y, tr.y)
  }

  // Fix infinity if it's not overwritten
  if (this.topLeft.x === Infinity) this.topLeft.x = 0
  if (this.topLeft.y === Infinity) this.topLeft.y = 0
  if (this.bottomRight.x === -Infinity) this.bottomRight.x = 0
  if (this.bottomRight.y === -Infinity) this.bottomRight.y = 0

  // Add margin
  let margin = 0
  for (const set in this.context.settings) {
    if (this.context.settings[set].margin > margin) margin = this.context.settings[set].margin
    if (this.context.settings[set].paperless && margin < 10) margin = 10
  }
  this.topLeft.x -= margin
  this.topLeft.y -= margin
  this.bottomRight.x += margin
  this.bottomRight.y += margin

  // Set dimensions
  this.width = this.bottomRight.x - this.topLeft.x
  this.height = this.bottomRight.y - this.topLeft.y
  this.width = this.bottomRight.x - this.topLeft.x
  this.height = this.bottomRight.y - this.topLeft.y

  // Add transform
  //this.anchor = this.getAnchor()
  // FIXME: Can we be certain this is always (0,0) /
  this.anchor = new Point(0, 0)

  if (this.topLeft.x === this.anchor.x && this.topLeft.y === this.anchor.y) return this
  else {
    this.attr(
      'transform',
      `translate(${this.anchor.x - this.topLeft.x}, ${this.anchor.y - this.topLeft.y})`
    )
    this.layout.move.x = this.anchor.x - this.topLeft.x
    this.layout.move.y = this.anchor.y - this.topLeft.y
  }

  return this
}

/** Finds the anchor to align parts in this stack */
Stack.prototype.getAnchor = function () {
  let anchorPoint = true
  let gridAnchorPoint = true
  const parts = this.getPartList()
  for (const part of parts) {
    if (typeof part.points.anchor === 'undefined') anchorPoint = false
    if (typeof part.points.gridAnchor === 'undefined') gridAnchorPoint = false
  }

  if (anchorPoint) return parts[0].points.anchor
  if (gridAnchorPoint) return parts[0].points.gridAnchor

  return new Point(0, 0)
}

/** Adds an attribute. This is here to make this call chainable in assignment */
Stack.prototype.attr = function (name, value, overwrite = false) {
  if (overwrite) this.attributes.set(name, value)
  else this.attributes.add(name, value)

  return this
}

/** Generates the transform for a stack */
Stack.prototype.generateTransform = function (transforms) {
  const { move, rotate, flipX, flipY } = transforms
  const generated = utils.generateStackTransform(move?.x, move?.y, rotate, flipX, flipY, this)

  for (var t in generated) {
    this.attr(t, generated[t], true)
  }
}

export default Stack
