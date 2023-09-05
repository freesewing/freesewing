import chai from 'chai'
import { Design, round } from '@freesewing/core'
import { annotationsPlugin } from '../src/index.mjs'

const expect = chai.expect

describe('Scalebox Plugin Tests', () => {
  it('Should run the default scalebox macro', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, macro, part }) => {
        points.anchor = new Point(100, 200)
        macro('scalebox', {
          at: points.anchor,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Pattern = new Design({ parts: [part] })
    const pattern = new Pattern()
    pattern.draft()
    let p = pattern.parts[0].test.points
    expect(p.scalebox_1_MetricTopLeft.x).to.equal(50)
    expect(p.scalebox_1_MetricTopLeft.y).to.equal(175)
    expect(p.scalebox_1_MetricTopRight.x).to.equal(150)
    expect(p.scalebox_1_MetricTopRight.y).to.equal(175)
    expect(p.scalebox_1_MetricBottomLeft.x).to.equal(50)
    expect(p.scalebox_1_MetricBottomLeft.y).to.equal(225)
    expect(p.scalebox_1_MetricBottomRight.x).to.equal(150)
    expect(p.scalebox_1_MetricBottomRight.y).to.equal(225)
    expect(p.scalebox_1_ImperialTopLeft.x).to.equal(49.2)
    expect(p.scalebox_1_ImperialTopLeft.y).to.equal(174.6)
    expect(p.scalebox_1_ImperialTopRight.x).to.equal(150.8)
    expect(p.scalebox_1_ImperialTopRight.y).to.equal(174.6)
    expect(p.scalebox_1_ImperialBottomLeft.x).to.equal(49.2)
    expect(p.scalebox_1_ImperialBottomLeft.y).to.equal(225.4)
    expect(p.scalebox_1_ImperialBottomRight.x).to.equal(150.8)
    expect(p.scalebox_1_ImperialBottomRight.y).to.equal(225.4)
    expect(p.scalebox_1_Lead.x).to.equal(55)
    expect(p.scalebox_1_Lead.y).to.equal(185)
    expect(p.scalebox_1_Title.x).to.equal(55)
    expect(p.scalebox_1_Title.y).to.equal(195)
    expect(p.scalebox_1_Text.x).to.equal(55)
    expect(p.scalebox_1_Text.y).to.equal(207)
    expect(p.scalebox_1_Link.x).to.equal(55)
    expect(p.scalebox_1_Link.y).to.equal(212)
    expect(p.scalebox_1_Metric.x).to.equal(100)
    expect(p.scalebox_1_Metric.y).to.equal(220)
    expect(p.scalebox_1_Imperial.x).to.equal(100)
    expect(p.scalebox_1_Imperial.y).to.equal(224)
    p = pattern.parts[0].test.paths.scalebox_1_Metric
    expect(p.ops[0].type).to.equal('move')
    expect(p.ops[1].type).to.equal('line')
    expect(p.ops[2].type).to.equal('line')
    expect(p.ops[3].type).to.equal('line')
    expect(p.ops[4].type).to.equal('close')
    expect(p.ops[0].to.x).to.equal(50)
    expect(p.ops[0].to.y).to.equal(175)
    expect(p.ops[1].to.x).to.equal(50)
    expect(p.ops[1].to.y).to.equal(225)
    expect(p.ops[2].to.x).to.equal(150)
    expect(p.ops[2].to.y).to.equal(225)
    expect(p.ops[3].to.x).to.equal(150)
    expect(p.ops[3].to.y).to.equal(175)
    p = pattern.parts[0].test.paths.scalebox_1_Imperial
    expect(p.ops[0].type).to.equal('move')
    expect(p.ops[1].type).to.equal('line')
    expect(p.ops[2].type).to.equal('line')
    expect(p.ops[3].type).to.equal('line')
    expect(p.ops[4].type).to.equal('close')
    expect(p.ops[0].to.x).to.equal(49.2)
    expect(p.ops[0].to.y).to.equal(174.6)
    expect(p.ops[1].to.x).to.equal(49.2)
    expect(p.ops[1].to.y).to.equal(225.4)
    expect(p.ops[2].to.x).to.equal(150.8)
    expect(p.ops[2].to.y).to.equal(225.4)
    expect(p.ops[3].to.x).to.equal(150.8)
    expect(p.ops[3].to.y).to.equal(174.6)
  })

  it('Should run the scalebox macro with rotation', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, macro }) => {
        points.anchor = new Point(100, 200)
        macro('scalebox', {
          at: points.anchor,
          rotate: 90,
        })
      },
      plugins: [annotationsPlugin],
    }
    const Pattern = new Design({ parts: [part] })
    const pattern = new Pattern()
    pattern.draft()
    const p = pattern.parts[0].test.points
    expect(round(p.scalebox_1_MetricTopLeft.x)).to.equal(75)
    expect(round(p.scalebox_1_MetricTopLeft.y)).to.equal(250)
    expect(round(p.scalebox_1_MetricTopRight.x)).to.equal(75)
    expect(round(p.scalebox_1_MetricTopRight.y)).to.equal(150)
    expect(round(p.scalebox_1_MetricBottomLeft.x)).to.equal(125)
    expect(round(p.scalebox_1_MetricBottomLeft.y)).to.equal(250)
    expect(round(p.scalebox_1_MetricBottomRight.x)).to.equal(125)
    expect(round(p.scalebox_1_MetricBottomRight.y)).to.equal(150)
    expect(round(p.scalebox_1_ImperialTopLeft.x)).to.equal(74.6)
    expect(round(p.scalebox_1_ImperialTopLeft.y)).to.equal(250.8)
    expect(round(p.scalebox_1_ImperialTopRight.x)).to.equal(74.6)
    expect(round(p.scalebox_1_ImperialTopRight.y)).to.equal(149.2)
    expect(round(p.scalebox_1_ImperialBottomLeft.x)).to.equal(125.4)
    expect(round(p.scalebox_1_ImperialBottomLeft.y)).to.equal(250.8)
    expect(round(p.scalebox_1_ImperialBottomRight.x)).to.equal(125.4)
    expect(round(p.scalebox_1_ImperialBottomRight.y)).to.equal(149.2)
    expect(round(p.scalebox_1_Lead.x)).to.equal(85)
    expect(round(p.scalebox_1_Lead.y)).to.equal(245)
    expect(round(p.scalebox_1_Title.x)).to.equal(95)
    expect(round(p.scalebox_1_Title.y)).to.equal(245)
    expect(round(p.scalebox_1_Text.x)).to.equal(107)
    expect(round(p.scalebox_1_Text.y)).to.equal(245)
    expect(round(p.scalebox_1_Link.x)).to.equal(112)
    expect(round(p.scalebox_1_Link.y)).to.equal(245)
    expect(round(p.scalebox_1_Metric.x)).to.equal(120)
    expect(round(p.scalebox_1_Metric.y)).to.equal(200)
    expect(round(p.scalebox_1_Imperial.x)).to.equal(124)
    expect(round(p.scalebox_1_Imperial.y)).to.equal(200)
  })

  it('Should run the scalebox macro with default text', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, macro, part }) => {
        points.anchor = new Point(100, 200)
        macro('scalebox', {
          at: points.anchor,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Pattern = new Design({
      parts: [part],
      data: { name: 'test', version: '1.2.3' },
    })
    const pattern = new Pattern()
    pattern.draft()
    let p = pattern.parts[0].test.points.scalebox_1_Lead.attributes
    expect(p.get('data-text')).to.equal('FreeSewing')
    expect(p.get('data-text-class')).to.equal('text-sm')
    p = pattern.parts[0].test.points.scalebox_1_Title.attributes
    expect(p.get('data-text')).to.equal('test v1.2.3')
    expect(p.get('data-text-class')).to.equal('text-lg')
    p = pattern.parts[0].test.points.scalebox_1_Text.attributes
    expect(p.get('data-text-class')).to.equal('text-xs')
    expect(p.get('data-text-lineheight')).to.equal('4')
    expect(p.list['data-text'][0]).to.equal('supportFreesewingBecomeAPatron')
  })

  it('Should run the scalebox macro with custom text', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, macro, part }) => {
        points.anchor = new Point(100, 200)
        macro('scalebox', {
          at: points.anchor,
          lead: 'theLead',
          title: 'theTitle',
          text: 'theText',
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Pattern = new Design({
      parts: [part],
      data: { name: 'test', version: '1.2.3' },
    })
    const pattern = new Pattern()
    pattern.draft()
    let p = pattern.parts[0].test.points.scalebox_1_Lead.attributes
    expect(p.get('data-text')).to.equal('theLead')
    expect(p.get('data-text-class')).to.equal('text-sm')
    p = pattern.parts[0].test.points.scalebox_1_Title.attributes
    expect(p.get('data-text')).to.equal('theTitle')
    expect(p.get('data-text-class')).to.equal('text-lg')
    p = pattern.parts[0].test.points.scalebox_1_Text.attributes
    expect(p.get('data-text')).to.equal('theText')
    expect(p.get('data-text-class')).to.equal('text-xs')
    expect(p.get('data-text-lineheight')).to.equal('4')
  })

  it('Should apply scale to the scalebox macro', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, macro, part }) => {
        points.anchor = new Point(100, 200)
        macro('scalebox', {
          at: points.anchor,
          lead: 'theLead',
          title: 'theTitle',
          text: 'theText',
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Pattern = new Design({
      parts: [part],
      plugins: [annotationsPlugin],
      data: { name: 'test', version: '1.2.3' },
    })
    const pattern = new Pattern({ scale: 0.5 })
    pattern.draft()
    let p = pattern.parts[0].test.points
    expect(p.scalebox_1_MetricTopLeft.x).to.equal(75)
    expect(p.scalebox_1_MetricTopLeft.y).to.equal(187.5)
    expect(p.scalebox_1_MetricTopRight.x).to.equal(125)
    expect(p.scalebox_1_MetricTopRight.y).to.equal(187.5)
    expect(p.scalebox_1_MetricBottomLeft.x).to.equal(75)
    expect(p.scalebox_1_MetricBottomLeft.y).to.equal(212.5)
    expect(p.scalebox_1_MetricBottomRight.x).to.equal(125)
    expect(p.scalebox_1_MetricBottomRight.y).to.equal(212.5)
    expect(p.scalebox_1_ImperialTopLeft.x).to.equal(74.6)
    expect(p.scalebox_1_ImperialTopLeft.y).to.equal(187.3)
    expect(p.scalebox_1_ImperialTopRight.x).to.equal(125.4)
    expect(p.scalebox_1_ImperialTopRight.y).to.equal(187.3)
    expect(p.scalebox_1_ImperialBottomLeft.x).to.equal(74.6)
    expect(p.scalebox_1_ImperialBottomLeft.y).to.equal(212.7)
    expect(p.scalebox_1_ImperialBottomRight.x).to.equal(125.4)
    expect(p.scalebox_1_ImperialBottomRight.y).to.equal(212.7)
    expect(p.scalebox_1_Metric.attributes.get('data-text')).to.equal(
      'theWhiteInsideOfThisBoxShouldMeasure 5cm x 2.5cm'
    )
    expect(p.scalebox_1_Imperial.attributes.get('data-text')).to.equal(
      'theBlackOutsideOfThisBoxShouldMeasure 2″ x 1″'
    )
  })

  it('Should apply scale to the miniscale macro', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, macro, part }) => {
        points.anchor = new Point(100, 200)
        macro('miniscale', {
          at: points.anchor,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Pattern = new Design({
      parts: [part],
      plugins: [annotationsPlugin],
      data: { name: 'test', version: '1.2.3' },
    })
    const pattern = new Pattern({ scale: 0.5 })
    pattern.draft()
    let p = pattern.parts[0].test.points
    expect(p.miniscale_1_MetricTopLeft.x).to.equal(92)
    expect(p.miniscale_1_MetricTopLeft.y).to.equal(192)
    expect(p.miniscale_1_MetricTopRight.x).to.equal(108)
    expect(p.miniscale_1_MetricTopRight.y).to.equal(192)
    expect(p.miniscale_1_MetricBottomLeft.x).to.equal(92)
    expect(p.miniscale_1_MetricBottomLeft.y).to.equal(208)
    expect(p.miniscale_1_MetricBottomRight.x).to.equal(108)
    expect(p.miniscale_1_MetricBottomRight.y).to.equal(208)
    expect(p.miniscale_1_ImperialTopLeft.x).to.equal(92.0625)
    expect(p.miniscale_1_ImperialTopLeft.y).to.equal(192.0625)
    expect(p.miniscale_1_ImperialTopRight.x).to.equal(107.9375)
    expect(p.miniscale_1_ImperialTopRight.y).to.equal(192.0625)
    expect(p.miniscale_1_ImperialBottomLeft.x).to.equal(92.0625)
    expect(p.miniscale_1_ImperialBottomLeft.y).to.equal(207.9375)
    expect(p.miniscale_1_ImperialBottomRight.x).to.equal(107.9375)
    expect(p.miniscale_1_ImperialBottomRight.y).to.equal(207.9375)
    expect(p.miniscale_1_Metric.attributes.get('data-text')).to.equal('1.6cm x 1.6cm')
    expect(p.miniscale_1_Imperial.attributes.get('data-text')).to.equal('⅝″ x ⅝″')
  })
})
