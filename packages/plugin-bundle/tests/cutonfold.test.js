import freesewing from "@freesewing/core";
import { version } from "../../plugin-cutonfold/package.json";
let round = freesewing.utils.round;
let expect = require("chai").expect;
let plugin = require("../dist/index.js");

describe("plugin-cutonfold", function() {
  it("Should set the plugin name:version attribute", () => {
    let pattern = new freesewing.Pattern().use(plugin);
    pattern.render();
    expect(pattern.svg.attributes.get("freesewing:plugin-cutonfold")).to.equal(
      version
    );
  });
  
  it("Should run the default cutonfold macro", () => {
    let pattern = new freesewing.Pattern();
    pattern.draft = function() {};
    pattern.use(plugin);
    pattern.parts.test = new pattern.Part();
    pattern.parts.test.points.from = new pattern.Point(10, 20);
    pattern.parts.test.points.to = new pattern.Point(10, 230);
    let { macro } = pattern.parts.test.shorthand();
    macro("cutonfold", {
      from: pattern.parts.test.points.from,
      to: pattern.parts.test.points.to
    });
    let c = pattern.parts.test.paths.cutonfold;
    expect(c.attributes.get("class")).to.equal("note");
    expect(c.attributes.get("marker-start")).to.equal("url(#cutonfoldFrom)");
    expect(c.attributes.get("marker-end")).to.equal("url(#cutonfoldTo)");
    expect(c.attributes.get("data-text")).to.equal("cutOnFold");
    expect(c.attributes.get("data-text-class")).to.equal("center fill-note");
    expect(c.ops[0].type).to.equal("move");
    expect(c.ops[1].type).to.equal("line");
    expect(c.ops[2].type).to.equal("line");
    expect(c.ops[3].type).to.equal("line");
    expect(round(c.ops[0].to.x)).to.equal(10); 
    expect(c.ops[0].to.y).to.equal(200);
    expect(c.ops[1].to.x).to.equal(30);
    expect(c.ops[1].to.y).to.equal(200);
    expect(c.ops[2].to.x).to.equal(30);
    expect(c.ops[2].to.y).to.equal(50);
    expect(c.ops[3].to.x).to.equal(10);
    expect(c.ops[3].to.y).to.equal(50);
  });
  
  it("Should run the cutonfold/grainline macro", () => {
    let pattern = new freesewing.Pattern();
    pattern.draft = function() {};
    pattern.use(plugin);
    pattern.parts.test = new pattern.Part();
    pattern.parts.test.points.from = new pattern.Point(10, 20);
    pattern.parts.test.points.to = new pattern.Point(10, 230);
    let { macro } = pattern.parts.test.shorthand();
    macro("cutonfold", {
      from: pattern.parts.test.points.from,
      to: pattern.parts.test.points.to,
      grainline: true
    });
    let c = pattern.parts.test.paths.cutonfold;
    expect(c.attributes.get("data-text")).to.equal("cutOnFoldAndGrainline");
  });
});
