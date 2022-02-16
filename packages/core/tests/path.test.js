const expect = require("chai").expect;
const freesewing = require("./dist");
const round = freesewing.utils.round;

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
  expect(round(a.paths.offset.bottomRight.x)).to.equal(72.18);
  expect(round(a.paths.offset.bottomRight.y)).to.equal(38.26);
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
  expect(round(a.paths.offset.bottomRight.x)).to.equal(72.63);
  expect(round(a.paths.offset.bottomRight.y)).to.equal(26.48);
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
  expect(round(a.paths.offset.bottomRight.x)).to.equal(119.26);
  expect(round(a.paths.offset.bottomRight.y)).to.equal(43.27);
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
  expect(round(a.paths.curve.length())).to.equal(145.11);
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
  expect(a.paths.joint.ops.length).to.equal(4);
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
  expect(round(a.paths.test.shiftAlong(500).x)).to.equal(200);
  expect(round(a.paths.test.shiftAlong(500).y)).to.equal(253.74);
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

it("Should shift along with sufficient precision", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  a.paths.test = new a.Path()
    .move(new a.Point(0, 0))
    .curve(new a.Point(123, 123), new a.Point(-123, 456), new a.Point(456, -123))
  a.points.a = a.paths.test.shiftAlong(100)
  a.points.b = a.paths.test.reverse().shiftAlong(a.paths.test.length()-100)
  expect(a.points.a.dist(a.points.b)).to.below(0.05);
});

it("Should shift fraction with sufficient precision", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  a.paths.test = new a.Path()
    .move(new a.Point(0, 0))
    .curve(new a.Point(123, 123), new a.Point(-123, 456), new a.Point(456, -123))
  a.points.a = a.paths.test.shiftFractionAlong(0.5)
  a.points.b = a.paths.test.reverse().shiftFractionAlong(0.5)
  expect(a.points.a.dist(a.points.b)).to.below(0.05);
});

it("Should shift a fraction along a line", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  a.paths.line = new a.Path()
    .move(new a.Point(0, 0))
    .line(new a.Point(0, 40))
    .line(new a.Point(100, 40));
  expect(round(a.paths.line.shiftFractionAlong(0.5).x)).to.equal(30);
  expect(round(a.paths.line.shiftFractionAlong(0.5).y)).to.equal(40);
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
  expect(round(box.topLeft.x)).to.equal(71.64);
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

it("Should find the edges of a path", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  a.points.A = new a.Point(45, 60);
  a.points.B = new a.Point(10, 30);
  a.points.BCp2 = new a.Point(40, 20);
  a.points.C = new a.Point(90, 30);
  a.points.CCp1 = new a.Point(50, -30);
  a.points.D = new a.Point(-60, 90);
  a.points.E = new a.Point(90, 190);
  a.paths.test = new a.Path()
    .move(a.points.A)
    .line(a.points.B)
    .curve(a.points.BCp2, a.points.CCp1, a.points.C)
    .curve(a.points.E, a.points.D, a.points.A)
    .close();
  expect(round(a.paths.test.edge("topLeft").x)).to.equal(7.7);
  expect(round(a.paths.test.edge("topLeft").y)).to.equal(0.97);
  expect(round(a.paths.test.edge("bottomLeft").x)).to.equal(7.7);
  expect(round(a.paths.test.edge("bottomLeft").y)).to.equal(118.46);
  expect(round(a.paths.test.edge("bottomRight").x)).to.equal(90);
  expect(round(a.paths.test.edge("bottomRight").y)).to.equal(118.46);
  expect(round(a.paths.test.edge("topRight").x)).to.equal(90);
  expect(round(a.paths.test.edge("topRight").y)).to.equal(0.97);
  expect(round(a.paths.test.edge("left").x)).to.equal(7.7);
  expect(round(a.paths.test.edge("left").y)).to.equal(91.8);
  expect(round(a.paths.test.edge("bottom").x)).to.equal(40.63);
  expect(round(a.paths.test.edge("bottom").y)).to.equal(118.46);
  expect(round(a.paths.test.edge("right").x)).to.equal(89.76);
  expect(round(a.paths.test.edge("right").y)).to.equal(29.64);
  expect(round(a.paths.test.edge("top").x)).to.equal(55.98);
  expect(round(a.paths.test.edge("top").y)).to.equal(0.97);
});

