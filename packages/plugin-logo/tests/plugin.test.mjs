import chai from 'chai'
import freesewing from '@freesewing/core'
import plugin from '../dist/index.mjs'

const expect = chai.expect

describe('Logo Plugin Tests', () => {
  it('Should import style and defs', () => {
    const pattern = new freesewing.Pattern().use(plugin)
    pattern.draft().render()
    expect(pattern.svg.defs).to.contain(
      '<g id="logo" transform="translate(-23 -36)"><path class="logo"'
    )
  })
})
