import chai from 'chai'
import freesewing from '@freesewing/core'
import plugin from '../dist/index.mjs'
import i18n from '../../../packages/i18n/dist/en/index.mjs'

const expect = chai.expect

describe('I18n Plugin Tests', () => {
  it('Should translate text on insert', () => {
    const pattern = new freesewing.Pattern().use(plugin, { strings: { en: i18n.plugin } })
    pattern.parts.test = new pattern.Part()
    pattern.parts.test.points.anchor = new pattern.Point(-12, -34).attr(
      'data-text',
      'cutTwoStripsToFinishTheArmholes'
    )
    const svg = pattern.draft().render()
    expect(svg).to.contain('Cut two strips to finish the armholes')
  })
})
