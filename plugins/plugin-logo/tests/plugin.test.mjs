import chai from 'chai'
import { Design } from '@freesewing/core'
import { plugin } from '../src/index.mjs'

const expect = chai.expect

describe('Logo Plugin Tests', () => {
  it('Should import style and defs', () => {
    const Pattern = new Design()
    const pattern = new Pattern().use(plugin)
    pattern.draft().render()
    expect(pattern.svg.defs).to.contain(
      '<g id="logo" transform="scale(1) translate(-23 -36)"><path class="logo"'
    )
  })
})
