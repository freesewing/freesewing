import freesewing from '@freesewing/core'

const chai = require('chai')
const expect = chai.expect
const plugin = require('../dist/index.js')

const pattern = new freesewing.Pattern().use(plugin)
pattern.draft().render()

it('Should remove version information from a pattern', () => {
  const p = new freesewing.Pattern({
    measurements: {waist:30}
  })
  p.use(plugin)
  p.render()
  for(const key of Object.entries(p.svg.attributes.list)) {
    expect(key.indexOf('freesewing')).to.equal(-1)
  }
})
