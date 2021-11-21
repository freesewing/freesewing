import freesewing from '@freesewing/core'
import { version } from '../../plugin-title/package.json'
let expect = require('chai').expect
let plugin = require('../dist/index.js')

describe('plugin-title', function () {
  it('Should set the plugin name:version attribute', () => {
    let pattern = new freesewing.Pattern()
    pattern.use(plugin)
    pattern.render()
    expect(pattern.svg.attributes.get('freesewing:plugin-title')).to.equal(version)
  })

  it('Should run the title macro', () => {
    let pattern = new freesewing.Pattern({ name: 'testPattern', version: 99 })
    pattern.draft = function () {}
    pattern.use(plugin)
    pattern.parts.test = new pattern.Part()
    pattern.parts.test.points.anchor = new pattern.Point(-12, -34)
    let { macro } = pattern.parts.test.shorthand()
    macro('title', {
      at: pattern.parts.test.points.anchor,
      nr: 3,
      title: 'unitTest',
    })
    pattern.render()
    let p = pattern.parts.test.points.__titleNr
    expect(p.x).to.equal(-12)
    expect(p.y).to.equal(-34)
    expect(p.attributes.get('data-text')).to.equal('3')
    expect(p.attributes.get('data-text-class')).to.equal('title-nr note fill-note')
    expect(p.attributes.get('data-text-x')).to.equal('-12')
    expect(p.attributes.get('data-text-y')).to.equal('-34')
    p = pattern.parts.test.points.__titleName
    expect(p.attributes.get('data-text')).to.equal('unitTest')
    expect(p.attributes.get('data-text-class')).to.equal('title-name')
    expect(p.attributes.get('data-text-x')).to.equal('-12')
    expect(p.attributes.get('data-text-y')).to.equal('-21')
    p = pattern.parts.test.points.__titlePattern
    expect(p.attributes.get('data-text')).to.equal('testPattern v99')
    expect(p.attributes.get('data-text-class')).to.equal('title-pattern fill-note')
    expect(p.attributes.get('data-text-x')).to.equal('-12')
    expect(p.attributes.get('data-text-y')).to.equal('-14')
  })

  it('Should run the title macro with append flag', () => {
    let pattern = new freesewing.Pattern({ name: 'testPattern', version: 99 })
    pattern.use(plugin)
    pattern.draft = function () {}
    pattern.parts.test = new pattern.Part()
    pattern.parts.test.points.anchor = new pattern.Point(-12, -34).attr('data-text', '#')
    let { macro } = pattern.parts.test.shorthand()
    macro('title', {
      at: pattern.parts.test.points.anchor,
      nr: 3,
      title: 'unitTest',
      append: true,
    })
    pattern.render()
    let p = pattern.parts.test.points.__titleNr
    expect(p.x).to.equal(-12)
    expect(p.y).to.equal(-34)
    expect(p.attributes.get('data-text')).to.equal('# 3')
    expect(p.attributes.get('data-text-class')).to.equal('title-nr note fill-note')
    expect(p.attributes.get('data-text-x')).to.equal('-12')
    expect(p.attributes.get('data-text-y')).to.equal('-34')
  })

  it('Should run the title macro with point prefix', () => {
    let pattern = new freesewing.Pattern({ name: 'testPattern', version: 99 })
    pattern.draft = function () {}
    pattern.use(plugin)
    pattern.parts.test = new pattern.Part()
    pattern.parts.test.points.anchor = new pattern.Point(-12, -34).attr('data-text', '#')
    let { macro } = pattern.parts.test.shorthand()
    macro('title', {
      at: pattern.parts.test.points.anchor,
      nr: 3,
      title: 'unitTest',
      prefix: 'foo',
    })
    pattern.render()
    let p = pattern.parts.test.points._foo_titleNr
    expect(p.x).to.equal(-12)
    expect(p.y).to.equal(-34)
    expect(p.attributes.get('data-text')).to.equal('3')
    expect(p.attributes.get('data-text-class')).to.equal('title-nr note fill-note')
    expect(p.attributes.get('data-text-x')).to.equal('-12')
    expect(p.attributes.get('data-text-y')).to.equal('-34')
    p = pattern.parts.test.points._foo_titleName
    expect(p.attributes.get('data-text')).to.equal('unitTest')
    expect(p.attributes.get('data-text-class')).to.equal('title-name')
    expect(p.attributes.get('data-text-x')).to.equal('-12')
    expect(p.attributes.get('data-text-y')).to.equal('-21')
    p = pattern.parts.test.points._foo_titlePattern
    expect(p.attributes.get('data-text')).to.equal('testPattern v99')
    expect(p.attributes.get('data-text-class')).to.equal('title-pattern fill-note')
    expect(p.attributes.get('data-text-x')).to.equal('-12')
    expect(p.attributes.get('data-text-y')).to.equal('-14')
  })
})
