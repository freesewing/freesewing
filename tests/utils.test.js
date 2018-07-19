var expect = require('chai').expect;
var Point = require('../dist/lib/point').Point;
var utils = require('../dist/lib/utils');

it('should round a value', () => {
  expect(utils.round(1.2345)).to.equal(1.23);
  expect(utils.round(-9.876)).to.equal(-9.88);
  expect(utils.round(12)).to.equal(12);
});

it('should convert radians to degrees', () => {
  expect(utils.rad2deg(Math.PI/2)).to.equal(90);
  expect(utils.rad2deg(Math.PI)).to.equal(180);
  expect(utils.rad2deg(Math.PI*2)).to.equal(360);
});

it('should convert degrees to radians', () => {
  expect(utils.deg2rad(90)).to.equal(Math.PI/2);
  expect(utils.deg2rad(180)).to.equal(Math.PI);
  expect(utils.deg2rad(360)).to.equal(Math.PI*2);
});

it('should return a line intersection', () => {
  let a = new Point(-10,-10);
  let b = new Point(10,-10);
  let c = new Point(10,10);
  let d = new Point(-10,10);
  let result = utils.beamsCross(a,c,b,d);
  expect(result.x).to.equal(0);
  expect(result.y).to.equal(0);
  expect(utils.beamsCross(a,b,c,d)).to.be.false;

  // Debug
  let e = new Point(213,222);
  let f = new Point(220,214);
  let g = new Point(213,44);
  let h = new Point(248,222);
  result = utils.beamsCross(e,f,g,h);
  expect(result.x).to.equal(241.58);
  expect(result.y).to.equal(189.34);
});

it('should return a line segment intersection', () => {
  let a = new Point(-10,-10);
  let b = new Point(10,-10);
  let c = new Point(10,10);
  let d = new Point(-10,10);
  let result = utils.linesCross(a,c,b,d);
  expect(result.x).to.equal(0);
  expect(result.y).to.equal(0);
  expect(utils.linesCross(a,b,c,d)).to.be.false;
  let e = new Point(5,-5);
  expect(utils.linesCross(a,b,c,e)).to.be.false;

  let f = new Point(1,10);
  let g = new Point(0,49);
  let h = new Point(-20,40);
  let i = new Point(20,40);
});

