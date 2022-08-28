import chai from 'chai'
import { Pattern } from '@freesewing/core'
import { plugin } from '../dist/index.mjs'

const expect = chai.expect

describe('Logo Plugin Tests', () => {
  it('Should import style and defs', () => {
    const pattern = new Pattern().use(plugin)
    pattern.draft().render()
    expect(pattern.svg.defs).to.contain(
      '<g id="logo" transform="translate(-23 -36)"><path class="logo"'
    )
  })
})
