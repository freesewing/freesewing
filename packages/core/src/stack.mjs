import { Attributes } from './attributes.mjs'
import { Point } from './point.mjs'
import * as utils from './utils.mjs'

export function Stack(name=null) {
  // Non-enumerable properties
  utils.addNonEnumProp(this, 'freeId', 0)
  utils.addNonEnumProp(this, 'topLeft', false)
  utils.addNonEnumProp(this, 'bottomRight', false)
  utils.addNonEnumProp(this, 'width', false)
  utils.addNonEnumProp(this, 'height', false)
  utils.addNonEnumProp(this, 'layout', { move: { x: 0, y: 0 } })

  // Enumerable properties
  this.attributes = new Attributes()
  this.parts = new Set()
  this.name = name

  return this
}

/* Adds a part to the stack */
Stack.prototype.addPart = function(part) {
  if (part) this.parts.add(part)

  return this
}

/* Returns a list of parts in this stack */
Stack.prototype.getPartList = function(part) {
  return [...this.parts]
}

/* Returns a list of names of parts in this stack */
Stack.prototype.getPartNames = function(part) {
  return [...this.parts].map(p => p.name)
}

/** Homes the stack so that its top left corner is in (0,0) */
Stack.prototype.home = function () {
  const parts = this.getPartList()
  if (parts.length < 1) return this
  for (const part of this.getPartList()) {
    part.home()
  }

  if (parts.length === 1) {
    this.topLeft = part.topLeft
    this.bottomRigth = part.bottomRight
    this.width = part.width
    this.height = part.height

    return this
  }

  return this.boundary()
}

/** Calculates the stack's bounding box and sets it */
Stack.prototype.home = function () {
  this.topLeft = new Point(Infinity, Infinity)
  this.bottomRight = new Point(-Infinity, -Infinity)
  for (const part of this.getPartList()) {
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

  this.width = this.bottomRight.x - this.topLeft.x
  this.height = this.bottomRight.y - this.topLeft.y

  return this
}

export default Stack
