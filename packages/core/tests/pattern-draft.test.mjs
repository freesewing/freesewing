import chai from 'chai'
import { Design } from '../src/index.mjs'

const expect = chai.expect

describe('Pattern', () => {
  describe('Pattern.draft()', () => {
    it('Pattern.draft() should draft according to settings', () => {
      let count = 0
      const back = {
        name: 'back',
        hide: true,
        draft: function (part) {
          count++
          return part
        },
      }
      const front = {
        name: 'front',
        from: back,
        draft: function (part) {
          count++
          return part
        },
      }
      const Test = new Design({
        name: 'test',
        parts: [back, front],
      })

      const pattern = new Test()
      pattern.draft()
      expect(count).to.equal(2)
    })
  })
  it('Should check whether a part is needed', () => {
    const partA = {
      name: 'test.partA',
      measurements: ['head', 'knee'],
      optionalMeasurements: ['chest', 'waist'],
      options: {
        optA: { pct: 40, min: 20, max: 80 },
      },
      draft: () => {},
    }
    const partB = {
      name: 'test.partB',
      measurements: ['head', 'knee'],
      optionalMeasurements: ['knee'],
      after: [partA],
      plugins: [
        {
          name: 'testPlugin',
          hooks: {
            preRender: () => {},
          },
        },
      ],
      options: {
        optB: { deg: 40, min: 20, max: 80 },
      },
      draft: () => {},
    }
    const partC = {
      name: 'test.partC',
      measurements: ['head', 'knee'],
      optionalMeasurements: ['knee'],
      options: {
        optC: { pct: 20, min: 10, max: 30 },
      },
      draft: () => {},
    }
    const Pattern = new Design({
      parts: [partA, partB, partC],
    })
    const pattern = new Pattern({
      only: ['test.partB'],
    })
    pattern.__init()
    expect(pattern.__needs('test.partA')).to.equal(true)
    expect(pattern.__needs('test.partB')).to.equal(true)
    expect(pattern.__needs('test.partC')).to.equal(false)
  })

  it('Should check whether a part is wanted', () => {
    const partA = {
      name: 'test.partA',
      measurements: ['head', 'knee'],
      optionalMeasurements: ['chest', 'waist'],
      options: {
        optA: { pct: 40, min: 20, max: 80 },
      },
      draft: () => {},
    }
    const partB = {
      name: 'test.partB',
      measurements: ['head', 'knee'],
      optionalMeasurements: ['knee'],
      after: partA,
      plugins: [
        {
          name: 'testPlugin',
          hooks: {
            preRender: () => {},
          },
        },
      ],
      options: {
        optB: { deg: 40, min: 20, max: 80 },
      },
      draft: () => {},
    }
    const partC = {
      name: 'test.partC',
      measurements: ['head', 'knee'],
      optionalMeasurements: ['knee'],
      options: {
        optC: { pct: 20, min: 10, max: 30 },
      },
      draft: () => {},
    }
    const Pattern = new Design({
      parts: [partA, partB, partC],
    })
    const pattern = new Pattern({
      only: ['test.partB'],
    })
    pattern.__init()
    expect(pattern.__wants('test.partA')).to.equal(false)
    expect(pattern.__wants('test.partB')).to.equal(true)
    expect(pattern.__wants('test.partC')).to.equal(false)
  })
  it('should log an error if it fails to inject a part into another', () => {
    const otherPart = {
      name: 'otherPart',
      draft: function ({ part, points }) {
        points.oops = {
          clone: () => {
            throw new Error('something bad happened')
          },
        }
        return part
      },
    }
    const front = {
      name: 'front',
      from: otherPart,
      draft: function (part) {
        return part
      },
    }
    const Test = new Design({
      name: 'test',
      parts: [front, otherPart],
    })

    const pattern = new Test()
    pattern.draft()

    console.log(pattern.setStores[pattern.activeSet].logs.error[0])
    expect(pattern.setStores[pattern.activeSet].logs.error[0]).to.include(
      'Could not inject part `otherPart` into part `front`'
    )
  })

  describe('PatternRenderer.__pack()', () => {
    it('should get a part stack name from a function that uses settings', () => {
      const expectedName = 'namedStack'
      const front = {
        name: 'front',
        stack: function (settings) {
          return settings.options.stackName
        },
        options: {
          stackName: {
            dflt: expectedName,
            list: [expectedName, 'otherStack'],
          },
        },
        draft: function ({ part }) {
          return part
        },
      }

      const Test = new Design({
        name: 'test',
        parts: [front],
      })

      const pattern = new Test()
      pattern.draft()
      pattern.getRenderProps()

      const stackNames = Object.keys(pattern.stacks)
      expect(stackNames).to.include(expectedName)
      expect(stackNames).not.to.include('front')
    })
  })
  /*

  it('Should return all render props', () => {
    const front = {
      name: 'front',
      draft: function (part) {
        return part
      },
    }
    const Test = new Design({
      name: 'test',
      parts: [front],
    })
    const pattern = new Test()
    pattern.draft()
    const rp = pattern.getRenderProps()
    expect(rp.svg.body).to.equal('')
    expect(rp.width).to.equal(4)
    expect(rp.height).to.equal(4)
    expect(rp.parts.front.height).to.equal(4)
  })

  it('Should not pack a pattern with errors', () => {
    const pattern = new Pattern()
    pattern.events.error.push('error')
    pattern.pack()
    expect(pattern.events.warning.length).to.equal(1)
    expect(pattern.events.warning[0]).to.equal(
      'One or more errors occured. Not packing pattern parts'
    )
  })

  it("Should generate an auto layout if there is no set layout", () => {
    const Test = new freesewing.Design({
      name: "test",
      parts: [
        {
          name: 'front',
          draft: function(part) {
            const {Path, paths, Point} = part.shorthand()
            paths.seam = new Path().move(new Point(0,0))
              .line(new Point(5,5))
            return part
          }
        }
      ]
    })
    const pattern = new Test()
    pattern.parts.front = new pattern.Part('front')
    pattern.draftFront(pattern.parts.front);
    pattern.pack()
    expect(pattern.autoLayout.parts.front).to.exist
    expect(pattern.autoLayout.parts.front.move.y).to.equal(2)
    expect(pattern.autoLayout.parts.front.move.x).to.equal(2)
  })

  it("Should handle custom layouts", () => {
    const Test = new Design({ name: "test", parts: ['front'] })
    Test.prototype.draftFront = function(part) { return part }
    const pattern = new Test({
      layout: {
        width: 400,
        height: 200,
        parts: { front: { move: { x: 14, y: -202 } } }
      }
    })
    pattern.pack()
    expect(pattern.width).to.equal(400)
    expect(pattern.height).to.equal(200)
  });

  it("Should handle a simple snapped option", () => {
    const Test = new Design({
      name: "test",
      parts: ['front'],
      measurements: [ 'head' ],
      options: {
        len: { pct: 50, min: 22, max: 78, snap: 10, ...pctBasedOn('head') }
      }
    })
    Test.prototype.draftFront = function(part) {
      const { Point, points, Path, paths, absoluteOptions } = part.shorthand()
      points.from = new Point(0, 0);
      points.to = new Point( 2 * absoluteOptions.len, 0)
      paths.line = new Path()
        .move(points.from)
        .line(points.to)

      return part
    };
    let pattern = new Test({
      sample: {
        type: 'option',
        option: 'len'
      },
      measurements: {
        head: 43.23
      }
    })
    pattern.sample();
    expect(pattern.is).to.equal('sample')
    expect(pattern.events.debug[0]).to.equal('Sampling option `len`')
    expect(pattern.parts.front.paths.line_1.ops[1].to.x).to.equal(20);
    expect(pattern.parts.front.paths.line_2.ops[1].to.x).to.equal(40);
    expect(pattern.parts.front.paths.line_3.ops[1].to.x).to.equal(40);
    expect(pattern.parts.front.paths.line_4.ops[1].to.x).to.equal(40);
    expect(pattern.parts.front.paths.line_5.ops[1].to.x).to.equal(60);
    expect(pattern.parts.front.paths.line_6.ops[1].to.x).to.equal(60);
    expect(pattern.parts.front.paths.line_7.ops[1].to.x).to.equal(60);
    expect(pattern.parts.front.paths.line_8.ops[1].to.x).to.equal(60);
    expect(pattern.parts.front.paths.line_9.ops[1].to.x).to.equal(80);
    expect(pattern.parts.front.paths.line_10.ops[1].to.x).to.equal(80);
  });

  it("Should handle a list snapped option", () => {
    const Test = new Design({
      name: "test",
      parts: [
        {
          name: 'front',
          draft: function(part) {
            const { Point, points, Path, paths, absoluteOptions } = part.shorthand()
            points.from = new Point(0, 0);
            points.to = new Point( absoluteOptions.len, 0)
            paths.line = new Path()
              .move(points.from)
              .line(points.to)

            return part
          }
        }
      ],
      measurements: [ 'head' ],
      options: {
        len: { pct: 50, min: 22, max: 78, snap: [10,14,19,28], ...pctBasedOn('head') }
      }
    })
    let pattern = new Test({
      sample: {
        type: 'option',
        option: 'len'
      },
      measurements: {
        head: 43.23
      }
    })
    pattern.sample();
    expect(pattern.is).to.equal('sample')
    expect(pattern.events.debug[0]).to.equal('Sampling option `len`')
    expect(pattern.parts.front.paths.line_1.ops[1].to.x).to.equal(10);
    expect(pattern.parts.front.paths.line_2.ops[1].to.x).to.equal(14);
    expect(pattern.parts.front.paths.line_3.ops[1].to.x).to.equal(14);
    expect(pattern.parts.front.paths.line_4.ops[1].to.x).to.equal(19);
    expect(pattern.parts.front.paths.line_5.ops[1].to.x).to.equal(19);
    expect(pattern.parts.front.paths.line_6.ops[1].to.x).to.equal(19);
    expect(pattern.parts.front.paths.line_7.ops[1].to.x).to.equal(28);
    expect(pattern.parts.front.paths.line_8.ops[1].to.x).to.equal(28);
    expect(pattern.parts.front.paths.line_9.ops[1].to.x).to.equal(28);
    expect(round(pattern.parts.front.paths.line_10.ops[1].to.x)).to.equal(33.72);
  });


  */
})
