import freesewing from '@freesewing/core'
import { version } from '../../plugin-scalebox/package.json'

const round = freesewing.utils.round
const expect = require('chai').expect
const plugin = require('../dist/index.js')

describe('plugin-scalebox', function () {
  it('Should set the plugin name:version attribute', () => {
    const pattern = new freesewing.Pattern().use(plugin)
    pattern.render()
    expect(pattern.svg.attributes.get('freesewing:plugin-scalebox')).to.equal(version)
  })

  it('Should run the default scalebox macro', () => {
    const pattern = new freesewing.Pattern().use(plugin)
    pattern.parts.test = new pattern.Part()
    pattern.parts.test.points.anchor = new pattern.Point(100, 200)
    const { macro } = pattern.parts.test.shorthand()
    macro('scalebox', {
      at: pattern.parts.test.points.anchor,
    })
    let p = pattern.parts.test.points
    /*
     * {
  anchor: Point { x: 100, y: 200, attributes: Attributes { list: {} } },
  __scaleboxMetricTopLeft: Point { x: 50, y: 175, attributes: Attributes { list: {} } },
  __scaleboxMetricTopRight: Point { x: 150, y: 175, attributes: Attributes { list: {} } },
  __scaleboxMetricBottomLeft: Point { x: 50, y: 225, attributes: Attributes { list: {} } },
  __scaleboxMetricBottomRight: Point { x: 150, y: 225, attributes: Attributes { list: {} } },
  __scaleboxImperialTopLeft: Point { x: 49.2, y: 174.6, attributes: Attributes { list: {} } },
  __scaleboxImperialTopRight: Point { x: 150.8, y: 174.6, attributes: Attributes { list: {} } },
  __scaleboxImperialBottomLeft: Point { x: 49.2, y: 225.4, attributes: Attributes { list: {} } },
  __scaleboxImperialBottomRight: Point { x: 150.8, y: 225.4, attributes: Attributes { list: {} } },
  __scaleboxLead: Point { x: 55, y: 185, attributes: Attributes { list: [Object] } },
  __scaleboxTitle: Point { x: 55, y: 195, attributes: Attributes { list: [Object] } },
  __scaleboxText: Point { x: 55, y: 207, attributes: Attributes { list: [Object] } },
  __scaleboxLink: Point { x: 55, y: 212, attributes: Attributes { list: [Object] } },
  __scaleboxMetric: Point { x: 100, y: 220, attributes: Attributes { list: [Object] } },
  __scaleboxImperial: Point { x: 100, y: 224, attributes: Attributes { list: [Object] } }
}

     */
    expect(round(p.__scaleboxMetricTopLeft.x)).to.equal(50)
    expect(round(p.__scaleboxMetricTopLeft.y)).to.equal(175)
    expect(round(p.__scaleboxMetricTopRight.x)).to.equal(150)
    expect(round(p.__scaleboxMetricTopRight.y)).to.equal(175)
    expect(round(p.__scaleboxMetricBottomLeft.x)).to.equal(50)
    expect(round(p.__scaleboxMetricBottomLeft.y)).to.equal(225)
    expect(round(p.__scaleboxMetricBottomRight.x)).to.equal(150)
    expect(round(p.__scaleboxMetricBottomRight.y)).to.equal(225)
    expect(round(p.__scaleboxImperialTopLeft.x)).to.equal(49.2)
    expect(round(p.__scaleboxImperialTopLeft.y)).to.equal(174.6)
    expect(round(p.__scaleboxImperialTopRight.x)).to.equal(150.8)
    expect(round(p.__scaleboxImperialTopRight.y)).to.equal(174.6)
    expect(round(p.__scaleboxImperialBottomLeft.x)).to.equal(49.2)
    expect(round(p.__scaleboxImperialBottomLeft.y)).to.equal(225.4)
    expect(round(p.__scaleboxImperialBottomRight.x)).to.equal(150.8)
    expect(round(p.__scaleboxImperialBottomRight.y)).to.equal(225.4)
    expect(round(p.__scaleboxLead.x)).to.equal(55)
    expect(round(p.__scaleboxLead.y)).to.equal(185)
    expect(round(p.__scaleboxTitle.x)).to.equal(55)
    expect(round(p.__scaleboxTitle.y)).to.equal(195)
    expect(round(p.__scaleboxText.x)).to.equal(55)
    expect(round(p.__scaleboxText.y)).to.equal(207)
    expect(round(p.__scaleboxLink.x)).to.equal(55)
    expect(round(p.__scaleboxLink.y)).to.equal(212)
    expect(round(p.__scaleboxMetric.x)).to.equal(100)
    expect(round(p.__scaleboxMetric.y)).to.equal(220)
    expect(round(p.__scaleboxImperial.x)).to.equal(100)
    expect(round(p.__scaleboxImperial.y)).to.equal(224)
    p = pattern.parts.test.paths.__scaleboxMetric
    expect(p.attributes.get('class')).to.equal('scalebox metric')
    expect(p.ops[0].type).to.equal('move')
    expect(p.ops[1].type).to.equal('line')
    expect(p.ops[2].type).to.equal('line')
    expect(p.ops[3].type).to.equal('line')
    expect(p.ops[4].type).to.equal('close')
    expect(round(p.ops[0].to.x)).to.equal(50)
    expect(round(p.ops[0].to.y)).to.equal(175)
    expect(round(p.ops[1].to.x)).to.equal(50)
    expect(round(p.ops[1].to.y)).to.equal(225)
    expect(round(p.ops[2].to.x)).to.equal(150)
    expect(round(p.ops[2].to.y)).to.equal(225)
    expect(round(p.ops[3].to.x)).to.equal(150)
    expect(round(p.ops[3].to.y)).to.equal(175)
    p = pattern.parts.test.paths.__scaleboxImperial
    expect(p.attributes.get('class')).to.equal('scalebox imperial')
    expect(p.ops[0].type).to.equal('move')
    expect(p.ops[1].type).to.equal('line')
    expect(p.ops[2].type).to.equal('line')
    expect(p.ops[3].type).to.equal('line')
    expect(p.ops[4].type).to.equal('close')
    expect(round(p.ops[0].to.x)).to.equal(49.2)
    expect(round(p.ops[0].to.y)).to.equal(174.6)
    expect(round(p.ops[1].to.x)).to.equal(49.2)
    expect(round(p.ops[1].to.y)).to.equal(225.4)
    expect(round(p.ops[2].to.x)).to.equal(150.8)
    expect(round(p.ops[2].to.y)).to.equal(225.4)
    expect(round(p.ops[3].to.x)).to.equal(150.8)
    expect(round(p.ops[3].to.y)).to.equal(174.6)
  })

  it('Should run the scalebox macro with rotation', () => {
    let pattern = new freesewing.Pattern()
    pattern.draft = function () {}
    pattern.use(plugin)
    pattern.parts.test = new pattern.Part()
    pattern.parts.test.points.anchor = new pattern.Point(100, 200)
    let { macro } = pattern.parts.test.shorthand()
    macro('scalebox', {
      at: pattern.parts.test.points.anchor,
      rotate: 90,
    })
    let p = pattern.parts.test.points
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
    expect(round(p.__scaleboxLead.x)).to.equal(85)
    expect(round(p.__scaleboxLead.y)).to.equal(245)
    expect(round(p.__scaleboxTitle.x)).to.equal(95)
    expect(round(p.__scaleboxTitle.y)).to.equal(245)
    expect(round(p.__scaleboxText.x)).to.equal(107)
    expect(round(p.__scaleboxText.y)).to.equal(245)
    expect(round(p.__scaleboxLink.x)).to.equal(112)
    expect(round(p.__scaleboxLink.y)).to.equal(245)
    expect(round(p.__scaleboxMetric.x)).to.equal(120)
    expect(round(p.__scaleboxMetric.y)).to.equal(200)
    expect(round(p.__scaleboxImperial.x)).to.equal(124)
    expect(round(p.__scaleboxImperial.y)).to.equal(200)
  })

  it('Should run the scalebox macro with default text', () => {
    let pattern = new freesewing.Pattern({
      name: 'unitTest',
      version: 99,
    })
    pattern.draft = function () {}
    pattern.use(plugin)
    pattern.parts.test = new pattern.Part()
    pattern.parts.test.points.anchor = new pattern.Point(100, 200)
    let { macro } = pattern.parts.test.shorthand()
    macro('scalebox', {
      at: pattern.parts.test.points.anchor,
    })
    let p = pattern.parts.test.points.__scaleboxLead.attributes
    expect(p.get('data-text')).to.equal('FreeSewing')
    expect(p.get('data-text-class')).to.equal('text-sm')
    p = pattern.parts.test.points.__scaleboxTitle.attributes
    expect(p.get('data-text')).to.equal('unitTest v99')
    expect(p.get('data-text-class')).to.equal('text-lg')
    p = pattern.parts.test.points.__scaleboxText.attributes
    expect(p.get('data-text-class')).to.equal('text-xs')
    expect(p.get('data-text-lineheight')).to.equal('4')
    expect(p.list['data-text'][0]).to.equal('supportFreesewingBecomeAPatron')
  })

  it('Should run the scalebox macro with custom text', () => {
    let pattern = new freesewing.Pattern({
      name: 'unitTest',
      version: 99,
    })
    pattern.draft = function () {}
    pattern.use(plugin)
    pattern.parts.test = new pattern.Part()
    pattern.parts.test.points.anchor = new pattern.Point(100, 200)
    let { macro } = pattern.parts.test.shorthand()
    macro('scalebox', {
      at: pattern.parts.test.points.anchor,
      lead: 'theLead',
      title: 'theTitle',
      text: 'theText',
    })
    let p = pattern.parts.test.points.__scaleboxLead.attributes
    expect(p.get('data-text')).to.equal('theLead')
    expect(p.get('data-text-class')).to.equal('text-sm')
    p = pattern.parts.test.points.__scaleboxTitle.attributes
    expect(p.get('data-text')).to.equal('theTitle')
    expect(p.get('data-text-class')).to.equal('text-lg')
    p = pattern.parts.test.points.__scaleboxText.attributes
    expect(p.get('data-text')).to.equal('theText')
    expect(p.get('data-text-class')).to.equal('text-xs')
    expect(p.get('data-text-lineheight')).to.equal('4')
  })
})
