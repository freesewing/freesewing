import chai from 'chai'
import { Design } from '@freesewing/core'
import { annotationsPlugin } from '../src/index.mjs'

const expect = chai.expect

const part = {
  name: 'test',
  draft: ({ Point, snippets, Snippet }) => {
    snippets.button = new Snippet('notch', new Point(10, 20))
  },
  plugins: [annotationsPlugin],
}
const Pattern = new Design({ parts: [part] })
const pattern = new Pattern()
pattern.draft().render()

describe('Notches Plugin Test', () => {
  it(`Should add the bnotch to defs`, () => {
    expect(pattern.svg.defs.get('bnotch')).to.not.equal(false)
  })
  it(`Should add the notch to defs`, () => {
    expect(pattern.svg.defs.get('notch')).to.not.equal(false)
  })
  it('Draws a notch on an anchor point', () => {
    const part = {
      name: 'test',
      draft: ({ Point, snippets, Snippet, part }) => {
        snippets.button = new Snippet('notch', new Point(10, 20))

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Pattern = new Design({ parts: [part] })
    const pattern = new Pattern()
    pattern.draft().render()
    const c = pattern.svg
    expect(c.layout.test.svg).to.contain('<use x="10" y="20" xlink:href="#notch"')
  })
})
