import { defaultGist } from 'shared/components/workbench/gist.mjs'

/** A utility for validating a gist against a design */
class GistValidator {
  givenGist
  design
  errors
  valid = true

  setGist(givenGist, design) {
    this.givenGist = givenGist
    this.design = design
    this.errors = {}
    this.valid = true
  }

  /** check that the settings all exist and are all of the right type */
  validateSettings() {
    for (const key in defaultGist) {
      if (this.givenGist[key] === undefined) {
        this.errors[key] = 'MissingSetting'
        this.valid = false
      } else if (typeof this.givenGist[key] !== typeof defaultGist[key]) {
        this.errors[key] = 'TypeError'
        this.valid = false
      }
    }
  }

  /** check that the required measurements are all there and the correct type */
  validateMeasurements() {
    if (!this.givenGist.measurements && this.design.patternConfig.measurements.length) {
      this.errors.measurements = 'MissingMeasurements'
      this.valid = false
      return
    }

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

  /** check validit of any options that are included */
  validateOptions() {
    this.errors.options = {}
    const configOpts = this.design.patternConfig.options
    const gistOpts = this.givenGist.options
    for (const o in gistOpts) {
      const configOpt = configOpts[o]
      const gistOpt = gistOpts[o]
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

  /** run all validations */
  validate() {
    this.validateSettings()
    this.validateMeasurements()
    this.validateOptions()

    return { valid: this.valid, errors: this.errors }
  }
}

const validator = new GistValidator()

/** make and run a gist validator */
export function validateGist(givenGist, design) {
  validator.setGist(givenGist, design)
  return validator.validate()
}
