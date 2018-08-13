let version = require("../package.json").version;
let render = require("./fixtures/render.js");
let expect = require("chai").expect;
let chai = require("chai");
chai.use(require("chai-string"));
let freesewing = require("../dist/index.js");

it("Svg constructor should initialize object", () => {
  let pattern = new freesewing.Pattern();
  pattern.render();
  let svg = pattern.svg;
  expect(svg.openGroups).to.eql([]);
  expect(svg.freeId).to.equal(0);
  expect(svg.body).to.equal("");
  expect(svg.style).to.equal("");
  expect(svg.script).to.equal("");
  expect(svg.header).to.equal("");
  expect(svg.defs).to.equal("");
  expect(svg.footer).to.equal("");
  expect(svg.pattern).to.eql(pattern);
  expect(svg.prefix).to.equal(
    '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'
  );
  expect(svg.attributes.get("xmlns")).to.equal("http://www.w3.org/2000/svg");
  expect(svg.attributes.get("xmlns:svg")).to.equal(
    "http://www.w3.org/2000/svg"
  );
  expect(svg.attributes.get("xmlns:xlink")).to.equal(
    "http://www.w3.org/1999/xlink"
  );
  expect(svg.attributes.get("xmlns:freesewing")).to.equal(
    "http://freesewing.org/namespaces/freesewing"
  );
  expect(svg.attributes.get("freesewing")).to.equal(version);
});

it("Should render Svg boilerplate", () => {
  let pattern = new freesewing.Pattern();
  expect(pattern.render()).to.equalIgnoreSpaces(render.boilerplate);
});

it("Should render Svg part boilerplate", () => {
  let pattern = new freesewing.Pattern();
  pattern.render();
  pattern.parts.test = new pattern.Part();
  expect(pattern.render()).to.equalIgnoreSpaces(render.part);
  pattern.parts.test.render = false;
  expect(pattern.render()).to.equalIgnoreSpaces(render.boilerplate);
});

it("Should render Svg path", () => {
  let pattern = new freesewing.Pattern();
  pattern.render();
  pattern.parts.test = new pattern.Part();
  let p = pattern.parts.test;
  p.paths.test = new p.Path()
    .move(new p.Point(0, 0))
    .line(new p.Point(40, 20))
    .curve(new p.Point(12, 34), new p.Point(56, 78), new p.Point(21, 32))
    .close()
    .attr("id", "something")
    .attr("class", "freesewing");
  expect(pattern.render()).to.equalIgnoreSpaces(render.path);
});
it("Should not render Svg path when render property is false", () => {
  let pattern = new freesewing.Pattern();
  pattern.render();
  pattern.parts.test = new pattern.Part();
  let p = pattern.parts.test;
  p.paths.test = new p.Path()
    .move(new p.Point(0, 0))
    .line(new p.Point(40, 20))
    .curve(new p.Point(12, 34), new p.Point(56, 78), new p.Point(21, 32))
    .close()
    .attr("id", "something")
    .attr("class", "freesewing");
  p.paths.test.render = false;
  expect(pattern.render()).to.equalIgnoreSpaces(render.part);
});

it("Should render Svg text", () => {
  let pattern = new freesewing.Pattern();
  pattern.render();
  pattern.parts.test = new pattern.Part();
  let p = pattern.parts.test;
  p.points.test = new p.Point(20, 20)
    .attr("data-text", "This is a test")
    .attr("data-text-class", "text-lg");
  p.points.other = new p.Point(10, 10).attr("data-text", "");
  expect(pattern.render()).to.equalIgnoreSpaces(render.text);
});

it("Should not render empty text", () => {
  let pattern = new freesewing.Pattern();
  pattern.render();
  pattern.parts.test = new pattern.Part();
  let p = pattern.parts.test;
  p.points.test = new p.Point(20, 20)
    .attr("data-text", "")
    .attr("data-text-class", "text-lg");
  expect(pattern.render()).to.equalIgnoreSpaces(render.part);
});

it("Should render Svg text on path", () => {
  let pattern = new freesewing.Pattern();
  pattern.render();
  pattern.parts.test = new pattern.Part();
  let p = pattern.parts.test;
  p.paths.test = new p.Path()
    .move(new p.Point(0, 0))
    .line(new p.Point(40, 20))
    .curve(new p.Point(12, 34), new p.Point(56, 78), new p.Point(21, 32))
    .close()
    .attr("data-text", "This is another test")
    .attr("data-text-class", "text-sm")
    .attr("class", "freesewing");
  expect(pattern.render()).to.equalIgnoreSpaces(render.textOnPath);
});

it("Should render Svg text on path, center aligned", () => {
  let pattern = new freesewing.Pattern();
  pattern.render();
  pattern.parts.test = new pattern.Part();
  let p = pattern.parts.test;
  p.paths.test = new p.Path()
    .move(new p.Point(0, 0))
    .line(new p.Point(40, 20))
    .curve(new p.Point(12, 34), new p.Point(56, 78), new p.Point(21, 32))
    .close()
    .attr("data-text", "This is another test")
    .attr("data-text-class", "center")
    .attr("class", "freesewing");
  expect(pattern.render()).to.equalIgnoreSpaces(render.textOnPathCenter);
});

it("Should render Svg text on path, right aligned", () => {
  let pattern = new freesewing.Pattern();
  pattern.render();
  pattern.parts.test = new pattern.Part();
  let p = pattern.parts.test;
  p.paths.test = new p.Path()
    .move(new p.Point(0, 0))
    .line(new p.Point(40, 20))
    .curve(new p.Point(12, 34), new p.Point(56, 78), new p.Point(21, 32))
    .close()
    .attr("data-text", "This is another test")
    .attr("data-text-class", "right")
    .attr("class", "freesewing");
  expect(pattern.render()).to.equalIgnoreSpaces(render.textOnPathRight);
});

it("Should render an Svg snippet", () => {
  let pattern = new freesewing.Pattern();
  pattern.render();
  pattern.parts.test = new pattern.Part();
  let p = pattern.parts.test;
  p.snippets.test = new p.Snippet(
    "test",
    new p.Point(20, 20),
    "This is a snippet"
  );
  expect(pattern.render()).to.equalIgnoreSpaces(render.snippet);
});
