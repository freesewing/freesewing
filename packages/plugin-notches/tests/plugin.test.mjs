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

  it(`Should add the notches snippet to defs`, () => {
    expect(pattern.svg.defs.indexOf(`<g id="notch">`)).to.not.equal(-1)
  })

  it("Draws a notch on an anchor point", () => {
    let pattern = new freesewing.Pattern()
    pattern.use(plugin)
    pattern.parts.test = new pattern.Part()
    let { Point, snippets, Snippet } = pattern.parts.test.shorthand()
    snippets.button = new Snippet('notch', new Point(10,20))
    pattern.render()
    let c = pattern.svg
    expect(c.layout.test.svg).to.contain('<use x="10" y="20" xlink:href="#notch"')
  })
})

