let expect = require("chai").expect;
let Point = require("./dist/index.js").Point;

it("Should return point object", () => {
  let result = new Point(2, 4);
  expect(result).to.be.a("object");
  expect(result.x).to.equal(2);
  expect(result.y).to.equal(4);
});

it("Should limit point precision", () => {
  let result = new Point(2.12345, 4.98765);
  expect(result.x).to.equal(2.12);
  expect(result.y).to.equal(4.99);
});

it("Should return distance", () => {
  expect(new Point(2, 4).dist(new Point(-123, -32423))).to.equal(32427.24);
});

it("Should return slope", () => {
  let from = new Point(0, 0);
  expect(from.slope(new Point(0, -10))).to.equal(-Infinity);
  expect(from.slope(new Point(10, 0))).to.equal(0);
  expect(from.slope(new Point(0, 10))).to.equal(Infinity);
  expect(from.slope(new Point(-10, 0))).to.equal(-0);
  expect(from.slope(new Point(10, 10))).to.equal(1);
  expect(from.slope(new Point(-10, 5))).to.equal(-0.5);
});

it("Should return angle", () => {
  let from = new Point(0, 0);
  expect(from.angle(new Point(10, 0))).to.equal(0);
  expect(from.angle(new Point(-20, 0))).to.equal(180);
  expect(from.angle(new Point(0, -10))).to.equal(90);
  expect(from.angle(new Point(0, 10))).to.equal(270);
  expect(from.angle(new Point(10, -10))).to.equal(45);
  expect(from.angle(new Point(10, 10))).to.equal(315);
});

it("Should copy a point", () => {
  let result = new Point(2, 4).copy();
  expect(result.x).to.equal(2);
  expect(result.y).to.equal(4);
});

it("Should check points for equality", () => {
  let a = new Point(-123, 456);
  let b = new Point(-123, 456);
  expect(a).to.deep.equal(b);
});

it("Should flip point around X value zero", () => {
  let result = new Point(2, 4).flipX();
  expect(result.x).to.equal(-2);
  expect(result.y).to.equal(4);
});

it("Should flip point around X value", () => {
  let result = new Point(2, 4).flipX(new Point(-20, 19));
  expect(result.x).to.equal(-42);
  expect(result.y).to.equal(4);
});

it("Should flip point around Y value zero", () => {
  let result = new Point(2, 4).flipY();
  expect(result.x).to.equal(2);
  expect(result.y).to.equal(-4);
});

it("Should flip point around Y value", () => {
  let result = new Point(2, 4).flipY(new Point(12, -14));
  expect(result.x).to.equal(2);
  expect(result.y).to.equal(-32);
});

it("Should shift a point", () => {
  let origin = new Point(0, 0);
  let n = origin.shift(90, 10);
  let e = origin.shift(0, 10);
  let s = origin.shift(270, 10);
  let w = origin.shift(180, 10);
  expect(n.x).to.equal(0);
  expect(n.y).to.equal(-10);
  expect(e.x).to.equal(10);
  expect(e.y).to.equal(0);
  expect(s.x).to.equal(0);
  expect(s.y).to.equal(10);
  expect(w.x).to.equal(-10);
  expect(w.y).to.equal(0);
  let rand = origin.shift(-123, 456);
  expect(rand.x).to.equal(-248.36);
  expect(rand.y).to.equal(382.43);
});

it("Should shift a point towards another", () => {
  let origin = new Point(0, 0);
  let n = new Point(0, -10);
  let e = new Point(10, 0);
  let s = new Point(0, 10);
  let w = new Point(-10, 0);
  let sn = origin.shiftTowards(n, 123);
  let se = origin.shiftTowards(e, 123);
  let ss = origin.shiftTowards(s, 123);
  let sw = origin.shiftTowards(w, 123);
  expect(sn.x).to.equal(0);
  expect(sn.y).to.equal(-123);
  expect(se.x).to.equal(123);
  expect(se.y).to.equal(0);
  expect(ss.x).to.equal(0);
  expect(ss.y).to.equal(123);
  expect(sw.x).to.equal(-123);
  expect(sw.y).to.equal(0);
  expect(sw.shiftTowards(sn, 100).x).to.equal(-52.29);
  expect(ss.shiftTowards(se, 200).y).to.equal(-18.42);
});

