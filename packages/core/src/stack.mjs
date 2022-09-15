import { Attributes } from './attributes.mjs'
import { Point } from './point.mjs'
import * as utils from './utils.mjs'

export function Stack(name = null) {
  // Non-enumerable properties
  utils.addNonEnumProp(this, 'freeId', 0)
  utils.addNonEnumProp(this, 'layout', { move: { x: 0, y: 0 } })

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

/* Returns a list of parts in this stack */
Stack.prototype.getPartList = function () {
  return [...this.parts]
}

/* Returns a list of names of parts in this stack */
Stack.prototype.getPartNames = function () {
  return [...this.parts].map((p) => p.name)
}

/** Homes the stack so that its top left corner is in (0,0) */
//Stack.prototype.home = function () {
//  const parts = this.getPartList()
//  if (parts.length < 1) return this
//  for (const part of this.getPartList()) {
//    part.home()
//  }
//
//  if (parts.length === 1) {
//    this.topLeft = part.topLeft
//    this.bottomRigth = part.bottomRight
//    this.width = part.width
//    this.height = part.height
//
//    return this
//  }
//
//  return this.boundary()
//}

/** Calculates the stack's bounding box and sets it */
Stack.prototype.home = function () {
  if (this.topLeft) return this // Cached
  this.topLeft = new Point(Infinity, Infinity)
  this.bottomRight = new Point(-Infinity, -Infinity)
  for (const part of this.getPartList()) {
    part.boundary()
    if (part.topLeft.x < this.topLeft.x) this.topLeft.x = part.topLeft.x
    if (part.topLeft.y < this.topLeft.y) this.topLeft.y = part.topLeft.y
    if (part.bottomRight.x > this.bottomRight.x) this.bottomRight.x = part.bottomRight.x
    if (part.bottomRight.y > this.bottomRight.y) this.bottomRight.y = part.bottomRight.y
  }

  // Fix infinity if it's not overwritten
  if (this.topLeft.x === Infinity) this.topLeft.x = 0
  if (this.topLeft.y === Infinity) this.topLeft.y = 0
  if (this.bottomRight.x === -Infinity) this.bottomRight.x = 0
  if (this.bottomRight.y === -Infinity) this.bottomRight.y = 0

  // Add margin
  let margin = this.context.settings.margin
  if (this.context.settings.paperless && margin < 10) margin = 10
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
  const generated = utils.generateStackTransform(move.x, move.y, rotate, flipX, flipY, this)

  for (var t in generated) {
    this.attr(t, generated[t], true)
  }
}

export default Stack
