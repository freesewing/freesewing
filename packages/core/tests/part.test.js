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
  part.points.a = new part.Point(12, 23);
  part.points.b = new part.Point(10, 10);
  part.points.c = new part.Point(20, 20);
  part.paths.bar = new freesewing.Path()
    .move(part.points.a)
    .line(part.points.b)
    .curve(part.points.c, part.points.b, part.points.a)
  const { Snippet, snippets } = part.shorthand()
  snippets.d = new Snippet('notch', part.points.a)
  let test = new pattern.Part();
  test.inject(part);
  expect(test.points.a.x).to.equal(12);
  expect(test.points.a.y).to.equal(23);
  expect(test.paths.bar.ops.length).to.equal(3)
  for (let i=0;i<3;i++) {
    expect(test.paths.bar.ops[i].type).to.equal(part.paths.bar.ops[i].type)
    expect(test.paths.bar.ops[i].to.x).to.equal(part.paths.bar.ops[i].to.x)
    expect(test.paths.bar.ops[i].to.y).to.equal(part.paths.bar.ops[i].to.y)
  }
  expect(test.snippets.d.anchor.x).to.equal(part.points.a.x)
  expect(test.snippets.d.anchor.y).to.equal(part.points.a.y)
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

it("Should raise a warning when setting a non-Point value in points", () => {
  const pattern = new freesewing.Pattern();
  pattern.settings.mode = "draft";
  const part = new pattern.Part();
  const { points } = part.shorthand()
  points.a = 'banana'
  expect(pattern.events.warning.length).to.equal(3)
  expect(pattern.events.warning[0]).to.equal('`points.a` was set with a value that is not a `Point` object')
  expect(pattern.events.warning[1]).to.equal('`points.a` was set with a `x` parameter that is not a `number`')
  expect(pattern.events.warning[2]).to.equal('`points.a` was set with a `y` parameter that is not a `number`')
});

it("Should raise a warning when setting a non-Snippet value in snippets", () => {
  const pattern = new freesewing.Pattern();
  pattern.settings.mode = "draft";
  const part = new pattern.Part();
  const { snippets } = part.shorthand()
  snippets.a = 'banana'
  expect(pattern.events.warning.length).to.equal(3)
  expect(pattern.events.warning[0]).to.equal('`snippets.a` was set with a value that is not a `Snippet` object')
  expect(pattern.events.warning[1]).to.equal('`snippets.a` was set with a `def` parameter that is not a `string`')
  expect(pattern.events.warning[2]).to.equal('`snippets.a` was set with an `anchor` parameter that is not a `Point`')
});

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

it("Should run hooks", () => {
  let count = 0
  const pattern = new freesewing.Pattern()
  const part = new pattern.Part();
  part.hooks.preDraft = [{ method: function(p) { count++ }} ]
  part.runHooks('preDraft')
  expect(count).to.equal(1);
});

it("Should get the units closure to raise a debug when passing a non-number", () => {
  const pattern = new freesewing.Pattern();
  pattern.settings.mode = "draft";
  const part = new pattern.Part();
  const short = part.shorthand();
  short.units('a')
  expect(pattern.events.debug.length).to.equal(1)
  expect(pattern.events.debug[0]).to.equal('Calling `units(value)` but `value` is not a number (`string`)')
});

it("Should generate the part transforms", () => {
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
  part.generateTransform({
    move: {
      x: 10,
      y: 20
    }
  })
  expect(part.attributes.list.transform.length).to.equal(1)
  expect(part.attributes.list.transform[0]).to.equal('translate(10,20)')
  expect(part.attributes.list['transform-origin'][0]).to.equal('10.5 39')
});


it("Should add the part cut", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  part.addCut(4, 'fabric', true)
  expect(part.cut.materials.fabric.cut).to.equal(4)
  expect(part.cut.materials.fabric.identical).to.equal(true)
  part.addCut()
  expect(part.cut.materials.fabric.cut).to.equal(2)
  expect(part.cut.materials.fabric.identical).to.equal(false)
});

it("Should generate an error if cut is not a number", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  part.addCut('a', 'fabric', true)
  expect(pattern.events.error.length).to.equal(1)
  expect(pattern.events.error[0]).to.equal('Tried to set cut to a value that is not a positive integer')
});

it("Should generate an warning if material is not a string", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  part.addCut(3, 4)
  expect(pattern.events.warning.length).to.equal(1)
  expect(pattern.events.warning[0]).to.equal('Tried to set material to a value that is not a string')
});

it("Should generate an error when removing a material that is not set (through addCut)", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  part.addCut(4, 'fabric', true)
  part.addCut(false, 'lining')
  expect(pattern.events.warning.length).to.equal(1)
  expect(pattern.events.warning[0]).to.equal('Tried to remove a material that is not set')
});

it("Should remove the part cut through addCut", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  part.addCut(4, 'fabric', true)
  part.addCut(false, 'fabric')
  expect(typeof part.cut.materials.fabric).to.equal('undefined')
});

it("Should remove the part cut through removeCut", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  part.addCut(4, 'fabric', true)
  part.removeCut('fabric')
  expect(typeof part.cut.materials.fabric).to.equal('undefined')
});

it("Should generate an error when removing a material that is not set (through removeCut)", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  part.addCut(4, 'fabric', true)
  part.removeCut('lining')
  expect(pattern.events.warning.length).to.equal(1)
  expect(pattern.events.warning[0]).to.equal('Tried to remove a material that is not set')
});

it("Should generate an error when removing a material that is not a string (through removeCut)", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  part.addCut(4, 'fabric', true)
  part.removeCut(23)
  expect(pattern.events.warning.length).to.equal(1)
  expect(pattern.events.warning[0]).to.equal('Tried to remove a material that is not set')
});

it("Should generate a warning when calling removeCut without parameters", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  part.addCut(4, 'fabric', true)
  part.removeCut()
  expect(pattern.events.warning.length).to.equal(1)
  expect(pattern.events.warning[0]).to.equal('Tried to remove a material that is not set')
});

it("Should set the part grainline", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  expect(part.cut.grain).to.equal(90)
  part.setGrain(123)
  expect(part.cut.grain).to.equal(123)
});

it("Should raise a warning when calling part.setGrain() without any parameters", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  part.setGrain()
  expect(part.cut.grain).to.equal(false)
});

it("Should raise an error when calling part.setGrain() with a value that is not a number", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  part.setGrain('a')
  expect(part.cut.grain).to.equal(90)
  expect(pattern.events.error.length).to.equal(1)
  expect(pattern.events.error[0]).to.equal('Called part.setGrain() with a value that is not a number')
});

it("Should set and then remove the cutOnFold", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  const { Point }  = part.shorthand()
  part.setCutOnFold(new Point(2,3), new Point(100,200))
  expect(part.cut.cutOnFold[0].x).to.equal(2)
  expect(part.cut.cutOnFold[0].y).to.equal(3)
  expect(part.cut.cutOnFold[1].x).to.equal(100)
  expect(part.cut.cutOnFold[1].y).to.equal(200)
  part.setCutOnFold(false)
  expect(typeof part.cut.cutOnFold).to.equal('undefined')
});

it("Should raise an error when setting the cutOnFold with a non-Point value", () => {
  let pattern = new freesewing.Pattern();
  let part = new pattern.Part();
  const { Point }  = part.shorthand()
  part.setCutOnFold(new Point(2,3), 12)
  expect(pattern.events.error.length).to.equal(1)
  expect(pattern.events.error[0]).to.equal('Called part.setCutOnFold() but at least one parameter is not a Point instance')
});

