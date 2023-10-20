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
    // Note that we're not loading core plugins but the local plugin
    const Pattern = new Design({
      data: { name: 'testPattern', version: 99 },
      parts: [part],
      noCorePlugins: true,
    })
    const pattern = new Pattern()
    pattern.draft().render()
    let p = pattern.parts[0].test.points.__macro_title_title_nr
    expect(p.x).to.equal(-12)
    expect(p.y).to.equal(-34)
    expect(p.attributes.get('data-text')).to.equal('3')
    expect(p.attributes.get('data-text-class')).to.equal('text-4xl fill-note font-bold left')
    expect(p.attributes.get('data-text-x')).to.equal('-12')
    expect(p.attributes.get('data-text-y')).to.equal('-34')
    p = pattern.parts[0].test.points.__macro_title_title_title
    expect(p.attributes.get('data-text')).to.equal('unitTest')
    expect(p.attributes.get('data-text-class')).to.equal('text-lg fill-current font-bold left')
    expect(p.attributes.get('data-text-x')).to.equal('-12')
    expect(p.attributes.get('data-text-y')).to.equal('-26')
    p = pattern.parts[0].test.points.__macro_title_title_name
    expect(p.attributes.get('data-text')).to.equal('testPattern v99')
    expect(p.attributes.get('data-text-class')).to.equal('fill-note left')
    expect(p.attributes.get('data-text-x')).to.equal('-12')
    expect(p.attributes.get('data-text-y')).to.equal('-18')
    p = pattern.parts[0].test.points.__macro_title_title_date
    expect(p.attributes.get('data-text')).to.include(', 202')
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
    // Note that we're not loading core plugins but the local plugin
    const Pattern = new Design({
      data: { name: 'testPattern', version: 99 },
      parts: [part],
      noCorePlugins: true,
    })
    const pattern = new Pattern()
    pattern.draft().render()
    let p = pattern.parts[0].test.points.__macro_title_title_nr
    expect(p.x).to.equal(-12)
    expect(p.y).to.equal(-34)
    expect(p.attributes.get('data-text')).to.equal('# 3')
    expect(p.attributes.get('data-text-class')).to.equal('text-4xl fill-note font-bold left')
    expect(p.attributes.get('data-text-x')).to.equal('-12')
    expect(p.attributes.get('data-text-y')).to.equal('-34')
  })

  it('Should run the title macro with a custom ID', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, macro, part }) => {
        points.anchor = new Point(-12, -34).attr('data-text', '#')
        macro('title', {
          at: points.anchor,
          nr: 3,
          title: 'unitTest',
          id: 'foo',
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    // Note that we're not loading core plugins but the local plugin
    const Pattern = new Design({
      data: { name: 'testPattern', version: 99 },
      parts: [part],
      noCorePlugins: true,
    })
    const pattern = new Pattern()
    pattern.draft().render()
    let p = pattern.parts[0].test.points.__macro_title_foo_nr
    expect(p.x).to.equal(-12)
    expect(p.y).to.equal(-34)
    expect(p.attributes.get('data-text')).to.equal('3')
    expect(p.attributes.get('data-text-class')).to.equal('text-4xl fill-note font-bold left')
    expect(p.attributes.get('data-text-x')).to.equal('-12')
    expect(p.attributes.get('data-text-y')).to.equal('-34')
    p = pattern.parts[0].test.points.__macro_title_foo_title
    expect(p.attributes.get('data-text')).to.equal('unitTest')
    expect(p.attributes.get('data-text-class')).to.equal('text-lg fill-current font-bold left')
    expect(p.attributes.get('data-text-x')).to.equal('-12')
    expect(p.attributes.get('data-text-y')).to.equal('-26')
    p = pattern.parts[0].test.points.__macro_title_foo_name
    expect(p.attributes.get('data-text')).to.equal('testPattern v99')
    expect(p.attributes.get('data-text-class')).to.equal('fill-note left')
    expect(p.attributes.get('data-text-x')).to.equal('-12')
    expect(p.attributes.get('data-text-y')).to.equal('-18')
  })

  it('Should run the title macro with custom alignment', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, macro, part }) => {
        points.anchor = new Point(-12, -34).attr('data-text', '#')
        macro('title', {
          at: points.anchor,
          nr: 3,
          title: 'unitTest',
          align: 'left',
          id: 'left',
        })
        macro('title', {
          at: points.anchor,
          nr: 3,
          title: 'unitTest',
          align: 'right',
          id: 'right',
        })
        macro('title', {
          at: points.anchor,
          nr: 3,
          title: 'unitTest',
          align: 'center',
          id: 'center',
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    // Note that we're not loading core plugins but the local plugin
    const Pattern = new Design({
      data: { name: 'testPattern', version: 99 },
      parts: [part],
      noCorePlugins: true,
    })
    const pattern = new Pattern()
    pattern.draft().render()
    for (const align of ['left', 'center', 'right']) {
      let p = pattern.parts[0].test.points[`__macro_title_${align}_nr`]
      expect(p.attributes.get('data-text-class')).to.equal(`text-4xl fill-note font-bold ${align}`)
      p = pattern.parts[0].test.points[`__macro_title_${align}_name`]
      expect(p.attributes.get('data-text-class')).to.equal(`fill-note ${align}`)
      p = pattern.parts[0].test.points[`__macro_title_${align}_title`]
      expect(p.attributes.get('data-text-class')).to.equal(
        `text-lg fill-current font-bold ${align}`
      )
    }
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
    // Note that we're not loading core plugins but the local plugin
    const Pattern = new Design({
      data: { name: 'testPattern', version: 99 },
      parts: [part],
      noCorePlugins: true,
    })
    const pattern = new Pattern()
    pattern.draft().render()
    let p = pattern.parts[0].test.points
    expect(p.__macro_title_title_nr.attributes.get('data-text-class')).to.equal(
      'text-4xl fill-note font-bold left'
    )
    expect(p.__macro_title_title_title.attributes.get('data-text-class')).to.equal(
      'text-lg fill-current font-bold left'
    )
    expect(p.__macro_title_title_name.attributes.get('data-text-class')).to.equal('fill-note left')
  })
})
