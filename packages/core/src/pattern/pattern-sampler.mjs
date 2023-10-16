/**
 * A class for handling pattern sampling
 * @param {Pattern} pattern the pattern that will be sampled
 */
export function PatternSampler(pattern) {
  this.pattern = pattern
}

/**
 * Handles measurement sampling
 *
 * @return {object} this - The Pattern instance
 */
PatternSampler.prototype.sampleMeasurement = function (measurementName) {
  this.pattern.store.log.debug(`Sampling measurement \`${measurementName}\``)
  this.pattern.__runHooks('preSample')
  this.pattern.__applySettings(this.__measurementSets(measurementName))
  this.pattern.__init()
  this.pattern.__runHooks('postSample')

  return this.pattern.draft()
}

/**
 * Handles models sampling
 *
 * @return {object} this - The Pattern instance
 */
PatternSampler.prototype.sampleModels = function (models, focus = false) {
  this.pattern.store.log.debug(`Sampling models \`${Object.keys(models).join(', ')}\``)
  this.pattern.__runHooks('preSample')
  this.pattern.__applySettings(this.__modelSets(models, focus))
  this.pattern.__init()
  this.pattern.__runHooks('postSample')

  return this.pattern.draft()
}

/**
 * Handles option sampling
 *
 * @return {object} this - The Pattern instance
 */
PatternSampler.prototype.sampleOption = function (optionName) {
  this.pattern.store.log.debug(`Sampling option \`${optionName}\``)
  this.pattern.__runHooks('preSample')
  this.pattern.__applySettings(this.__optionSets(optionName))
  this.pattern.__init()
  this.pattern.__runHooks('postSample')

  return this.pattern.draft()
}

/**
 * Generates an array of settings.options objects for sampling a list or boolean option
 *
 * @private
 * @param {string} optionName - Name of the option to sample
 * @return {Array} sets - The list of settings objects
 */
PatternSampler.prototype.__listBoolOptionSets = function (optionName) {
  let option = this.pattern.config.options[optionName]
  const base = this.__setBase()
  const sets = []
  let run = 1
  if (typeof option.bool !== 'undefined') option = { list: [false, true] }
  for (const choice of option.list) {
    const settings = {
      ...base,
      options: {
        ...base.options,
      },
      idPrefix: `sample-${run}`,
      partClasses: `sample-${run}`,
    }
    settings.options[optionName] = choice
    sets.push(settings)
    run++
  }

  return sets
}

/**
 * Generates an array of settings objects for sampling a measurement
 *
 * @private
 * @param {string} measurementName - The name of the measurement to sample
 * @return {Array} sets - The list of settings objects
 */
PatternSampler.prototype.__measurementSets = function (measurementName) {
  let val = this.pattern.settings[0].measurements[measurementName]
  if (val === undefined)
    this.pattern.store.log.error(
      `Cannot sample measurement \`${measurementName}\` because it's \`undefined\``
    )
  let step = val / 50
  val = val * 0.9
  const sets = []
  const base = this.__setBase()
  for (let run = 1; run < 11; run++) {
    const settings = {
      ...base,
      measurements: {
        ...base.measurements,
      },
      idPrefix: `sample-${run}`,
      partClasses: `sample-${run}`,
    }
    settings.measurements[measurementName] = val
    sets.push(settings)
    val += step
  }

  return sets
}

/**
 * Generates an array of settings objects for sampling a list of models
 *
 * @private
 * @param {object} models - The models to sample
 * @param {string} focus - The ID of the model that should be highlighted
 * @return {Array} sets - The list of settings objects
 */
PatternSampler.prototype.__modelSets = function (models, focus = false) {
  const sets = []
  const base = this.__setBase()
  let run = 1
  // If there's a focus, do it first so it's at the bottom of the SVG
  if (focus) {
    sets.push({
      ...base,
      measurements: models[focus],
      idPrefix: `sample-${run}`,
      partClasses: `sample-${run} sample-focus`,
    })
    run++
    delete models[focus]
  }
  for (const measurements of Object.values(models)) {
    sets.push({
      ...base,
      measurements,
      idPrefix: `sample-${run}`,
      partClasses: `sample-${run}`,
    })
  }

  return sets
}

/**
 * Generates an array of settings objects for sampling an option
 *
 * @private
 * @param {string} optionName - The name of the option to sample
 * @return {Array} sets - The list of settings objects
 */
PatternSampler.prototype.__optionSets = function (optionName) {
  const sets = []
  if (!(optionName in this.pattern.config.options)) return sets
  let option = this.pattern.config.options[optionName]
  if (typeof option.list === 'object' || typeof option.bool !== 'undefined')
    return this.__listBoolOptionSets(optionName)
  let factor = 1
  let step, val
  let numberRuns = 10
  let stepFactor = numberRuns - 1
  if (typeof option.min === 'undefined' || typeof option.max === 'undefined') {
    const min = option * 0.9
    const max = option * 1.1
    option = { min, max }
  }
  if (typeof option.pct !== 'undefined') factor = 100
  val = option.min / factor
  if (typeof option.count !== 'undefined' || typeof option.mm !== 'undefined') {
    const numberOfCounts = option.max - option.min + 1
    if (numberOfCounts < 10) {
      numberRuns = numberOfCounts
      stepFactor = Math.max(numberRuns - 1, 1)
    }
  }
  step = (option.max / factor - val) / stepFactor
  const base = this.__setBase()
  const roundVal = typeof option.count !== 'undefined' || typeof option.mm !== 'undefined'
  for (let run = 1; run <= numberRuns; run++) {
    const settings = {
      ...base,
      options: {
        ...base.options,
      },
      idPrefix: `sample-${run}`,
      partClasses: `sample-${run}`,
    }
    settings.options[optionName] = roundVal ? Math.ceil(val) : val
    sets.push(settings)
    val += step
  }

  return sets
}

/**
 * Returns the base/defaults to generate a set of settings
 *
 * @private
 * @return {object} settings - The settings object
 */
PatternSampler.prototype.__setBase = function () {
  return {
    measurements: {},
    options: {},
    ...this.pattern.settings[0],
  }
}
