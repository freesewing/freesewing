/** A utility for validating a gist against a patternConfig */
class SettingsValidator {
  givenSettings
  patternConfig
  errors
  valid = true

  setGist(givenSettings, patternConfig) {
    this.givenSettings = givenSettings
    this.patternConfig = patternConfig
    this.errors = {}
    this.valid = true
  }

  /** check that the required measurements are all there and the correct type */
  validateMeasurements() {
    if (!this.givenSettings.measurements && this.patternConfig.measurements.length) {
      this.errors.measurements = 'MissingMeasurements'
      this.valid = false
      return
    }

    this.errors.measurements = {}
    for (const m of this.patternConfig.measurements || []) {
      if (this.givenSettings.measurements[m] === undefined) {
        this.errors.measurements[m] = 'MissingMeasurement'
        this.valid = false
      } else if (isNaN(this.givenSettings.measurements[m])) {
        this.errors.measurements[m] = 'TypeError'
        this.valid = false
      }
    }
  }

  /** check validity of any options that are included */
  validateOptions() {
    this.errors.options = {}
    const configOpts = this.patternConfig.options
    const settingsOpts = this.givenSettings.options
    for (const o in settingsOpts) {
      const configOpt = configOpts[o]
      const settingsOpt = settingsOpts[o]
      // if the option doesn't exist on the pattern
      if (!configOpt) {
        this.errors.options[o] = 'UnknownOption'
      }
      // if it's a constant option, mark that it can't be overwritten
      else if (typeof configOpt !== 'object') {
        this.errors.options[o] = 'ConstantOption'
      }
      // if it's a list option but the selection isn't in the list, mark it an unknown selection
      else if (configOpt.list !== undefined) {
        if (!configOpt.list.includes(settingsOpt) && settingsOpt != configOpt.dflt)
          this.error.options[o] = 'UnknownOptionSelection'
      }
      // if it's a boolean option but the gist value isn't a boolean. mark a type error
      else if (configOpts[o].bool !== undefined) {
        if (typeof settingsOpt !== 'boolean') this.errors.options[o] = 'TypeError'
      }
      // all other options are numbers, so check it's a number
      else if (isNaN(settingsOpt)) {
        this.errors.options[o] = 'TypeError'
      }
      // if still no error, check the bounds
      else {
        const checkNum = configOpt.pct ? settingsOpt * 100 : settingsOpt
        if (checkNum < configOpt.min || checkNum > configOpt.max) {
          this.errors.options[o] = 'RangeError'
        }
      }

      if (this.errors.options[o]) this.valid = false
    }
  }

  /** run all validations */
  validate() {
    this.validateMeasurements()
    this.validateOptions()

    return { valid: this.valid, errors: this.errors }
  }
}

const validator = new SettingsValidator()

/** make and run a gist validator */
export function validateSettings(givenSettings, patternConfig) {
  validator.setGist(givenSettings, patternConfig)
  return validator.validate()
}
