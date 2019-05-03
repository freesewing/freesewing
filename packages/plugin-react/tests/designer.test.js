import script from "../src/lib/script.js";
import defs from "../src/lib/snippets.js";
import freesewing from "freesewing";
import { version } from "../package.json";

let expect = require("chai").expect;
let designerPlugin = require("../dist/index.js");

let pattern = new freesewing.Pattern().with(designerPlugin);
pattern.render();

it("Should load script", () => {
  expect(pattern.svg.script).to.equal(script);
});

it("Should set load defs", () => {
  expect(pattern.svg.defs).to.equal(defs);
});

it("Should set the plugin name:version attribute", () => {
  expect(pattern.svg.attributes.get("freesewing:plugin-designer")).to.equal(
    version
  );
});

it("Should decorate a point", () => {
  pattern.parts.testPart = new pattern.Part();
  pattern.parts.testPart.points.testPoint = new freesewing.Point(10, 20);
  let a = pattern.parts.testPart.points.testPoint.attributes;
  pattern.render();
  expect(a.get("id")).to.equal("1");
  expect(a.get("data-point")).to.equal("testPoint");
  expect(a.get("data-part")).to.equal("testPart");
  let snippet = pattern.parts.testPart.snippets["snippet-testPoint"];
  expect(snippet.def).to.equal("point");
  expect(snippet.anchor).to.equal(pattern.parts.testPart.points.testPoint);
  let b = snippet.attributes;
  expect(b.get("onmouseover")).to.equal("pointHover(evt)");
  expect(b.get("id")).to.equal("snippet-testPoint");
  expect(b.get("data-point")).to.equal("testPoint");
  expect(b.get("data-part")).to.equal("testPart");
});

it("Should decorate a hidden point", () => {
  pattern.parts.testPart.points._hidden = new freesewing.Point(30, 40);
  let a = pattern.parts.testPart.points._hidden.attributes;
  pattern.render();
  expect(a.get("id")).to.equal("2");
  expect(a.get("data-point")).to.equal("_hidden");
  expect(a.get("data-part")).to.equal("testPart");
});

it("Should decorate a path point", () => {
  pattern.parts.testPart.points.from = new freesewing.Point(5, 60);
  pattern.parts.testPart.points.cp1 = new freesewing.Point(50, 60);
  pattern.parts.testPart.points.cp2 = new freesewing.Point(90, 10);
  pattern.parts.testPart.points.to = new freesewing.Point(10, 10);
  pattern.parts.testPart.paths.testPath = new freesewing.Path()
    .move(pattern.parts.testPart.points.from)
    .line(pattern.parts.testPart.points.testPoint)
    .curve(
      pattern.parts.testPart.points.cp1,
      pattern.parts.testPart.points.cp2,
      pattern.parts.testPart.points.to
    );
  pattern.render();
  let snippet = pattern.parts.testPart.snippets[7];
  expect(snippet.def).to.equal("path-move-point");
  expect(snippet.anchor).to.equal(pattern.parts.testPart.points.from);
  let b = snippet.attributes;
  expect(b.get("data-path")).to.equal("testPath");
  expect(b.get("data-part")).to.equal("testPart");
});
