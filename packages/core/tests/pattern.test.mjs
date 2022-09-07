import chai from "chai"
import { round, Pattern, Design, pctBasedOn } from "./dist/index.mjs"

const expect = chai.expect

describe('Pattern', () => {
  it("Pattern constructor should initialize object", () => {
    let pattern = new Pattern({
      foo: "bar",
      options: {
        constant: 2,
        percentage: { pct: 30, min: 0, max: 100 }
      }
    });
    expect(pattern.width).to.equal(0);
    expect(pattern.height).to.equal(0);
    expect(pattern.settings.complete).to.equal(true);
    expect(pattern.parts).to.eql({});
    expect(pattern.settings.units).to.equal("metric");
    expect(pattern.config.foo).to.equal("bar");
    expect(pattern.settings.options.constant).to.equal(2);
    expect(pattern.settings.options.percentage).to.equal(0.3);
  });


  it("Should load percentage options", () => {
    let pattern = new Pattern({
      options: {
        test: { pct: 30 }
      }
    });
    expect(pattern.settings.options.test).to.equal(0.3);
  });

  it("Should load millimeter options", () => {
    let pattern = new Pattern({
      options: {
        test: { mm: 30 }
      }
    });
    expect(pattern.settings.options.test).to.equal(30);
  });

  it("Should load degree options", () => {
    let pattern = new Pattern({
      options: {
        test: { deg: 15 }
      }
    });
    expect(pattern.settings.options.test).to.equal(15);
  });

  it("Should load an array option", () => {
    let pattern = new Pattern({
      options: {
        test: { dflt: "foo" }
      }
    });
    expect(pattern.settings.options.test).to.equal("foo");
  });

  it("Should load a count option", () => {
    let pattern = new Pattern({
      options: {
        test: { count: 3 }
      }
    });
    expect(pattern.settings.options.test).to.equal(3);
  });

  it("Should load a boolean option", () => {
    let pattern = new Pattern({
      options: {
        test1: { bool: false },
        test2: { bool: true }
      }
    });
    expect(pattern.settings.options.test1).to.be.false;
    expect(pattern.settings.options.test2).to.be.true;
  });

  it("Should throw an error for an unknown option", () => {
    expect(
      () =>
        new Pattern({
          options: {
            test: { foo: "bar" }
          }
        })
    ).to.throw();
  });

  it("Should merge settings with default settings", () => {
    let pattern = new Pattern();
    let settings = {
      foo: "bar",
      deep: {
        free: "ze"
      }
    };
    pattern.apply(settings);
    expect(pattern.settings.foo).to.equal("bar");
    expect(pattern.settings.locale).to.equal("en");
    expect(pattern.settings.margin).to.equal(2);
    expect(pattern.settings.idPrefix).to.equal("fs-");
    expect(pattern.settings.deep.free).to.equal("ze");
  });

  it("Should draft according to settings", () => {
    let count = 0
    const back = {
      name: 'back',
      hide: true,
      draft: function(part) {
        count ++
        return part;
      }
    }
    const front = {
      name: 'front',
      from: back,
      draft: function(part) {
        count ++
        return part;
      }
    }
    const Test = new Design({
      name: "test",
      parts: [ back, front ],
    });

    const pattern = new Test();
    pattern.draft();
    expect(count).to.equal(2);
  });

  it("Should sample an option", () => {
    let pattern = new Pattern({
      options: {
        len: { pct: 30, min: 10 },
        bonus: 10
      }
    });
    pattern.draft = function() {
      pattern.parts.a = new pattern.Part();
      pattern.parts.b = new pattern.Part();
      let a = pattern.parts.a;
      a.points.from = new a.Point(0, 0);
      a.points.to = new a.Point(
        100 * a.context.settings.options.len,
        a.context.settings.options.bonus
      );
      a.paths.test = new a.Path().move(a.points.from).line(a.points.to);
      pattern.parts.b.inject(a);
    };
    pattern.settings.sample = {
      type: "option",
      option: "len"
    };
    pattern.sample();
    expect(pattern.parts.a.paths.test_1.render).to.equal(true);
    expect(pattern.parts.b.paths.test_10.ops[1].to.y).to.equal(10);
  });
/*
  it("Should sample a list option", () => {
    const front = {
      name: 'front',
      options: {
        len: {
          dflt: 1,
          list: [1,2,3]
        }
      },
      draft: function(part) {
        const { Point, points, Path, paths, options } = part.shorthand()
        points.from = new Point(0, 0);
        points.to = new Point( 100 * options.len, 0)
        paths.line = new Path()
          .move(points.from)
          .line(points.to)

        return part
      }
    }
    const Test = new freesewing.Design({
      name: "test",
      parts: [front],
    })
    const pattern = new Test({
      sample: {
        type: 'option',
        option: 'len'
      }
    })
    pattern.sample();
    console.log(pattern.parts)
    expect(pattern.parts.front.paths.line_1.ops[1].to.x).to.equal(100);
    expect(pattern.parts.front.paths.line_2.ops[1].to.x).to.equal(200);
    expect(pattern.parts.front.paths.line_3.ops[1].to.x).to.equal(300);
  });

  it("Should sample a measurement", () => {
    const Test = new freesewing.Design({
      name: "test",
      parts: ['front'],
      measurements: ['head']
    })
    Test.prototype.draftFront = function(part) {
      const { Point, points, Path, paths, measurements } = part.shorthand()
      points.from = new Point(0, 0);
      points.to = new Point( measurements.head, 0)
      paths.line = new Path()
        .move(points.from)
        .line(points.to)

      return part
    };
    const pattern = new Test({
      measurements: {
        head: 100
      },
      sample: {
        type: 'measurement',
        measurement: 'head'
      }
    })
    pattern.sample();
    expect(pattern.is).to.equal('sample')
    expect(pattern.events.debug[0]).to.equal('Sampling measurement `head`')
    for (let i=0;i<10;i++) {
      const j = i + 1
      expect(pattern.parts.front.paths[`line_${j}`].ops[1].to.x).to.equal(90 + 2*i);
    }
    pattern.sampleMeasurement('nope')
    expect(pattern.events.error.length).to.equal(1)
    expect(pattern.events.error[0]).to.equal("Cannot sample measurement `nope` because it's `undefined`")
  });

  it("Should sample models", () => {
    const Test = new freesewing.Design({
      name: "test",
      parts: ['front'],
      measurements: ['head']
    })
    Test.prototype.draftFront = function(part) {
      const { Point, points, Path, paths, measurements } = part.shorthand()
      points.from = new Point(0, 0);
      points.to = new Point( measurements.head, 0)
      paths.line = new Path()
        .move(points.from)
        .line(points.to)

      return part
    };
    let pattern = new Test({
      sample: {
        type: 'models',
        models : {
          a: { head: 100 },
          b: { head: 50 },
        }
      }
    })
    pattern.sample();
    expect(pattern.is).to.equal('sample')
    expect(pattern.events.debug[0]).to.equal('Sampling models')
    expect(pattern.parts.front.paths[`line_0`].ops[1].to.x).to.equal(100);
    expect(pattern.parts.front.paths[`line_1`].ops[1].to.x).to.equal(50);
    pattern = new Test({
      sample: {
        type: 'models',
        models : {
          a: { head: 100 },
          b: { head: 50 },
        },
        focus: 'b'
      }
    })
    pattern.sample();
    expect(pattern.is).to.equal('sample')
    expect(pattern.parts.front.paths[`line_-1`].ops[1].to.x).to.equal(50);
    expect(pattern.parts.front.paths[`line_0`].ops[1].to.x).to.equal(100);
  });

  it("Should register a hook via on", () => {
    let pattern = new Pattern();
    let count = 0;
    pattern._draft = () => {};
    pattern.on("preDraft", function(pattern) {
      count++;
    });
    pattern.draft();
    expect(count).to.equal(1);
  });

  it("Should register a hook from a plugin", () => {
    let pattern = new Pattern();
    let count = 0;
    pattern._draft = () => {};
    let plugin = {
      name: "test",
      version: "0.1-test",
      hooks: {
        preDraft: function(pattern) {
          count++;
        }
      }
    };
    pattern.use(plugin);
    pattern.draft();
    expect(count).to.equal(1);
  });

  it("Should register multiple methods on a single hook", () => {
    let pattern = new Pattern();
    let count = 0;
    pattern._draft = () => {};
    let plugin = {
      name: "test",
      version: "0.1-test",
      hooks: {
        preDraft: [
          function(pattern) {
            count++;
          },
          function(pattern) {
            count++;
          }
        ]
      }
    };
    pattern.use(plugin);
    pattern.draft();
    expect(count).to.equal(2);
  });
  */

  it("Should check whether a part is needed", () => {
    let config = {
      name: "test",
      dependencies: { back: "front", side: "back" },
      inject: { back: "front" },
      hide: ["back"]
    };
    const Test = new Design(config)
    Test.prototype.draftBack = function(part) {
      return part;
    };
    Test.prototype.draftFront = function(part) {
      return part;
    };

    let pattern = new Test().init();
    pattern.settings.only = "back";
    //expect(pattern.needs("back")).to.equal(true);
    expect(pattern.needs("front")).to.equal(true);
    //expect(pattern.needs("side")).to.equal(false);
    //pattern.settings.only = ["back", "side"];
    //expect(pattern.needs("back")).to.equal(true);
    //expect(pattern.needs("front")).to.equal(true);
    //expect(pattern.needs("side")).to.equal(true);
  });

  it("Should check whether a part is wanted", () => {
    let config = {
      name: "test",
      dependencies: { back: "front", side: "back" },
      inject: { back: "front" },
      hide: ["back"]
    };
    const Test = function(settings = false) {
      Pattern.call(this, config);
      return this;
    };
    Test.prototype = Object.create(Pattern.prototype);
    Test.prototype.constructor = Test;
    Test.prototype.draftBack = function(part) {
      return part;
    };
    Test.prototype.draftFront = function(part) {
      return part;
    };

    let pattern = new Test();
    pattern.settings.only = "back";
    expect(pattern.wants("back")).to.equal(true);
    expect(pattern.wants("front")).to.equal(false);
    expect(pattern.wants("side")).to.equal(false);
    pattern.settings.only = ["back", "side"];
    expect(pattern.wants("back")).to.equal(true);
    expect(pattern.wants("front")).to.equal(false);
    expect(pattern.wants("side")).to.equal(true);
  });

  it("Should correctly resolve dependencies - string version", () => {
    let config = {
      name: "test",
      dependencies: { front: "back", side: "back", hood: "front", stripe: "hood" },
    };
    const Test = new Design(config)
    Test.prototype = Object.create(Pattern.prototype);
    Test.prototype.constructor = Test;
    Test.prototype.draftBack = function(part) {
      return part;
    };
    Test.prototype.draftFront = function(part) {
      return part;
    };

    let pattern = new Test().init();
    expect(pattern.config.resolvedDependencies.front.length).to.equal(1);
    expect(pattern.config.resolvedDependencies.front[0]).to.equal('back');
    expect(pattern.config.resolvedDependencies.side.length).to.equal(1);
    expect(pattern.config.resolvedDependencies.side[0]).to.equal('back');
    expect(pattern.config.resolvedDependencies.hood.length).to.equal(2);
    expect(pattern.config.resolvedDependencies.hood[0]).to.equal('front');
    expect(pattern.config.resolvedDependencies.hood[1]).to.equal('back');
    expect(pattern.config.resolvedDependencies.stripe.length).to.equal(3);
    expect(pattern.config.resolvedDependencies.stripe[0]).to.equal('hood');
    expect(pattern.config.resolvedDependencies.stripe[1]).to.equal('front');
    expect(pattern.config.resolvedDependencies.stripe[2]).to.equal('back');
    expect(pattern.config.resolvedDependencies.back.length).to.equal(0);
    expect(pattern.config.draftOrder[0]).to.equal('back');
    expect(pattern.config.draftOrder[1]).to.equal('front');
    expect(pattern.config.draftOrder[2]).to.equal('side');
    expect(pattern.config.draftOrder[3]).to.equal('hood');
  });

  it("Should correctly resolve dependencies - array version", () => {
    let config = {
      name: "test",
      dependencies: { front: ["back"], side: ["back"], hood: ["front"], stripe: ["hood"]},
    };
    const Test = function(settings = false) {
      Pattern.call(this, config);
      return this;
    };
    Test.prototype = Object.create(Pattern.prototype);
    Test.prototype.constructor = Test;
    Test.prototype.draftBack = function(part) {
      return part;
    };
    Test.prototype.draftFront = function(part) {
      return part;
    };

    let pattern = new Test().init();
    expect(pattern.config.resolvedDependencies.front.length).to.equal(1);
    expect(pattern.config.resolvedDependencies.front[0]).to.equal('back');
    expect(pattern.config.resolvedDependencies.side.length).to.equal(1);
    expect(pattern.config.resolvedDependencies.side[0]).to.equal('back');
    expect(pattern.config.resolvedDependencies.hood.length).to.equal(2);
    expect(pattern.config.resolvedDependencies.hood[0]).to.equal('front');
    expect(pattern.config.resolvedDependencies.hood[1]).to.equal('back');
    expect(pattern.config.resolvedDependencies.stripe.length).to.equal(3);
    expect(pattern.config.resolvedDependencies.stripe[0]).to.equal('hood');
    expect(pattern.config.resolvedDependencies.stripe[1]).to.equal('front');
    expect(pattern.config.resolvedDependencies.stripe[2]).to.equal('back');
    expect(pattern.config.resolvedDependencies.back.length).to.equal(0);
    expect(pattern.config.draftOrder[0]).to.equal('back');
    expect(pattern.config.draftOrder[1]).to.equal('front');
    expect(pattern.config.draftOrder[2]).to.equal('side');
    expect(pattern.config.draftOrder[3]).to.equal('hood');
  });

  it("Should correctly resolve dependencies - issue #971 - working version", () => {
    let config = {
      name: "test",
      dependencies: {front:['back'],crotch:['front','back']},
      parts: ['back','front','crotch'],
    };
    const Test = function(settings = false) {
      Pattern.call(this, config);
      return this;
    };
    Test.prototype = Object.create(Pattern.prototype);
    Test.prototype.constructor = Test;
    Test.prototype.draftBack = function(part) {
      return part;
    };
    Test.prototype.draftFront = function(part) {
      return part;
    };

    let pattern = new Test().init();
    expect(pattern.config.draftOrder[0]).to.equal('back');
    expect(pattern.config.draftOrder[1]).to.equal('front');
    expect(pattern.config.draftOrder[2]).to.equal('crotch');
  });

  it("Should correctly resolve dependencies - issue #971 - broken version", () => {
    let config = {
      name: "test",
      dependencies: {front:'back',crotch:['front','back']},
      parts: ['back','front','crotch'],
    };
    const Test = function(settings = false) {
      Pattern.call(this, config);
      return this;
    };
    Test.prototype = Object.create(Pattern.prototype);
    Test.prototype.constructor = Test;
    Test.prototype.draftBack = function(part) {
      return part;
    };
    Test.prototype.draftFront = function(part) {
      return part;
    };

    let pattern = new Test().init();
    expect(pattern.config.draftOrder[0]).to.equal('back');
    expect(pattern.config.draftOrder[1]).to.equal('front');
    expect(pattern.config.draftOrder[2]).to.equal('crotch');
  });

  it("Should correctly resolve dependencies - Handle uncovered code path", () => {
    let config = {
      name: "test",
      dependencies: {
        front: 'side',
        crotch:['front','back'],
        back: 1,
      },
      inject: {
        front: 'back',
      },
      parts: ['back','front','crotch'],
    };
    const Test = function(settings = false) {
      Pattern.call(this, config);
      return this;
    };
    Test.prototype = Object.create(Pattern.prototype);
    Test.prototype.constructor = Test;
    Test.prototype.draftBack = function(part) {
      return part;
    };
    Test.prototype.draftFront = function(part) {
      return part;
    };

    let pattern = new Test().init();
    const deps = pattern.resolveDependencies()
    expect(pattern.config.draftOrder[0]).to.equal('side');
    expect(pattern.config.draftOrder[1]).to.equal('back');
    expect(pattern.config.draftOrder[2]).to.equal('front');
  });

  it("Should check whether created parts get the pattern context", () => {
    let pattern = new Pattern();
    let part = new pattern.Part();
    expect(part.context.settings).to.equal(pattern.settings);
  });

  it("Should correctly merge settings", () => {
    let pattern = new Pattern();
    let settings = {
      complete: false,
      only: [1, 2, 3],
      margin: 5
    };
    pattern.apply(settings);
    expect(pattern.settings.complete).to.equal(false);
    expect(pattern.settings.only[1]).to.equal(2);
    expect(pattern.settings.margin).to.equal(5);
    expect(pattern.settings.only.length).to.equal(3);
  });

  it("Should correctly merge settings for existing array", () => {
    let pattern = new Pattern();
    pattern.settings.only = [1];
    let settings = {
      complete: false,
      only: [2, 3, 4],
      margin: 5
    };
    pattern.apply(settings);
    expect(pattern.settings.complete).to.equal(false);
    expect(pattern.settings.only.length).to.equal(4);
    expect(pattern.settings.margin).to.equal(5);
  });

  it("Should return all render props", () => {
    const front = {
      name: 'front',
      draft: function(part) { return part }
    }
    const Test = new Design({
      name: "test",
      parts: [front],
    });
    const pattern = new Test()
    pattern.draft();
    const rp = pattern.getRenderProps()
    expect(rp.svg.body).to.equal('');
    expect(rp.width).to.equal(4);
    expect(rp.height).to.equal(4);
    expect(rp.parts.front.height).to.equal(4);
  });

  it("Should not pack a pattern with errors", () => {
    const pattern = new Pattern()
    pattern.events.error.push('error')
    pattern.pack()
    expect(pattern.events.warning.length).to.equal(1)
    expect(pattern.events.warning[0]).to.equal('One or more errors occured. Not packing pattern parts')
  });

  /*
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


  it("Should retrieve the cutList", () => {
    const Test = new Design({
      name: "test",
      parts: [{
        name: 'front',
        draft: function(part) {
          const { addCut } = part.shorthand()
          addCut(4, 'lining', true)
          return part
        }
      }],
    })
    const pattern = new Test()
    expect(JSON.stringify(pattern.getCutList())).to.equal(JSON.stringify({}))
    pattern.draft()
    const list = `{"front":{"grain":90,"materials":{"lining":{"cut":4,"identical":true}}}}`
    expect(JSON.stringify(pattern.getCutList())).to.equal(list)
  });
  */

  // 2022 style part inheritance
  // I am aware this does too much for one unit test, but this is to simplify TDD
  // we can split it up later
  it("Design constructor should resolve nested injections", () => {
    const partA = {
      name: "partA",
      options: { optionA: { bool: true } },
      measurements: [ 'measieA' ],
      optionalMeasurements: [ 'optmeasieA' ],
      draft: part => {
        const { points, Point, paths, Path } = part.shorthand()
        points.a1 = new Point(1,1)
        points.a2 = new Point(11,11)
        paths.a = new Path().move(points.a1).line(points.a2)
        return part
      }
    }
    const partB = {
      name: "partB",
      from: partA,
      options: { optionB: { pct: 12, min: 2, max: 20 } },
      measurements: [ 'measieB' ],
      optionalMeasurements: [ 'optmeasieB', 'measieA' ],
      draft: part => {
        const { points, Point, paths, Path } = part.shorthand()
        points.b1 = new Point(2,2)
        points.b2 = new Point(22,22)
        paths.b = new Path().move(points.b1).line(points.b2)
        return part
      }
    }
    const partC = {
      name: "partC",
      from: partB,
      options: { optionC: { deg: 5, min: 0, max: 15 } },
      measurements: [ 'measieC' ],
      optionalMeasurements: [ 'optmeasieC', 'measieA' ],
      draft: part => {
        const { points, Point, paths, Path } = part.shorthand()
        points.c1 = new Point(3,3)
        points.c2 = new Point(33,33)
        paths.c = new Path().move(points.c1).line(points.c2)
        return part
      }
    }
    const partR = { // R for runtime, which is when this wil be attached
      name: "partR",
      from: partA,
      after: partC,
      options: { optionR: { dflt: 'red', list: ['red', 'green', 'blue'] } },
      measurements: [ 'measieR' ],
      optionalMeasurements: [ 'optmeasieR', 'measieA' ],
      draft: part => {
        const { points, Point, paths, Path } = part.shorthand()
        points.r1 = new Point(4,4)
        points.r2 = new Point(44,44)
        paths.r = new Path().move(points.r1).line(points.r2)
        return part
      }
    }

    const design = new Design({ parts: [ partC ] });
    const pattern = new design().addPart(partR).draft()
    // Measurements
    expect(pattern.config.measurements.length).to.equal(4)
    expect(pattern.config.measurements.indexOf('measieA') === -1).to.equal(false)
    expect(pattern.config.measurements.indexOf('measieB') === -1).to.equal(false)
    expect(pattern.config.measurements.indexOf('measieC') === -1).to.equal(false)
    expect(pattern.config.measurements.indexOf('measieR') === -1).to.equal(false)
    // Optional measurements
    expect(pattern.config.optionalMeasurements.length).to.equal(4)
    expect(pattern.config.optionalMeasurements.indexOf('optmeasieA') === -1).to.equal(false)
    expect(pattern.config.optionalMeasurements.indexOf('optmeasieB') === -1).to.equal(false)
    expect(pattern.config.optionalMeasurements.indexOf('optmeasieC') === -1).to.equal(false)
    expect(pattern.config.optionalMeasurements.indexOf('optmeasieR') === -1).to.equal(false)
    expect(pattern.config.optionalMeasurements.indexOf('measieA') === -1).to.equal(true)
    // Options
    expect(pattern.config.options.optionA.bool).to.equal(true)
    expect(pattern.config.options.optionB.pct).to.equal(12)
    expect(pattern.config.options.optionB.min).to.equal(2)
    expect(pattern.config.options.optionB.max).to.equal(20)
    expect(pattern.config.options.optionC.deg).to.equal(5)
    expect(pattern.config.options.optionC.min).to.equal(0)
    expect(pattern.config.options.optionC.max).to.equal(15)
    expect(pattern.config.options.optionR.dflt).to.equal('red')
    expect(pattern.config.options.optionR.list[0]).to.equal('red')
    expect(pattern.config.options.optionR.list[1]).to.equal('green')
    expect(pattern.config.options.optionR.list[2]).to.equal('blue')
    // Dependencies
    expect(pattern.config.dependencies.partB[0]).to.equal('partA')
    expect(pattern.config.dependencies.partC[0]).to.equal('partB')
    expect(pattern.config.dependencies.partR[0]).to.equal('partC')
    expect(pattern.config.dependencies.partR[1]).to.equal('partA')
    // Inject
    expect(pattern.config.inject.partB).to.equal('partA')
    expect(pattern.config.inject.partC).to.equal('partB')
    expect(pattern.config.inject.partR).to.equal('partA')
    // Draft order
    expect(pattern.config.draftOrder[0]).to.equal('partA')
    expect(pattern.config.draftOrder[1]).to.equal('partB')
    expect(pattern.config.draftOrder[2]).to.equal('partC')
    expect(pattern.config.draftOrder[3]).to.equal('partR')
    // Points
    expect(pattern.parts.partA.points.a1.x).to.equal(1)
    expect(pattern.parts.partA.points.a1.y).to.equal(1)
    expect(pattern.parts.partA.points.a2.x).to.equal(11)
    expect(pattern.parts.partA.points.a2.y).to.equal(11)
    expect(pattern.parts.partB.points.b1.x).to.equal(2)
    expect(pattern.parts.partB.points.b1.y).to.equal(2)
    expect(pattern.parts.partB.points.b2.x).to.equal(22)
    expect(pattern.parts.partB.points.b2.y).to.equal(22)
    expect(pattern.parts.partC.points.c1.x).to.equal(3)
    expect(pattern.parts.partC.points.c1.y).to.equal(3)
    expect(pattern.parts.partC.points.c2.x).to.equal(33)
    expect(pattern.parts.partC.points.c2.y).to.equal(33)
    expect(pattern.parts.partR.points.r1.x).to.equal(4)
    expect(pattern.parts.partR.points.r1.y).to.equal(4)
    expect(pattern.parts.partR.points.r2.x).to.equal(44)
    expect(pattern.parts.partR.points.r2.y).to.equal(44)
    // Paths in partA
    expect(pattern.parts.partA.paths.a.ops[0].to.x).to.equal(1)
    expect(pattern.parts.partA.paths.a.ops[0].to.y).to.equal(1)
    expect(pattern.parts.partA.paths.a.ops[1].to.x).to.equal(11)
    expect(pattern.parts.partA.paths.a.ops[1].to.y).to.equal(11)
    // Paths in partB
    expect(pattern.parts.partB.paths.a.ops[0].to.x).to.equal(1)
    expect(pattern.parts.partB.paths.a.ops[0].to.y).to.equal(1)
    expect(pattern.parts.partB.paths.a.ops[1].to.x).to.equal(11)
    expect(pattern.parts.partB.paths.a.ops[1].to.y).to.equal(11)
    expect(pattern.parts.partB.paths.b.ops[0].to.x).to.equal(2)
    expect(pattern.parts.partB.paths.b.ops[0].to.y).to.equal(2)
    expect(pattern.parts.partB.paths.b.ops[1].to.x).to.equal(22)
    expect(pattern.parts.partB.paths.b.ops[1].to.y).to.equal(22)
    // Paths in partC
    expect(pattern.parts.partC.paths.a.ops[0].to.x).to.equal(1)
    expect(pattern.parts.partC.paths.a.ops[0].to.y).to.equal(1)
    expect(pattern.parts.partC.paths.a.ops[1].to.x).to.equal(11)
    expect(pattern.parts.partC.paths.a.ops[1].to.y).to.equal(11)
    expect(pattern.parts.partC.paths.b.ops[0].to.x).to.equal(2)
    expect(pattern.parts.partC.paths.b.ops[0].to.y).to.equal(2)
    expect(pattern.parts.partC.paths.b.ops[1].to.x).to.equal(22)
    expect(pattern.parts.partC.paths.b.ops[1].to.y).to.equal(22)
    expect(pattern.parts.partC.paths.c.ops[0].to.x).to.equal(3)
    expect(pattern.parts.partC.paths.c.ops[0].to.y).to.equal(3)
    expect(pattern.parts.partC.paths.c.ops[1].to.x).to.equal(33)
    expect(pattern.parts.partC.paths.c.ops[1].to.y).to.equal(33)
    // Paths in partR
    expect(pattern.parts.partC.paths.a.ops[0].to.x).to.equal(1)
    expect(pattern.parts.partC.paths.a.ops[0].to.y).to.equal(1)
    expect(pattern.parts.partC.paths.a.ops[1].to.x).to.equal(11)
    expect(pattern.parts.partC.paths.a.ops[1].to.y).to.equal(11)
    expect(pattern.parts.partR.paths.r.ops[0].to.x).to.equal(4)
    expect(pattern.parts.partR.paths.r.ops[0].to.y).to.equal(4)
    expect(pattern.parts.partR.paths.r.ops[1].to.x).to.equal(44)
    expect(pattern.parts.partR.paths.r.ops[1].to.y).to.equal(44)
  })

  it("Design constructor should resolve nested dependencies (2022)", () => {
    const partA = {
      name: "partA",
      options: { optionA: { bool: true } },
      measurements: [ 'measieA' ],
      optionalMeasurements: [ 'optmeasieA' ],
      draft: part => {
        const { points, Point, paths, Path } = part.shorthand()
        points.a1 = new Point(1,1)
        points.a2 = new Point(11,11)
        paths.a = new Path().move(points.a1).line(points.a2)
        return part
      }
    }
    const partB = {
      name: "partB",
      from: partA,
      options: { optionB: { pct: 12, min: 2, max: 20 } },
      measurements: [ 'measieB' ],
      optionalMeasurements: [ 'optmeasieB', 'measieA' ],
      draft: part => {
        const { points, Point, paths, Path } = part.shorthand()
        points.b1 = new Point(2,2)
        points.b2 = new Point(22,22)
        paths.b = new Path().move(points.b1).line(points.b2)
        return part
      }
    }
    const partC = {
      name: "partC",
      from: partB,
      options: { optionC: { deg: 5, min: 0, max: 15 } },
      measurements: [ 'measieC' ],
      optionalMeasurements: [ 'optmeasieC', 'measieA' ],
      draft: part => {
        const { points, Point, paths, Path } = part.shorthand()
        points.c1 = new Point(3,3)
        points.c2 = new Point(33,33)
        paths.c = new Path().move(points.c1).line(points.c2)
        return part
      }
    }
    const partD = {
      name: "partD",
      after: partC,
      options: { optionD: { dflt: 'red', list: ['red', 'green', 'blue'] } },
      measurements: [ 'measieD' ],
      optionalMeasurements: [ 'optmeasieD', 'measieA' ],
      draft: part => {
        const { points, Point, paths, Path } = part.shorthand()
        points.d1 = new Point(4,4)
        points.d2 = new Point(44,44)
        paths.d = new Path().move(points.d1).line(points.d2)
        return part
      }
    }
    const design = new Design({ parts: [ partD ] });
    const pattern = new design().draft()
    // Measurements
    expect(pattern.config.measurements.length).to.equal(4)
    expect(pattern.config.measurements.indexOf('measieA') === -1).to.equal(false)
    expect(pattern.config.measurements.indexOf('measieB') === -1).to.equal(false)
    expect(pattern.config.measurements.indexOf('measieC') === -1).to.equal(false)
    expect(pattern.config.measurements.indexOf('measieD') === -1).to.equal(false)
    // Optional measurements
    expect(pattern.config.optionalMeasurements.length).to.equal(4)
    expect(pattern.config.optionalMeasurements.indexOf('optmeasieA') === -1).to.equal(false)
    expect(pattern.config.optionalMeasurements.indexOf('optmeasieB') === -1).to.equal(false)
    expect(pattern.config.optionalMeasurements.indexOf('optmeasieC') === -1).to.equal(false)
    expect(pattern.config.optionalMeasurements.indexOf('optmeasieD') === -1).to.equal(false)
    expect(pattern.config.optionalMeasurements.indexOf('measieA') === -1).to.equal(true)
    // Options
    expect(pattern.config.options.optionA.bool).to.equal(true)
    expect(pattern.config.options.optionB.pct).to.equal(12)
    expect(pattern.config.options.optionB.min).to.equal(2)
    expect(pattern.config.options.optionB.max).to.equal(20)
    expect(pattern.config.options.optionC.deg).to.equal(5)
    expect(pattern.config.options.optionC.min).to.equal(0)
    expect(pattern.config.options.optionC.max).to.equal(15)
    expect(pattern.config.options.optionD.dflt).to.equal('red')
    expect(pattern.config.options.optionD.list[0]).to.equal('red')
    expect(pattern.config.options.optionD.list[1]).to.equal('green')
    expect(pattern.config.options.optionD.list[2]).to.equal('blue')
    // Dependencies
    expect(pattern.config.dependencies.partB[0]).to.equal('partA')
    expect(pattern.config.dependencies.partC[0]).to.equal('partB')
    expect(pattern.config.dependencies.partD[0]).to.equal('partC')
    // Inject
    expect(pattern.config.inject.partB).to.equal('partA')
    expect(pattern.config.inject.partC).to.equal('partB')
    // Draft order
    expect(pattern.config.draftOrder[0]).to.equal('partA')
    expect(pattern.config.draftOrder[1]).to.equal('partB')
    expect(pattern.config.draftOrder[2]).to.equal('partC')
    expect(pattern.config.draftOrder[3]).to.equal('partD')
    // Points
    expect(pattern.parts.partA.points.a1.x).to.equal(1)
    expect(pattern.parts.partA.points.a1.y).to.equal(1)
    expect(pattern.parts.partA.points.a2.x).to.equal(11)
    expect(pattern.parts.partA.points.a2.y).to.equal(11)
    expect(pattern.parts.partB.points.b1.x).to.equal(2)
    expect(pattern.parts.partB.points.b1.y).to.equal(2)
    expect(pattern.parts.partB.points.b2.x).to.equal(22)
    expect(pattern.parts.partB.points.b2.y).to.equal(22)
    expect(pattern.parts.partC.points.c1.x).to.equal(3)
    expect(pattern.parts.partC.points.c1.y).to.equal(3)
    expect(pattern.parts.partC.points.c2.x).to.equal(33)
    expect(pattern.parts.partC.points.c2.y).to.equal(33)
    expect(pattern.parts.partD.points.d1.x).to.equal(4)
    expect(pattern.parts.partD.points.d1.y).to.equal(4)
    expect(pattern.parts.partD.points.d2.x).to.equal(44)
    expect(pattern.parts.partD.points.d2.y).to.equal(44)
    // Paths in partA
    expect(pattern.parts.partA.paths.a.ops[0].to.x).to.equal(1)
    expect(pattern.parts.partA.paths.a.ops[0].to.y).to.equal(1)
    expect(pattern.parts.partA.paths.a.ops[1].to.x).to.equal(11)
    expect(pattern.parts.partA.paths.a.ops[1].to.y).to.equal(11)
    // Paths in partB
    expect(pattern.parts.partB.paths.a.ops[0].to.x).to.equal(1)
    expect(pattern.parts.partB.paths.a.ops[0].to.y).to.equal(1)
    expect(pattern.parts.partB.paths.a.ops[1].to.x).to.equal(11)
    expect(pattern.parts.partB.paths.a.ops[1].to.y).to.equal(11)
    expect(pattern.parts.partB.paths.b.ops[0].to.x).to.equal(2)
    expect(pattern.parts.partB.paths.b.ops[0].to.y).to.equal(2)
    expect(pattern.parts.partB.paths.b.ops[1].to.x).to.equal(22)
    expect(pattern.parts.partB.paths.b.ops[1].to.y).to.equal(22)
    // Paths in partC
    expect(pattern.parts.partC.paths.a.ops[0].to.x).to.equal(1)
    expect(pattern.parts.partC.paths.a.ops[0].to.y).to.equal(1)
    expect(pattern.parts.partC.paths.a.ops[1].to.x).to.equal(11)
    expect(pattern.parts.partC.paths.a.ops[1].to.y).to.equal(11)
    expect(pattern.parts.partC.paths.b.ops[0].to.x).to.equal(2)
    expect(pattern.parts.partC.paths.b.ops[0].to.y).to.equal(2)
    expect(pattern.parts.partC.paths.b.ops[1].to.x).to.equal(22)
    expect(pattern.parts.partC.paths.b.ops[1].to.y).to.equal(22)
    expect(pattern.parts.partC.paths.c.ops[0].to.x).to.equal(3)
    expect(pattern.parts.partC.paths.c.ops[0].to.y).to.equal(3)
    expect(pattern.parts.partC.paths.c.ops[1].to.x).to.equal(33)
    expect(pattern.parts.partC.paths.c.ops[1].to.y).to.equal(33)
    // Paths in partR
    expect(pattern.parts.partD.paths.d.ops[0].to.x).to.equal(4)
    expect(pattern.parts.partD.paths.d.ops[0].to.y).to.equal(4)
    expect(pattern.parts.partD.paths.d.ops[1].to.x).to.equal(44)
    expect(pattern.parts.partD.paths.d.ops[1].to.y).to.equal(44)
  })

  it("Pattern should load single plugin", () => {
    const plugin = {
      name: "example",
      version: 1,
      hooks: {
        preRender: function(svg, attributes) {
          svg.attributes.add("freesewing:plugin-example", version);
        }
      }
    };

    const part = {
      name: 'test.part',
      plugins: plugin,
      draft: (part) => part
    }
    const design = new Design({ parts: [ part ] })
    const pattern = new design();
    pattern.init()
    expect(pattern.hooks.preRender.length).to.equal(1);
  });
/*
  it("Design constructor should load array of plugins", () => {
    let plugin1 = {
      name: "example1",
      version: 1,
      hooks: {
        preRender: function(svg, attributes) {
          svg.attributes.add("freesewing:plugin-example1", version);
        }
      }
    };
    let plugin2 = {
      name: "example2",
      version: 2,
      hooks: {
        preRender: function(svg, attributes) {
          svg.attributes.add("freesewing:plugin-example2", version);
        }
      }
    };

    let design = new Design( { plugins: [plugin1, plugin2] });
    let pattern = new design();
    expect(pattern.hooks.preRender.length).to.equal(2);
  });
  it("Design constructor should load conditional plugin", () => {
    const plugin = {
      name: "example",
      version: 1,
      hooks: {
        preRender: function(svg, attributes) {
          svg.attributes.add("freesewing:plugin-example", version);
        }
      }
    };
    const condition = () => true
    const design = new Design({ plugins: { plugin, condition } });
    const pattern = new design();
    expect(pattern.hooks.preRender.length).to.equal(1);
  });

  it("Design constructor should not load conditional plugin", () => {
    const plugin = {
      name: "example",
      version: 1,
      hooks: {
        preRender: function(svg, attributes) {
          svg.attributes.add("freesewing:plugin-example", version);
        }
      }
    };
    const condition = () => false
    const design = new Design({ plugins: { plugin, condition } });
    const pattern = new design();
    expect(pattern.hooks.preRender.length).to.equal(0);
  });

  it("Design constructor should load multiple conditional plugins", () => {
    const plugin = {
      name: "example",
      version: 1,
      hooks: {
        preRender: function(svg, attributes) {
          svg.attributes.add("freesewing:plugin-example", version);
        }
      }
    };
    const condition1 = () => true
    const condition2 = () => false
    const design = new Design({ plugins:  [
      { plugin, condition: condition1 },
      { plugin, condition: condition2 },
    ]});
    const pattern = new design();
    expect(pattern.hooks.preRender.length).to.equal(1);
*/
})

