let expect = require("chai").expect;
let freesewing = require("../dist/index.js");

it("Should offset a line", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;

  a.paths.line = new a.Path().move(new a.Point(0, 0)).line(new a.Point(0, 40));
  a.paths.offset = a.paths.line.offset(10);
  pattern.render();
  expect(a.paths.offset.bottomRight.x).to.equal(-10);
  expect(a.paths.offset.bottomRight.y).to.equal(40);
});

it("Should offset a curve", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;

  a.paths.curve = new a.Path()
    .move(new a.Point(0, 0))
    .curve(new a.Point(0, 40), new a.Point(123, 34), new a.Point(23, 4));
  a.paths.offset = a.paths.curve.offset(10);
  pattern.render();
  expect(a.paths.offset.bottomRight.x).to.equal(72.18);
  expect(a.paths.offset.bottomRight.y).to.equal(38.26);
});

it("Should offset a curve where cp1 = start", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;

  a.paths.curve = new a.Path()
    .move(new a.Point(0, 0))
    .curve(new a.Point(0, 0), new a.Point(123, 34), new a.Point(23, 4));
  a.paths.offset = a.paths.curve.offset(10);
  pattern.render();
  expect(a.paths.offset.bottomRight.x).to.equal(72.50457052909852);
  expect(a.paths.offset.bottomRight.y).to.equal(26.44);
});

it("Should offset a curve where cp2 = end", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;

  a.paths.curve = new a.Path()
    .move(new a.Point(0, 0))
    .curve(new a.Point(40, 0), new a.Point(123, 34), new a.Point(123, 34))
    .close();
  a.paths.offset = a.paths.curve.offset(10);
  pattern.render();
  expect(a.paths.offset.bottomRight.x).to.equal(119.23);
  expect(a.paths.offset.bottomRight.y).to.equal(43.26);
});

it("Should throw error when offsetting line that is no line", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;

  a.paths.line = new a.Path().move(new a.Point(0, 40)).line(new a.Point(0, 40));
  expect(() => a.paths.line.offset(10)).to.throw();
});

it("Should return the length of a line", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;

  a.paths.line = new a.Path().move(new a.Point(0, 0)).line(new a.Point(0, 40));
  expect(a.paths.line.length()).to.equal(40);
});

it("Should return the length of a curve", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;

  a.paths.curve = new a.Path()
    .move(new a.Point(0, 0))
    .curve(new a.Point(0, 40), new a.Point(123, 34), new a.Point(23, 4))
    .close();
  expect(a.paths.curve.length()).to.equal(145.11);
});

it("Should return the path start point", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;

  a.paths.curve = new a.Path()
    .move(new a.Point(123, 456))
    .curve(new a.Point(0, 40), new a.Point(123, 34), new a.Point(23, 4))
    .close();
  expect(a.paths.curve.start().x).to.equal(123);
  expect(a.paths.curve.start().y).to.equal(456);
});

it("Should return the path end point", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;

  a.paths.curve = new a.Path()
    .move(new a.Point(123, 456))
    .curve(new a.Point(0, 40), new a.Point(123, 34), new a.Point(23, 4));
  expect(a.paths.curve.end().x).to.equal(23);
  expect(a.paths.curve.end().y).to.equal(4);
  a.paths.curve.close();
  expect(a.paths.curve.end().x).to.equal(123);
  expect(a.paths.curve.end().y).to.equal(456);
});

it("Should calculate that path boundary", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;

  a.paths.curve = new a.Path()
    .move(new a.Point(123, 456))
    .curve(new a.Point(0, 40), new a.Point(123, 34), new a.Point(230, 4));
  a.paths.curve.boundary();
  expect(a.paths.curve.topLeft.x).to.equal(71.6413460920667);
  expect(a.paths.curve.topLeft.y).to.equal(4);
  a.paths.curve.boundary();
  expect(a.paths.curve.bottomRight.x).to.equal(230);
  expect(a.paths.curve.bottomRight.y).to.equal(456);
});

it("Should clone a path", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;

  a.paths.curve = new a.Path()
    .move(new a.Point(123, 456))
    .curve(new a.Point(0, 40), new a.Point(123, 34), new a.Point(230, 4));
  let b = a.paths.curve.clone();
  b.boundary();
  expect(b.topLeft.x).to.equal(71.6413460920667);
  expect(b.topLeft.y).to.equal(4);
  b = b.clone();
  expect(b.bottomRight.x).to.equal(230);
  expect(b.bottomRight.y).to.equal(456);
});

it("Should join paths", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;

  a.paths.line = new a.Path().move(new a.Point(0, 0)).line(new a.Point(0, 40));
  a.paths.curve = new a.Path()
    .move(new a.Point(123, 456))
    .curve(new a.Point(0, 40), new a.Point(123, 34), new a.Point(230, 4));
  a.paths.joint = a.paths.curve.join(a.paths.line);
  expect(a.paths.joint.ops.length).to.equal(5);
});

it("Should throw error when joining a closed paths", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;

  a.paths.line = new a.Path().move(new a.Point(0, 0)).line(new a.Point(0, 40));
  a.paths.curve = new a.Path()
    .move(new a.Point(123, 456))
    .curve(new a.Point(0, 40), new a.Point(123, 34), new a.Point(230, 4))
    .close();
  expect(() => a.paths.curve.join(a.paths.line)).to.throw();
});

it("Should shift along a line", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;

  a.paths.line = new a.Path().move(new a.Point(0, 0)).line(new a.Point(0, 40));
  expect(a.paths.line.shiftAlong(20).y).to.equal(20);
});

