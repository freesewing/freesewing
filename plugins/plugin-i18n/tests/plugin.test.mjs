import chai from 'chai'
import { Design } from '@freesewing/core'
import { plugin } from '../src/index.mjs'

const expect = chai.expect

const content = {
  en: {
    testString: 'This is a test string for the i18n plugin',
  },
}

describe('I18n Plugin Tests', () => {
  it('Should translate text on insert', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, macro, part }) => {
        points.anchor = new pattern.Point(-12, -34).attr('data-text', 'testString')
        points.from = new Point(10, 20)
        points.to = new Point(10, 230)
        macro('grainline', {
          from: points.from,
          to: points.to,
        })
        return part
      },
      plugins: [[plugin, content]],
    }
    const Pattern = new Design({ parts: [part] })
    const pattern = new Pattern()
    const svg = pattern.draft().render()
    expect(svg).to.contain(content.en.testString)
  })
})
