import { measurements } from '@freesewing/models'
import designs from "../../config/software/designs.json" assert { type: 'json' }
import chai from 'chai'

const expect = chai.expect

// Some patterns are deprecated and won't support more stringent doll/giant tests
const deprecated = ['theo']

const getShortName = name => name.split('/').pop()
const getFamily = design => {
  for (const fam in designs) {
    if (Object.keys(designs[fam]).indexOf(design) !== -1) return fam
  }

  return false
}


/*
 * This runs unit tests for the pattern configuration
 * It expects the following:
 *
 * @param string Pattern: The Pattern constructor
 */
export const testPatternConfig = (Pattern) => {
  const pattern = new Pattern()
  pattern.init()
  it('Pattern metadata:', () => true)
  it(`  - 'name' should be set and be a non-empty string`, () => {
    expect(typeof pattern.config.name).to.equal('string')
    expect(pattern.config.name.length > 1).to.be.true
  })
  //
  it(`  - 'version' should be set and be a non-empty string`, () => {
    expect(typeof pattern.config.version).to.equal('string')
    expect(pattern.config.version.length > 1).to.be.true
  })
  it(`  - 'version' should be a proper semantic version`, () => {
    const chunks = pattern.config.version.split('.')
    if (chunks.length > 3) {
      expect(pattern.config.version.split('.').length).to.equal(4)
      expect(chunks[2]).to.contain.oneOf(['-alpha', '-beta', '-rc'])
    }
    else expect(pattern.config.version.split('.').length).to.equal(3)
  })

  it('Monorepo metadata:', () => true)
  // Store these for re-use
  const shortName = getShortName(pattern.config.name)
  const family = getFamily(shortName)
  it(`  - 'name' should be resolvable to a short name`, () => {
    expect(typeof shortName).to.equal('string')
    expect(shortName.length > 1).to.be.true
  })
  it(`  - Short name should be in a known design family`, () => {
    expect(typeof family).to.equal('string')
    expect(typeof designs[family]).to.equal('object')
    expect(typeof designs[family][shortName]).to.equal('object')
  })
  const meta = designs[family][shortName]
  it(`  - 'about' should be set and be a string of reasonable length`, () => {
    expect(typeof meta.about).to.equal('string')
    expect(meta.about.length > 15).to.be.true
    expect(meta.about.length < 280).to.be.true
  })
  // Config tests for non-utility patterns only
  if (family !== 'utilities') {
    it(`  - 'design' should be set and be a string of reasonable length`, () => {
      expect(typeof meta.design).to.equal('string')
      expect(meta.design.length > 2).to.be.true
      expect(meta.design.length < 80).to.be.true
    })
    it(`  - 'code' should be set and be a string of reasonable length`, () => {
      expect(typeof meta.code).to.equal('string')
      expect(meta.code.length > 2).to.be.true
      expect(meta.code.length < 80).to.be.true
    })
    it(`  - 'department' should be set and be a string of reasonable length`, () => {
      expect(typeof meta.code).to.equal('string')
      expect(meta.code.length > 2).to.be.true
      expect(meta.code.length < 80).to.be.true
    })
    it(`  - 'dfficulty' should be set and be a [1-5] number`, () => {
      expect(typeof meta.difficulty).to.equal('number')
      expect([1,2,3,4,5].indexOf(meta.difficulty) === -1).to.be.false
    })
  }

  if (family !== 'utilities') {
    // Ensure required measurements are known measurements
    // Ensure required measurements are known measurements
    it('Required measurements:', () => true)
    for (let measurement of pattern.config.measurements || []) {
      it(`  - '${measurement}' should be a known measurement`, () => {
        if (measurements.menswear.indexOf(measurement) !== -1) {
          expect(measurements.menswear.indexOf(measurement)).to.not.equal(-1)
        } else {
          expect(measurements.womenswear.indexOf(measurement)).to.not.equal(-1)
        }
      })
    }
    it('Optional measurements:', () => true)
    for (let measurement of pattern.config.optionalMeasurements || []) {
      it(`  - '${measurement}' should be a known measurement`, () => {
        if (measurements.menswear.indexOf(measurement) !== -1) {
          expect(measurements.menswear.indexOf(measurement)).to.not.equal(-1)
        } else {
          expect(measurements.womenswear.indexOf(measurement)).to.not.equal(-1)
        }
      })
    }
  }

  // Test validity of the pattern's options
  it('Pattern options:', () => true)
  for (let name in pattern.config.options) {
    const option = pattern.config.options[name]
    const type = typeof option
    if (type === 'object' && typeof option.pct !== 'undefined') {
      it(`    - If it has a 'menu' property, it should be a string`, () => {
        if (option.menu) expect(typeof option.menu).to.equal('string')
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
      if (deprecated.indexOf(design) === -1 && option.testIgnore !== true) {
        it(`    - Patterns should not use mm options`, () => {
          expect("Does not use mm").to.be.true
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

