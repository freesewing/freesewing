import freesewing from "@freesewing/core";
import { version } from "../package.json";
let chai = require("chai");
let expect = chai.expect;
chai.use(require('chai-string'));
let plugin = require("../dist/index.js");

describe("plugin-bust",function() {
  it("Should set the plugin name:version attribute", () => {
    let pattern = new freesewing.Pattern();
    pattern.use(plugin);
    pattern.parts.test = new pattern.Part();
    let { macro } = pattern.parts.test.shorthand();
    macro("bust", {
      measurements: {}
    });
    pattern.render();
    expect(pattern.svg.attributes.get("freesewing:plugin-bust")).to.equal(
      version
    );
  });
});
