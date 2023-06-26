import { Attributes } from './attributes.mjs'
import { Point } from './point.mjs'

//////////////////////////////////////////////
//               CONSTRUCTOR                //
//////////////////////////////////////////////

/**
 * Constructor for a Snippet
 *
 * @constructor
 * @param {string} def - The id of the snippet in the SVG defs section
 * @param {Point} anchor - The Point to anchor this Snippet on
 * @return {Snippet} this - The Snippet instance
 */
export function Snippet(def, anchor) {
  this.def = def
  this.anchor = anchor
  this.attributes = new Attributes()

  return this
}

//////////////////////////////////////////////
//            PUBLIC METHODS                //
//////////////////////////////////////////////

/**
 * Chainable way to add an attribute
 *
 * @param {string} name - Name of the attribute to add
 * @param {string} value - Value of the attribute to add
 * @param {bool} overwrite - Whether to overwrite an existing attrubute or not
 * @return {Snippet} this - The Snippet instance
 */
Snippet.prototype.attr = function (name, value, overwrite = false) {
  if (overwrite) this.attributes.set(name, value)
  else this.attributes.add(name, value)

  return this
}

/**
 * Returns a deep copy of this snippet
 *
 * @return {Snippet} clone - A clone of this Snippet instance
 */
Snippet.prototype.clone = function () {
  let clone = new Snippet(this.def, this.anchor.clone()).__withLog(this.log)
  clone.attributes = this.attributes.clone()

  return clone
}

/**
 * Helper method to scale a snippet
 *
 * @param {number} scale - The scale to set
 * @param {bool} overwrite - Whether to overwrite the existing scale or not (default is true)
 *
 * @return {Snippet} this - The snippet instance
 */
Snippet.prototype.scale = function (scale, overwrite = true) {
  return this.attr('data-scale', scale, overwrite)
}

/**
 * Helper method to rotate a snippet
 *
 * @param {number} rotation - The rotation to set
 * @param {bool} overwrite - Whether to overwrite the existing rotation or not (default is true)
 *
 * @return {Snippet} this - The snippet instance
 */
Snippet.prototype.rotate = function (rotation, overwrite = true) {
  return this.attr('data-rotate', rotation, overwrite)
}

/**
 * Returns a snippet as an object suitable for inclusion in renderprops
 *
 * @return {object} snippet - A plain object representing the snippet
 */
Snippet.prototype.asRenderProps = function () {
  return {
    def: this.def,
    anchor: this.anchor.asRenderProps(),
    attributes: this.attributes.asRenderProps(),
  }
}

//////////////////////////////////////////////
//            PRIVATE METHODS               //
//////////////////////////////////////////////

/**
 * Adds the log method for a snippet not created through the proxy
 *
 * @private
 * @return {Snippet} this - The Snippet instance
 */
Snippet.prototype.__withLog = function (log = false) {
  if (log) Object.defineProperty(this, 'log', { value: log })

  return this
}

//////////////////////////////////////////////
//        PUBLIC  STATIC METHODS            //
//////////////////////////////////////////////

/**
 * Returns a ready-to-proxy that logs when things aren't exactly ok
 *
 * @private
 * @param {object} snippets - The snippets object to proxy
 * @param {object} log - The logging object
 * @return {object} proxy - The object that is ready to be proxied
 */
export function snippetsProxy(snippets, log) {
  return {
    get: function (...args) {
      return Reflect.get(...args)
    },
    set: (snippets, name, value) => {
      // Constructor checks
      if (value instanceof Snippet !== true)
        log.warning(`\`snippets.${name}\` was set with a value that is not a \`Snippet\` object`)
      if (typeof value.def !== 'string')
        log.warning(
          `\`snippets.${name}\` was set with a \`def\` parameter that is not a \`string\``
        )
      if (value.anchor instanceof Point !== true)
        log.warning(
          `\`snippets.${name}\` was set with an \`anchor\` parameter that is not a \`Point\``
        )
      try {
        value.name = name
      } catch (err) {
        log.warning(`Could not set \`name\` property on \`snippets.${name}\``)
      }
      return (snippets[name] = value)
    },
  }
}
