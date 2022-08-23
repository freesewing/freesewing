const expect = require("chai").expect;
const freesewing = require("../dist/index.js");
const Point = freesewing.Point;
const round = freesewing.utils.round;

it("Should return point object", () => {
  let result = new Point(2, 4);
  expect(result).to.be.a("object");
  expect(result.x).to.equal(2);
  expect(result.y).to.equal(4);
});

it("Should not limit point precision", () => {
  let result = new Point(2.12345, 4.98765);
  expect(result.x).to.equal(2.12345);
  expect(result.y).to.equal(4.98765);
});

it("Should return distance", () => {
  expect(round(new Point(2, 4).dist(new Point(-123, -32423)))).to.equal(32427.24);
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

it("Should flip point around unset X value", () => {
  let result = new Point(2, 4).flipX();
  expect(result.x).to.equal(-2);
  expect(result.y).to.equal(4);
});

it("Should flip point around X value that is zero", () => {
  let flip = new Point(0, 0);
  let result = new Point(2, 4).flipX(flip);
  expect(result.x).to.equal(-2);
  expect(result.y).to.equal(4);
});

it("Should flip point around X value", () => {
  let result = new Point(2, 4).flipX(new Point(-20, 19));
  expect(result.x).to.equal(-42);
  expect(result.y).to.equal(4);
});

it("Should flip point around unset Y value", () => {
  let result = new Point(2, 4).flipY();
  expect(result.x).to.equal(2);
  expect(result.y).to.equal(-4);
});

it("Should flip point around Y value that is zero", () => {
  let flip = new Point(0, 0);
  let result = new Point(2, 4).flipY(flip);
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
  expect(round(n.x)).to.equal(0);
  expect(round(n.y)).to.equal(-10);
  expect(round(e.x)).to.equal(10);
  expect(round(e.y)).to.equal(0);
  expect(round(s.x)).to.equal(0);
  expect(round(s.y)).to.equal(10);
  expect(round(w.x)).to.equal(-10);
  expect(round(w.y)).to.equal(0);
  let rand = origin.shift(-123, 456);
  expect(round(rand.x)).to.equal(-248.36);
  expect(round(rand.y)).to.equal(382.43);
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
  expect(round(sn.x)).to.equal(0);
  expect(round(sn.y)).to.equal(-123);
  expect(round(se.x)).to.equal(123);
  expect(round(se.y)).to.equal(0);
  expect(round(ss.x)).to.equal(0);
  expect(round(ss.y)).to.equal(123);
  expect(round(sw.x)).to.equal(-123);
  expect(round(sw.y)).to.equal(0);
  expect(round(sw.shiftTowards(sn, 100).x)).to.equal(-52.29);
  expect(round(ss.shiftTowards(se, 200).y)).to.equal(-18.42);
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
  expect(round(sn.x)).to.equal(0);
  expect(round(sn.y)).to.equal(-15);
  expect(round(se.x)).to.equal(15);
  expect(round(se.y)).to.equal(0);
  expect(round(ss.x)).to.equal(0);
  expect(round(ss.y)).to.equal(5);
  expect(round(sw.x)).to.equal(-25);
  expect(round(sw.y)).to.equal(0);
  expect(round(sw.shiftFractionTowards(sn, 100).x)).to.equal(2475);
  expect(round(ss.shiftFractionTowards(se, 200).y)).to.equal(-995);
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
  expect(round(sn.x)).to.equal(0);
  expect(round(sn.y)).to.equal(-110);
  expect(round(se.x)).to.equal(110);
  expect(round(se.y)).to.equal(0);
  expect(round(ss.x)).to.equal(0);
  expect(round(ss.y)).to.equal(110);
  expect(round(sw.x)).to.equal(-110);
  expect(round(sw.y)).to.equal(0);
  expect(round(sw.shiftOutwards(sn, 100).x)).to.equal(70.71);
  expect(round(ss.shiftOutwards(se, 200).y)).to.equal(-141.42);
});

it("Should rotate a point around another", () => {
  let sun = new Point(0, 0);
  let moon = new Point(10, 0);
  let a = moon.rotate(90, sun);
  expect(round(a.x)).to.equal(0);
  expect(round(a.y)).to.equal(-10);
  let b = moon.rotate(-90, sun);
  expect(round(b.x)).to.equal(0);
  expect(round(b.y)).to.equal(10);
  let c = moon.rotate(180, sun);
  expect(round(c.x)).to.equal(-10);
  expect(round(c.y)).to.equal(0);
  let sun2 = new Point(222, 44);
  let moon2 = new Point(212, 41);
  let d = moon2.rotate(90, sun2);
  expect(round(d.x)).to.equal(219);
  expect(round(d.y)).to.equal(54);
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

it("Should add raise methods to a point", () => {
  const raise = () => 'hello'
  const p1 = new Point(10, 20).withRaise(raise);
  expect(p1.raise()).to.equal('hello');
});

it("Should raise a warning on invalid point coordinates", () => {
  const invalid = { x: false, y: false }
  const raiseX = { warning: () => invalid.x = true }
  const raiseY = { warning: () => invalid.y = true }
  const p1 = new Point('a',10).withRaise(raiseX);
  const p2 = new Point(20, 'b').withRaise(raiseY);
  expect(invalid.x).to.equal(false);
  expect(invalid.y).to.equal(false);
  p1.check()
  p2.check()
  expect(invalid.x).to.equal(true);
  expect(invalid.y).to.equal(true);
});

it("Should raise a warning if rotation is not a number", () => {
  let invalid = false
  const raise = { warning: () => invalid = true }
  const p1 = new Point(10,10).withRaise(raise);
  const p2 = new Point(20, 20).withRaise(raise);
  expect(invalid).to.equal(false);
  const p3 = p1.rotate('a', p2)
  expect(invalid).to.equal(true);
});

it("Should raise a warning if rotating around what is not a point", () => {
  let invalid = false
  const raise = { warning: () => invalid = true }
  const p1 = new Point(10,10).withRaise(raise);
  expect(invalid).to.equal(false);
  try {
    p1.rotate(45, 'a')
  }
  catch (err) {
    expect(''+err).to.contain("check is not a function")
  }
  expect(invalid).to.equal(true);
});

it("Should raise a warning when flipX'ing around what is not a point", () => {
  let invalid = false
  const raise = { warning: () => invalid = true }
  const p1 = new Point(10,10).withRaise(raise);
  const p2 = new Point(20, 20).withRaise(raise);
  expect(invalid).to.equal(false);
  try {
    p1.flipX('a')
  }
  catch (err) {
    expect(''+err).to.contain("check is not a function")
  }
  expect(invalid).to.equal(true);
});

it("Should raise a warning when flipY'ing around what is not a point", () => {
  let invalid = false
  const raise = { warning: () => invalid = true }
  const p1 = new Point(10,10).withRaise(raise);
  const p2 = new Point(20, 20).withRaise(raise);
  expect(invalid).to.equal(false);
  try {
    p1.flipY('a')
  }
  catch (err) {
    expect(''+err).to.contain("check is not a function")
  }
  expect(invalid).to.equal(true);
});

it("Should raise a warning when shifting with a distance that is not a number", () => {
  let invalid = false
  const raise = { warning: () => invalid = true }
  const p1 = new Point(10,10).withRaise(raise);
  expect(invalid).to.equal(false);
  try {
    p1.shift(0, 'a')
  }
  catch (err) {
    expect(''+err).to.contain("check is not a function")
  }
  expect(invalid).to.equal(true);
});

it("Should raise a warning when shifting with an angle that is not a number", () => {
  let invalid = false
  const raise = { warning: () => invalid = true }
  const p1 = new Point(10,10).withRaise(raise);
  expect(invalid).to.equal(false);
  try {
    p1.shift('a', 12)
  }
  catch (err) {
    expect(''+err).to.contain("check is not a function")
  }
  expect(invalid).to.equal(true);
});

it("Should raise a warning when shifting towards with a distance that is not a number", () => {
  let invalid = false
  const raise = { warning: () => invalid = true }
  const p1 = new Point(10,10).withRaise(raise);
  const p2 = new Point(20,20).withRaise(raise);
  expect(invalid).to.equal(false);
  try {
    p1.shiftTowards(p2, 'a')
  }
  catch (err) {
    expect(''+err).to.contain("check is not a function")
  }
  expect(invalid).to.equal(true);
});

it("Should raise a warning when shifting towards with a target that is not a point", () => {
  let invalid = false
  const raise = { warning: () => invalid = true }
  const p1 = new Point(10,10).withRaise(raise);
  const p2 = new Point(20,20).withRaise(raise);
  expect(invalid).to.equal(false);
  try {
    p1.shiftTowards('a', 10)
  }
  catch (err) {
    expect(''+err).to.contain("check is not a function")
  }
  expect(invalid).to.equal(true);
});

it("Should raise a warning when shifting fraction towards with a distance that is not a number", () => {
  let invalid = false
  const raise = { warning: () => invalid = true }
  const p1 = new Point(10,10).withRaise(raise);
  const p2 = new Point(20,20).withRaise(raise);
  expect(invalid).to.equal(false);
  try {
    p1.shiftFractionTowards(p2, 'a')
  }
  catch (err) {
    expect(''+err).to.contain("check is not a function")
  }
  expect(invalid).to.equal(true);
});

it("Should raise a warning when shifting a fraction towards with a target that is not a point", () => {
  let invalid = false
  const raise = { warning: () => invalid = true }
  const p1 = new Point(10,10).withRaise(raise);
  const p2 = new Point(20,20).withRaise(raise);
  expect(invalid).to.equal(false);
  try {
    p1.shiftFractionTowards('a', 0.1)
  }
  catch (err) {
    expect(''+err).to.contain("check is not a function")
  }
  expect(invalid).to.equal(true);
});

it("Should raise a warning when shifting outowards with a distance that is not a number", () => {
  let invalid = false
  const raise = { warning: () => invalid = true }
  const p1 = new Point(10,10).withRaise(raise);
  const p2 = new Point(20,20).withRaise(raise);
  expect(invalid).to.equal(false);
  try {
    p1.shiftOutwards(p2, 'a')
  }
  catch (err) {
    expect(''+err).to.contain("check is not a function")
  }
  expect(invalid).to.equal(true);
});

it("Should raise a warning when shifting a outowards with a target that is not a point", () => {
  let invalid = false
  const raise = { warning: () => invalid = true }
  const p1 = new Point(10,10).withRaise(raise);
  const p2 = new Point(20,20).withRaise(raise);
  expect(invalid).to.equal(false);
  try {
    p1.shiftOutwards('a', 0.1)
  }
  catch (err) {
    expect(''+err).to.contain("check is not a function")
  }
  expect(invalid).to.equal(true);
});

it("Should raise a warning when translating with an X-delta that is not a number", () => {
  let invalid = false
  const raise = { warning: () => invalid = true }
  const p1 = new Point(10,10).withRaise(raise);
  expect(invalid).to.equal(false);
  try {
    p1.translate('a', 10)
  }
  catch (err) {
    expect(''+err).to.contain("check is not a function")
  }
  expect(invalid).to.equal(true);
});

it("Should raise a warning when translating with an Y-delta that is not a number", () => {
  let invalid = false
  const raise = { warning: () => invalid = true }
  const p1 = new Point(10,10).withRaise(raise);
  expect(invalid).to.equal(false);
  try {
    p1.translate(10, 'a')
  }
  catch (err) {
    expect(''+err).to.contain("check is not a function")
  }
  expect(invalid).to.equal(true);
});

it("Should raise a warning when sitsOn receives a non-point", () => {
  let invalid = false
  const raise = { warning: () => invalid = true }
  const p1 = new Point(10,10).withRaise(raise);
  expect(invalid).to.equal(false);
  try {
    p1.sitsOn('a')
  }
  catch (err) {
    expect(''+err).to.contain("check is not a function")
  }
  expect(invalid).to.equal(true);
});

it("Should raise a warning when sitsRoughlyOn receives a non-point", () => {
  let invalid = false
  const raise = { warning: () => invalid = true }
  const p1 = new Point(10,10).withRaise(raise);
  expect(invalid).to.equal(false);
  try {
    p1.sitsRoughlyOn('a')
  }
  catch (err) {
    expect(''+err).to.contain("check is not a function")
  }
  expect(invalid).to.equal(true);
});

it("Should set the data-text property in a chainable way", () => {
  const p1 = new Point(10,10).setText('hello')
  expect(p1.attributes.get('data-text')).to.equal('hello');
});

it("Should set the data-text-class property in a chainable way", () => {
  const p1 = new Point(10,10).setText('hello', 'fabric')
  expect(p1.attributes.get('data-text')).to.equal('hello');
  expect(p1.attributes.get('data-text-class')).to.equal('fabric');
});

it("Should set the data-circle property in a chainable way", () => {
  const p1 = new Point(10,10).setCircle('20')
  expect(p1.attributes.get('data-circle')).to.equal('20');
});

it("Should set the data-circle-class property in a chainable way", () => {
  const p1 = new Point(10,10).setCircle('20', 'fabric')
  expect(p1.attributes.get('data-circle')).to.equal('20');
  expect(p1.attributes.get('data-circle-class')).to.equal('fabric');
});

