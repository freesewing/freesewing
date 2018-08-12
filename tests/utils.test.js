var expect = require("chai").expect;
var freesewing = require("../dist/index.js");
var utils = freesewing.utils;

it("Should return the correct macro name", () => {
  expect(utils.macroName("test")).to.equal("_macro_test");
});

it("Should find the intersection of two endless line segments", () => {
  var a = new freesewing.Point(10, 20);
  var b = new freesewing.Point(20, 24);
  var c = new freesewing.Point(90, 19);
  var d = new freesewing.Point(19, 70);
  var X = freesewing.utils.beamsCross(a, b, c, d);
  expect(X.x).to.equal(60.49);
  expect(X.y).to.equal(40.2);
});

it("Should detect parallel lines", () => {
  var a = new freesewing.Point(10, 20);
  var b = new freesewing.Point(20, 20);
  var c = new freesewing.Point(90, 40);
  var d = new freesewing.Point(19, 40);
  expect(freesewing.utils.beamsCross(a, b, c, d)).to.equal(false);
  expect(freesewing.utils.linesCross(a, b, c, d)).to.equal(false);
});

it("Should detect vertical lines", () => {
  var a = new freesewing.Point(10, 20);
  var b = new freesewing.Point(10, 90);
  var c = new freesewing.Point(90, 40);
  var d = new freesewing.Point(19, 40);
  var X = freesewing.utils.beamsCross(a, b, c, d);
  expect(X.x).to.equal(10);
  expect(X.y).to.equal(40);
  var X = freesewing.utils.beamsCross(c, d, a, b);
  expect(X.x).to.equal(10);
});

it("Should swap direction prior to finding beam intersection", () => {
  var a = new freesewing.Point(10, 20);
  var b = new freesewing.Point(00, 90);
  var c = new freesewing.Point(90, 40);
  var d = new freesewing.Point(19, 40);
  var X = freesewing.utils.beamsCross(a, b, c, d);
  expect(X.x).to.equal(7.14);
  expect(X.y).to.equal(40);
});

it("Should return false when two lines don't intersect", () => {
  var a = new freesewing.Point(10, 20);
  var b = new freesewing.Point(20, 24);
  var c = new freesewing.Point(90, 19);
  var d = new freesewing.Point(19, 70);
  expect(freesewing.utils.linesCross(a, b, c, d)).to.equal(false);
});

it("Should find the intersection of two line segments", () => {
  var a = new freesewing.Point(10, 10);
  var b = new freesewing.Point(90, 74);
  var c = new freesewing.Point(90, 19);
  var d = new freesewing.Point(11, 70);
  var X = freesewing.utils.beamsCross(a, b, c, d);
  expect(X.x).to.equal(51.95);
  expect(X.y).to.equal(43.56);
});

it("Should find the intersection of an endles line and a give Y-value", () => {
  var a = new freesewing.Point(10, 10);
  var b = new freesewing.Point(90, 74);
  var X = freesewing.utils.beamCrossesY(a, b, 69);
  expect(X.x).to.equal(83.75);
  expect(X.y).to.equal(69);
});

it("Should detect horizontal lines never pass a give Y-value", () => {
  var a = new freesewing.Point(10, 10);
  var b = new freesewing.Point(90, 10);
  expect(freesewing.utils.beamCrossesY(a, b, 69)).to.equal(false);
});

it("Should correctly format units", () => {
  expect(freesewing.utils.units(123.456)).to.equal("12.35cm");
  expect(freesewing.utils.units(123.456, "imperial")).to.equal('4.86"');
});
