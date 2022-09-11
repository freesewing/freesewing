import chai from 'chai'
import { Design, Pattern, Path } from '../src/index.mjs'

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

  it('Should return a function from macroClosure', () => {
    const pattern = new Pattern()
    const part = pattern.__createPartWithContext()
    expect(typeof part.macroClosure()).to.equal('function')
  })

  it('Should not run an unknown macro', () => {
    const pattern = new Pattern()
    const part = pattern.__createPartWithContext()
    const macro = part.macroClosure()
    expect(macro('unknown')).to.equal(undefined)
  })

  it('Should register and run a macro', () => {
    const pattern = new Pattern()
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
    pattern.use(plugin)
    const part = pattern.__createPartWithContext()
    const macro = part.macroClosure()
    macro('test', { x: 123, y: 456 })
    expect(part.points.macro.x).to.equal(123)
    expect(part.points.macro.y).to.equal(456)
  })

  it('Should return a free ID', () => {
    const pattern = new Pattern()
    const part = pattern.__createPartWithContext()
    const free = part.getId()
    expect(part.getId()).to.equal('' + (parseInt(free) + 1))
  })

  it('Should return a function from unitsClosure', () => {
    const pattern = new Pattern()
    const part = pattern.__createPartWithContext()
    expect(typeof part.unitsClosure()).to.equal('function')
  })

  it('Should convert units', () => {
    const design = new Design()
    const pattern = new design()
    const part = pattern.__createPartWithContext()
    const units = part.unitsClosure()
    expect(units(123.456)).to.equal('12.35cm')
    expect(part.units(123.456)).to.equal('12.35cm')
  })

  it('Should set part attributes', () => {
    const pattern = new Pattern()
    const part = pattern.__createPartWithContext()
    part.attr('foo', 'bar')
    expect(part.attributes.get('foo')).to.equal('bar')
    part.attr('foo', 'baz')
    expect(part.attributes.get('foo')).to.equal('bar baz')
    part.attr('foo', 'schmoo', true)
    expect(part.attributes.get('foo')).to.equal('schmoo')
  })

  it('Should raise a warning when setting a non-Point value in points', () => {
    const design = new Design()
    const pattern = new design()
    const part = pattern.__createPartWithContext()
    pattern.init()
    const { points } = part.shorthand()
    points.a = 'banana'
    expect(pattern.store.logs.warning.length).to.equal(4)
    expect(pattern.store.logs.warning[0]).to.equal(
      '`points.a` was set with a value that is not a `Point` object'
    )
    expect(pattern.store.logs.warning[1]).to.equal(
      '`points.a` was set with a `x` parameter that is not a `number`'
    )
    expect(pattern.store.logs.warning[2]).to.equal(
      '`points.a` was set with a `y` parameter that is not a `number`'
    )
  })

  it('Should raise a warning when setting a non-Snippet value in snippets', () => {
    const design = new Design()
    const pattern = new design()
    const part = pattern.__createPartWithContext()
    pattern.init()
    const { snippets } = part.shorthand()
    snippets.a = 'banana'
    expect(pattern.store.logs.warning.length).to.equal(4)
    expect(pattern.store.logs.warning[0]).to.equal(
      '`snippets.a` was set with a value that is not a `Snippet` object'
    )
    expect(pattern.store.logs.warning[1]).to.equal(
      '`snippets.a` was set with a `def` parameter that is not a `string`'
    )
    expect(pattern.store.logs.warning[2]).to.equal(
      '`snippets.a` was set with an `anchor` parameter that is not a `Point`'
    )
  })

  it('Should calculate the part boundary with default margin', () => {
    const design = new Design()
    const pattern = new design()
    const part = pattern.__createPartWithContext()
    pattern.init()
    const short = part.shorthand()
    part.points.from = new short.Point(123, 456)
    part.points.to = new short.Point(19, 76)
    part.paths.test = new short.Path().move(part.points.from).line(part.points.to)
    let boundary = part.boundary()
    expect(boundary.topLeft.x).to.equal(17)
    expect(boundary.topLeft.y).to.equal(74)
    expect(boundary.bottomRight.x).to.equal(125)
    expect(boundary.bottomRight.y).to.equal(458)
    boundary = part.boundary()
    expect(boundary.width).to.equal(108)
    expect(boundary.height).to.equal(384)
  })

  it('Should calculate the part boundary with custom margin', () => {
    const design = new Design()
    const pattern = new design({ margin: 5 })
    const part = pattern.__createPartWithContext()
    pattern.init()
    const short = part.shorthand()
    part.points.from = new short.Point(123, 456)
    part.points.to = new short.Point(19, 76)
    part.paths.test = new short.Path().move(part.points.from).line(part.points.to)
    let boundary = part.boundary()
    expect(boundary.topLeft.x).to.equal(14)
    expect(boundary.topLeft.y).to.equal(71)
    expect(boundary.bottomRight.x).to.equal(128)
    expect(boundary.bottomRight.y).to.equal(461)
    boundary = part.boundary()
    expect(boundary.width).to.equal(114)
    expect(boundary.height).to.equal(390)
  })

  it('Should calculate the part boundary for paperless', () => {
    const design = new Design()
    const pattern = new design({ paperless: true })
    const part = pattern.__createPartWithContext()
    pattern.init()
    const short = part.shorthand()
    part.points.from = new short.Point(123, 456)
    part.points.to = new short.Point(19, 76)
    part.paths.test = new short.Path().move(part.points.from).line(part.points.to)
    let boundary = part.boundary()
    expect(boundary.topLeft.x).to.equal(9)
    expect(boundary.topLeft.y).to.equal(66)
    expect(boundary.bottomRight.x).to.equal(133)
    expect(boundary.bottomRight.y).to.equal(466)
    boundary = part.boundary()
    expect(boundary.width).to.equal(124)
    expect(boundary.height).to.equal(400)
  })
  /*
  it('Should stack a part', () => {
    const part = {
      name: 'test',
      draft: (part) => {
        const { points, Point, paths, Path }  = part.shorthand()
        points.from = new Point(123, 456)
        points.to = new Point(19, 76)
        paths.test = new Path().move(points.from).line(points.to)
        return aprt
      }
    }
    const design = new Design({ parts: [ part ]})
    const pattern = new design({ paperless: true })
    pattern.draft()
    pattern.parts.test.stack()
    console.log(pattern.parts.test.attributes)
    expect(part.attributes.get('transform')).to.equal('translate(-17, -74)')
  })

  it('Should only stack a part if needed', () => {
    let pattern = new Pattern()
    pattern.settings.mode = 'draft'
    let part = new pattern.Part()
    let short = part.shorthand()
    part.points.from = new short.Point(2, 2)
    part.points.to = new short.Point(19, 76)
    part.paths.test = new short.Path().move(part.points.from).line(part.points.to)
    part.stack()
    expect(part.attributes.get('transform')).to.equal(false)
    part.stack()
    expect(part.attributes.get('transform')).to.equal(false)
  })
*/
  it('Should run hooks', () => {
    let count = 0
    const design = new Design()
    const pattern = new design({ paperless: true })
    const part = pattern.__createPartWithContext()
    part.hooks.preDraft = [
      {
        method: function (p) {
          count++
        },
      },
    ]
    part.runHooks('preDraft')
    expect(count).to.equal(1)
  })

  it('Should get the units closure to raise a debug when passing a non-number', () => {
    const design = new Design()
    const pattern = new design({ margin: 5 })
    const part = pattern.__createPartWithContext()
    pattern.init()
    const short = part.shorthand()
    short.units('a')
    expect(pattern.store.logs.warning.length).to.equal(1)
    expect(pattern.store.logs.warning[0]).to.equal(
      'Calling `units(value)` but `value` is not a number (`string`)'
    )
  })

  it('Should generate the part transforms', () => {
    const design = new Design()
    const pattern = new design({ margin: 5 })
    const part = pattern.__createPartWithContext()
    pattern.init()
    let short = part.shorthand()
    part.points.from = new short.Point(2, 2)
    part.points.to = new short.Point(19, 76)
    part.paths.test = new short.Path().move(part.points.from).line(part.points.to)
    part.stack()
    part.generateTransform({
      move: {
        x: 10,
        y: 20,
      },
    })
    expect(part.attributes.list.transform.length).to.equal(1)
    expect(part.attributes.list.transform[0]).to.equal('translate(10 20)')
  })
  describe('isEmpty', () => {
    it('Should return true if the part has no paths or snippets', () => {
      const design = new Design()
      const pattern = new design()
      const part = pattern.__createPartWithContext()
      expect(part.isEmpty()).to.be.true
    })

    it('Should return true if the part has paths but they have no length', () => {
      const design = new Design()
      const pattern = new design()
      const part = pattern.__createPartWithContext()
      const { Path, paths, Point } = part.shorthand()
      paths.seam = new Path()
      expect(part.isEmpty()).to.be.true
    })

    it("Should return true if the part has paths but they don't render", () => {
      const design = new Design()
      const pattern = new design()
      const part = pattern.__createPartWithContext()
      const { Path, paths, Point } = part.shorthand()
      paths.seam = new Path().move(new Point(0, 0)).line(new Point(2, 3)).setRender(false)
      expect(part.isEmpty()).to.be.true
    })

    it('Should return false if the part has a path with length', () => {
      const design = new Design()
      const pattern = new design()
      const part = pattern.__createPartWithContext()
      const { Path, paths, Point } = part.shorthand()
      paths.seam = new Path().move(new Point(0, 0)).line(new Point(2, 3))

      expect(part.isEmpty()).to.be.false
    })

    it('Should return false if the part has a snippet', () => {
      const design = new Design()
      const pattern = new design()
      const part = pattern.__createPartWithContext()
      const { Point, snippets, Snippet } = part.shorthand()
      snippets.test = new Snippet('test', new Point(0, 0))

      expect(part.isEmpty()).to.be.false
    })

    it('Should return false if the part has a point that has text', () => {
      const design = new Design()
      const pattern = new design()
      const part = pattern.__createPartWithContext()
      const { Point, points } = part.shorthand()
      points.test = new Point(0, 0)
      points.test.attributes.set('data-text', 'text')
      expect(part.isEmpty()).to.be.false
    })

    it('Should return false if the part has a point that has a circle', () => {
      const design = new Design()
      const pattern = new design()
      const part = pattern.__createPartWithContext()
      const { Point, points } = part.shorthand()
      points.test = new Point(0, 0)
      points.test.attributes.set('data-circle', 10)
      expect(part.isEmpty()).to.be.false
    })
  })
})