it("Should find the edges of a path for corner cases", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  a.points.A = new a.Point(-45, -60);
  a.points.B = new a.Point(45, 60);
  a.points.C = new a.Point(-90, -160);
  a.paths.test = new a.Path().move(a.points.A).line(a.points.B);
  expect(round(a.paths.test.edge("top").x)).to.equal(-45);
  expect(round(a.paths.test.edge("top").y)).to.equal(-60);
  expect(round(a.paths.test.edge("left").x)).to.equal(-45);
  expect(round(a.paths.test.edge("left").y)).to.equal(-60);
  expect(round(a.paths.test.edge("bottom").x)).to.equal(45);
  expect(round(a.paths.test.edge("bottom").y)).to.equal(60);
  expect(round(a.paths.test.edge("right").x)).to.equal(45);
  expect(round(a.paths.test.edge("right").y)).to.equal(60);
  a.paths.test = new a.Path().move(a.points.B).line(a.points.A);
  expect(round(a.paths.test.edge("top").x)).to.equal(-45);
  expect(round(a.paths.test.edge("top").y)).to.equal(-60);
  expect(round(a.paths.test.edge("left").x)).to.equal(-45);
  expect(round(a.paths.test.edge("left").y)).to.equal(-60);
  expect(round(a.paths.test.edge("bottom").x)).to.equal(45);
  expect(round(a.paths.test.edge("bottom").y)).to.equal(60);
  expect(round(a.paths.test.edge("right").x)).to.equal(45);
  expect(round(a.paths.test.edge("right").y)).to.equal(60);
});

it("Should find the edge of a path for this edge-case", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  a.points.A = new a.Point(-109.7, 77, 12);
  a.points.B = new a.Point(-27.33, 99.19);
  a.points.C = new a.Point(-39.45, 137.4);
  a.points.D = new a.Point(-61.52, 219.77);
  a.paths.test = new a.Path()
    .move(a.points.A)
    .curve(a.points.B, a.points.C, a.points.D);
  expect(round(a.paths.test.edge("right").x)).to.equal(-45.22);
  expect(round(a.paths.test.edge("right").y)).to.equal(139.4);
});

it("Should find where a path intersects with an X value", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  a.points.A = new a.Point(95, 50);
  a.points.B = new a.Point(10, 30);
  a.points.BCp2 = new a.Point(40, 20);
  a.points.C = new a.Point(90, 30);
  a.points.CCp1 = new a.Point(50, -30);
  a.points.D = new a.Point(50, 130);
  a.points.DCp1 = new a.Point(150, 30);
  a.paths.test = new a.Path()
    .move(a.points.A)
    .line(a.points.B)
    .curve(a.points.BCp2, a.points.CCp1, a.points.C)
    .curve(a.points.DCp1, a.points.DCp1, a.points.D)
    .close();
  let intersections = a.paths.test.intersectsX(60);
  expect(intersections.length).to.equal(4);
  expect(round(intersections[0].x)).to.equal(60);
  expect(round(intersections[0].y)).to.equal(41.76);
  expect(round(intersections[1].x)).to.equal(60);
  expect(round(intersections[1].y)).to.equal(1.45);
  expect(round(intersections[2].x)).to.equal(60);
  expect(round(intersections[2].y)).to.equal(120);
  expect(round(intersections[3].x)).to.equal(60);
  expect(round(intersections[3].y)).to.equal(112.22);
});

