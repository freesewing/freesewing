import chai from 'chai'
import { Design } from '@freesewing/core'
import { plugin } from '../src/index.mjs'

const expect = chai.expect

describe('Versionfree Plugin Tests', () => {
  const Pattern = new Design()
  const pattern = new Pattern().use(plugin)
  pattern.draft().render()
  it('Should remove version numbers from SVG attributes', () => {
    expect(pattern.svg.attributes.get('freesewing')).to.equal(false)
  })
})
