const notGarments = [
  'rendertest',
  'tutorial',
  'examples',
  'legend',
  'plugintest',
]
const isGarment = design => (notGarments.indexOf(design) === -1) ? true : false
// Some patterns are deprecated and won't support more stringent doll/giant tests
const deprecated = ['theo']


/*
 * This runs unit tests for the pattern configuration
 * It expects the following:
 *
 * @param string me: Name of the pattern (eg 'aaron')
 * @param object Pattern: Instantiated pattern object
 *
 * @param object expect: Imported chai.expect
 * @param object models: Imported @freesewing/models
 * @param object patterns: Imported @freesewing/pattern-info
 */
export const testPatternConfig = (design, pattern, expect, models, patterns) => {
  const allOptiongroupOptions = []
  it('Metadata:', () => true)
  it(`  - 'name' should match package name`, () => {
    expect(pattern.config.name).to.equal(design)
  })
  it(`  - 'version' should be set and be a non-empty string`, () => {
    expect(typeof pattern.config.version).to.equal('string')
    expect(pattern.config.version.length > 1).to.be.true
  })
  it(`  - 'version' should be a proper semantic version`, () => {
    const chunks = pattern.config.version.split('.')
    if (chunks.length > 3) {
      expect(pattern.config.version.split('.').length).to.equal(4)
      expect(chunks[2]).to.contain('-rc')
    }
    else expect(pattern.config.version.split('.').length).to.equal(3)
  })
  for (let key of ['design', 'code']) {
    it(`  - '${key}' should be a string or array of strings`, () => {
      if (typeof pattern.config[key] === 'string') {
        expect(pattern.config[key].length > 1).to.be.true
      } else {
        for (let d of pattern.config[key]) {
          expect(typeof d).to.equal('string')
          expect(d.length > 1).to.be.true
        }
      }
    })
  }

  /*
   *  Ensure optiongroup structure and content
   */
  it('Option groups:', () => true)
  for (const group in pattern.config.optionGroups) {
    for (const option of pattern.config.optionGroups[group]) {
      if (typeof option === 'string') {
        it(`  - '${option}' should be a valid option`, () => {
          expect(pattern.config.options[option]).to.exist
        })
        allOptiongroupOptions.push(option)
      } else {
        for (const subgroup in option) {
          it(`  Subgroup: ${subgroup}`, () => true)
          for (const suboption of option[subgroup]) {
            it(`    - '${suboption}' should be a valid option`, () => {
              expect(pattern.config.options[suboption]).to.exist
            })
            allOptiongroupOptions.push(suboption)
          }
        }
      }
    }
  }


  // Config tests for garments only
  if (isGarment(design)) {
    it(`  - 'type' should be 'pattern' or 'block'`, () => {
      expect(['pattern', 'block'].indexOf(pattern.config.type)).to.not.equal(-1)
    })
    it(`  - 'department' should be one of tops, bottoms, coats, swimwear, underwear, or accessories`, () => {
      expect(
        ['tops', 'bottoms', 'coats', 'swimwear', 'underwear', 'accessories'].indexOf(pattern.config.department)
      ).to.not.equal(-1)
    })
    it(`  - 'difficulty' should be a number between 1 and 5`, () => {
      expect(typeof pattern.config.difficulty).to.equal('number')
      expect(pattern.config.difficulty > 0).to.be.true
      expect(pattern.config.difficulty < 6).to.be.true
    })

    /*
     *  Ensure pattern is listed as being for breasts or not
     */
    let breasts = false
    it('Pattern should be listed as with or without breasts', () => {
      let result = false
      if (patterns.withBreasts.indexOf(design) !== -1) {
        breasts = true
        result = true
      } else {
        if (patterns.withoutBreasts.indexOf(design) !== -1) result = true
      }
      expect(result).to.be.true
    })

    /*
     *  Ensure required measurements are known measurements
     */
    it('Required measurements:', () => true)
    for (let measurement of pattern.config.measurements) {
      it(`  - '${measurement}' should be a known measurement`, () => {
        expect(
          models.measurements[breasts ? 'womenswear' : 'menswear'].indexOf(measurement)
        ).to.not.equal(-1)
      })
    }
  }

  /*
   *  Test validity of the pattern's options
   */
  it('Pattern options:', () => true)
  for (let name in pattern.config.options) {
    let option = pattern.config.options[name]
    let type = typeof option
    if (type === 'object' && typeof option.pct !== 'undefined') {
      // Percentage option
      it(`  - '${name}' is a percentage option`, () => true)
      // Snapped options can just be hidden instead
      if (option.hidden) {
        if (option.snap) it(`  - '${name}' is a hidden snap option`, () => true)
        else {
          it(`    - Should be exposed in an option group`, () => {
            expect(allOptiongroupOptions.indexOf(name) !== -1).to.be.true
          })
        }
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
      it(`    - Should be exposed in an option group`, () => {
        expect(allOptiongroupOptions.indexOf(name) !== -1).to.be.true
      })
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
      it(`    - Should be exposed in an option group`, () => {
        expect(allOptiongroupOptions.indexOf(name) !== -1).to.be.true
      })
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
      it(`    - Should be exposed in an option group`, () => {
        expect(allOptiongroupOptions.indexOf(name) !== -1).to.be.true
      })
      it(`    - Should have a default value`, () => {
        expect(typeof option.bool).to.equal('boolean')
      })
      it(`    - Default value should be one of TRUE or FALSE`, () => {
        expect([true, false].indexOf(option.bool)).to.not.equal(-1)
      })
    } else if (type === 'object' && typeof option.count !== 'undefined') {
      // Count option
      it(`  - '${name}' is a count option`, () => true)
      it(`    - Should be exposed in an option group`, () => {
        expect(allOptiongroupOptions.indexOf(name) !== -1).to.be.true
      })
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
      it(`    - Should be exposed in an option group`, () => {
        expect(allOptiongroupOptions.indexOf(name) !== -1).to.be.true
      })
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