it("Should find where a path intersects with an Y value", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  a.points.A = new a.Point(95, 50);
  a.points.B = new a.Point(10, 30);
  a.points.BCp2 = new a.Point(40, 20);
  a.points.C = new a.Point(90, 30);
  a.points.CCp1 = new a.Point(50, -30);
  a.points.D = new a.Point(50, 130);
  a.points.DCp1 = new a.Point(150, 30);
  a.paths.test = new a.Path()
    .move(a.points.A)
    .line(a.points.B)
    .curve(a.points.BCp2, a.points.CCp1, a.points.C)
    .curve(a.points.DCp1, a.points.DCp1, a.points.D)
    .close();
  let intersections = a.paths.test.intersectsY(60);
  expect(intersections.length).to.equal(2);
  expect(round(intersections[0].x)).to.equal(117.83);
  expect(round(intersections[0].y)).to.equal(60);
  expect(round(intersections[1].x)).to.equal(89.38);
  expect(round(intersections[1].y)).to.equal(60);
});

it("Should throw an error when not passing a value to path.intersectsX", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  a.paths.test = new a.Path();
  expect(() => a.paths.test.intersectsX()).to.throw();
  expect(() => a.paths.test.intersectsY()).to.throw();
});

it("Should find the intersections between two paths", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  a.points.A = new a.Point(45, 60);
  a.points.B = new a.Point(10, 30);
  a.points.BCp2 = new a.Point(40, 20);
  a.points.C = new a.Point(90, 30);
  a.points.CCp1 = new a.Point(50, -30);
  a.points.D = new a.Point(50, 130);
  a.points.DCp1 = new a.Point(150, 30);

  a.points._A = new a.Point(55, 40);
  a.points._B = new a.Point(0, 55);
  a.points._BCp2 = new a.Point(40, -20);
  a.points._C = new a.Point(90, 40);
  a.points._CCp1 = new a.Point(50, -30);
  a.points._D = new a.Point(40, 120);
  a.points._DCp1 = new a.Point(180, 40);

  a.paths.example1 = new a.Path()
    .move(a.points.A)
    .line(a.points.B)
    .curve(a.points.BCp2, a.points.CCp1, a.points.C)
    .curve(a.points.DCp1, a.points.DCp1, a.points.D);
  a.paths.example2 = new a.Path()
    .move(a.points._A)
    .line(a.points._B)
    .curve(a.points._BCp2, a.points._CCp1, a.points._C)
    .curve(a.points._DCp1, a.points._DCp1, a.points._D);
  let intersections = a.paths.example1.intersects(a.paths.example2);
  expect(intersections.length).to.equal(6);
  expect(round(intersections[0].x)).to.equal(29.71);
  expect(round(intersections[0].y)).to.equal(46.9);
  expect(round(intersections[1].x)).to.equal(12.48);
  expect(round(intersections[1].y)).to.equal(32.12);
  expect(round(intersections[2].x)).to.equal(14.84);
  expect(round(intersections[2].y)).to.equal(27.98);
  expect(round(intersections[3].x)).to.equal(66.33);
  expect(round(intersections[3].y)).to.equal(4.1);
  expect(round(intersections[4].x)).to.equal(130.65);
  expect(round(intersections[4].y)).to.equal(40.52);
  expect(round(intersections[5].x)).to.equal(86.52);
  expect(round(intersections[5].y)).to.equal(93.31);
});

it("Should throw an error when running path.intersect on an identical path", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  a.paths.test = new a.Path();
  expect(() => a.paths.test.intersects(a.paths.test)).to.throw();
});

