import chai from 'chai'
import { Pattern } from '../src/index.mjs'

const expect = chai.expect

describe('Hooks', () => {
  it('Should contain all hooks', () => {
    const pattern = new Pattern()
    expect(Object.keys(pattern.plugins.hooks)).to.eql([
      'preInit',
      'postInit',
      'preDraft',
      'preSetDraft',
      'prePartDraft',
      'postPartDraft',
      'postSetDraft',
      'postDraft',
      'preSample',
      'postSample',
      'preRender',
      'preLayout',
      'postLayout',
      'postRender',
      'insertText',
    ])
  })
})
