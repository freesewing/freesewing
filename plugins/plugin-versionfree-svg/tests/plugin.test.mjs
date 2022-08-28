import chai from 'chai'
import { Pattern } from '@freesewing/core'
import { plugin } from '../dist/index.mjs'

const expect = chai.expect

describe('Versionfree Plugin Tests', () => {
  const pattern = new Pattern().use(plugin)
  pattern.draft().render()
  it('Should remove version numbers from SVG attributes', () => {
    expect(pattern.svg.attributes.get('freesewing')).to.equal(false)
  })
})