it("Should divide a path", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  a.points.A = new a.Point(45, 60);
  a.points.B = new a.Point(10, 30);
  a.points.BCp2 = new a.Point(40, 20);
  a.points.C = new a.Point(90, 30);
  a.points.CCp1 = new a.Point(50, -30);
  a.points.D = new a.Point(-60, 90);
  a.points.E = new a.Point(90, 190);
  a.paths.test = new a.Path()
    .move(a.points.A)
    .line(a.points.B)
    .curve(a.points.BCp2, a.points.CCp1, a.points.C)
    .curve(a.points.E, a.points.D, a.points.A)
    .close();
  let divided = a.paths.test.divide();
  expect(divided.length).to.equal(4);
  expect(divided[0].ops[0].type).to.equal("move");
  expect(divided[0].ops[0].to.x).to.equal(45);
  expect(divided[0].ops[0].to.y).to.equal(60);
  expect(divided[0].ops[1].type).to.equal("line");
  expect(divided[0].ops[1].to.x).to.equal(10);
  expect(divided[0].ops[1].to.y).to.equal(30);
  expect(divided[1].ops[0].type).to.equal("move");
  expect(divided[1].ops[0].to.x).to.equal(10);
  expect(divided[1].ops[0].to.y).to.equal(30);
  expect(divided[1].ops[1].type).to.equal("curve");
  expect(divided[1].ops[1].cp1.x).to.equal(40);
  expect(divided[1].ops[1].cp1.y).to.equal(20);
  expect(divided[1].ops[1].cp2.x).to.equal(50);
  expect(divided[1].ops[1].cp2.y).to.equal(-30);
  expect(divided[1].ops[1].to.x).to.equal(90);
  expect(divided[1].ops[1].to.y).to.equal(30);
  expect(divided[2].ops[0].type).to.equal("move");
  expect(divided[2].ops[0].to.x).to.equal(90);
  expect(divided[2].ops[0].to.y).to.equal(30);
  expect(divided[2].ops[1].type).to.equal("curve");
  expect(divided[2].ops[1].cp1.x).to.equal(90);
  expect(divided[2].ops[1].cp1.y).to.equal(190);
  expect(divided[2].ops[1].cp2.x).to.equal(-60);
  expect(divided[2].ops[1].cp2.y).to.equal(90);
  expect(divided[2].ops[1].to.x).to.equal(45);
  expect(divided[2].ops[1].to.y).to.equal(60);
  expect(divided[3].ops[0].type).to.equal("move");
  expect(divided[3].ops[0].to.x).to.equal(45);
  expect(divided[3].ops[0].to.y).to.equal(60);
  expect(divided[3].ops[1].type).to.equal("line");
  expect(divided[3].ops[1].to.x).to.equal(45);
  expect(divided[3].ops[1].to.y).to.equal(60);
});

it("Should split a path on a curve", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  a.points.A = new a.Point(45, 60);
  a.points.B = new a.Point(10, 30);
  a.points.BCp2 = new a.Point(40, 20);
  a.points.C = new a.Point(90, 30);
  a.points.CCp1 = new a.Point(50, -30);
  a.points.D = new a.Point(50, 130);
  a.points.DCp1 = new a.Point(150, 30);

  a.paths.test = new a.Path()
    .move(a.points.A)
    .line(a.points.B)
    .curve(a.points.BCp2, a.points.CCp1, a.points.C)
    .curve(a.points.DCp1, a.points.DCp1, a.points.D);

  a.points.split = a.paths.test.shiftAlong(120);
  let halves = a.paths.test.split(a.points.split);
  let curve = halves[0].ops.pop();
  expect(curve.type).to.equal("curve");
  expect(round(curve.cp1.x)).to.equal(35.08);
  expect(round(curve.cp1.y)).to.equal(21.64);
  expect(round(curve.cp2.x)).to.equal(46.19);
  expect(round(curve.cp2.y)).to.equal(-14.69);
  expect(round(curve.to.x)).to.equal(72.53);
  expect(round(curve.to.y)).to.equal(8.71);
});

it("Should split a path on a line", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  a.points.A = new a.Point(45, 60);
  a.points.B = new a.Point(10, 30);
  a.points.BCp2 = new a.Point(40, 20);
  a.points.C = new a.Point(90, 30);
  a.points.CCp1 = new a.Point(50, -30);
  a.points.D = new a.Point(50, 130);
  a.points.DCp1 = new a.Point(150, 30);

  a.paths.test = new a.Path()
    .move(a.points.A)
    .line(a.points.B)
    .curve(a.points.BCp2, a.points.CCp1, a.points.C)
    .curve(a.points.DCp1, a.points.DCp1, a.points.D);

  a.points.split = a.paths.test.shiftAlong(20);
  let halves = a.paths.test.split(a.points.split);
  let line = halves[0].ops.pop();
  expect(line.type).to.equal("line");
  expect(round(line.to.x)).to.equal(29.81);
  expect(round(line.to.y)).to.equal(46.98);
});

