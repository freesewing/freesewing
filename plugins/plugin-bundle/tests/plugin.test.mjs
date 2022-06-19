import chai from 'chai'
import freesewing from '@freesewing/core'
import plugin from '../dist/index.mjs'

const expect = chai.expect
const bundle = ['cutonfold', 'dimension', 'grainline', 'logo', 'title', 'scalebox']

describe('Bundle Plugin Tests', () => {
  it('Should set the plugins name:version attribute', () => {
    const pattern = new freesewing.Pattern().use(plugin)
    pattern.draft().render()
    for (const plug of bundle) {
      expect(typeof pattern.svg.attributes.get('freesewing:plugin-' + plug)).to.equal('string')
    }
  })
})
