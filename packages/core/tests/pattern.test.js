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
      len: { pct: 30, min: 0, max: 100 },
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