it("Should trim a path when lines overlap", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  a.points.A = new a.Point(0, 0);
  a.points.B = new a.Point(100, 100);
  a.points.C = new a.Point(0, 100);
  a.points.D = new a.Point(100, 0);

  let test = new a.Path()
    .move(new a.Point(0, 20))
    .line(a.points.A)
    .line(a.points.B)
    .line(a.points.C)
    .line(a.points.D)
    .line(a.points.A)
    .trim();

  expect(test.ops.length).to.equal(5);
  expect(test.ops[2].to.x).to.equal(50);
  expect(test.ops[2].to.y).to.equal(50);
});

it("Should trim a path when a line overlaps with a curve", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  a.points.A = new a.Point(0, 0);
  a.points.B = new a.Point(100, 100);
  a.points.C = new a.Point(0, 100);
  a.points.D = new a.Point(100, 0);

  let test = new a.Path()
    .move(new a.Point(0, 20))
    .line(a.points.A)
    .curve(a.points.D, a.points.B, a.points.B)
    .line(a.points.C)
    .line(a.points.D)
    .line(a.points.A)
    .trim();

  expect(test.ops.length).to.equal(5);
  expect(round(test.ops[2].to.x)).to.equal(72.19);
  expect(round(test.ops[2].to.y)).to.equal(27.81);
});

it("Should trim a path when a curves overlap", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  a.points.A = new a.Point(0, 0);
  a.points.B = new a.Point(100, 100);
  a.points.C = new a.Point(0, 100);
  a.points.D = new a.Point(100, 0);

  let test = new a.Path()
    .move(new a.Point(0, 20))
    .line(a.points.A)
    .curve(a.points.D, a.points.B, a.points.B)
    .line(a.points.C)
    .curve(a.points.C, a.points.A, a.points.D)
    .line(a.points.A)
    .trim();

  expect(test.ops.length).to.equal(5);
  expect(round(test.ops[2].to.x)).to.equal(50);
  expect(round(test.ops[2].to.y)).to.equal(11.01);
});

it("Should translate a path", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;
  a.points.A = new a.Point(0, 0);
  a.points.B = new a.Point(100, 100);
  a.points.C = new a.Point(0, 100);
  a.points.D = new a.Point(100, 0);

  let base = new a.Path()
    .move(a.points.A)
    .curve(a.points.B, a.points.C, a.points.D);
  let test = base.translate(10, 20);

  expect(test.ops.length).to.equal(2);
  expect(test.ops[0].to.x).to.equal(10);
  expect(test.ops[0].to.y).to.equal(20);
  expect(test.ops[1].to.x).to.equal(110);
  expect(test.ops[1].to.y).to.equal(20);
});

it("Should add a path attribute", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;

  a.paths.line = new a.Path()
    .move(new a.Point(0, 0))
    .line(new a.Point(0, 40))
    .attr("class", "foo")
    .attr("class", "bar");
  expect(a.paths.line.attributes.get("class")).to.equal("foo bar");
});

it("Should overwrite a path attribute", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;

  // Paths from shorthand have the raise method
  const { Path } = a.shorthand()
  a.paths.line = new Path()
    .move(new a.Point(0, 0))
    .line(new a.Point(0, 40))
    .attr("class", "foo")
    .attr("class", "bar")
    .attr("class", "overwritten", true);
  expect(a.paths.line.attributes.get("class")).to.equal("overwritten");
});

it("Should move along a path even if it lands just on a joint", () => {
  let pattern = new freesewing.Pattern();
  pattern.parts.a = new pattern.Part();
  let a = pattern.parts.a;

  a.paths.curve = new a.Path()
    .move(new a.Point(20.979322245694167, -219.8547313525503))
    ._curve(
      new a.Point(35.33122482627704, -153.54225517257478),
      new a.Point(61.99376179214562, -105.99242252587702)
    )
    .curve(
      new a.Point(88.85254026593002, -58.092613773317105),
      new a.Point(136.13264764576948, -11.692646171119936),
      new a.Point(170.69593749999996, -4.180844669736632e-14)
    )
  a.points.test = a.paths.curve.shiftAlong(121.36690836797631)
  expect(a.points.test).to.be.instanceOf(a.Point)
})
