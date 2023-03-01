import { __addNonEnumProp } from './utils.mjs'

/**
 * Get the name of the given plugin config
 *
 * @param  {(Object|Object[])} plugin the plugin to get the name of
 * @return {(string|false)} the name, or false if there isn't one
 */
export function getPluginName(plugin) {
  const toCheck = Array.isArray(plugin) ? plugin[0] : plugin
  return toCheck.name || toCheck.plugin?.name || false
}

/////////////////
// CONSTRUCTOR //
/////////////////
/**
 * A class for handling config resolution for a Pattern
 * @class
 * @param {Pattern} pattern the pattern whose config is being handled
 */
export function PatternConfig(pattern) {
  /** @type {Store} the pattern's store, for logging */
  this.store = pattern.store

  /** @type {Object} resolved plugins keyed by name */
  this.plugins = { ...(pattern.designConfig.plugins || {}) }
  /** @type {Object} resolved options keyed by name */
  this.options = { ...(pattern.designConfig.options || {}) }
  /** @type {string[]} required measurements */
  this.measurements = [...(pattern.designConfig.measurements || [])]
  /** @type {string[]} optional measurements */
  this.optionalMeasurements = [...(pattern.designConfig.optionalMeasurements || [])]
  /** @type {Object} the names of the parts that will be injected */
  this.inject = {}
  /** @type {Object} arrays of parts that are direct dependencies of the key */
  this.directDependencies = {}
  /** @type {Object} arrays of all dependencies of the key */
  this.resolvedDependencies = {}
  /** @type {Object} parts to include in the pattern */
  this.parts = {}
  /** @type {Object} which parts are hidden */
  this.partHide = {}

  /** @type {Object} to track when to overwrite options */
  __addNonEnumProp(this, '__mutated', {
    optionDistance: {},
    partDistance: {},
  })

  /** @type {Object} tracking for dependency hiding */
  __addNonEnumProp(this, '__hiding', {
    all: {},
    deps: {},
  })
}

/** @type {Boolean} change me to true to get full debugging of the resolution process */
const DISTANCE_DEBUG = false

////////////////////
// PUBLIC METHODs //
////////////////////

/**
 * Validate that a part meets the requirements to be added to the pattern
 * @param  {Object} part a part configuration
 * @return {boolean}      whether the part is valid
 */
PatternConfig.prototype.isPartValid = function (part) {
  if (typeof part?.draft !== 'function') {
    this.store.log.error(`Part must have a draft() method`)
    return false
  }

  if (!part.name) {
    this.store.log.error(`Part must have a name`)
    return false
  }

  return true
}

/**
 * Chainable method to add a part to the configuration
 * @param {Object} part
 */
PatternConfig.prototype.addPart = function (part) {
  if (this.isPartValid(part)) this.__addPart([part])

  return this
}

/** Log the final report on part inheritance order */
PatternConfig.prototype.logPartDistances = function () {
  for (const partName in this.parts) {
    let qualifier = DISTANCE_DEBUG ? 'final' : ''
    this.store.log.debug(
      `⚪️  \`${partName}\` ${qualifier} options priority is __${this.__mutated.partDistance[partName]}__`
    )
  }
}

/**
 * Return a configuration in the structure expected by the pattern
 * @return {Object} contains parts, plugins, measurements, options, optionalMeasurements, resolvedDependencies, directDependencies, inject, draftOrder, partHide
 */
PatternConfig.prototype.asConfig = function () {
  return {
    parts: this.parts,
    plugins: this.plugins,
    measurements: this.measurements,
    options: this.options,
    optionalMeasurements: this.optionalMeasurements,
    resolvedDependencies: this.resolvedDependencies,
    directDependencies: this.directDependencies,
    inject: this.inject,
    draftOrder: this.__resolveDraftOrder(),
    partHide: this.partHide,
  }
}

/////////////////////
// PRIVATE METHODS //
/////////////////////

/**
 * Add a part's configuration
 * Uses recursion to also add that part's dependencies
 * @private
 * @param  {Object[]} depChain an array starting with the current part to add and containing its dependents/descendents in order
 */
