import chai from 'chai'
import freesewing from '@freesewing/core'
import plugin from '../dist/index.mjs'

const expect = chai.expect

describe('Versionfree Plugin Tests', () => {
  const pattern = new freesewing.Pattern().use(plugin)
  pattern.draft().render()
  it('Should remove version numbers from SVG attributes', () => {
    expect(pattern.svg.attributes.get('freesewing')).to.equal(false)
  })
})