it("Should shift along lines", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;

  a.paths.line = new a.Path()
    .move(new a.Point(0, 0))
    .line(new a.Point(0, 40))
    .line(new a.Point(100, 40));
  expect(a.paths.line.shiftAlong(50).x).to.equal(10);
  expect(a.paths.line.shiftAlong(50).y).to.equal(40);
});

it("Should shift along curve + line", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;

  a.paths.test = new a.Path()
    .move(new a.Point(0, 0))
    .line(new a.Point(0, 40))
    .curve(new a.Point(40, 40), new a.Point(40, 0), new a.Point(200, 0))
    .line(new a.Point(200, 400));
  expect(a.paths.test.shiftAlong(500).x).to.equal(200);
  expect(a.paths.test.shiftAlong(500).y).to.equal(253.74);
});

it("Should throw error when shifting along path further than it's long", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  a.paths.test = new a.Path()
    .move(new a.Point(0, 0))
    .line(new a.Point(0, 40))
    .line(new a.Point(200, 400));
  expect(() => a.paths.test.shiftAlong(500)).to.throw();
});

it("Should shift a fraction along a line", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  a.paths.line = new a.Path()
    .move(new a.Point(0, 0))
    .line(new a.Point(0, 40))
    .line(new a.Point(100, 40));
  expect(a.paths.line.shiftFractionAlong(0.5).x).to.equal(30);
  expect(a.paths.line.shiftFractionAlong(0.5).y).to.equal(40);
});

it("Should find the bounding box of a line", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let Path = pattern.parts.a.Path;
  let Point = pattern.parts.a.Point;

  let line = new Path().move(new Point(3, 2)).line(new Point(10, 40));
  let box = line.bbox();
  expect(box.topLeft.x).to.equal(3);
  expect(box.topLeft.y).to.equal(2);
  expect(box.bottomRight.x).to.equal(10);
  expect(box.bottomRight.y).to.equal(40);

  line = new Path().move(new Point(10, 40)).line(new Point(3, 2));
  box = line.bbox();
  expect(box.topLeft.x).to.equal(3);
  expect(box.topLeft.y).to.equal(2);
  expect(box.bottomRight.x).to.equal(10);
  expect(box.bottomRight.y).to.equal(40);

  line = new Path().move(new Point(1, 40)).line(new Point(31, 2));
  box = line.bbox();
  expect(box.topLeft.x).to.equal(1);
  expect(box.topLeft.y).to.equal(2);
  expect(box.bottomRight.x).to.equal(31);
  expect(box.bottomRight.y).to.equal(40);

  line = new Path().move(new Point(31, 2)).line(new Point(1, 40));
  box = line.bbox();
  expect(box.topLeft.x).to.equal(1);
  expect(box.topLeft.y).to.equal(2);
  expect(box.bottomRight.x).to.equal(31);
  expect(box.bottomRight.y).to.equal(40);

  line = new Path().move(new Point(11, 2)).line(new Point(11, 40));
  box = line.bbox();
  expect(box.topLeft.x).to.equal(11);
  expect(box.topLeft.y).to.equal(2);
  expect(box.bottomRight.x).to.equal(11);
  expect(box.bottomRight.y).to.equal(40);

  line = new Path().move(new Point(11, 40)).line(new Point(11, 2));
  box = line.bbox();
  expect(box.topLeft.x).to.equal(11);
  expect(box.topLeft.y).to.equal(2);
  expect(box.bottomRight.x).to.equal(11);
  expect(box.bottomRight.y).to.equal(40);

  line = new Path().move(new Point(11, 12)).line(new Point(41, 12));
  box = line.bbox();
  expect(box.topLeft.x).to.equal(11);
  expect(box.topLeft.y).to.equal(12);
  expect(box.bottomRight.x).to.equal(41);
  expect(box.bottomRight.y).to.equal(12);

  line = new Path().move(new Point(41, 12)).line(new Point(11, 12));
  box = line.bbox();
  expect(box.topLeft.x).to.equal(11);
  expect(box.topLeft.y).to.equal(12);
  expect(box.bottomRight.x).to.equal(41);
  expect(box.bottomRight.y).to.equal(12);
});

it("Should find the bounding box of a line", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  a.paths.curve = new a.Path()
    .move(new a.Point(123, 456))
    .curve(new a.Point(0, 40), new a.Point(123, 34), new a.Point(230, 4))
    .close();
  let box = a.paths.curve.bbox();
  expect(box.topLeft.x).to.equal(71.64);
  expect(box.topLeft.y).to.equal(4);
  expect(box.bottomRight.x).to.equal(230);
  expect(box.bottomRight.y).to.equal(456);
});

it("Should reverse a path", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  let test = new a.Path()
    .move(new a.Point(123, 456))
    .line(new a.Point(12, 23))
    .curve(new a.Point(0, 40), new a.Point(123, 34), new a.Point(230, 4))
    .close();
  let rev = test.reverse();
  let tb = test.bbox();
  let rb = rev.bbox();
  expect(tb.topLeft.x).to.equal(rb.topLeft.x);
  expect(tb.topLeft.y).to.equal(rb.topLeft.y);
  expect(tb.bottomRight.x).to.equal(rb.bottomRight.x);
  expect(tb.bottomRight.y).to.equal(rb.bottomRight.y);
  expect(rev.ops[1].type).to.equal("curve");
  expect(rev.ops[2].type).to.equal("line");
});
