let expect = require("chai").expect;
let freesewing = require("../dist/index.js");

it("Pattern constructor should initialize object", () => {
  let pattern = new freesewing.Pattern({
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
  let pattern = new freesewing.Pattern({
    options: {
      test: { pct: 30 }
    }
  });
  expect(pattern.settings.options.test).to.equal(0.3);
});

it("Should load millimeter options", () => {
  let pattern = new freesewing.Pattern({
    options: {
      test: { mm: 30 }
    }
  });
  expect(pattern.settings.options.test).to.equal(30);
});

it("Should load degree options", () => {
  let pattern = new freesewing.Pattern({
    options: {
      test: { deg: 15 }
    }
  });
  expect(pattern.settings.options.test).to.equal(15);
});

it("Should load an array option", () => {
  let pattern = new freesewing.Pattern({
    options: {
      test: { dflt: "foo" }
    }
  });
  expect(pattern.settings.options.test).to.equal("foo");
});

it("Should load a count option", () => {
  let pattern = new freesewing.Pattern({
    options: {
      test: { count: 3 }
    }
  });
  expect(pattern.settings.options.test).to.equal(3);
});

it("Should load a boolean option", () => {
  let pattern = new freesewing.Pattern({
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
      new freesewing.Pattern({
        options: {
          test: { foo: "bar" }
        }
      })
  ).to.throw();
});

it("Should merge settings with default settings", () => {
  let pattern = new freesewing.Pattern();
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
  const Test = new freesewing.Design({
    name: "test",
    dependencies: { back: "front" },
    inject: { back: "front" },
    hide: ["back"]
  });
  Test.prototype.draftBack = function(part) {
    this.count++;
    return part;
  };
  Test.prototype.draftFront = function(part) {
    this.count++;
    return part;
  };

  let pattern = new Test();
  pattern.count = 0;
  pattern.draft();
  expect(pattern.count).to.equal(2);
});

it("Should throw an error if per-part draft method is missing", () => {
  const Test = new freesewing.Design({
    name: "test",
    dependencies: { back: "front" },
    inject: { back: "front" },
    hide: ["back"]
  });
  Test.prototype.draftBack = part => part;
  let pattern = new Test();
  expect(() => pattern.draft()).to.throw();
});

it("Should sample an option", () => {
  let pattern = new freesewing.Pattern({
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

it("Should sample a list option", () => {
  const Test = new freesewing.Design({
    name: "test",
    parts: ['front'],
    options: {
      len: {
        dflt: 1,
        list: [1,2,3]
      }
    },
  })
  Test.prototype.draftFront = function(part) {
    const { Point, points, Path, paths, options } = part.shorthand()
    points.from = new Point(0, 0);
    points.to = new Point( 100 * options.len, 0)
    paths.line = new Path()
      .move(points.from)
      .line(points.to)

    return part
  };
  const pattern = new Test({
    sample: {
      type: 'option',
      option: 'len'
    }
  })
  pattern.sample();
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
  let pattern = new freesewing.Pattern();
  let count = 0;
  pattern._draft = () => {};
  pattern.on("preDraft", function(pattern) {
    count++;
  });
  pattern.draft();
  expect(count).to.equal(1);
});

it("Should register a hook from a plugin", () => {
  let pattern = new freesewing.Pattern();
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
  let pattern = new freesewing.Pattern();
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

it("Should check whether a part is needed", () => {
  let config = {
    name: "test",
    dependencies: { back: "front", side: "back" },
    inject: { back: "front" },
    hide: ["back"]
  };
  const Test = function(settings = false) {
    freesewing.Pattern.call(this, config);
    return this;
  };
  Test.prototype = Object.create(freesewing.Pattern.prototype);
  Test.prototype.constructor = Test;
  Test.prototype.draftBack = function(part) {
    return part;
  };
  Test.prototype.draftFront = function(part) {
    return part;
  };

  let pattern = new Test();
  pattern.settings.only = "back";
  expect(pattern.needs("back")).to.equal(true);
  expect(pattern.needs("front")).to.equal(true);
  expect(pattern.needs("side")).to.equal(false);
  pattern.settings.only = ["back", "side"];
  expect(pattern.needs("back")).to.equal(true);
  expect(pattern.needs("front")).to.equal(true);
  expect(pattern.needs("side")).to.equal(true);
});

it("Should check whether a part is wanted", () => {
  let config = {
    name: "test",
    dependencies: { back: "front", side: "back" },
    inject: { back: "front" },
    hide: ["back"]
  };
  const Test = function(settings = false) {
    freesewing.Pattern.call(this, config);
    return this;
  };
  Test.prototype = Object.create(freesewing.Pattern.prototype);
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
  const Test = function(settings = false) {
    freesewing.Pattern.call(this, config);
    return this;
  };
  Test.prototype = Object.create(freesewing.Pattern.prototype);
  Test.prototype.constructor = Test;
  Test.prototype.draftBack = function(part) {
    return part;
  };
  Test.prototype.draftFront = function(part) {
    return part;
  };

  let pattern = new Test();
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
    freesewing.Pattern.call(this, config);
    return this;
  };
  Test.prototype = Object.create(freesewing.Pattern.prototype);
  Test.prototype.constructor = Test;
  Test.prototype.draftBack = function(part) {
    return part;
  };
  Test.prototype.draftFront = function(part) {
    return part;
  };

  let pattern = new Test();
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
    freesewing.Pattern.call(this, config);
    return this;
  };
  Test.prototype = Object.create(freesewing.Pattern.prototype);
  Test.prototype.constructor = Test;
  Test.prototype.draftBack = function(part) {
    return part;
  };
  Test.prototype.draftFront = function(part) {
    return part;
  };

  let pattern = new Test();
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
    freesewing.Pattern.call(this, config);
    return this;
  };
  Test.prototype = Object.create(freesewing.Pattern.prototype);
  Test.prototype.constructor = Test;
  Test.prototype.draftBack = function(part) {
    return part;
  };
  Test.prototype.draftFront = function(part) {
    return part;
  };

  let pattern = new Test();
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
    freesewing.Pattern.call(this, config);
    return this;
  };
  Test.prototype = Object.create(freesewing.Pattern.prototype);
  Test.prototype.constructor = Test;
  Test.prototype.draftBack = function(part) {
    return part;
  };
  Test.prototype.draftFront = function(part) {
    return part;
  };

  let pattern = new Test();
  const deps = pattern.resolveDependencies()
  expect(pattern.config.draftOrder[0]).to.equal('side');
  expect(pattern.config.draftOrder[1]).to.equal('back');
  expect(pattern.config.draftOrder[2]).to.equal('front');
});

it("Should check whether created parts get the pattern context", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  expect(part.context.settings).to.equal(pattern.settings);
});

it("Should correctly merge settings", () => {
  let pattern = new freesewing.Pattern();
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
  let pattern = new freesewing.Pattern();
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
  const Test = new freesewing.Design({
    name: "test",
    parts: ['front'],
  });
  Test.prototype.draftFront = function(part) {
    return part;
  };
  const pattern = new Test()
  pattern.draft();
  const rp = pattern.getRenderProps()
  expect(rp.svg.body).to.equal('');
  expect(rp.width).to.equal(4);
  expect(rp.height).to.equal(4);
  expect(rp.parts.front.height).to.equal(4);
});

it("Should not pack a pattern with errors", () => {
  const pattern = new freesewing.Pattern()
  pattern.events.error.push('error')
  pattern.pack()
  expect(pattern.events.warning.length).to.equal(1)
  expect(pattern.events.warning[0]).to.equal('One or more errors occured. Not packing pattern parts')
});

it("Should handle custom layouts", () => {
  const Test = new freesewing.Design({ name: "test", parts: ['front'] })
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
  const Test = new freesewing.Design({
    name: "test",
    parts: ['front'],
    measurements: [ 'head' ],
    options: {
      len: { pct: 50, min: 22, max: 78, snap: 10, ...freesewing.pctBasedOn('head') }
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
  const Test = new freesewing.Design({
    name: "test",
    parts: ['front'],
    measurements: [ 'head' ],
    options: {
      len: { pct: 50, min: 22, max: 78, snap: [10,14,19,28], ...freesewing.pctBasedOn('head') }
    }
  })
  Test.prototype.draftFront = function(part) {
    const { Point, points, Path, paths, absoluteOptions } = part.shorthand()
    points.from = new Point(0, 0);
    points.to = new Point( absoluteOptions.len, 0)
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
  expect(pattern.parts.front.paths.line_1.ops[1].to.x).to.equal(10);
  expect(pattern.parts.front.paths.line_2.ops[1].to.x).to.equal(14);
  expect(pattern.parts.front.paths.line_3.ops[1].to.x).to.equal(14);
  expect(pattern.parts.front.paths.line_4.ops[1].to.x).to.equal(19);
  expect(pattern.parts.front.paths.line_5.ops[1].to.x).to.equal(19);
  expect(pattern.parts.front.paths.line_6.ops[1].to.x).to.equal(19);
  expect(pattern.parts.front.paths.line_7.ops[1].to.x).to.equal(28);
  expect(pattern.parts.front.paths.line_8.ops[1].to.x).to.equal(28);
  expect(pattern.parts.front.paths.line_9.ops[1].to.x).to.equal(28);
  expect(freesewing.utils.round(pattern.parts.front.paths.line_10.ops[1].to.x)).to.equal(33.72);
});


it("Should retrieve the cutList", () => {
  const Test = new freesewing.Design({
    name: "test",
    parts: ['front'],
  })
  Test.prototype.draftFront = function(part) {
    part.addCut(4, 'lining', true)

    return part
  };
  const pattern = new Test()
  expect(JSON.stringify(pattern.getCutList())).to.equal(JSON.stringify({}))
  pattern.draft()
  const list = `{"front":{"grain":90,"materials":{"lining":{"cut":4,"identical":true}}}}`
  expect(JSON.stringify(pattern.getCutList())).to.equal(list)
});

