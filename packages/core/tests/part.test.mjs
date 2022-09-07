import chai from "chai"
import { Pattern, Path } from "./dist/index.mjs"

const expect = chai.expect

describe('Part', () => {
  it("Svg constructor should initialize object", () => {
    let pattern = new Pattern();
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
    let pattern = new Pattern();
    let part = new pattern.Part();
    expect(typeof part.macroClosure()).to.equal("function");
  });

  it("Should not run an unknown macro", () => {
    let pattern = new Pattern();
    let part = new pattern.Part();
    let macro = part.macroClosure();
    expect(macro("unknown")).to.equal(undefined);
  });

  it("Should register and run a macro", () => {
    let pattern = new Pattern();
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
    let pattern = new Pattern();
    let part = new pattern.Part();
    let free = part.getId();
    expect(part.getId()).to.equal("" + (parseInt(free) + 1));
  });

  it("Should return a function from unitsClosure", () => {
    let pattern = new Pattern();
    let part = new pattern.Part();
    expect(typeof part.unitsClosure()).to.equal("function");
  });

  it("Should convert units", () => {
    let pattern = new Pattern();
    let part = new pattern.Part();
    let units = part.unitsClosure();
    expect(units(123.456)).to.equal("12.35cm");
    expect(part.units(123.456)).to.equal("12.35cm");
  });

  it("Should set part attributes", () => {
    let pattern = new Pattern();
    let part = new pattern.Part();
    part.attr("foo", "bar");
    expect(part.attributes.get("foo")).to.equal("bar");
    part.attr("foo", "baz");
    expect(part.attributes.get("foo")).to.equal("bar baz");
    part.attr("foo", "schmoo", true);
    expect(part.attributes.get("foo")).to.equal("schmoo");
  });

  it("Should inject a part", () => {
    let pattern = new Pattern();
    let part = new pattern.Part();
    part.points.a = new part.Point(12, 23);
    part.points.b = new part.Point(10, 10);
    part.points.c = new part.Point(20, 20);
    part.paths.bar = new Path()
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
    let pattern = new Pattern();
    pattern.settings.mode = "draft";
    pattern.settings.paperless = true;
    let part = new pattern.Part();
    let short = part.shorthand();
    expect(short.complete).to.equal(true);
    expect(short.paperless).to.equal(true);
  });

  it("Should raise a warning when setting a non-Point value in points", () => {
    const pattern = new Pattern();
    pattern.settings.mode = "draft";
    const part = new pattern.Part();
    const { points } = part.shorthand()
    points.a = 'banana'
    expect(pattern.events.warning.length).to.equal(4)
    expect(pattern.events.warning[0]).to.equal('`points.a` was set with a value that is not a `Point` object')
    expect(pattern.events.warning[1]).to.equal('`points.a` was set with a `x` parameter that is not a `number`')
    expect(pattern.events.warning[2]).to.equal('`points.a` was set with a `y` parameter that is not a `number`')
  });

  it("Should raise a warning when setting a non-Snippet value in snippets", () => {
    const pattern = new Pattern();
    pattern.settings.mode = "draft";
    const part = new pattern.Part();
    const { snippets } = part.shorthand()
    snippets.a = 'banana'
    expect(pattern.events.warning.length).to.equal(4)
    expect(pattern.events.warning[0]).to.equal('`snippets.a` was set with a value that is not a `Snippet` object')
    expect(pattern.events.warning[1]).to.equal('`snippets.a` was set with a `def` parameter that is not a `string`')
    expect(pattern.events.warning[2]).to.equal('`snippets.a` was set with an `anchor` parameter that is not a `Point`')
  });

  it("Should calculate the part boundary with default margin", () => {
    let pattern = new Pattern();
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
    let pattern = new Pattern();
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
    let pattern = new Pattern();
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
    let pattern = new Pattern();
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
    let pattern = new Pattern();
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
    const pattern = new Pattern()
    const part = new pattern.Part();
    part.hooks.preDraft = [{ method: function(p) { count++ }} ]
    part.runHooks('preDraft')
    expect(count).to.equal(1);
  });

  it("Should get the units closure to raise a debug when passing a non-number", () => {
    const pattern = new Pattern();
    pattern.settings.mode = "draft";
    pattern.settings.debug = true
    const part = new pattern.Part();
    const short = part.shorthand();
    short.units('a')
    expect(pattern.events.debug.length).to.equal(1)
    expect(pattern.events.debug[0]).to.equal('Calling `units(value)` but `value` is not a number (`string`)')
  });

  it("Should generate the part transforms", () => {
    let pattern = new Pattern();
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
    expect(part.attributes.list.transform[0]).to.equal('translate(10 20)')
  });

  describe('isEmpty', () => {
    it("Should return true if the part has no paths or snippets", () => {
      let pattern = new Pattern();
      let part = new pattern.Part();
      expect(part.isEmpty()).to.be.true
    })

    it("Should return true if the part has paths but they have no length", () => {
      let pattern = new Pattern();
      let part = new pattern.Part();
      const { Path, paths, Point }  = part.shorthand()
      paths.seam = new Path()
      expect(part.isEmpty()).to.be.true
    })

    it("Should return true if the part has paths but they don't render", () => {
      let pattern = new Pattern();
      let part = new pattern.Part();
      const { Path, paths, Point }  = part.shorthand()
      paths.seam = new Path().move(new Point(0,0)).line(new Point(2,3)).setRender(false)
      expect(part.isEmpty()).to.be.true
    })

    it("Should return false if the part has a path with length", () => {
      let pattern = new Pattern();
      let part = new pattern.Part();
      const { Path, paths, Point }  = part.shorthand()
      paths.seam = new Path().move(new Point(0,0)).line(new Point(2,3))

      expect(part.isEmpty()).to.be.false
    })

    it("Should return false if the part has a snippet", () => {
      let pattern = new Pattern();
      let part = new pattern.Part();
      const { Point, snippets, Snippet }  = part.shorthand()
      snippets.test = new Snippet('test', new Point(0,0))

      expect(part.isEmpty()).to.be.false
    })

    it("Should return false if the part has a point that has text", () => {
      let pattern = new Pattern();
      let part = new pattern.Part();
      const {Point, points} = part.shorthand()
      points.test = new Point(0,0)
      points.test.attributes.set('data-text', 'text')
      expect(part.isEmpty()).to.be.false
    })

    it("Should return false if the part has a point that has a circle", () => {
      let pattern = new Pattern();
      let part = new pattern.Part();
      const {Point, points} = part.shorthand()
      points.test = new Point(0,0)
      points.test.attributes.set('data-circle', 10)
      expect(part.isEmpty()).to.be.false
    })
  })

})
