const version = require("../package.json").version;
const render = require("./fixtures/render.js");
const expect = require("chai").expect;
const chai = require("chai");
chai.use(require("chai-string"));
const freesewing = require("./dist");
const round = freesewing.utils.round;

it("Svg constructor should initialize object", () => {
  let pattern = new freesewing.Pattern();
  pattern.render();
  let svg = pattern.svg;
  expect(svg.openGroups).to.eql([]);
  expect(svg.freeId).to.equal(0);
  expect(svg.body).to.equal("");
  expect(svg.style).to.equal("")
  expect(svg.script).to.equal("");
  expect(svg.defs).to.equal("");
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

it("Should render language attribute", () => {
  let pattern = new freesewing.Pattern();
  pattern.settings.locale = "nl";
  expect(pattern.render()).to.equalIgnoreSpaces(render.boilerplateNl);
});

it("Should render Svg boilerplate for embedding", () => {
  let pattern = new freesewing.Pattern();
  pattern.settings.embed = true;
  expect(pattern.render()).to.equalIgnoreSpaces(render.embed);
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

it("Should render Svg multi-line text", () => {
  let pattern = new freesewing.Pattern();
  pattern.render();
  pattern.parts.test = new pattern.Part();
  let p = pattern.parts.test;
  p.points.test = new p.Point(20, 20)
    .attr("data-text", "This is a test\nwith text on\nmultiple lines")
    .attr("data-text-class", "text-lg")
    .attr("data-text-lineheight", 8);
  expect(pattern.render()).to.equalIgnoreSpaces(render.multiText);
});

it("Should render Svg multi-line text with default lineheight", () => {
  let pattern = new freesewing.Pattern();
  pattern.render();
  pattern.parts.test = new pattern.Part();
  let p = pattern.parts.test;
  p.points.test = new p.Point(20, 20)
    .attr("data-text", "This is a test\nwith text on\nmultiple lines")
    .attr("data-text-class", "text-lg");
  expect(pattern.render()).to.equalIgnoreSpaces(render.multiTextDflt);
});

it("Should not render text when there is none", () => {
  let pattern = new freesewing.Pattern();
  pattern.render();
  pattern.parts.test = new pattern.Part();
  let p = pattern.parts.test;
  p.points.test = new p.Point(20, 20);
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

it("Should render an Svg circle", () => {
  let pattern = new freesewing.Pattern();
  pattern.render();
  pattern.parts.test = new pattern.Part();
  let p = pattern.parts.test;
  p.points.test = new p.Point(20, 20).attr("data-circle", "50");
  expect(pattern.render()).to.equalIgnoreSpaces(render.circle);
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

it("Should replaced double quotes in Svg text", () => {
  const pattern = new freesewing.Pattern()
  pattern.render()
  expect(
    pattern.svg.escapeText('This is a "test" message')
  ).to.equal('This is a &#8220;test&#8220; message')
});

it("Should scale an Svg snippet", () => {
  let pattern = new freesewing.Pattern();
  pattern.render();
  pattern.parts.test = new pattern.Part();
  let p = pattern.parts.test;
  p.snippets.test = new p.Snippet(
    "test",
    new p.Point(20, 20),
    "This is a snippet"
  ).attr("data-scale", 2);
  expect(pattern.render()).to.contain("scale(2)");
});

it("Should run preRender hook", () => {
  let pattern = new freesewing.Pattern();
  pattern.on("preRender", svg => {
    svg.attributes.set("data-hook", "preRender");
  });
  pattern.render();
  expect(pattern.svg.attributes.get("data-hook")).to.equal("preRender");
});

it("Should run insertText hook", () => {
  let pattern = new freesewing.Pattern();
  pattern.on("insertText", (locale, text) => {
    return text.toUpperCase();
  });
  pattern.parts.test = new pattern.Part();
  let p = pattern.parts.test;
  p.points.test = new p.Point(20, 20)
    .attr("data-text", "This is a test")
    .attr("data-text-class", "text-lg");
  expect(pattern.render()).to.contain("THIS IS A TEST");
});

it("Should run postRender hook", () => {
  let pattern = new freesewing.Pattern();
  pattern.on("postRender", svg => {
    svg.svg = "test";
  });
  expect(pattern.render()).to.equal("test");
});