PatternConfig.prototype.__addPart = function (depChain) {
  // the current part is the head of the chain
  const part = depChain[0]
  // the longer the chain, the deeper the part is down it
  const distance = depChain.length
  if (!this.parts[part.name]) this.parts[part.name] = Object.freeze(part)
  else return

  // if it hasn't been registered with a distance, do that now
  if (typeof this.__mutated.partDistance[part.name] === 'undefined') {
    this.__mutated.partDistance[part.name] = distance

    if (DISTANCE_DEBUG)
      this.store.log.debug(
        `Base partDistance for \`${part.name}\` is __${this.__mutated.partDistance[part.name]}__`
      )
  }

  // Handle various hiding possibilities
  if (part.hide || part.hideAll) this.partHide[part.name] = true
  if (part.hideDependencies) this.__hiding.deps[part.name] = true
  if (part.hideAll) {
    this.__hiding.all[part.name] = true
  }

  // resolve its dependencies
  this.__resolvePartDependencies(depChain)

  // add the part's config
  this.__addPartConfig(part)
}

/**
 * Resolves/Adds a part's design configuration to the pattern config
 *
 * @private
 * @param {Part} part - The part of which to resolve the config
 * @return this
 */
PatternConfig.prototype.__addPartConfig = function (part) {
  return this.__addPartOptions(part) // add options
    .__addPartMeasurements(part, false) // add required measurements
    .__addPartMeasurements(part, true) // add optional measurements
    .__addPartPlugins(part) // add plugins
}

/**
 * Resolves/Adds a part's configured options to the global config
 *
 * @private
 * @param {Part} part - The part of which to resolve the config
 * @return {PatternConfig} this - The PatternConfig instance
 */
PatternConfig.prototype.__addPartOptions = function (part) {
  // skip empty options
  if (!part.options) return this

  // get the part's option priority
  const partDistance = this.__mutated.partDistance?.[part.name] || 0

  // loop through options
  for (const optionName in part.options) {
    const option = part.options[optionName]
    // get the priority of this option's current registration
    const optionDistance = this.__mutated.optionDistance[optionName]
    // debug the comparison
    if (optionDistance && DISTANCE_DEBUG)
      this.store.log.debug(
        `optionDistance for __${optionName}__  is __${optionDistance}__ and partDistance for \`${part.name}\` is __${partDistance}__`
      )

    // if it's never been registered, or it's registered at a further distance
    if (!optionDistance || optionDistance > partDistance) {
      // Keep options immutable in the pattern or risk subtle bugs
      this.options[optionName] = Object.freeze(option)
      // register the new distance
      this.__mutated.optionDistance[optionName] = partDistance
      // debug appropriately
      this.store.log.debug(
        optionDistance
          ? `🟣  __${optionName}__ option overwritten by \`${part.name}\``
          : `🔵  __${optionName}__ option loaded from part \`${part.name}\``
      )
    }
  }

  return this
}

/**
 * Resolves/Adds a part's configured measurements to the global config
 *
 * @private
 * @param {Part} part - The part of which to resolve the config
 * @param {boolean} optional - are these measurements optional?
 * @return {PatternConfig} this - The PatternConfig instance
 */
PatternConfig.prototype.__addPartMeasurements = function (part, optional = false) {
  // which list are we drawing from?
  const listType = optional ? 'optionalMeasurements' : 'measurements'
  // if the part has measurements of this type, go through them
  if (part[listType]) {
    part[listType].forEach((m) => {
      // we need to know what lists it's already present on
      const isInReqList = this.measurements.indexOf(m) !== -1
      // if it's already registered as required, we're done here
      if (isInReqList) return

      // check if it's registered as optional
      const optInd = this.optionalMeasurements.indexOf(m)
      const isInOptList = optInd !== -1

      // if it is optional and not in the list, push it
      if (optional && !isInOptList) this.optionalMeasurements.push(m)
      // if it's not optional
      if (!optional) {
        // push it to required list
        this.measurements.push(m)

        // make sure it's not also registered as optional
        if (isInOptList) this.optionalMeasurements.splice(optInd, 1)
      }

      this.store.log.debug(
        `🟠  __${m}__ measurement is ${optional ? 'optional' : 'required'} in \`${part.name}\``
      )
    })
  }

  return this
}

