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
  let e = new Point(0,0);
  let f = new Point(25,25);
  let g = new Point(0,60);
  let h = new Point(25,35);
  // Should be 30,30, but is 30,0
  console.log(utils.beamsCross(e,f,g,h));
        //$p->newPoint(2,25,25);
        //$p->newPoint(3,0,60);
        //$p->newPoint(4,25,35);
        //$this->assertFalse($p->linesCross(1,2,3,4));
        //$this->assertFalse($p->beamsCross(1,3,2,4));
        //
        //$expect = new \Freesewing\Point();
        //$expect->setX(30);
        //$expect->setY(30);
        //$this->assertEquals($p->beamsCross(1,2,3,4), $expect);
        //
        //$p->newPoint(4,10,-10);
        //$expect->setX(7.5);
        //$expect->setY(7.5);
        //$this->assertEquals($p->linesCross(1,2,3,4), $expect);
  //
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
  console.log(utils.beamsCross(g,f,h,i));

});

