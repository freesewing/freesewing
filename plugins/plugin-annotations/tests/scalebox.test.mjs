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
    expect(p.__scaleboxMetricTopLeft.x).to.equal(50)
    expect(p.__scaleboxMetricTopLeft.y).to.equal(175)
    expect(p.__scaleboxMetricTopRight.x).to.equal(150)
    expect(p.__scaleboxMetricTopRight.y).to.equal(175)
    expect(p.__scaleboxMetricBottomLeft.x).to.equal(50)
    expect(p.__scaleboxMetricBottomLeft.y).to.equal(225)
    expect(p.__scaleboxMetricBottomRight.x).to.equal(150)
    expect(p.__scaleboxMetricBottomRight.y).to.equal(225)
    expect(p.__scaleboxImperialTopLeft.x).to.equal(49.2)
    expect(p.__scaleboxImperialTopLeft.y).to.equal(174.6)
    expect(p.__scaleboxImperialTopRight.x).to.equal(150.8)
    expect(p.__scaleboxImperialTopRight.y).to.equal(174.6)
    expect(p.__scaleboxImperialBottomLeft.x).to.equal(49.2)
    expect(p.__scaleboxImperialBottomLeft.y).to.equal(225.4)
    expect(p.__scaleboxImperialBottomRight.x).to.equal(150.8)
    expect(p.__scaleboxImperialBottomRight.y).to.equal(225.4)
    expect(p.__scaleboxLead.x).to.equal(51.2)
    expect(p.__scaleboxLead.y).to.equal(181.6)
    expect(p.__scaleboxTitle.x).to.equal(51.2)
    expect(p.__scaleboxTitle.y).to.equal(191.6)
    expect(p.__scaleboxText.x).to.equal(51.2)
    expect(p.__scaleboxText.y).to.equal(203.6)
    expect(p.__scaleboxLink.x).to.equal(51.2)
    expect(p.__scaleboxLink.y).to.equal(208.6)
    expect(p.__scaleboxMetric.x).to.equal(100)
    expect(p.__scaleboxMetric.y).to.equal(220)
    expect(p.__scaleboxImperial.x).to.equal(100)
    expect(p.__scaleboxImperial.y).to.equal(224)
    p = pattern.parts[0].test.paths.__scaleboxMetric
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
    p = pattern.parts[0].test.paths.__scaleboxImperial
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
    expect(round(p.__scaleboxMetricTopLeft.x)).to.equal(75)
    expect(round(p.__scaleboxMetricTopLeft.y)).to.equal(250)
    expect(round(p.__scaleboxMetricTopRight.x)).to.equal(75)
    expect(round(p.__scaleboxMetricTopRight.y)).to.equal(150)
    expect(round(p.__scaleboxMetricBottomLeft.x)).to.equal(125)
    expect(round(p.__scaleboxMetricBottomLeft.y)).to.equal(250)
    expect(round(p.__scaleboxMetricBottomRight.x)).to.equal(125)
    expect(round(p.__scaleboxMetricBottomRight.y)).to.equal(150)
    expect(round(p.__scaleboxImperialTopLeft.x)).to.equal(74.6)
    expect(round(p.__scaleboxImperialTopLeft.y)).to.equal(250.8)
    expect(round(p.__scaleboxImperialTopRight.x)).to.equal(74.6)
    expect(round(p.__scaleboxImperialTopRight.y)).to.equal(149.2)
    expect(round(p.__scaleboxImperialBottomLeft.x)).to.equal(125.4)
    expect(round(p.__scaleboxImperialBottomLeft.y)).to.equal(250.8)
    expect(round(p.__scaleboxImperialBottomRight.x)).to.equal(125.4)
    expect(round(p.__scaleboxImperialBottomRight.y)).to.equal(149.2)
    expect(round(p.__scaleboxLead.x)).to.equal(81.6)
    expect(round(p.__scaleboxLead.y)).to.equal(248.8)
    expect(round(p.__scaleboxTitle.x)).to.equal(91.6)
    expect(round(p.__scaleboxTitle.y)).to.equal(248.8)
    expect(round(p.__scaleboxText.x)).to.equal(103.6)
    expect(round(p.__scaleboxText.y)).to.equal(248.8)
    expect(round(p.__scaleboxLink.x)).to.equal(108.6)
    expect(round(p.__scaleboxLink.y)).to.equal(248.8)
    expect(round(p.__scaleboxMetric.x)).to.equal(120)
    expect(round(p.__scaleboxMetric.y)).to.equal(200)
    expect(round(p.__scaleboxImperial.x)).to.equal(124)
    expect(round(p.__scaleboxImperial.y)).to.equal(200)
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
    let p = pattern.parts[0].test.points.__scaleboxLead.attributes
    expect(p.get('data-text')).to.equal('FreeSewing')
    expect(p.get('data-text-class')).to.equal('text-sm')
    p = pattern.parts[0].test.points.__scaleboxTitle.attributes
    expect(p.get('data-text')).to.equal('test v1.2.3')
    expect(p.get('data-text-class')).to.equal('text-lg')
    p = pattern.parts[0].test.points.__scaleboxText.attributes
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
    let p = pattern.parts[0].test.points.__scaleboxLead.attributes
    expect(p.get('data-text')).to.equal('theLead')
    expect(p.get('data-text-class')).to.equal('text-sm')
    p = pattern.parts[0].test.points.__scaleboxTitle.attributes
    expect(p.get('data-text')).to.equal('theTitle')
    expect(p.get('data-text-class')).to.equal('text-lg')
    p = pattern.parts[0].test.points.__scaleboxText.attributes
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
    expect(p.__scaleboxMetricTopLeft.x).to.equal(75)
    expect(p.__scaleboxMetricTopLeft.y).to.equal(187.5)
    expect(p.__scaleboxMetricTopRight.x).to.equal(125)
    expect(p.__scaleboxMetricTopRight.y).to.equal(187.5)
    expect(p.__scaleboxMetricBottomLeft.x).to.equal(75)
    expect(p.__scaleboxMetricBottomLeft.y).to.equal(212.5)
    expect(p.__scaleboxMetricBottomRight.x).to.equal(125)
    expect(p.__scaleboxMetricBottomRight.y).to.equal(212.5)
    expect(p.__scaleboxImperialTopLeft.x).to.equal(74.6)
    expect(p.__scaleboxImperialTopLeft.y).to.equal(187.3)
    expect(p.__scaleboxImperialTopRight.x).to.equal(125.4)
    expect(p.__scaleboxImperialTopRight.y).to.equal(187.3)
    expect(p.__scaleboxImperialBottomLeft.x).to.equal(74.6)
    expect(p.__scaleboxImperialBottomLeft.y).to.equal(212.7)
    expect(p.__scaleboxImperialBottomRight.x).to.equal(125.4)
    expect(p.__scaleboxImperialBottomRight.y).to.equal(212.7)
    expect(p.__scaleboxMetric.attributes.get('data-text')).to.equal(
      'theWhiteInsideOfThisBoxShouldMeasure 5cm x 2.5cm'
    )
    expect(p.__scaleboxImperial.attributes.get('data-text')).to.equal(
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
    expect(p.__miniscaleMetricTopLeft.x).to.equal(92)
    expect(p.__miniscaleMetricTopLeft.y).to.equal(192)
    expect(p.__miniscaleMetricTopRight.x).to.equal(108)
    expect(p.__miniscaleMetricTopRight.y).to.equal(192)
    expect(p.__miniscaleMetricBottomLeft.x).to.equal(92)
    expect(p.__miniscaleMetricBottomLeft.y).to.equal(208)
    expect(p.__miniscaleMetricBottomRight.x).to.equal(108)
    expect(p.__miniscaleMetricBottomRight.y).to.equal(208)
    expect(p.__miniscaleImperialTopLeft.x).to.equal(92.0625)
    expect(p.__miniscaleImperialTopLeft.y).to.equal(192.0625)
    expect(p.__miniscaleImperialTopRight.x).to.equal(107.9375)
    expect(p.__miniscaleImperialTopRight.y).to.equal(192.0625)
    expect(p.__miniscaleImperialBottomLeft.x).to.equal(92.0625)
    expect(p.__miniscaleImperialBottomLeft.y).to.equal(207.9375)
    expect(p.__miniscaleImperialBottomRight.x).to.equal(107.9375)
    expect(p.__miniscaleImperialBottomRight.y).to.equal(207.9375)
    expect(p.__miniscaleMetric.attributes.get('data-text')).to.equal('1.6cm x 1.6cm')
    expect(p.__miniscaleImperial.attributes.get('data-text')).to.equal('⅝″ x ⅝″')
  })
})
