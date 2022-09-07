import chai from 'chai'
import { Design } from '@freesewing/core'
import { plugin } from '../dist/index.mjs'

const expect = chai.expect

const content = {
  strings: {
    en: {
      testString: 'This is a test string for the i18n plugin'
    }
  }
}

describe('I18n Plugin Tests', () => {
  it('Should translate text on insert', () => {
    const Pattern = new Design()
    const pattern = new Pattern().use(plugin, content)
    pattern.parts.test = new pattern.Part()
    pattern.parts.test.points.anchor = new pattern.Point(-12, -34).attr(
      'data-text',
      'testString'
    )
    const svg = pattern.draft().render()
    expect(svg).to.contain(content.strings.en.testString)
  })
})
