import chai from 'chai'
import { Design } from '@freesewing/core'
import { annotationsPlugin } from '../src/index.mjs'

const expect = chai.expect

describe('Title Plugin Tests', () => {
  it('Should run the title macro', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, macro, part }) => {
        points.anchor = new Point(-12, -34)
        macro('title', {
          at: points.anchor,
          nr: 3,
          title: 'unitTest',
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Pattern = new Design({
      data: { name: 'testPattern', version: 99 },
      parts: [part],
    })
    const pattern = new Pattern()
    pattern.draft().render()
    let p = pattern.parts[0].test.points.__titleNr
    expect(p.x).to.equal(-12)
    expect(p.y).to.equal(-34)
    expect(p.attributes.get('data-text')).to.equal('3')
    expect(p.attributes.get('data-text-class')).to.equal('text-4xl fill-note font-bold left')
    expect(p.attributes.get('data-text-x')).to.equal('-12')
    expect(p.attributes.get('data-text-y')).to.equal('-34')
    p = pattern.parts[0].test.points.__titleName
    expect(p.attributes.get('data-text')).to.equal('unitTest')
    expect(p.attributes.get('data-text-class')).to.equal('text-lg fill-current font-bold left')
    expect(p.attributes.get('data-text-x')).to.equal('-12')
    expect(p.attributes.get('data-text-y')).to.equal('-26')
    p = pattern.parts[0].test.points.__titlePattern
    expect(p.attributes.get('data-text')).to.equal('testPattern v99')
    expect(p.attributes.get('data-text-class')).to.equal('fill-note left')
    expect(p.attributes.get('data-text-x')).to.equal('-12')
    expect(p.attributes.get('data-text-y')).to.equal('-18')
    p = pattern.parts[0].test.points.__exportDate
    expect(p.attributes.get('data-text')).to.match(/^.+, .+ \d{1,2}, \d{4}@ \d\d:\d\d$/)
  })

  it('Should run the title macro with append flag', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, macro, part }) => {
        points.anchor = new Point(-12, -34).attr('data-text', '#')
        macro('title', {
          at: points.anchor,
          nr: 3,
          title: 'unitTest',
          append: true,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Pattern = new Design({
      data: { name: 'testPattern', version: 99 },
      parts: [part],
    })
    const pattern = new Pattern()
    pattern.draft().render()
    let p = pattern.parts[0].test.points.__titleNr
    expect(p.x).to.equal(-12)
    expect(p.y).to.equal(-34)
    expect(p.attributes.get('data-text')).to.equal('# 3')
    expect(p.attributes.get('data-text-class')).to.equal('text-4xl fill-note font-bold left')
    expect(p.attributes.get('data-text-x')).to.equal('-12')
    expect(p.attributes.get('data-text-y')).to.equal('-34')
  })

  it('Should run the title macro with point prefix', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, macro, part }) => {
        points.anchor = new Point(-12, -34).attr('data-text', '#')
        macro('title', {
          at: points.anchor,
          nr: 3,
          title: 'unitTest',
          prefix: 'foo',
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Pattern = new Design({
      data: { name: 'testPattern', version: 99 },
      parts: [part],
    })
    const pattern = new Pattern()
    pattern.draft().render()
    let p = pattern.parts[0].test.points._foo_titleNr
    expect(p.x).to.equal(-12)
    expect(p.y).to.equal(-34)
    expect(p.attributes.get('data-text')).to.equal('3')
    expect(p.attributes.get('data-text-class')).to.equal('text-4xl fill-note font-bold left')
    expect(p.attributes.get('data-text-x')).to.equal('-12')
    expect(p.attributes.get('data-text-y')).to.equal('-34')
    p = pattern.parts[0].test.points._foo_titleName
    expect(p.attributes.get('data-text')).to.equal('unitTest')
    expect(p.attributes.get('data-text-class')).to.equal('text-lg fill-current font-bold left')
    expect(p.attributes.get('data-text-x')).to.equal('-12')
    expect(p.attributes.get('data-text-y')).to.equal('-26')
    p = pattern.parts[0].test.points._foo_titlePattern
    expect(p.attributes.get('data-text')).to.equal('testPattern v99')
    expect(p.attributes.get('data-text-class')).to.equal('fill-note left')
    expect(p.attributes.get('data-text-x')).to.equal('-12')
    expect(p.attributes.get('data-text-y')).to.equal('-18')
  })

  it('Should run the title macro with valid align prefixes', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, macro, part }) => {
        points.anchor = new Point(-12, -34).attr('data-text', '#')
        macro('title', {
          at: points.anchor,
          nr: 3,
          title: 'unitTest',
          align: 'left',
          prefix: 'left',
        })
        macro('title', {
          at: points.anchor,
          nr: 3,
          title: 'unitTest',
          align: 'right',
          prefix: 'right',
        })
        macro('title', {
          at: points.anchor,
          nr: 3,
          title: 'unitTest',
          align: 'center',
          prefix: 'center',
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Pattern = new Design({
      data: { name: 'testPattern', version: 99 },
      parts: [part],
    })
    const pattern = new Pattern()
    pattern.draft().render()
    let p = pattern.parts[0].test.points._left_titleNr
    expect(p.attributes.get('data-text-class')).to.equal('text-4xl fill-note font-bold left')
    p = pattern.parts[0].test.points._left_titleName
    expect(p.attributes.get('data-text-class')).to.equal('text-lg fill-current font-bold left')
    p = pattern.parts[0].test.points._left_titlePattern
    expect(p.attributes.get('data-text-class')).to.equal('fill-note left')
    p = pattern.parts[0].test.points._center_titleNr
    expect(p.attributes.get('data-text-class')).to.equal('text-4xl fill-note font-bold center')
    p = pattern.parts[0].test.points._center_titleName
    expect(p.attributes.get('data-text-class')).to.equal('text-lg fill-current font-bold center')
    p = pattern.parts[0].test.points._center_titlePattern
    expect(p.attributes.get('data-text-class')).to.equal('fill-note center')
    p = pattern.parts[0].test.points._right_titleNr
    expect(p.attributes.get('data-text-class')).to.equal('text-4xl fill-note font-bold right')
    p = pattern.parts[0].test.points._right_titleName
    expect(p.attributes.get('data-text-class')).to.equal('text-lg fill-current font-bold right')
    p = pattern.parts[0].test.points._right_titlePattern
    expect(p.attributes.get('data-text-class')).to.equal('fill-note right')
  })

  it('Should run the title macro with an invalid align prefix', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, macro, part }) => {
        points.anchor = new Point(-12, -34).attr('data-text', '#')
        macro('title', {
          at: points.anchor,
          nr: 3,
          title: 'unitTest',
          align: 'invalidprefix',
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Pattern = new Design({
      data: { name: 'testPattern', version: 99 },
      parts: [part],
    })
    const pattern = new Pattern()
    pattern.draft().render()
    let p = pattern.parts[0].test.points.__titleNr
    expect(p.attributes.get('data-text-class')).to.equal('text-4xl fill-note font-bold left')
    p = pattern.parts[0].test.points.__titleName
    expect(p.attributes.get('data-text-class')).to.equal('text-lg fill-current font-bold left')
    p = pattern.parts[0].test.points.__titlePattern
    expect(p.attributes.get('data-text-class')).to.equal('fill-note left')
  })
})
