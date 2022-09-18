import { Pattern } from './pattern.mjs'
import { __loadDesignDefaults } from './config.mjs'

//////////////////////////////////////////////
//               CONSTRUCTOR                //
//////////////////////////////////////////////

/**
 * Return a Pattern constructor (it's a super-constructor)
 *
 * @constructor
 * @param {object} config - The design configuration
 * @return {function} pattern - The pattern constructor
 */
export function Design(config) {
  // Initialize config with defaults
  config = { ...__loadDesignDefaults(), ...config }

  // Create the pattern constructor
  const pattern = function (...sets) {
    // Pass the design config
    Pattern.call(this, config)

    // Pass the pattern settings
    return this.__applySettings(sets)
  }

  // Set up inheritance
  pattern.prototype = Object.create(Pattern.prototype)
  pattern.prototype.constructor = pattern

  // Make config available without need to instantiate pattern
  pattern.config = config

  return pattern
}
