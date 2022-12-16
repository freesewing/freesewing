import defaultSettings from './default-settings.js'

class GistValidator {
  givenGist
  design
  errors
  valid = true

  constructor(givenGist, design) {
    this.givenGist = givenGist
    this.design = design
    this.errors = {}
  }

  validateSettings() {
    for (const key in defaultSettings) {
      if (typeof this.givenGist[key] !== typeof defaultSettings[key]) {
        this.errors[key] = 'TypeError'
        this.valid = false
      }
    }
  }

  validateMeasurements() {
    this.errors.measurements = {}
    for (const m of this.design.patternConfig.measurements || []) {
      if (this.givenGist.measurements[m] === undefined) {
        this.errors.measurements[m] = 'MissingMeasurement'
        this.valid = false
      } else if (isNaN(this.givenGist.measurements[m])) {
        this.errors.measurements[m] = 'TypeError'
        this.valid = false
      }
    }
  }

  validateOptions() {
    this.errors.options = {}
    const configOpts = this.design.patternConfig.options
    const gistOpts = this.givenGist.options
    for (const o in gistOpts) {
      const configOpt = configOpts[o]
      const gistOpt = gistOpts[o]
      // if the option doesn't exist on the pattern, mark it unknown
      if (!configOpt) {
        this.errors.options[o] = 'UnknownOption'
      }
      // if it's a constant option, mark that it can't be overwritten
      else if (typeof configOpt !== 'object') {
        this.errors.options[o] = 'ConstantOption'
      }
      // if it's a list option but the selection isn't in the list, mark it an unknown selection
      else if (configOpt.list !== undefined) {
        if (!configOpt.list.includes(gistOpt) && gistOpt != configOpt.dflt)
          this.error.options[o] = 'UnknownOptionSelection'
      }
      // if it's a boolean option but the gist value isn't a boolean. mark a type error
      else if (configOpts[o].bool !== undefined) {
        if (typeof gistOpt !== 'boolean') this.errors.options[o] = 'TypeError'
      }
      // all other options are numbers, so check it's a number
      else if (isNaN(gistOpt)) {
        this.errors.options[o] = 'TypeError'
      }
      // if still no error, check the bounds
      else {
        const checkNum = configOpt.pct ? gistOpt * 100 : gistOpt
        if (checkNum < configOpt.min || checkNum > configOpt.max) {
          this.errors.options[o] = 'RangeError'
        }
      }

      if (this.errors.options[o]) this.valid = false
    }
  }

  validate() {
    this.validateSettings()
    this.validateMeasurements()
    this.validateOptions()

    return { valid: this.valid, errors: this.errors }
  }
}

export default function validateGist(givenGist, design) {
  const validator = new GistValidator(givenGist, design)
  return validator.validate()
}
