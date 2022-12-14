import defaultSettings from './default-settings'

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
    for (var key in defaultSettings) {
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
    console.log(this.design.patternConfig)
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