it("Should shift a point a fraction towards another", () => {
  let origin = new Point(0, 0);
  let n = new Point(0, -10);
  let e = new Point(10, 0);
  let s = new Point(0, 10);
  let w = new Point(-10, 0);
  let sn = origin.shiftFractionTowards(n, 1.5);
  let se = origin.shiftFractionTowards(e, 1.5);
  let ss = origin.shiftFractionTowards(s, 0.5);
  let sw = origin.shiftFractionTowards(w, 2.5);
  expect(sn.x).to.equal(0);
  expect(sn.y).to.equal(-15);
  expect(se.x).to.equal(15);
  expect(se.y).to.equal(0);
  expect(ss.x).to.equal(0);
  expect(ss.y).to.equal(5);
  expect(sw.x).to.equal(-25);
  expect(sw.y).to.equal(0);
  expect(sw.shiftFractionTowards(sn, 100).x).to.equal(2474.59);
  expect(ss.shiftFractionTowards(se, 200).y).to.equal(-994.91);
});

it("Should shift a point beyond another", () => {
  let origin = new Point(0, 0);
  let n = new Point(0, -10);
  let e = new Point(10, 0);
  let s = new Point(0, 10);
  let w = new Point(-10, 0);
  let sn = origin.shiftOutwards(n, 100);
  let se = origin.shiftOutwards(e, 100);
  let ss = origin.shiftOutwards(s, 100);
  let sw = origin.shiftOutwards(w, 100);
  expect(sn.x).to.equal(0);
  expect(sn.y).to.equal(-110);
  expect(se.x).to.equal(110);
  expect(se.y).to.equal(0);
  expect(ss.x).to.equal(0);
  expect(ss.y).to.equal(110);
  expect(sw.x).to.equal(-110);
  expect(sw.y).to.equal(0);
  expect(sw.shiftOutwards(sn, 100).x).to.equal(70.71);
  expect(ss.shiftOutwards(se, 200).y).to.equal(-141.42);
});

it("Should rotate a point around another", () => {
  let sun = new Point(0, 0);
  let moon = new Point(10, 0);
  let a = moon.rotate(90, sun);
  expect(a.x).to.equal(0);
  expect(a.y).to.equal(-10);
  let b = moon.rotate(-90, sun);
  expect(b.x).to.equal(0);
  expect(b.y).to.equal(10);
  let c = moon.rotate(180, sun);
  expect(c.x).to.equal(-10);
  expect(c.y).to.equal(0);
  let sun2 = new Point(222, 44);
  let moon2 = new Point(212, 41);
  let d = moon2.rotate(90, sun2);
  expect(d.x).to.equal(219);
  expect(d.y).to.equal(54);
});

it("Should set an attribute", () => {
  let p = new Point(0, 0).attr("class", "test");
  expect(p.attributes.get("class")).to.equal("test");
  p.attr("class", "more");
  expect(p.attributes.get("class")).to.equal("test more");
  p.attr("class", "less", true);
  expect(p.attributes.get("class")).to.equal("less");
});

it("Should detect points in the same location", () => {
  let p1 = new Point(123, 456);
  let p2 = new Point(123, 456);
  expect(p1.sitsOn(p2)).to.equal(true);
  p2.x = 122.99;
  expect(p1.sitsOn(p2)).to.equal(false);
});

it("Should clone a point", () => {
  let p1 = new Point(123, 456).attr("class", "something");
  p1.attr("class", "else");
  let p2 = p1.clone();
  expect(p2.sitsOn(p1)).to.equal(true);
  expect(p2.attributes.get("class")).to.equal("something else");
});

it("Should translate a point", () => {
  let p1 = new Point(10, 20);
  let p2 = p1.translate(15, 50);
  expect(p2.x).to.equal(25);
  expect(p2.y).to.equal(70);
});
