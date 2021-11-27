import chai from 'chai'
import freesewing from '@freesewing/core'
import plugin from '../dist/index.mjs'

const expect = chai.expect

const pattern = new freesewing.Pattern().use(plugin)
pattern.draft().render()

describe('Buttons Plugin Test', () => {
  for (const snippet of ['button', 'buttonhole', 'snap-stud', 'snap-socket']) {
    it(`Should add the ${snippet} snippet to defs`, () => {
      expect(pattern.svg.defs.indexOf(`<g id="${snippet}">`)).to.not.equal(-1)
    })
  }
})

