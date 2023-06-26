import chai from 'chai'
import { Design, Part, pctBasedOn } from '../src/index.mjs'

const expect = chai.expect

describe('Part', () => {
  it('Shorthand should contain the part itself', () => {
    let dp
    const part = {
      name: 'test',
      draft: ({ part }) => {
        dp = part
        return part
      },
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft()
    expect(typeof dp).to.equal('object')
    expect(typeof dp.context).to.equal('object')
  })

  it('Should return a function from __macroClosure', () => {
    const part = new Part()
    expect(typeof part.__macroClosure()).to.equal('function')
  })

  it('Should not run an unknown macro', () => {
    const part = new Part()
    const macro = part.__macroClosure()
    expect(macro('unknown')).to.equal(undefined)
  })

  it('Should return a valid ID with Part.getId()', () => {
    const part = new Part()
    const id = part.getId()
    const prefixed = part.getId('orange')
    expect(id).to.equal('1')
    expect(prefixed).to.equal('orange2')
  })

  it('Should register and run a macro', () => {
    const plugin = {
      name: 'test',
      version: '0.1-test',
      macros: {
        test: function (so) {
          let points = this.points
          points.macro = new this.Point(so.x, so.y)
        },
      },
    }
    const part = {
      name: 'test',
      draft: ({ part, Point, points, macro }) => {
        points.example = new Point(12, 34)
        macro('test', { x: 123, y: 456 })
        return part
      },
      plugins: plugin,
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft()
    expect(pattern.parts[0].test.points.macro.x).to.equal(123)
    expect(pattern.parts[0].test.points.macro.y).to.equal(456)
  })

  it('Should return a free ID in draft method', () => {
    let id = null
    const part = {
      name: 'test',
      draft: ({ getId, part }) => {
        id = getId()
        id = getId()
        id = getId()

        return part
      },
    }
    const design = new Design({ parts: [part] })
    new design().draft()
    expect(id).to.equal('3')
  })

  it('Should return a function from __unitsClosure', () => {
    const part = new Part()
    expect(typeof part.__unitsClosure()).to.equal('function')
  })

  it('Should convert units', () => {
    const part = new Part()
    part.context = { settings: { units: 'metric' } }
    const units = part.__unitsClosure()
    expect(units(123.456)).to.equal('12.35cm')
    expect(units(123.456)).to.equal('12.35cm')
  })

  it('Should convert units directly', () => {
    const part = new Part()
    part.context = { settings: { units: 'metric' } }
    expect(part.units(123.456)).to.equal('12.35cm')
    expect(part.units(123.456)).to.equal('12.35cm')
  })

  it('Should set part attributes', () => {
    const part = new Part()
    part.attr('foo', 'bar')
    expect(part.attributes.get('foo')).to.equal('bar')
    part.attr('foo', 'baz')
    expect(part.attributes.get('foo')).to.equal('bar baz')
    part.attr('foo', 'schmoo', true)
    expect(part.attributes.get('foo')).to.equal('schmoo')
  })

  it('Should log a warning when setting a non-Point value in points', () => {
    const part = {
      name: 'test',
      draft: ({ points, part }) => {
        points.a = 'banana'
        return part
      },
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft()
    expect(pattern.setStores[0].logs.warning.length).to.equal(4)
    expect(pattern.setStores[0].logs.warning[0]).to.equal(
      '`points.a` was set with a value that is not a `Point` object'
    )
    expect(pattern.setStores[0].logs.warning[1]).to.equal(
      '`points.a` was set with a `x` parameter that is not a `number`'
    )
    expect(pattern.setStores[0].logs.warning[2]).to.equal(
      '`points.a` was set with a `y` parameter that is not a `number`'
    )
  })

  it('Should log a warning when setting a non-Snippet value in snippets', () => {
    const part = {
      name: 'test',
      draft: ({ snippets, part }) => {
        snippets.a = 'banana'
        return part
      },
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft()
    expect(pattern.setStores[0].logs.warning.length).to.equal(4)
    expect(pattern.setStores[0].logs.warning[0]).to.equal(
      '`snippets.a` was set with a value that is not a `Snippet` object'
    )
    expect(pattern.setStores[0].logs.warning[1]).to.equal(
      '`snippets.a` was set with a `def` parameter that is not a `string`'
    )
    expect(pattern.setStores[0].logs.warning[2]).to.equal(
      '`snippets.a` was set with an `anchor` parameter that is not a `Point`'
    )
  })

  it('Should calculate the part boundary', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, paths, Path, part }) => {
        points.from = new Point(123, 456)
        points.to = new Point(19, 76).attr('data-circle', 12)

        paths.test = new Path().move(points.from).line(points.to)
        return part
      },
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft().render()
    const boundary = pattern.parts[0].test.__boundary()
    const { topLeft, bottomRight, width, height } = boundary
    expect(topLeft.x).to.equal(7)
    expect(topLeft.y).to.equal(64)
    // Cover the cached branch
    pattern.parts[0].test.__boundary()
    expect(bottomRight.x).to.equal(123)
    expect(bottomRight.y).to.equal(456)
    expect(width).to.equal(116)
    expect(height).to.equal(392)
  })

  it('Units closure should log a warning when passing a non-number', () => {
    const part = {
      name: 'test',
      draft: ({ units, part }) => {
        units('a')
        return part
      },
    }
    const design = new Design({ parts: [part] })
    // Let's also cover the branch where complete is false
    const pattern = new design({ complete: false })
    pattern.draft()
    expect(pattern.setStores[0].logs.warning.length).to.equal(1)
    expect(pattern.setStores[0].logs.warning[0]).to.equal(
      'Calling `units(value)` but `value` is not a number (`string`)'
    )
  })

  it('Should (un)hide a part with hide()/unhide()', () => {
    const part = new Part()
    expect(part.hidden).to.equal(false)
    part.hide()
    expect(part.hidden).to.equal(true)
    part.unhide()
    expect(part.hidden).to.equal(false)
  })

  it('Should (un)hide a part with setHidden()', () => {
    const part = new Part()
    expect(part.hidden).to.equal(false)
    part.setHidden(true)
    expect(part.hidden).to.equal(true)
    part.setHidden(false)
    expect(part.hidden).to.equal(false)
  })

  it('Draft method should receive the Snippet constructor', () => {
    let method
    const part = {
      name: 'test',
      draft: ({ Point, snippets, Snippet, part }) => {
        method = Snippet
        snippets.test = new Snippet('notch', new Point(19, 80))
        return part
      },
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft()
    expect(typeof method).to.equal('function')
    expect(pattern.parts[0].test.snippets.test.def).to.equal('notch')
    expect(pattern.parts[0].test.snippets.test.name).to.equal('test')
    expect(pattern.parts[0].test.snippets.test.anchor.x).to.equal(19)
    expect(pattern.parts[0].test.snippets.test.anchor.y).to.equal(80)
  })

  it('Measurments proxy should allow setting a measurement', () => {
    const part = {
      name: 'test',
      draft: ({ measurements, part }) => {
        measurements.head = 120
        return part
      },
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft()
    expect(pattern.settings[0].measurements.head).to.equal(120)
  })

  it('Options proxy should allow setting an option', () => {
    const part = {
      name: 'test',
      draft: ({ options, part }) => {
        options.test = 120
        return part
      },
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft()
    expect(pattern.settings[0].options.test).to.equal(120)
  })

  it('AbsoluteOptions proxy should allow setting an absoluteOption', () => {
    const part = {
      name: 'test',
      draft: ({ absoluteOptions, part }) => {
        absoluteOptions.test = 120
        return part
      },
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft()
    expect(pattern.settings[0].absoluteOptions.test).to.equal(120)
  })

  it('Snapped percentage options should be available to the draft method', () => {
    const part = {
      name: 'test',
      options: {
        test: { pct: 10, min: 5, max: 25, snap: 5, ...pctBasedOn('head') },
      },
      draft: ({ paths, Path, Point, absoluteOptions, part }) => {
        paths.test = new Path().move(new Point(0, 0)).line(new Point(absoluteOptions.test, 0))
        return part
      },
    }
    const design = new Design({ parts: [part] })
    const pattern = new design({ measurements: { head: 200 } })
    pattern.draft()
    expect(pattern.parts[0].test.paths.test.ops[1].to.x).to.equal(20)
  })

  it('Accessing unknown option should log a warning', () => {
    const part = {
      name: 'test',
      draft: ({ options, part }) => {
        if (options.test === 'This should never match') return null
        else return part
      },
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft()
    expect(pattern.setStores[0].logs.warning.length).to.equal(1)
    expect(pattern.setStores[0].logs.warning[0]).to.equal(
      'Tried to access `options.test` but it is `undefined`'
    )
  })

  it('Accessing unknown absoluteOption should log a warning', () => {
    const part = {
      name: 'test',
      draft: ({ absoluteOptions, part }) => {
        if (absoluteOptions.test === 'this check should always fail') return null
        else return part
      },
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft()
    expect(pattern.setStores[0].logs.warning.length).to.equal(1)
    expect(pattern.setStores[0].logs.warning[0]).to.equal(
      'Tried to access `absoluteOptions.test` but it is `undefined`'
    )
  })

  it('Injecting a part should contain all data', () => {
    const from = {
      name: 'from',
      draft: ({ points, Point, paths, Path, snippets, Snippet, part }) => {
        points.from = new Point(0, 0)
        points.to = new Point(19, 80)
        points.start = new Point(100, 100)
        points.cp1 = new Point(100, 200)
        points.cp2 = new Point(200, 100)
        points.end = new Point(200, 200)
        paths.line = new Path().move(points.from).line(points.to)
        paths.curve = new Path().move(points.start).curve(points.cp1, points.cp2, points.end)
        snippets.test = new Snippet('notch', points.end)
        return part
      },
    }
    const to = {
      from,
      name: 'to',
      draft: ({ part }) => part,
    }
    const design = new Design({ parts: [from, to] })
    const pattern = new design()
    pattern.draft()
    expect(pattern.parts[0].to.points.to.x).to.equal(19)
    expect(pattern.parts[0].to.points.to.y).to.equal(80)
    expect(typeof pattern.parts[0].to.paths.line).to.equal('object')
    expect(pattern.parts[0].to.paths.curve.ops[1].cp2.x).to.equal(200)
  })
})
