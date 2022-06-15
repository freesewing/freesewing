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
});

it("Should return a function from macroClosure", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  expect(typeof part.macroClosure()).to.equal("function");
});

it("Should not run an unknown macro", () => {
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
  pattern.use(plugin);
  let part = new pattern.Part();
  let macro = part.macroClosure();
  macro("test", { x: 123, y: 456 });
  expect(part.points.macro.x).to.equal(123);
  expect(part.points.macro.y).to.equal(456);
});

it("Should return a free ID", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  let free = part.getId();
  expect(part.getId()).to.equal("" + (parseInt(free) + 1));
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

it("Should inject a part", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  part.points.foo = new part.Point(12, 23);
  let test = new pattern.Part();
  test.inject(part);
  expect(test.points.foo.x).to.equal(12);
  expect(test.points.foo.y).to.equal(23);
});

it("Should return shorthand", () => {
  let pattern = new freesewing.Pattern();
  pattern.settings.mode = "draft";
  pattern.settings.paperless = true;
  let part = new pattern.Part();
  let short = part.shorthand();
  expect(short.complete).to.equal(true);
  expect(short.paperless).to.equal(true);
});
/*
it("Should not allow a margin below 10 for paperless patterns", () => {
  let pattern = new freesewing.Pattern();
  pattern.settings.paperless = true;
  pattern.settings.margin = 2;
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  a.points.a = new pattern.Point(0,0);
  a.points.b = new pattern.Point(0,100);
  a.paths.a = new pattern.Path()
    .move(a.points.a)
    .line(a.points.b);
  pattern.draft();
  expect(pattern.width).to.equal(120);
});
*/
it("Should calculate the part boundary with default margin", () => {
  let pattern = new freesewing.Pattern();
  pattern.settings.mode = "draft";
  let part = new pattern.Part();
  let short = part.shorthand();
  part.points.from = new short.Point(123, 456);
  part.points.to = new short.Point(19, 76);
  part.paths.test = new short.Path()
    .move(part.points.from)
    .line(part.points.to);
  let boundary = part.boundary();
  expect(boundary.topLeft.x).to.equal(17);
  expect(boundary.topLeft.y).to.equal(74);
  expect(boundary.bottomRight.x).to.equal(125);
  expect(boundary.bottomRight.y).to.equal(458);
  boundary = part.boundary();
  expect(boundary.width).to.equal(108);
  expect(boundary.height).to.equal(384);
});

it("Should calculate the part boundary with custom margin", () => {
  let pattern = new freesewing.Pattern();
  pattern.settings.mode = "draft";
  pattern.settings.margin = 5;
  let part = new pattern.Part();
  let short = part.shorthand();
  part.points.from = new short.Point(123, 456);
  part.points.to = new short.Point(19, 76);
  part.paths.test = new short.Path()
    .move(part.points.from)
    .line(part.points.to);
  let boundary = part.boundary();
  expect(boundary.topLeft.x).to.equal(14);
  expect(boundary.topLeft.y).to.equal(71);
  expect(boundary.bottomRight.x).to.equal(128);
  expect(boundary.bottomRight.y).to.equal(461);
  boundary = part.boundary();
  expect(boundary.width).to.equal(114);
  expect(boundary.height).to.equal(390);
});

it("Should calculate the part boundary for paperless", () => {
  let pattern = new freesewing.Pattern();
  pattern.settings.mode = "draft";
  pattern.settings.margin = 5;
  pattern.settings.paperless = true;
  let part = new pattern.Part();
  let short = part.shorthand();
  part.points.from = new short.Point(123, 456);
  part.points.to = new short.Point(19, 76);
  part.paths.test = new short.Path()
    .move(part.points.from)
    .line(part.points.to);
  let boundary = part.boundary();
  expect(boundary.topLeft.x).to.equal(9);
  expect(boundary.topLeft.y).to.equal(66);
  expect(boundary.bottomRight.x).to.equal(133);
  expect(boundary.bottomRight.y).to.equal(466);
  boundary = part.boundary();
  expect(boundary.width).to.equal(124);
  expect(boundary.height).to.equal(400);
});

it("Should stack a part", () => {
  let pattern = new freesewing.Pattern();
  pattern.settings.mode = "draft";
  let part = new pattern.Part();
  let short = part.shorthand();
  part.points.from = new short.Point(123, 456);
  part.points.to = new short.Point(19, 76);
  part.paths.test = new short.Path()
    .move(part.points.from)
    .line(part.points.to);
  part.stack();
  expect(part.attributes.get("transform")).to.equal("translate(-17, -74)");
});

it("Should only stack a part if needed", () => {
  let pattern = new freesewing.Pattern();
  pattern.settings.mode = "draft";
  let part = new pattern.Part();
  let short = part.shorthand();
  part.points.from = new short.Point(2, 2);
  part.points.to = new short.Point(19, 76);
  part.paths.test = new short.Path()
    .move(part.points.from)
    .line(part.points.to);
  part.stack();
  expect(part.attributes.get("transform")).to.equal(false);
  part.stack();
  expect(part.attributes.get("transform")).to.equal(false);
});
