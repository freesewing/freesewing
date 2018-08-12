let expect = require("chai").expect;
let freesewing = require("../dist/index.js");

it("Pattern constructor should initialize object", () => {
  let pattern = new freesewing.Pattern({
    foo: "bar",
    options: {
      constant: 2,
      percentage: { val: 30, min: 0, max: 100 }
    }
  });
  expect(pattern.width).to.equal(false);
  expect(pattern.height).to.equal(false);
  expect(pattern.settings.mode).to.equal("draft");
  expect(pattern.parts).to.eql({});
  expect(pattern.config.units).to.equal("metric");
  expect(pattern.config.foo).to.equal("bar");
  expect(pattern.options.constant).to.equal(2);
  expect(pattern.options.percentage).to.equal(0.3);
});

it("Should throw exception upon draft", () => {
  let pattern = new freesewing.Pattern();
  // Can't test a throw unless we wrap it in an anonymous function
  expect(() => pattern.draft()).to.throw();
});

it("Should sample an option", () => {
  let pattern = new freesewing.Pattern({
    options: {
      len: { val: 30, min: 0, max: 100 },
      bonus: 10
    }
  });
  pattern.draft = function() {
    pattern.parts.a = new pattern.Part();
    pattern.parts.b = new pattern.Part();
    let a = pattern.parts.a;
    a.points.from = new a.Point(0, 0);
    a.points.to = new a.Point(
      100 * a.context.options.len,
      a.context.options.bonus
    );
    a.paths.test = new a.Path().move(a.points.from).line(a.points.to);
    pattern.parts.b.copy(a);
  };
  pattern.settings.sample = {
    type: "option",
    option: "len"
  };
  pattern.sample();
  expect(pattern.parts.a.paths.test_1.render).to.equal(true);
  expect(pattern.parts.b.paths.test_10.ops[1].to.y).to.equal(10);
  expect(() => pattern.sampleOption("bonus")).to.throw();
});

it("Should sample a measurement", () => {
  let pattern = new freesewing.Pattern();
  pattern.settings.measurements = { headToToe: 1980 };
  pattern.draft = function() {
    pattern.parts.a = new pattern.Part();
    pattern.parts.b = new pattern.Part();
    let a = pattern.parts.a;
    a.points.from = new a.Point(0, 0);
    a.points.to = new a.Point(10, a.context.config.measurements.headToToe);
    a.paths.test = new a.Path().move(a.points.from).line(a.points.to);
    pattern.parts.b.copy(a);
  };
  pattern.settings.sample = {
    type: "measurement",
    measurement: "headToToe"
  };
  pattern.sample();
  expect(pattern.parts.a.paths.test_1.render).to.equal(true);
  expect(pattern.parts.b.paths.test_10.ops[1].to.x).to.equal(10);
  expect(() => pattern.sampleMeasurement("unknown")).to.throw();
});

it("Should sample models", () => {
  let pattern = new freesewing.Pattern();
  pattern.draft = function() {
    pattern.parts.a = new pattern.Part();
    pattern.parts.b = new pattern.Part();
    let a = pattern.parts.a;
    a.points.from = new a.Point(0, 0);
    a.points.to = new a.Point(10, a.context.config.measurements.headToToe);
    a.paths.test = new a.Path().move(a.points.from).line(a.points.to);
    pattern.parts.b.copy(a);
  };
  pattern.settings.sample = {
    type: "models",
    models: {
      a: { headToToe: 1980 },
      b: { headToToe: 1700 }
    }
  };
  pattern.sample();
  expect(pattern.parts.a.paths.test_1.render).to.equal(true);
  expect(pattern.parts.b.paths.test_2.ops[1].to.x).to.equal(10);
});

it("Should register a hook via on", () => {
  let pattern = new freesewing.Pattern();
  let count = 0;
  pattern.draft = () => {};
  pattern.on("preDraft", function(next) {
    count++;
    next();
  });
  pattern.draft();
  expect(count).to.equal(1);
});

it("Should register a hook from a plugin", () => {
  let pattern = new freesewing.Pattern();
  let count = 0;
  pattern.draft = () => {};
  let plugin = {
    name: "test",
    version: "0.1-test",
    hooks: {
      preDraft: function(next) {
        count++;
        next();
      }
    }
  };
  pattern.with(plugin);
  pattern.draft();
  expect(count).to.equal(1);
});
