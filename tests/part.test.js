let expect = require("chai").expect;
let freesewing = require("../dist/index.js");

it("Svg constructor should initialize object", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  expect(part.paths).to.eql({});
  expect(part.snippets).to.eql({});
  expect(part.freeId).to.equal(0);
  expect(part.topLeft).to.equal(false);
  expect(part.bottomRight).to.equal(false);
  expect(part.width).to.equal(false);
  expect(part.height).to.equal(false);
  expect(part.render).to.equal(true);
  expect(part.points.origin.x).to.equal(0);
  expect(part.points.origin.y).to.equal(0);
});

it("Should return a function from macroClosure", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  expect(typeof part.macroClosure()).to.equal("function");
});

it("Should no run an unknown macro", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  let macro = part.macroClosure();
  expect(macro("unknown")).to.equal(undefined);
});

it("Should register and run a macro", () => {
  let pattern = new freesewing.Pattern();
  let plugin = {
    name: "test",
    version: "0.1-test",
    macros: {
      test: function(so) {
        let points = this.points;
        points.macro = new this.Point(so.x, so.y);
      }
    }
  };
  pattern.with(plugin);
  let part = new pattern.Part();
  let macro = part.macroClosure();
  macro("test", { x: 123, y: 456 });
  expect(part.points.macro.x).to.equal(123);
  expect(part.points.macro.y).to.equal(456);
});

it("Should run debug", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  let debug = part.debugClosure();
  expect(typeof debug).to.equal("function");
  let d = 1;
  let e = 11;
  let b = 111;
  let u = 1111;
  let g = 11111;
  expect(debug(d, e, b, u, g)).to.equal(undefined);
});

it("Should return a free ID", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  let free = part.getUid();
  expect(part.getUid()).to.equal("" + (parseInt(free) + 1));
});

it("Should return a function from unitsClosure", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  expect(typeof part.unitsClosure()).to.equal("function");
});

it("Should convert units", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  let units = part.unitsClosure();
  expect(units(123.456)).to.equal("12.35cm");
  expect(part.units(123.456)).to.equal("12.35cm");
});

it("Should set part attributes", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  part.attr("foo", "bar");
  expect(part.attributes.get("foo")).to.equal("bar");
  part.attr("foo", "baz");
  expect(part.attributes.get("foo")).to.equal("bar baz");
  part.attr("foo", "schmoo", true);
  expect(part.attributes.get("foo")).to.equal("schmoo");
});

it("Should copy an part", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  part.points.origin.x = 16;
  part.points.foo = new part.Point(12, 23);
  let test = new pattern.Part();
  test.copy(part);
  expect(test.points.origin.x).to.equal(0);
  expect(test.points.foo.x).to.equal(12);
});

it("Should return shorthand", () => {
  let pattern = new freesewing.Pattern();
  pattern.settings.mode = "draft";
  pattern.settings.paperless = true;
  let part = new pattern.Part();
  let short = part.shorthand();
  expect(short.final).to.equal(true);
  expect(short.paperless).to.equal(true);
});
