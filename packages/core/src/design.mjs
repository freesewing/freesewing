import { Pattern } from './pattern.mjs'
import { addPartConfig } from './utils.mjs'
import { loadDesignDefaults } from './config.mjs'

/*
 * The Design constructor. Returns a Pattern constructor
 * So it's sort of a super-constructor
 */
export function Design(config) {
  // Initialize config with defaults
  config = { ...loadDesignDefaults(), ...config }

  // Create the pattern constructor
  const pattern = function (settings) {
    // Pass the design config
    Pattern.call(this, config)

    // Pass the pattern settings
    return this.__applySettings(settings)
  }

  // Set up inheritance
  pattern.prototype = Object.create(Pattern.prototype)
  pattern.prototype.constructor = pattern

  // Make config available without need to instantiate pattern
  pattern.config = config

  return pattern
}
