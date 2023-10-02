import { Pattern } from './pattern/index.mjs'
import { __loadDesignDefaults } from './config.mjs'

//////////////////////////////////////////////
//               CONSTRUCTOR                //
//////////////////////////////////////////////

/**
 * Return a Pattern constructor (it's a super-constructor)
 *
 * @constructor
 * @param {object} designConfig - The design configuration
 * @return {function} pattern - The pattern constructor
 */
export function Design(designConfig) {
  // Initialize designConfig with defaults
  designConfig = { ...__loadDesignDefaults(), ...designConfig }

  // Create the pattern constructor
  const pattern = function (...sets) {
    // Pass the designConfig
    Pattern.call(this, designConfig)

    // Pass the pattern settings
    return this.__applySettings(sets)
  }

  // Set up inheritance
  pattern.prototype = Object.create(Pattern.prototype)
  pattern.prototype.constructor = pattern

  // Make design & pattern config available without instantiating a pattern
  pattern.designConfig = designConfig
  pattern.patternConfig = new pattern().getConfig()

  return pattern
}