/**
 * Resolves/Adds a part's configured plugins to the global config
 *
 * @private
 * @param {Part} part - The part of which to resolve the config
 * @return {PatternConfig} this - The PatternConfig instance
 */
PatternConfig.prototype.__addPartPlugins = function (part) {
  if (!part.plugins) return this

  const plugins = this.plugins
  // Side-step immutability of the part object to ensure plugins is an array
  let partPlugins = part.plugins
  if (!Array.isArray(partPlugins)) partPlugins = [partPlugins]
  // Go through list of part plugins
  for (let plugin of partPlugins) {
    const name = getPluginName(plugin)
    this.store.log.debug(
      plugin.plugin
        ? `🔌  Resolved __${name}__ conditional plugin in \`${part.name}\``
        : `🔌  Resolved __${name}__ plugin in \`${part.name}\``
    )
    // Handle [plugin, data] scenario
    if (Array.isArray(plugin)) {
      const pluginObj = { ...plugin[0], data: plugin[1] }
      plugin = pluginObj
    }
    if (!plugins[name]) {
      // New plugin, so we load it
      plugins[name] = plugin
      this.store.log.info(
        plugin.condition
          ? `New plugin conditionally added: \`${name}\``
          : `New plugin added: \`${name}\``
      )
    } else {
      // Existing plugin, takes some more work
      if (plugin.plugin && plugin.condition) {
        // Multiple instances of the same plugin with different conditions
        // will all be added, so we need to change the name.
        if (plugins[name]?.condition) {
          plugins[name + '_'] = plugin
          this.store.log.info(
            `Plugin \`${name}\` was conditionally added again. Renaming to ${name}_.`
          )
        } else
          this.store.log.info(
            `Plugin \`${name}\` was requested conditionally, but is already added explicitly. Not loading.`
          )
      }
      // swap from a conditional if needed
      else if (plugins[name].condition) {
        plugins[name] = plugin
        this.store.log.info(`Plugin \`${name}\` was explicitly added. Changing from conditional.`)
      }
    }
  }

  return this
}

// the two types of dependencies
const depTypes = ['from', 'after']

/**
 * Recursively register part dependencies
 * triggers {@link __addPart} on new parts found during resolution
 * @param   {Object[]} depChain an array starting with the current part to register and containing its dependents/descendents in order
 * @return  {PatternConfig}          this
 * @private
 */
PatternConfig.prototype.__resolvePartDependencies = function (depChain) {
  // the current part is the head of the chain
  const part = depChain[0]
  // get or make its array of resolved dependencies
  this.resolvedDependencies[part.name] = this.resolvedDependencies[part.name] || []

  // for each dependency type (from, after)
  depTypes.forEach((d) => {
    // if the part has dependencies of that type
    if (part[d]) {
      if (DISTANCE_DEBUG) this.store.log.debug(`Processing \`${part.name}\` "${d}:"`)

      // enforce an array
      const depsOfType = Array.isArray(part[d]) ? part[d] : [part[d]]

      // each dependency
      depsOfType.forEach((dot) => {
        // add it as a direct dependency of the current part
        this.__addDependency('directDependencies', part.name, dot.name)
        // add it as a resolved dependency of all parts in the chain
        depChain.forEach((c) => this.__addDependency('resolvedDependencies', c.name, dot.name))

        // handle hiding and injecting
        this.__handlePartDependencyOfType(part, dot.name, d)

        // if the dependency isn't registered, register it
        if (!this.parts[dot.name]) {
          // add the part's configuration. this will recursively add the part's dependencies to all parts in the chain
          this.__addPart([dot, ...depChain])
        } else {
          // if it's already registered, recursion won't happen, but we still need to add its resolved dependencies to all parts in the chain
          this.resolvedDependencies[dot.name].forEach((r) => {
            depChain.forEach((c) => this.__addDependency('resolvedDependencies', c.name, r))
          })
        }
      })
    }
  })

  // now that the chain has been registered, recalculate the part distances
  this.__resolveMutatedPartDistance(part.name)
}

