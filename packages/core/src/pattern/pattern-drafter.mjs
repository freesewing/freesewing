import { PatternDraftQueue } from './pattern-draft-queue.mjs'
import { Part } from '../part.mjs'
import { __macroName } from '../utils.mjs'

export function PatternDrafter(pattern) {
  this.pattern = pattern
}

Object.defineProperty(PatternDrafter.prototype, 'activeSet', {
  get: function () {
    return this.pattern.activeSet
  },
  set: function (newVal) {
    this.pattern.activeSet = newVal
  },
})

Object.defineProperty(PatternDrafter.prototype, 'activePart', {
  get: function () {
    return this.pattern.activePart
  },
  set: function (newVal) {
    this.pattern.activePart = newVal
    this.activeStore.set('activePart', newVal)
  },
})

/**
 * Drafts this pattern, aka the raison d'etre of FreeSewing
 *
 * @return {object} this - The Pattern instance
 */
PatternDrafter.prototype.draft = function () {
  this.pattern.draftQueue = new PatternDraftQueue(this.pattern)
  this.pattern.__runHooks('preDraft')
  // Keep container for drafted parts fresh
  this.pattern.parts = []

  // Iterate over the provided sets of settings (typically just one)
  for (const set in this.pattern.settings) {
    this.pattern.setStores[set] = this.pattern.__createSetStore()
    this.__useSet(set)

    this.activeStore.log.debug(`Initialized store for set ${set}`)
    this.pattern.__runHooks('preSetDraft')
    this.activeStore.log.debug(`📐 Drafting pattern for set ${set}`)

    // Create parts container
    this.pattern.parts[set] = {}

    // Handle snap for pct options
    this.__loadAbsoluteOptionsSet(set)

    this.pattern.draftQueue.start()
    while (this.pattern.draftQueue.hasNext()) {
      const partName = this.pattern.draftQueue.next()
      if (this.pattern.__needs(partName, set)) {
        this.draftPartForSet(partName, set)
      } else {
        this.activeStore.log.debug(`Part \`${partName}\` is not needed. Skipping part`)
      }
    }
    this.pattern.__runHooks('postSetDraft')
  }
  this.pattern.__runHooks('postDraft')
}

PatternDrafter.prototype.draftPartForSet = function (partName, set) {
  this.__useSet(set)
  this.__createPartForSet(partName, set)

  const configPart = this.pattern.config.parts?.[partName]
  if (typeof configPart?.draft !== 'function') {
    this.activeStore.log.error(
      `Unable to draft pattern part __${partName}__. Part.draft() is not callable`
    )
    return
  }

  this.activePart = partName
  try {
    this.pattern.__runHooks('prePartDraft')
    const result = configPart.draft(this.pattern.parts[set][partName].shorthand())

    if (typeof result === 'undefined') {
      this.activeStore.log.error(
        `Result of drafting part ${partName} was undefined. Did you forget to return the part?`
      )
    } else {
      if (!this.pattern.__wants(partName, set)) result.hide()
      this.pattern.__runHooks('postPartDraft')
      this.pattern.parts[set][partName] = result
    }
    return result
  } catch (err) {
    this.activeStore.log.error([`Unable to draft part \`${partName}\` (set ${set})`, err])
  }
}

PatternDrafter.prototype.__createPartForSet = function (partName, set = 0) {
  // gotta protect against attacks
  if (set === '__proto__') {
    throw new Error('malicious attempt at altering Object.prototype. Stopping action')
  }
  // Create parts
  this.activeStore.log.debug(`📦 Creating part \`${partName}\` (set ${set})`)
  this.pattern.parts[set][partName] = this.__createPartWithContext(partName, set)

  // Handle inject/inheritance
  const parent = this.pattern.config.inject[partName]
  if (typeof parent === 'string') {
    this.activeStore.log.debug(`Creating part \`${partName}\` from part \`${parent}\``)
    try {
      this.pattern.parts[set][partName].__inject(this.pattern.parts[set][parent])
    } catch (err) {
      this.activeStore.log.error([
        `Could not inject part \`${parent}\` into part \`${partName}\``,
        err,
      ])
    }
  }
}

/**
 * Instantiates a new Part instance and populates it with the pattern context
 *
 * @private
 * @param {string} name - The name of the part
 * @param {int} set - The index of the settings set in the list of sets
 * @return {Part} part - The instantiated Part
 */
PatternDrafter.prototype.__createPartWithContext = function (name, set) {
  // Context object to add to Part closure
  const part = new Part()
  part.name = name
  part.set = set
  part.stack = this.pattern.config.parts[name]?.stack || name
  part.context = {
    parts: this.pattern.parts[set],
    config: this.pattern.config,
    settings: this.pattern.settings[set],
    store: this.pattern.setStores[set],
    macros: this.pattern.plugins.macros,
  }

  if (this.pattern.settings[set]?.partClasses) {
    part.attr('class', this.pattern.settings[set].partClasses)
  }

  for (const macro in this.pattern.plugins.macros) {
    part[__macroName(macro)] = this.pattern.plugins.macros[macro]
  }

  return part
}

/**
 * Generates an array of settings.absoluteOptions objects for sampling a list option
 *
 * @private
 * @param {string} optionName - Name of the option to sample
 * @return {Array} sets - The list of settings objects
 */
PatternDrafter.prototype.__loadAbsoluteOptionsSet = function (set) {
  for (const optionName in this.pattern.settings[set].options) {
    const option = this.pattern.config.options[optionName]
    if (
      typeof option !== 'undefined' &&
      typeof option.snap !== 'undefined' &&
      option.toAbs instanceof Function
    ) {
      this.pattern.settings[set].absoluteOptions[optionName] = this.__snappedPercentageOption(
        optionName,
        set
      )
      this.pattern.setStores[set].log.debug(
        `🧲 Snapped __${optionName}__ to \`${this.pattern.settings[set].absoluteOptions[optionName]}\` for set __${set}__`
      )
    }
  }

  return this
}

/**
 * Returns the absolute value of a snapped percentage option
 *
 * @private
 * @param {string} optionName - The name of the option
 * @param {int} set - The index of the set in the list of settings
 * @return {float} abs - The absolute value of the snapped option
 */
PatternDrafter.prototype.__snappedPercentageOption = function (optionName, set) {
  const conf = this.pattern.config.options[optionName]
  const abs = conf.toAbs(this.pattern.settings[set].options[optionName], this.pattern.settings[set])
  // Handle units-specific config - Side-step immutability for the snap conf
  let snapConf = conf.snap
  if (!Array.isArray(snapConf) && snapConf.metric && snapConf.imperial)
    snapConf = snapConf[this.pattern.settings[set].units]
  // Simple steps
  if (typeof snapConf === 'number') return Math.ceil(abs / snapConf) * snapConf
  // List of snaps
  if (Array.isArray(snapConf) && snapConf.length > 1) {
    for (const snap of snapConf
      .sort((a, b) => a - b)
      .map((snap, i) => {
        const margin =
          i < snapConf.length - 1
            ? (snapConf[Number(i) + 1] - snap) / 2 // Look forward
            : (snap - snapConf[i - 1]) / 2 // Final snap, look backward

        return {
          min: snap - margin,
          max: snap + Number(margin),
          snap,
        }
      }))
      if (abs <= snap.max && abs >= snap.min) return snap.snap
  }

  return abs
}

PatternDrafter.prototype.__useSet = function (set = 0) {
  this.activeSet = set
  this.activeSettings = this.pattern.settings[set]
  this.activeStore = this.pattern.setStores[set]
}
