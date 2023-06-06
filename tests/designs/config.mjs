import { measurements } from '@freesewing/models'
import designs from '../../config/software/designs.json' assert { type: 'json' }
import chai from 'chai'

const expect = chai.expect

export const getShortName = (name) => name.split('/').pop()
export const isUtilityDesign = (name) => typeof designs[name].tags === 'undefined'

// These are ok to use mm options
const mmAllowed = ['rendertest']

/*
 * This runs unit tests for the pattern configuration
 * It expects the following:
 *
 * @param string Pattern: The Pattern constructor
 */
export const testPatternConfig = (Pattern) => {
  //const pattern = new Pattern()
  const designConfig = Pattern.designConfig
  const patternConfig = Pattern.patternConfig
  it('Pattern data:', () => true)
  it(`  - 'name' should be set and be a non-empty string`, () => {
    expect(typeof designConfig.data.name).to.equal('string')
    expect(designConfig.data.name.length > 1).to.be.true
  })
  //
  it(`  - 'version' should be set and be a non-empty string`, () => {
    expect(typeof designConfig.data.version).to.equal('string')
    expect(designConfig.data.version.length > 1).to.be.true
  })
  it(`  - 'version' should be a proper semantic version`, () => {
    const chunks = designConfig.data.version.split('.')
    if (chunks.length > 3) {
      expect(designConfig.data.version.split('.').length).to.equal(4)
      expect(chunks[2]).to.contain.oneOf(['-alpha', '-beta', '-rc'])
    } else expect(designConfig.version.split('.').length).to.equal(3)
  })

  it('Monorepo data:', () => true)
  // Store these for re-use
  const name = getShortName(designConfig.data.name)
  it(`  - 'name' should be resolvable to a short name`, () => {
    expect(typeof name).to.equal('string')
    expect(name.length > 1).to.be.true
  })
  const meta = designs[name]
  it(`  - 'description' should be set and be a string of reasonable length`, () => {
    expect(typeof meta.description).to.equal('string')
    expect(meta.description.length > 15).to.be.true
    expect(meta.description.length < 280).to.be.true
  })
  // Config tests for non-utility patterns only
  if (typeof designs[name].tags !== 'undefined') {
    it(`  - 'design' should be set and be a string of reasonable length`, () => {
      const people = Array.isArray(meta.design) ? meta.design : [meta.design]
      for (const person of people) {
        expect(typeof person).to.equal('string')
        expect(person.length > 2).to.be.true
        expect(person.length < 80).to.be.true
      }
    })
    it(`  - 'code' should be set and be a string of reasonable length`, () => {
      const people = Array.isArray(meta.code) ? meta.code : [meta.code]
      for (const person of people) {
        expect(typeof person).to.equal('string')
        expect(person.length > 2).to.be.true
        expect(person.length < 80).to.be.true
      }
    })
    it(`  - 'dfficulty' should be set and be a [1-5] number`, () => {
      expect(typeof meta.difficulty).to.equal('number')
      expect([1, 2, 3, 4, 5].indexOf(meta.difficulty) === -1).to.be.false
    })
  }

  if (!isUtilityDesign(name)) {
    // Ensure required measurements are known measurements
    it('Required measurements:', () => true)
    for (const measurement of patternConfig.measurements || []) {
      it(`  - '${measurement}' should be a known measurement`, () => {
        expect(measurements.indexOf(measurement)).to.not.equal(-1)
      })
    }
    it('Optional measurements:', () => true)
    for (let measurement of patternConfig.optionalMeasurements || []) {
      it(`  - '${measurement}' should be a known measurement`, () => {
        expect(measurements.indexOf(measurement)).to.not.equal(-1)
      })
    }
  }

  // Test validity of the pattern's options
  it('Pattern options:', () => true)
  for (const name in patternConfig.options) {
    const option = patternConfig.options[name]
    const type = typeof option
    if (type === 'object' && typeof option.pct !== 'undefined') {
      it(`    - If it has a 'menu' property, it should be a string or method`, () => {
        if (option.menu)
          expect(['string', 'function'].indexOf(typeof option.menu) === -1).to.equal(false)
      })
      // Percentage option
      it(`  - '${name}' is a percentage option`, () => true)
      // Snapped options can just be hidden instead
      if (option.hidden) {
        if (option.snap) it(`  - '${name}' is a hidden snap option`, () => true)
      }
      it(`    - Should have a default value`, () => {
        expect(typeof option.pct).to.equal('number')
      })
      it(`    - Should have a minimum <= the default value`, () => {
        expect(option.min <= option.pct).to.be.true
      })
      it(`    - Should have a maximum >= the default value`, () => {
        expect(option.max >= option.pct).to.be.true
      })
    } else if (type === 'object' && typeof option.deg !== 'undefined') {
      // Degree option
      it(`  - '${name}' is a degree option`, () => true)
      it(`    - Should have a default value`, () => {
        expect(typeof option.deg).to.equal('number')
      })
      it(`    - Should have a minimum <= the default value`, () => {
        expect(option.min <= option.deg).to.be.true
      })
      it(`    - Should have a maximum >= the default value`, () => {
        expect(option.max >= option.deg).to.be.true
      })
    } else if (type === 'object' && typeof option.mm !== 'undefined') {
      // Millimeter option
      it(`  - '${name}' is a distance (mm) option`, () => true)
      it(`    - Should have a default value`, () => {
        expect(typeof option.mm).to.equal('number')
      })
      it(`    - Should have a minimum <= the default value`, () => {
        expect(option.min <= option.mm).to.be.true
      })
      it(`    - Should have a maximum >= the default value`, () => {
        expect(option.max >= option.mm).to.be.true
      })
      if (mmAllowed.indexOf(getShortName(designConfig.data.name)) === -1) {
        it(`    - Patterns should not use mm options`, () => {
          expect('Does not use mm').to.be.true
        })
      }
    } else if (type === 'object' && typeof option.bool !== 'undefined') {
      // Boolean option
      it(`  - '${name}' is a boolean option`, () => true)
      it(`    - Should have a default value`, () => {
        expect(typeof option.bool).to.equal('boolean')
      })
      it(`    - Default value should be one of TRUE or FALSE`, () => {
        expect([true, false].indexOf(option.bool)).to.not.equal(-1)
      })
    } else if (type === 'object' && typeof option.count !== 'undefined') {
      // Count option
      it(`  - '${name}' is a count option`, () => true)
      it(`    - Should have a default value`, () => {
        expect(typeof option.count).to.equal('number')
      })
      it(`    - Should have a minimum <= the default value`, () => {
        expect(option.min <= option.count).to.be.true
      })
      it(`    - Should have a maximum >= the default value`, () => {
        expect(option.max >= option.count).to.be.true
      })
    } else if (type === 'object' && typeof option.list !== 'undefined') {
      // List option
      it(`  - '${name}' is a list option`, () => true)
      it(`    - Should have a default value`, () => {
        expect(typeof option.dflt).to.not.equal('undefined')
      })
      it(`    - Its default value should be in the list of options`, () => {
        expect(option.list.indexOf(option.dflt)).to.not.equal(-1)
      })
      it(`    - Its options should be an array of numbers or strings`, () => {
        for (let o of option.list) expect(['number', 'string'].indexOf(typeof o)).to.not.equal(-1)
      })
    } else if (type === 'number') {
      // Static number
      it(`  - '${name}' is a static number`, () => true)
    } else if (type === 'string') {
      // Static string
      it(`  - '${name}' is a static string`, () => true)
    }
  }
}
