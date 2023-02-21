import { __addNonEnumProp } from './utils.mjs'

export function getPluginName(plugin) {
  if (Array.isArray(plugin)) {
    if (plugin[0].name) return plugin[0].name
    if (plugin[0].plugin.name) return plugin[0].plugin.name
  } else {
    if (plugin.name) return plugin.name
    if (plugin.plugin?.name) return plugin.plugin.name
  }

  return false
}

export function PatternConfig(pattern) {
  this.pattern = pattern
  this.store = pattern.store
  __addNonEnumProp(this, 'plugins', { ...(pattern.designConfig.plugins || {}) })
  __addNonEnumProp(this, 'options', { ...(pattern.designConfig.options || {}) })
  __addNonEnumProp(this, 'measurements', [...(pattern.designConfig.measurements || [])])
  __addNonEnumProp(this, 'optionalMeasurements', [
    ...(pattern.designConfig.optionalMeasurements || []),
  ])
  __addNonEnumProp(this, 'inject', {})
  __addNonEnumProp(this, 'directDependencies', {})
  __addNonEnumProp(this, 'resolvedDependencies', {})
  __addNonEnumProp(this, 'parts', {})
  __addNonEnumProp(this, '__resolvedParts', {})
  __addNonEnumProp(this, '__mutated', {
    optionDistance: {},
    partDistance: {},
    partHide: {},
    partHideAll: {},
  })
}

const DISTANCE_DEBUG = false

PatternConfig.prototype.validatePart = function (part) {
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
PatternConfig.prototype.addPart = function (part) {
  if (this.validatePart(part)) this.__resolvePart([part])

  return this
}

PatternConfig.prototype.logPartDistances = function () {
  for (const partName in this.parts) {
    let qualifier = DISTANCE_DEBUG ? 'final' : ''
    this.store.log.debug(
      `⚪️  \`${partName}\` ${qualifier} options priority is __${this.__mutated.partDistance[partName]}__`
    )
  }
}

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
    partHide: this.__mutated.partHide,
    partHideAll: this.__mutated.partHideAll,
  }
}

PatternConfig.prototype.__resolvePart = function (depChain, distance = 0) {
  const part = depChain[0]
  if (distance === 0) {
    this.parts[part.name] = Object.freeze(part)
  }
  distance++
  if (typeof this.__mutated.partDistance[part.name] === 'undefined') {
    this.__mutated.partDistance[part.name] = distance

    if (DISTANCE_DEBUG)
      this.store.log.debug(
        `Base partDistance for \`${part.name}\` is __${this.__mutated.partDistance[part.name]}__`
      )
  }

  // Hide when hideAll is set
  if (part.hideAll) {
    this.__mutated.partHide[part.name] = true
  }

  this.__resolvePartDependencies(depChain, distance)

  // add the part's config
  this.__addPartConfig(part)
}

/**
 * Resolves/Adds a part's design configuration to the pattern config
 *
 * @private
 * @param {Part} part - The part of which to resolve the config
 * @param {onject} config - The global config
 * @param {Store} store - The store, used for logging
 * @return {object} config - The mutated global config
 */
PatternConfig.prototype.__addPartConfig = function (part) {
  if (this.__resolvedParts[part.name]) return this

  // Add parts, using set to keep them unique in the array
  // this.designConfig.parts = [...new Set(this.designConfig.parts).add(part)]

  return this.__addPartOptions(part)
    .__addPartMeasurements(part, true)
    .__addPartMeasurements(part, false)
    .__addPartPlugins(part)
}

/**
 * Resolves/Adds a part's configured options to the global config
 *
 * @private
 * @param {Part} part - The part of which to resolve the config
 * @return {Pattern} this - The Pattern instance
 */
PatternConfig.prototype.__addPartOptions = function (part) {
  if (!part.options) return this

  const partDistance = this.__mutated.partDistance?.[part.name] || 0
  for (const optionName in part.options) {
    const option = part.options[optionName]
    const optionDistance = this.__mutated.optionDistance[optionName]
    if (optionDistance && DISTANCE_DEBUG)
      this.store.log.debug(
        `optionDistance for __${optionName}__  is __${optionDistance}__ and partDistance for \`${part.name}\` is __${partDistance}__`
      )
    if (!optionDistance || optionDistance > partDistance) {
      this.__mutated.optionDistance[optionName] = partDistance
      // Keep design parts immutable in the pattern or risk subtle bugs
      this.options[optionName] = Object.freeze(option)
      this.store.log.debug(
        optionDistance
          ? `🟣  __${optionName}__ option overwritten by \`${part.name}\``
          : `🔵  __${optionName}__ option loaded from part \`${part.name}\``
      )
      this.__loadOptionDefault(optionName, option)
    }
  }

  return this
}

/**
 * Resolves/Adds a part's configured measurements to the global config
 *
 * @private
 * @param {Part} part - The part of which to resolve the config
 * @param {array} list - The list of resolved measurements
 * @return {Pattern} this - The Pattern instance
 */
