import freesewing from "@freesewing/core";
import { version } from "../../plugin-scalebox/package.json";
let expect = require("chai").expect;
let plugin = require("../dist/index.js");

describe("plugin-scalebox", function() {
  it("Should set the plugin name:version attribute", () => {
    let pattern = new freesewing.Pattern().use(plugin);
    pattern.render();
    expect(pattern.svg.attributes.get("freesewing:plugin-scalebox")).to.equal(
      version
    );
  });
  
  it("Should run the default scalebox macro", () => {
    let pattern = new freesewing.Pattern();
    pattern.draft = function() {};
    pattern.use(plugin);
    pattern.parts.test = new pattern.Part();
    pattern.parts.test.points.anchor = new pattern.Point(100, 200);
    let { macro } = pattern.parts.test.shorthand();
    macro("scalebox", {
      at: pattern.parts.test.points.anchor
    });
    let p = pattern.parts.test.points;
    expect(p.__scaleboxMetricTopLeft.x).to.equal(50);
    expect(p.__scaleboxMetricTopLeft.y).to.equal(175);
    expect(p.__scaleboxMetricTopRight.x).to.equal(150);
    expect(p.__scaleboxMetricTopRight.y).to.equal(175);
    expect(p.__scaleboxMetricBottomLeft.x).to.equal(50);
    expect(p.__scaleboxMetricBottomLeft.y).to.equal(225);
    expect(p.__scaleboxMetricBottomRight.x).to.equal(150);
    expect(p.__scaleboxMetricBottomRight.y).to.equal(225);
    expect(p.__scaleboxImperialTopLeft.x).to.equal(49.2);
    expect(p.__scaleboxImperialTopLeft.y).to.equal(174.6);
    expect(p.__scaleboxImperialTopRight.x).to.equal(150.8);
    expect(p.__scaleboxImperialTopRight.y).to.equal(174.6);
    expect(p.__scaleboxImperialBottomLeft.x).to.equal(49.2);
    expect(p.__scaleboxImperialBottomLeft.y).to.equal(225.4);
    expect(p.__scaleboxImperialBottomRight.x).to.equal(150.8);
    expect(p.__scaleboxImperialBottomRight.y).to.equal(225.4);
    expect(p.__scaleboxLead.x).to.equal(55);
    expect(p.__scaleboxLead.y).to.equal(185);
    expect(p.__scaleboxTitle.x).to.equal(55);
    expect(p.__scaleboxTitle.y).to.equal(195);
    expect(p.__scaleboxText.x).to.equal(55);
    expect(p.__scaleboxText.y).to.equal(203);
    expect(p.__scaleboxLink.x).to.equal(55);
    expect(p.__scaleboxLink.y).to.equal(211);
    expect(p.__scaleboxMetric.x).to.equal(100);
    expect(p.__scaleboxMetric.y).to.equal(220);
    expect(p.__scaleboxImperial.x).to.equal(100);
    expect(p.__scaleboxImperial.y).to.equal(224);
    p = pattern.parts.test.paths.__scaleboxMetric;
    expect(p.attributes.get("style")).to.equal("fill: #FFF; stroke: none;");
    expect(p.ops[0].type).to.equal("move");
    expect(p.ops[1].type).to.equal("line");
    expect(p.ops[2].type).to.equal("line");
    expect(p.ops[3].type).to.equal("line");
    expect(p.ops[4].type).to.equal("close");
    expect(p.ops[0].to.x).to.equal(50);
    expect(p.ops[0].to.y).to.equal(175);
    expect(p.ops[1].to.x).to.equal(50);
    expect(p.ops[1].to.y).to.equal(225);
    expect(p.ops[2].to.x).to.equal(150);
    expect(p.ops[2].to.y).to.equal(225);
    expect(p.ops[3].to.x).to.equal(150);
    expect(p.ops[3].to.y).to.equal(175);
    p = pattern.parts.test.paths.__scaleboxImperial;
    expect(p.attributes.get("style")).to.equal("fill: #000; stroke: none;");
    expect(p.ops[0].type).to.equal("move");
    expect(p.ops[1].type).to.equal("line");
    expect(p.ops[2].type).to.equal("line");
    expect(p.ops[3].type).to.equal("line");
    expect(p.ops[4].type).to.equal("close");
    expect(p.ops[0].to.x).to.equal(49.2);
    expect(p.ops[0].to.y).to.equal(174.6);
    expect(p.ops[1].to.x).to.equal(49.2);
    expect(p.ops[1].to.y).to.equal(225.4);
    expect(p.ops[2].to.x).to.equal(150.8);
    expect(p.ops[2].to.y).to.equal(225.4);
    expect(p.ops[3].to.x).to.equal(150.8);
    expect(p.ops[3].to.y).to.equal(174.6);
  });
  
  it("Should run the scalebox macro with rotation", () => {
    let pattern = new freesewing.Pattern();
    pattern.draft = function() {};
    pattern.use(plugin);
    pattern.parts.test = new pattern.Part();
    pattern.parts.test.points.anchor = new pattern.Point(100, 200);
    let { macro } = pattern.parts.test.shorthand();
    macro("scalebox", {
      at: pattern.parts.test.points.anchor,
      rotate: 90
    });
    let p = pattern.parts.test.points;
    expect(p.__scaleboxMetricTopLeft.x).to.equal(75);
    expect(p.__scaleboxMetricTopLeft.y).to.equal(250);
    expect(p.__scaleboxMetricTopRight.x).to.equal(75);
    expect(p.__scaleboxMetricTopRight.y).to.equal(150);
    expect(p.__scaleboxMetricBottomLeft.x).to.equal(125);
    expect(p.__scaleboxMetricBottomLeft.y).to.equal(250);
    expect(p.__scaleboxMetricBottomRight.x).to.equal(125);
    expect(p.__scaleboxMetricBottomRight.y).to.equal(150);
    expect(p.__scaleboxImperialTopLeft.x).to.equal(74.6);
    expect(p.__scaleboxImperialTopLeft.y).to.equal(250.8);
    expect(p.__scaleboxImperialTopRight.x).to.equal(74.6);
    expect(p.__scaleboxImperialTopRight.y).to.equal(149.2);
    expect(p.__scaleboxImperialBottomLeft.x).to.equal(125.4);
    expect(p.__scaleboxImperialBottomLeft.y).to.equal(250.8);
    expect(p.__scaleboxImperialBottomRight.x).to.equal(125.4);
    expect(p.__scaleboxImperialBottomRight.y).to.equal(149.2);
    expect(p.__scaleboxLead.x).to.equal(85);
    expect(p.__scaleboxLead.y).to.equal(245);
    expect(p.__scaleboxTitle.x).to.equal(95);
    expect(p.__scaleboxTitle.y).to.equal(245);
    expect(p.__scaleboxText.x).to.equal(103);
    expect(p.__scaleboxText.y).to.equal(245);
    expect(p.__scaleboxLink.x).to.equal(111);
    expect(p.__scaleboxLink.y).to.equal(245);
    expect(p.__scaleboxMetric.x).to.equal(120);
    expect(p.__scaleboxMetric.y).to.equal(200);
    expect(p.__scaleboxImperial.x).to.equal(124);
    expect(p.__scaleboxImperial.y).to.equal(200);
  });
  
  it("Should run the scalebox macro with default text", () => {
    let pattern = new freesewing.Pattern({
      name: "unitTest",
      version: 99
    });
    pattern.draft = function() {};
    pattern.use(plugin);
    pattern.parts.test = new pattern.Part();
    pattern.parts.test.points.anchor = new pattern.Point(100, 200);
    let { macro } = pattern.parts.test.shorthand();
    macro("scalebox", {
      at: pattern.parts.test.points.anchor
    });
    let p = pattern.parts.test.points.__scaleboxLead.attributes;
    expect(p.get("data-text")).to.equal("freesewing");
    expect(p.get("data-text-class")).to.equal("text-sm");
    p = pattern.parts.test.points.__scaleboxTitle.attributes;
    expect(p.get("data-text")).to.equal("unitTest v99");
    expect(p.get("data-text-class")).to.equal("text-lg");
    p = pattern.parts.test.points.__scaleboxText.attributes;
    expect(p.get("data-text-class")).to.equal("text-xs");
    expect(p.get("data-text-lineheight")).to.equal("4");
    expect(p.list["data-text"][0]).to.equal(
      "freesewingIsMadeByJoostDeCockAndContributors"
    );
    expect(p.list["data-text"][1]).to.equal("\n");
    expect(p.list["data-text"][2]).to.equal(
      "withTheFinancialSupportOfOurPatrons"
    );
  });
  
  it("Should run the scalebox macro with custom text", () => {
    let pattern = new freesewing.Pattern({
      name: "unitTest",
      version: 99
    });
    pattern.draft = function() {};
    pattern.use(plugin);
    pattern.parts.test = new pattern.Part();
    pattern.parts.test.points.anchor = new pattern.Point(100, 200);
    let { macro } = pattern.parts.test.shorthand();
    macro("scalebox", {
      at: pattern.parts.test.points.anchor,
      lead: "theLead",
      title: "theTitle",
      text: "theText"
    });
    let p = pattern.parts.test.points.__scaleboxLead.attributes;
    expect(p.get("data-text")).to.equal("theLead");
    expect(p.get("data-text-class")).to.equal("text-sm");
    p = pattern.parts.test.points.__scaleboxTitle.attributes;
    expect(p.get("data-text")).to.equal("theTitle");
    expect(p.get("data-text-class")).to.equal("text-lg");
    p = pattern.parts.test.points.__scaleboxText.attributes;
    expect(p.get("data-text")).to.equal("theText");
    expect(p.get("data-text-class")).to.equal("text-xs");
    expect(p.get("data-text-lineheight")).to.equal("4");
  });
});
