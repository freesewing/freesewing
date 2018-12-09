let expect = require("chai").expect;
let freesewing = require("./dist/index.js");

it("Pattern constructor should initialize object", () => {
  let pattern = new freesewing.Pattern({
    foo: "bar",
    options: {
      constant: 2,
      percentage: { pct: 30, min: 0, max: 100 }
    }
  });
  expect(pattern.width).to.equal(false);
  expect(pattern.height).to.equal(false);
  expect(pattern.settings.complete).to.equal(true);
  expect(pattern.parts).to.eql({});
  expect(pattern.settings.units).to.equal("metric");
  expect(pattern.config.foo).to.equal("bar");
  expect(pattern.options.constant).to.equal(2);
  expect(pattern.options.percentage).to.equal(0.3);
});

it("Should throw exception upon draft", () => {
  let pattern = new freesewing.Pattern();
  // Can't test a throw unless we wrap it in an anonymous function
  expect(() => pattern.draft()).to.throw();
});

it("Should load percentage options", () => {
  let pattern = new freesewing.Pattern({
    options: {
      test: { pct: 30 }
    }
  });
  expect(pattern.options.test).to.equal(0.3);
});

it("Should load millimeter options", () => {
  let pattern = new freesewing.Pattern({
    options: {
      test: { mm: 30 }
    }
  });
  expect(pattern.options.test).to.equal(30);
});

it("Should load degree options", () => {
  let pattern = new freesewing.Pattern({
    options: {
      test: { deg: 15 }
    }
  });
  expect(pattern.options.test).to.equal(15);
});

it("Should load an array option", () => {
  let pattern = new freesewing.Pattern({
    options: {
      test: { dflt: "foo" }
    }
  });
  expect(pattern.options.test).to.equal("foo");
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

it("Should sample models with focus", () => {
  let pattern = new freesewing.Pattern();
  pattern.draft = function() {
    pattern.parts.a = new pattern.Part();
    pattern.parts.b = new pattern.Part();
    let a = pattern.parts.a;
    a.points.from = new a.Point(0, 0);
    a.points.to = new a.Point(10, a.context.config.measurements.headToToe);
    a.points.anchor = new a.Point(20, 30);
    a.paths.test = new a.Path().move(a.points.from).line(a.points.to);
    pattern.parts.b.copy(a);
  };
  pattern.settings.sample = {
    type: "models",
    focus: "a",
    models: {
      a: { headToToe: 1980 },
      b: { headToToe: 1700 }
    }
  };
  pattern.sample();
  expect(pattern.parts.a.paths.test_1.render).to.equal(true);
  expect(pattern.parts.b.paths.test_2.ops[1].to.x).to.equal(10);
  expect(pattern.parts.a.paths.test_1.attributes.get("class")).to.equal(
    "sample-focus"
  );
  expect(pattern.parts.b.paths.test_2.attributes.get("style")).to.equal(
    "stroke: hsl(165, 100%, 35%);"
  );
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
  pattern.with(plugin);
  pattern.draft();
  expect(count).to.equal(1);
});

it("Should check whether a part is needed", () => {
  let pattern = new freesewing.Pattern();
  pattern.settings.only = "test";
  expect(pattern.needs("test")).to.equal(true);
  expect(pattern.needs("tes")).to.equal(false);
});

it("Should check whether an array of parts is needed", () => {
  let pattern = new freesewing.Pattern();
  pattern.settings.only = "test";
  expect(pattern.needs(["foo", "bar", "test"])).to.equal(true);
  expect(pattern.needs(["foo", "bar", "mist"])).to.equal(false);
});

it("Should check whether a parts is needed with array", () => {
  let pattern = new freesewing.Pattern();
  pattern.settings.only = ["test", "foo", "bar"];
  expect(pattern.needs("foo")).to.equal(true);
  expect(pattern.needs(["mist", "hugs"])).to.equal(false);
});

it("Should check whether a parts is strictly needed", () => {
  let pattern = new freesewing.Pattern();
  expect(pattern.needs("foo")).to.equal(true);
  expect(pattern.needs("foo", true)).to.equal(false);
  pattern.settings.only = ["test", "foo", "bar"];
  expect(pattern.needs("foo")).to.equal(true);
  expect(pattern.needs("foo", true)).to.equal(true);
});

it("Should check whether created parts get the pattern context", () => {
  let pattern = new freesewing.Pattern();
  let part = pattern.createPart();
  expect(part.context).to.equal(pattern.context);
});
