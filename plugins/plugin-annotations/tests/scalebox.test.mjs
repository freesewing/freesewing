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
    // Note that we're not loading core plugins but the local plugin
    const Pattern = new Design({ parts: [part], noCorePlugins: true })
    const pattern = new Pattern()
    pattern.draft()
    let p = pattern.parts[0].test.points
    expect(p.__macro_scalebox_scalebox_textLead.x).to.equal(55)
    expect(p.__macro_scalebox_scalebox_textLead.y).to.equal(185)
    expect(p.__macro_scalebox_scalebox_textTitle.x).to.equal(55)
    expect(p.__macro_scalebox_scalebox_textTitle.y).to.equal(195)
    expect(p.__macro_scalebox_scalebox_textText.x).to.equal(55)
    expect(p.__macro_scalebox_scalebox_textText.y).to.equal(207)
    expect(p.__macro_scalebox_scalebox_textLink.x).to.equal(55)
    expect(p.__macro_scalebox_scalebox_textLink.y).to.equal(212)
    expect(p.__macro_scalebox_scalebox_textMetric.x).to.equal(100)
    expect(p.__macro_scalebox_scalebox_textMetric.y).to.equal(220)
    expect(p.__macro_scalebox_scalebox_textImperial.x).to.equal(100)
    expect(p.__macro_scalebox_scalebox_textImperial.y).to.equal(224)
    p = pattern.parts[0].test.paths.__macro_scalebox_scalebox_metric
    expect(p.ops[0].type).to.equal('move')
    expect(p.ops[1].type).to.equal('line')
    expect(p.ops[2].type).to.equal('line')
    expect(p.ops[3].type).to.equal('line')
    expect(p.ops[4].type).to.equal('line')
    expect(p.ops[5].type).to.equal('close')
    expect(p.ops[0].to.x).to.equal(50)
    expect(p.ops[0].to.y).to.equal(175)
    expect(p.ops[1].to.x).to.equal(50)
    expect(p.ops[1].to.y).to.equal(225)
    expect(p.ops[2].to.x).to.equal(150)
    expect(p.ops[2].to.y).to.equal(225)
    expect(p.ops[3].to.x).to.equal(150)
    expect(p.ops[3].to.y).to.equal(175)
    p = pattern.parts[0].test.paths.__macro_scalebox_scalebox_imperial
    expect(p.ops[0].type).to.equal('move')
    expect(p.ops[1].type).to.equal('line')
    expect(p.ops[2].type).to.equal('line')
    expect(p.ops[3].type).to.equal('line')
    expect(p.ops[4].type).to.equal('line')
    expect(p.ops[5].type).to.equal('close')
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
    // Note that we're not loading core plugins but the local plugin
    const Pattern = new Design({ parts: [part], noCorePlugins: true })
    const pattern = new Pattern()
    pattern.draft()
    const p = pattern.parts[0].test.points
    expect(round(p.__macro_scalebox_scalebox_textLead.x)).to.equal(85)
    expect(round(p.__macro_scalebox_scalebox_textLead.y)).to.equal(245)
    expect(round(p.__macro_scalebox_scalebox_textTitle.x)).to.equal(95)
    expect(round(p.__macro_scalebox_scalebox_textTitle.y)).to.equal(245)
    expect(round(p.__macro_scalebox_scalebox_textText.x)).to.equal(107)
    expect(round(p.__macro_scalebox_scalebox_textText.y)).to.equal(245)
    expect(round(p.__macro_scalebox_scalebox_textLink.x)).to.equal(112)
    expect(round(p.__macro_scalebox_scalebox_textLink.y)).to.equal(245)
    expect(round(p.__macro_scalebox_scalebox_textMetric.x)).to.equal(120)
    expect(round(p.__macro_scalebox_scalebox_textMetric.y)).to.equal(200)
    expect(round(p.__macro_scalebox_scalebox_textImperial.x)).to.equal(124)
    expect(round(p.__macro_scalebox_scalebox_textImperial.y)).to.equal(200)
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
    // Note that we're not loading core plugins but the local plugin
    const Pattern = new Design({
      parts: [part],
      data: { name: 'test', version: '1.2.3' },
      noCorePlugins: true,
    })
    const pattern = new Pattern()
    pattern.draft()
    let p = pattern.parts[0].test.points.__macro_scalebox_scalebox_textLead.attributes
    expect(p.get('data-text')).to.equal('FreeSewing')
    expect(p.get('data-text-class')).to.equal('text-xs bold')
    p = pattern.parts[0].test.points.__macro_scalebox_scalebox_textTitle.attributes
    expect(p.get('data-text')).to.equal('test v1.2.3')
    expect(p.get('data-text-class')).to.equal('text bold')
    p = pattern.parts[0].test.points.__macro_scalebox_scalebox_textText.attributes
    expect(p.get('data-text-class')).to.equal('text-xs')
    expect(p.list['data-text'][0]).to.equal('plugin-annotations:supportFreeSewingBecomeAPatron')
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
    // Note that we're not loading core plugins but the local plugin
    const Pattern = new Design({
      parts: [part],
      data: { name: 'test', version: '1.2.3' },
      noCorePlugins: true,
    })
    const pattern = new Pattern()
    pattern.draft()
    let p = pattern.parts[0].test.points.__macro_scalebox_scalebox_textLead.attributes
    expect(p.get('data-text')).to.equal('theLead')
    expect(p.get('data-text-class')).to.equal('text-xs bold')
    p = pattern.parts[0].test.points.__macro_scalebox_scalebox_textTitle.attributes
    expect(p.get('data-text')).to.equal('theTitle v1.2.3')
    expect(p.get('data-text-class')).to.equal('text bold')
    p = pattern.parts[0].test.points.__macro_scalebox_scalebox_textText.attributes
    expect(p.get('data-text')).to.equal('theText')
    expect(p.get('data-text-class')).to.equal('text-xs')
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
    // Note that we're not loading core plugins but the local plugin
    const Pattern = new Design({
      parts: [part],
      plugins: [annotationsPlugin],
      data: { name: 'test', version: '1.2.3' },
      noCorePlugins: true,
    })
    const pattern = new Pattern({ scale: 0.5 })
    pattern.draft()
    let p = pattern.parts[0].test.paths.__macro_scalebox_scalebox_metric
    expect(p.ops[0].to.x).to.equal(75)
    expect(p.ops[0].to.y).to.equal(187.5)
    expect(p.ops[1].to.x).to.equal(75)
    expect(p.ops[1].to.y).to.equal(212.5)
    expect(p.ops[2].to.x).to.equal(125)
    expect(p.ops[2].to.y).to.equal(212.5)
    expect(p.ops[3].to.x).to.equal(125)
    expect(p.ops[3].to.y).to.equal(187.5)
    expect(p.ops[4].to.x).to.equal(75)
    expect(p.ops[4].to.y).to.equal(187.5)
    expect(
      pattern.parts[0].test.points.__macro_scalebox_scalebox_textMetric.attributes.get('data-text')
    ).to.equal('plugin-annotations:theWhiteInsideOfThisBoxShouldMeasure 5cm x 2.5cm')
    expect(
      pattern.parts[0].test.points.__macro_scalebox_scalebox_textImperial.attributes.get(
        'data-text'
      )
    ).to.equal('plugin-annotations:theBlackOutsideOfThisBoxShouldMeasure 2″ x 1″')
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
    // Note that we're not loading core plugins but the local plugin
    const Pattern = new Design({
      parts: [part],
      plugins: [annotationsPlugin],
      data: { name: 'test', version: '1.2.3' },
      noCorePlugins: true,
    })
    const pattern = new Pattern({ scale: 0.5 })
    pattern.draft()
    let p = pattern.parts[0].test.paths.__macro_miniscale_miniscale_metric
    expect(p.ops[0].to.x).to.equal(92)
    expect(p.ops[0].to.y).to.equal(192)
    expect(p.ops[1].to.x).to.equal(92)
    expect(p.ops[1].to.y).to.equal(208)
    expect(p.ops[2].to.x).to.equal(108)
    expect(p.ops[2].to.y).to.equal(208)
    expect(p.ops[3].to.x).to.equal(108)
    expect(p.ops[3].to.y).to.equal(192)
    expect(p.ops[4].to.x).to.equal(92)
    expect(p.ops[4].to.y).to.equal(192)
    p = pattern.parts[0].test.points
    expect(p.__macro_miniscale_miniscale_textMetric.attributes.get('data-text')).to.equal(
      '1.6cm x 1.6cm'
    )
    expect(p.__macro_miniscale_miniscale_textImperial.attributes.get('data-text')).to.equal(
      '⅝″ x ⅝″'
    )
  })
})
