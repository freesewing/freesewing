import freesewing from "@freesewing/core";
import { version } from "../../plugin-dimension/package.json";
let expect = require("chai").expect;
let plugin = require("../dist/index.js");
const { Console } = require("console");

describe("plugin-dimension", function() {
  it("Should set the plugin name:version attribute", () => {
    let pattern = new freesewing.Pattern().use(plugin);
    pattern.render();
    expect(pattern.svg.attributes.get("freesewing:plugin-dimension")).to.equal(
      version
    );
  });
  
  it("Should run the hd macro", () => {
    let pattern = new freesewing.Pattern();
    pattern.draft = function() {};
    pattern.use(plugin);
    pattern.parts.test = new pattern.Part();
    pattern.parts.test.points.from = new pattern.Point(10, 20);
    pattern.parts.test.points.to = new pattern.Point(200, 20);
    let { macro } = pattern.parts.test.shorthand();
    macro("hd", {
      from: pattern.parts.test.points.from,
      to: pattern.parts.test.points.to,
      y: 35
    });
    let c = pattern.parts.test.paths[1];
    expect(c.attributes.get("class")).to.equal("mark");
    expect(c.attributes.get("marker-start")).to.equal("url(#dimensionFrom)");
    expect(c.attributes.get("marker-end")).to.equal("url(#dimensionTo)");
    expect(c.attributes.get("data-text")).to.equal("19cm");
    expect(c.attributes.get("data-text-class")).to.equal("fill-mark center");
    expect(c.ops[0].type).to.equal("move");
    expect(c.ops[1].type).to.equal("line");
    expect(c.ops[0].to.x).to.equal(10);
    expect(c.ops[0].to.y).to.equal(35);
    expect(c.ops[1].to.x).to.equal(200);
    expect(c.ops[1].to.y).to.equal(35);
    c = pattern.parts.test.paths["1_ls"];
    expect(c.attributes.get("class")).to.equal("mark dotted");
    expect(c.ops[0].type).to.equal("move");
    expect(c.ops[1].type).to.equal("line");
    expect(c.ops[0].to.x).to.equal(10);
    expect(c.ops[0].to.y).to.equal(20);
    expect(c.ops[1].to.x).to.equal(10);
    expect(c.ops[1].to.y).to.equal(35);
    c = pattern.parts.test.paths["1_le"];
    expect(c.attributes.get("class")).to.equal("mark dotted");
    expect(c.ops[0].type).to.equal("move");
    expect(c.ops[1].type).to.equal("line");
    expect(c.ops[0].to.x).to.equal(200);
    expect(c.ops[0].to.y).to.equal(20);
    expect(c.ops[1].to.x).to.equal(200);
    expect(c.ops[1].to.y).to.equal(35);
  });
  
  it("Should run the vd macro", () => {
    let pattern = new freesewing.Pattern();
    pattern.draft = function() {};
    pattern.use(plugin);
    pattern.parts.test = new pattern.Part();
    pattern.parts.test.points.from = new pattern.Point(10, 20);
    pattern.parts.test.points.to = new pattern.Point(10, 200);
    let { macro } = pattern.parts.test.shorthand();
    macro("vd", {
      from: pattern.parts.test.points.from,
      to: pattern.parts.test.points.to,
      x: 25
    });
    let c = pattern.parts.test.paths[1];
    expect(c.attributes.get("class")).to.equal("mark");
    expect(c.attributes.get("marker-start")).to.equal("url(#dimensionFrom)");
    expect(c.attributes.get("marker-end")).to.equal("url(#dimensionTo)");
    expect(c.attributes.get("data-text")).to.equal("18cm");
    expect(c.attributes.get("data-text-class")).to.equal("fill-mark center");
    expect(c.ops[0].type).to.equal("move");
    expect(c.ops[1].type).to.equal("line");
    expect(c.ops[0].to.x).to.equal(25);
    expect(c.ops[0].to.y).to.equal(20);
    expect(c.ops[1].to.x).to.equal(25);
    expect(c.ops[1].to.y).to.equal(200);
    c = pattern.parts.test.paths["1_ls"];
    expect(c.attributes.get("class")).to.equal("mark dotted");
    expect(c.ops[0].type).to.equal("move");
    expect(c.ops[1].type).to.equal("line");
    expect(c.ops[0].to.x).to.equal(10);
    expect(c.ops[0].to.y).to.equal(20);
    expect(c.ops[1].to.x).to.equal(25);
    expect(c.ops[1].to.y).to.equal(20);
    c = pattern.parts.test.paths["1_le"];
    expect(c.attributes.get("class")).to.equal("mark dotted");
    expect(c.ops[0].type).to.equal("move");
    expect(c.ops[1].type).to.equal("line");
    expect(c.ops[0].to.x).to.equal(10);
    expect(c.ops[0].to.y).to.equal(200);
    expect(c.ops[1].to.x).to.equal(25);
    expect(c.ops[1].to.y).to.equal(200);
  });
  
  it("Should run the ld macro", () => {
    let pattern = new freesewing.Pattern();
    pattern.draft = function() {};
    pattern.use(plugin);
    pattern.parts.test = new pattern.Part();
    pattern.parts.test.points.from = new pattern.Point(10, 10);
    pattern.parts.test.points.to = new pattern.Point(100, 100);
    let { macro } = pattern.parts.test.shorthand();
    macro("ld", {
      from: pattern.parts.test.points.from,
      to: pattern.parts.test.points.to,
      d: 15
    });
    let c = pattern.parts.test.paths[1];
    expect(c.attributes.get("class")).to.equal("mark");
    expect(c.attributes.get("marker-start")).to.equal("url(#dimensionFrom)");
    expect(c.attributes.get("marker-end")).to.equal("url(#dimensionTo)");
    expect(c.attributes.get("data-text")).to.equal("12.73cm");
    expect(c.attributes.get("data-text-class")).to.equal("fill-mark center");
    expect(c.ops[0].type).to.equal("move");
    expect(c.ops[1].type).to.equal("line");
    expect(c.ops[0].to.x).to.equal(20.61);
    expect(c.ops[0].to.y).to.equal(-0.61);
    expect(c.ops[1].to.x).to.equal(110.61);
    expect(c.ops[1].to.y).to.equal(89.39);
    c = pattern.parts.test.paths["1_ls"];
    expect(c.attributes.get("class")).to.equal("mark dotted");
    expect(c.ops[0].type).to.equal("move");
    expect(c.ops[1].type).to.equal("line");
    expect(c.ops[0].to.x).to.equal(10);
    expect(c.ops[0].to.y).to.equal(10);
    expect(c.ops[1].to.x).to.equal(20.61);
    expect(c.ops[1].to.y).to.equal(-0.61);
    c = pattern.parts.test.paths["1_le"];
    expect(c.attributes.get("class")).to.equal("mark dotted");
    expect(c.ops[0].type).to.equal("move");
    expect(c.ops[1].type).to.equal("line");
    expect(c.ops[0].to.x).to.equal(100);
    expect(c.ops[0].to.y).to.equal(100);
    expect(c.ops[1].to.x).to.equal(110.61);
    expect(c.ops[1].to.y).to.equal(89.39);
  });
  
  it("Should run the pd macro", () => {
    let pattern = new freesewing.Pattern();
    pattern.draft = function() {};
    pattern.use(plugin);
    pattern.parts.test = new pattern.Part();
    let from = new pattern.Point(10, 10);
    let cp1 = new pattern.Point(100, 10);
    let cp2 = new pattern.Point(10, 100);
    let to = new pattern.Point(100, 100);
    let { macro } = pattern.parts.test.shorthand();
    macro("pd", {
      path: new pattern.Path().move(from).curve(cp1, cp2, to),
      d: 15
    });
    let c = pattern.parts.test.paths[1];
    expect(c.attributes.get("class")).to.equal("mark");
    expect(c.attributes.get("marker-start")).to.equal("url(#dimensionFrom)");
    expect(c.attributes.get("marker-end")).to.equal("url(#dimensionTo)");
    expect(c.attributes.get("data-text")).to.equal("15.09cm");
    expect(c.attributes.get("data-text-class")).to.equal("fill-mark center");
    expect(c.ops[0].type).to.equal("move");
    expect(c.ops[1].type).to.equal("curve");
    expect(c.ops[0].to.x).to.equal(10);
    expect(c.ops[0].to.y).to.equal(25);
    expect(c.ops[1].to.x).to.equal(37.15);
    expect(c.ops[1].to.y).to.equal(32.79);
    c = pattern.parts.test.paths["1_ls"];
    expect(c.attributes.get("class")).to.equal("mark dotted");
    expect(c.ops[0].type).to.equal("move");
    expect(c.ops[1].type).to.equal("line");
    expect(c.ops[0].to.x).to.equal(10);
    expect(c.ops[0].to.y).to.equal(10);
    expect(c.ops[1].to.x).to.equal(10);
    expect(c.ops[1].to.y).to.equal(25);
    c = pattern.parts.test.paths["1_le"];
    expect(c.attributes.get("class")).to.equal("mark dotted");
    expect(c.ops[0].type).to.equal("move");
    expect(c.ops[1].type).to.equal("line");
    expect(c.ops[0].to.x).to.equal(100);
    expect(c.ops[0].to.y).to.equal(100);
    expect(c.ops[1].to.x).to.equal(100);
    expect(c.ops[1].to.y).to.equal(115);
  });
});
