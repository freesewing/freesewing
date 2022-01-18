import chai from 'chai'
import freesewing from '@freesewing/core'
import plugin from '../dist/index.mjs'

const expect = chai.expect

const pattern = new freesewing.Pattern().use(plugin)
pattern.draft().render()

describe('Notches Plugin Test', () => {
  it(`Should add the snippets to defs`, () => {
    expect(pattern.svg.defs).to.contain('<g id="notch">')
  })
})