PatternConfig.prototype.__addPartMeasurements = function (part, optional = false) {
  const listType = optional ? 'optionalMeasurements' : 'measurements'
  if (part[listType]) {
    part[listType].forEach((m) => {
      const isInReqList = this.measurements.indexOf(m) !== -1
      const optInd = this.optionalMeasurements.indexOf(m)
      const isInOptList = optInd !== -1

      if (isInReqList) return
      if (optional && !isInOptList) this.optionalMeasurements.push(m)
      if (!optional) {
        this.measurements.push(m)

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
 * @return {Pattern} this - The Pattern instance
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

PatternConfig.prototype.__loadOptionDefault = function (optionName, option) {
  this.pattern.settings.forEach((set) => {
    if (typeof set.options[optionName] !== 'undefined') return
    if (typeof option === 'object') {
      if (typeof option.pct !== 'undefined') set.options[optionName] = option.pct / 100
      else if (typeof option.mm !== 'undefined') set.options[optionName] = option.mm
      else if (typeof option.deg !== 'undefined') set.options[optionName] = option.deg
      else if (typeof option.count !== 'undefined') set.options[optionName] = option.count
      else if (typeof option.bool !== 'undefined') set.options[optionName] = option.bool
      else if (typeof option.dflt !== 'undefined') set.options[optionName] = option.dflt
      else {
        let err = 'Unknown option type: ' + JSON.stringify(option)
        this.store.log.error(err)
        throw new Error(err)
      }
    } else set.options[optionName] = option
  })
}

PatternConfig.prototype.__resolvePartDependencyChain = function (depChain, dependency, depType) {
  const part = depChain[0]

  this.parts[dependency.name] = Object.freeze(dependency)
  this.__addDependency('directDependencies', part, dependency)

  depChain.forEach((c) => this.__addDependency('resolvedDependencies', c, dependency))

  switch (depType) {
    case 'from':
      this.__setFromHide(part, part.name, dependency.name)
      this.inject[part.name] = dependency.name
      break
    case 'after':
      this.__setAfterHide(part, part.name, dependency.name)
  }
}

PatternConfig.prototype.__resolveMutatedPartDistance = function (partName) {
  const proposed_dependent_part_distance = this.__mutated.partDistance[partName] + 1
  let didChange = false
  if (!this.directDependencies[partName]) return false
  this.directDependencies[partName].forEach((dependency) => {
    if (
      typeof this.__mutated.partDistance[dependency] === 'undefined' ||
      this.__mutated.partDistance[dependency] < proposed_dependent_part_distance
    ) {
      didChange = true
      this.__mutated.partDistance[dependency] = proposed_dependent_part_distance
      this.__resolveMutatedPartDistance(dependency)
    }
    if (DISTANCE_DEBUG)
      this.store.log.debug(
        `partDistance for \`${dependency}\` is __${this.__mutated.partDistance[dependency]}__`
      )
  })

  return didChange
}

const depTypes = ['from', 'after']
PatternConfig.prototype.__resolvePartDependencies = function (depChain, distance) {
  // Resolve part Dependencies. first from then after
  const part = depChain[0]
  this.resolvedDependencies[part.name] = this.resolvedDependencies[part.name] || []

  depTypes.forEach((d) => {
    if (part[d]) {
      if (DISTANCE_DEBUG) this.store.log.debug(`Processing \`${part.name}\` "${d}:"`)

      const depsOfType = Array.isArray(part[d]) ? part[d] : [part[d]]

      depsOfType.forEach((dot) => {
        let count = Object.keys(this.parts).length
        // if any changes resulted from resolving this part mutation
        this.__resolvePartDependencyChain(depChain, dot, d)
        // if a new part was added, resolve the part
        const newCount = Object.keys(this.parts).length
        if (count < newCount) {
          this.__resolvePart([dot, ...depChain], distance)
          count = newCount
        }
      })
    }
  })

  this.__resolveMutatedPartDistance(part.name)
}

/**
 * Adds a part as a simple dependency
 *
 * @private
 * @param {string} name - The name of the dependency
 * @param {object} part - The part configuration
 * @param {object} dep - The dependency configuration
 * @return {object} this - The Pattern instance
 */
PatternConfig.prototype.__addDependency = function (dependencyList, part, dep) {
  this[dependencyList][part.name] = this[dependencyList][part.name] || []
  if (dependencyList == 'resolvedDependencies' && DISTANCE_DEBUG)
    this.store.log.debug(`add ${dep.name} to ${part.name} dependencyResolution`)
  if (this[dependencyList][part.name].indexOf(dep.name) === -1)
    this[dependencyList][part.name].push(dep.name)
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
 * Sets visibility of a dependency based on its config
 *
 * @private
 * @param {Part} part - The part of which this is a dependency
 * @param {string} name - The name of the part
 * @param {string} depName - The name of the dependency
 * @param {int} set - The index of the set in the list of settings
 * @return {Pattern} this - The Pattern instance
 */
PatternConfig.prototype.__setFromHide = function (part, name, depName) {
  if (
    part.hideDependencies ||
    part.hideAll ||
    this.__mutated.partHide[name] ||
    this.__mutated.partHideAll[name]
  ) {
    this.__mutated.partHide[depName] = true
    this.__mutated.partHideAll[depName] = true
  }

  return this
}

/**
 * Sets visibility of an 'after' dependency based on its config
 *
 * @private
 * @param {Part} part - The part of which this is a dependency
 * @param {string} name - The name of the part
 * @param {string} depName - The name of the dependency
 * @param {int} set - The index of the set in the list of settings
 * @return {Pattern} this - The Pattern instance
 */
PatternConfig.prototype.__setAfterHide = function (part, name, depName) {
  if (this.__mutated.partHide[name] || this.__mutated.partHideAll[name]) {
    this.__mutated.partHide[depName] = true
    this.__mutated.partHideAll[depName] = true
  }

  return this
}