/**
 * Adds a part as either a direct or a resolved dependency
 * @param   {string} dependencyList which list to add the part to, 'resolvedDependencies' or 'directDependencies'
 * @param   {string} partName           the name of the part to add the dependency to in the list
 * @param   {string} depName            the name of the dependency to add to the list
 * @private
 */
PatternConfig.prototype.__addDependency = function (dependencyList, partName, depName) {
  this[dependencyList][partName] = this[dependencyList][partName] || []
  if (dependencyList == 'resolvedDependencies' && DISTANCE_DEBUG)
    this.store.log.debug(`add ${depName} to ${partName} dependencyResolution`)
  if (this[dependencyList][partName].indexOf(depName) === -1)
    this[dependencyList][partName].push(depName)
}

/**
 * Handle dependency-type specific config business
 * @param   {Object} part       the part to add the dependency to
 * @param   {string} depName    the name of the dependency to add
 * @param   {string} depType    the type of dependency, 'from' or 'after'
 * @private
 */
PatternConfig.prototype.__handlePartDependencyOfType = function (part, depName, depType) {
  switch (depType) {
    case 'from':
      this.__setFromHide(part, depName)
      this.inject[part.name] = depName
      break
    case 'after':
      this.__setAfterHide(part, depName)
  }
}

/**
 * Resolve part option priority
 * Recursively bumps priorities down the dependency chain
 * @param   {string} partName the name of the part to resolve
 * @private
 */
PatternConfig.prototype.__resolveMutatedPartDistance = function (partName) {
  // if the part has no dependencies, bail
  if (!this.directDependencies[partName]) return

  // propose that each of the part's direct dependencies should be at a distance 1 further than the part's distance
  const proposed_dependency_distance = this.__mutated.partDistance[partName] + 1
  // check each direct dependency
  this.directDependencies[partName].forEach((dependency) => {
    // if the dependency doesn't have a distance, or that distance is less than the proposal
    if (
      typeof this.__mutated.partDistance[dependency] === 'undefined' ||
      this.__mutated.partDistance[dependency] < proposed_dependency_distance
    ) {
      // set the new distance
      this.__mutated.partDistance[dependency] = proposed_dependency_distance
      // bump the dependency's dependencies as well
      this.__resolveMutatedPartDistance(dependency)
    }

    if (DISTANCE_DEBUG)
      this.store.log.debug(
        `partDistance for \`${dependency}\` is __${this.__mutated.partDistance[dependency]}__`
      )
  })
}

/**
 * Resolves the draft order based on the configuation
 *
 * @private
 * @param {object} graph - The object of resolved dependencies, used to call itself recursively
 * @return {Pattern} this - The Pattern instance
 */
PatternConfig.prototype.__resolveDraftOrder = function () {
  this.__draftOrder = Object.keys(this.parts).sort(
    (p1, p2) => this.__mutated.partDistance[p2] - this.__mutated.partDistance[p1]
  )

  return this.__draftOrder
}

/**
 * Sets visibility of a 'from' dependency based on its config
 *
 * @private
 * @param {Part} part - The part of which this is a dependency
 * @param {string} depName - The name of the dependency
 * @return {Pattern} this - The Pattern instance
 */
PatternConfig.prototype.__setFromHide = function (part, depName) {
  if (this.__hiding.deps[part.name]) {
    this.partHide[depName] = true
    this.__hiding.deps[depName] = true
  }
  if (this.__hiding.all[part.name]) {
    this.partHide[depName] = true
    this.__hiding.all[depName] = true
  }

  return this
}

/**
 * Sets visibility of an 'after' dependency based on its config
 *
 * @private
 * @param {Part} part - The part of which this is a dependency
 * @param {string} depName - The name of the dependency
 * @param {int} set - The index of the set in the list of settings
 * @return {Pattern} this - The Pattern instance
 */
PatternConfig.prototype.__setAfterHide = function (part, depName) {
  if (this.__hiding.all[part.name]) {
    this.partHide[depName] = true
    this.__hiding.all[depName] = true
  }

  return this
}
