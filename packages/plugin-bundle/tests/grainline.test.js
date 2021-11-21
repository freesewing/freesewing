import freesewing from "@freesewing/core";
import { version } from "../../plugin-grainline/package.json";
let round = freesewing.utils.round;
let expect = require("chai").expect;
let plugin = require("../dist/index.js");

describe("plugin-grainline", function() {
  it("Should set the plugin name:version attribute", () => {
    let pattern = new freesewing.Pattern().use(plugin);
    pattern.render();
    expect(pattern.svg.attributes.get("freesewing:plugin-grainline")).to.equal(
      version
    );
  });
  
  it("Should run the default grainline macro", () => {
    let pattern = new freesewing.Pattern();
    pattern.draft = function() {};
    pattern.use(plugin);
    pattern.parts.test = new pattern.Part();
    pattern.parts.test.points.from = new pattern.Point(10, 20);
    pattern.parts.test.points.to = new pattern.Point(10, 230);
    let { macro } = pattern.parts.test.shorthand();
    macro("grainline", {
      from: pattern.parts.test.points.from,
      to: pattern.parts.test.points.to
    });
    let c = pattern.parts.test.paths.grainline;
    expect(c.attributes.get("class")).to.equal("note");
    expect(c.attributes.get("marker-start")).to.equal("url(#grainlineFrom)");
    expect(c.attributes.get("marker-end")).to.equal("url(#grainlineTo)");
    expect(c.attributes.get("data-text")).to.equal("grainline");
    expect(c.attributes.get("data-text-class")).to.equal("center fill-note");
    expect(c.ops[0].type).to.equal("move");
    expect(c.ops[1].type).to.equal("line");
    expect(round(c.ops[0].to.x)).to.equal(10);
    expect(c.ops[0].to.y).to.equal(30.5);
    expect(round(c.ops[1].to.x)).to.equal(10);
    expect(c.ops[1].to.y).to.equal(219.5);
  });
});
