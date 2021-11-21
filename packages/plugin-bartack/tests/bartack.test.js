import freesewing from "@freesewing/core";
import { version } from "../package.json";
let chai = require("chai");
let expect = chai.expect;
chai.use(require('chai-string'));
let plugin = require("../dist/index.js");
let round = freesewing.utils.round;

describe("Bartack plugin", function () {
  it("Should set the plugin name:version attribute", () => {
    let pattern = new freesewing.Pattern();
    pattern.use(plugin).render();
    expect(pattern.svg.attributes.get("freesewing:plugin-bartack")).to.equal(
      version
    );
  });

  it("draws a default bartack from a point", function () {
    let pattern = new freesewing.Pattern();
    pattern.use(plugin);
    pattern.parts.test = new pattern.Part();
    pattern.parts.test.points.from = new pattern.Point(10, 20);
    let { macro } = pattern.parts.test.shorthand();
    macro("bartack", {
      anchor:pattern.parts.test.points.from
    })
    let c = pattern.parts.test.paths.bartack;
    expect(c.attributes.get("class")).to.equal("stroke-sm bartack");
    expect(c.ops[0].type).to.equal("move");
    expect(c.ops[0].to.x).to.equal(10);
    expect(c.ops[0].to.y).to.equal(21.5);
    expect(c.ops[1].type).to.equal("line");
    expect(c.ops[1].to.x).to.equal(10);
    expect(c.ops[1].to.y).to.equal(21.5);
    expect(c.ops[2].to.x).to.equal(10);
    expect(c.ops[2].to.y).to.equal(18.5);
    expect(c.ops[3].to.x).to.equal(11);
    expect(c.ops[3].to.y).to.equal(21.5);
    expect(c.ops[4].to.x).to.equal(11);
    expect(c.ops[4].to.y).to.equal(18.5);
    expect(c.ops).to.have.lengthOf(31);
  });

  it("draws a bartack along a path", function () {
    let pattern = new freesewing.Pattern();
    pattern.use(plugin);
    pattern.parts.test = new pattern.Part();
    let from = new pattern.Point(10, 20);
    let to = new pattern.Point(10, 30);

    let { macro } = pattern.parts.test.shorthand();
    macro("bartack", {
      path: new pattern.Path().move(from).line(to),
    })
    let c = pattern.parts.test.paths.bartack;
    expect(c.attributes.get("class")).to.equal("stroke-sm bartack");
    expect(c.ops[0].type).to.equal("move");
    expect(c.ops[0].to.x).to.equal(8.5);
    expect(c.ops[0].to.y).to.equal(20);
    expect(c.ops[1].type).to.equal("line");
    expect(c.ops[1].to.x).to.equal(8.5);
    expect(c.ops[1].to.y).to.equal(20);
    expect(c.ops[2].to.x).to.equal(11.5);
    expect(c.ops[2].to.y).to.equal(20);
    expect(c.ops[3].to.x).to.equal(8.5);
    expect(c.ops[3].to.y).to.equal(21);
    expect(c.ops[4].to.x).to.equal(11.5);
    expect(c.ops[4].to.y).to.equal(21);
    expect(c.ops).to.have.lengthOf(21);
  });

  it("can be called using the bartackAlong syntax", function () {
    let pattern = new freesewing.Pattern();
    pattern.use(plugin);
    pattern.parts.test = new pattern.Part();
    let from = new pattern.Point(10, 20);
    let to = new pattern.Point(10, 100);

    let { macro } = pattern.parts.test.shorthand();
    macro("bartackAlong", {
      path: new pattern.Path().move(from).line(to),
      start:10,
      end:30,
    })
    let c = pattern.parts.test.paths.bartack;
    expect(c.attributes.get("class")).to.equal("stroke-sm bartack");
    expect(c.ops[0].type).to.equal("move");
    expect(round(c.ops[0].to.x)).to.equal(8.5);
    expect(c.ops[0].to.y).to.equal(30);
    expect(c.ops[1].type).to.equal("line");
    expect(round(c.ops[1].to.x)).to.equal(8.5);
    expect(c.ops[1].to.y).to.equal(30);
    expect(round(c.ops[2].to.x)).to.equal(11.5);
    expect(c.ops[2].to.y).to.equal(30);
    expect(round(c.ops[3].to.x)).to.equal(8.5);
    expect(c.ops[3].to.y).to.equal(31);
    expect(round(c.ops[4].to.x)).to.equal(11.5);
    expect(c.ops[4].to.y).to.equal(31);
    expect(c.ops).to.have.lengthOf(41);
  });


  it("can be called using the bartackFractionAlong syntax", function () {
    let pattern = new freesewing.Pattern();
    pattern.use(plugin);
    pattern.parts.test = new pattern.Part();
    let from = new pattern.Point(10, 20);
    let to = new pattern.Point(10, 100);

    let { macro } = pattern.parts.test.shorthand();
    macro("bartackFractionAlong", {
      path: new pattern.Path().move(from).line(to),
      start:0.2,
      end:0.8,
    })
    let c = pattern.parts.test.paths.bartack;
    expect(c.attributes.get("class")).to.equal("stroke-sm bartack");
    expect(c.ops[0].type).to.equal("move");
    expect(round(c.ops[0].to.x)).to.equal(8.5);
    expect(c.ops[0].to.y).to.equal(36);
    expect(c.ops[1].type).to.equal("line");
    expect(round(c.ops[1].to.x)).to.equal(8.5);
    expect(c.ops[1].to.y).to.equal(36);
    expect(round(c.ops[2].to.x)).to.equal(11.5);
    expect(c.ops[2].to.y).to.equal(36);
    expect(round(c.ops[3].to.x)).to.equal(8.5);
    expect(c.ops[3].to.y).to.equal(37);
    expect(round(c.ops[4].to.x)).to.equal(11.5);
    expect(c.ops[4].to.y).to.equal(37);
    expect(c.ops).to.have.lengthOf(97);
  });



  it("has configurable length", function () {
    let pattern = new freesewing.Pattern();
    pattern.use(plugin);
    pattern.parts.test = new pattern.Part();
    pattern.parts.test.points.from = new pattern.Point(10, 20);
    let { macro } = pattern.parts.test.shorthand();
    macro("bartack", {
      anchor:pattern.parts.test.points.from,
      length:20
    })
    let c = pattern.parts.test.paths.bartack;
    expect(c.attributes.get("class")).to.equal("stroke-sm bartack");
    expect(c.ops[0].type).to.equal("move");
    expect(c.ops[0].to.x).to.equal(10);
    expect(c.ops[0].to.y).to.equal(21.5);
    expect(c.ops[1].type).to.equal("line");
    expect(c.ops[1].to.x).to.equal(10);
    expect(c.ops[1].to.y).to.equal(21.5);
    expect(c.ops[2].to.x).to.equal(10);
    expect(c.ops[2].to.y).to.equal(18.5);
    expect(c.ops[3].to.x).to.equal(11);
    expect(c.ops[3].to.y).to.equal(21.5);
    expect(c.ops[4].to.x).to.equal(11);
    expect(c.ops[4].to.y).to.equal(18.5);
    expect(c.ops).to.have.lengthOf(41);
  });


  it("has configurable width", function () {
    let pattern = new freesewing.Pattern();
    pattern.use(plugin);
    pattern.parts.test = new pattern.Part();
    pattern.parts.test.points.from = new pattern.Point(10, 20);
    let { macro } = pattern.parts.test.shorthand();
    macro("bartack", {
      anchor:pattern.parts.test.points.from,
      width:5
    })
    let c = pattern.parts.test.paths.bartack;
    expect(c.attributes.get("class")).to.equal("stroke-sm bartack");
    expect(c.ops[0].type).to.equal("move");
    expect(c.ops[0].to.x).to.equal(10);
    expect(c.ops[0].to.y).to.equal(22.5);
    expect(c.ops[1].type).to.equal("line");
    expect(c.ops[1].to.x).to.equal(10);
    expect(c.ops[1].to.y).to.equal(22.5);
    expect(c.ops[2].to.x).to.equal(10);
    expect(c.ops[2].to.y).to.equal(17.5);
    expect(round(c.ops[3].to.x)).to.equal(11.67);
    expect(c.ops[3].to.y).to.equal(22.5);
    expect(round(c.ops[4].to.x)).to.equal(11.67);
    expect(c.ops[4].to.y).to.equal(17.5);
    expect(c.ops).to.have.lengthOf(19);
  });

  it("has configurable angle", function () {
    let pattern = new freesewing.Pattern();
    pattern.use(plugin);
    pattern.parts.test = new pattern.Part();
    pattern.parts.test.points.from = new pattern.Point(10, 20);
    let { macro } = pattern.parts.test.shorthand();
    macro("bartack", {
      anchor:pattern.parts.test.points.from,
      angle:45
    })
    let c = pattern.parts.test.paths.bartack;
    expect(c.attributes.get("class")).to.equal("stroke-sm bartack");
    expect(c.ops[0].type).to.equal("move");
    expect(round(c.ops[0].to.x)).to.equal(11.06);
    expect(round(c.ops[0].to.y)).to.equal(21.06);
    expect(c.ops[1].type).to.equal("line");
    expect(round(c.ops[1].to.x)).to.equal(11.06);
    expect(round(c.ops[1].to.y)).to.equal(21.06);
    expect(round(c.ops[2].to.x)).to.equal(8.94);
    expect(round(c.ops[2].to.y)).to.equal(18.94);
    expect(round(c.ops[3].to.x)).to.equal(11.72);
    expect(round(c.ops[3].to.y)).to.equal(20.40);
    expect(round(c.ops[4].to.x)).to.equal(9.60);
    expect(round(c.ops[4].to.y)).to.equal(18.28);
    expect(c.ops).to.have.lengthOf(33);
  });

  it("has configurable suffix", function () {
    let pattern = new freesewing.Pattern();
    pattern.use(plugin);
    pattern.parts.test = new pattern.Part();
    pattern.parts.test.points.from = new pattern.Point(10, 20);
    let { macro } = pattern.parts.test.shorthand();
    macro("bartack", {
      anchor:pattern.parts.test.points.from,
      suffix:"foo",
    })
    let c = pattern.parts.test.paths.bartackfoo;
    expect(c.attributes.get("class")).to.equal("stroke-sm bartack");
  });


  it("has configurable prefix", function () {
    let pattern = new freesewing.Pattern();
    pattern.use(plugin);
    pattern.parts.test = new pattern.Part();
    pattern.parts.test.points.from = new pattern.Point(10, 20);
    let { macro } = pattern.parts.test.shorthand();
    macro("bartack", {
      anchor:pattern.parts.test.points.from,
      prefix:"foo",
    })
    let c = pattern.parts.test.paths.foobartack;
    expect(c.attributes.get("class")).to.equal("stroke-sm bartack");
  });


});
