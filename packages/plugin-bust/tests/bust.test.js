import freesewing from "@freesewing/core";
import { version } from "../package.json";

const  chai = require("chai");
const  expect = chai.expect;
const plugin = require("../dist/index.js");

describe("plugin-bust",function() {
  it("Should set the plugin name:version attribute", () => {
    const pattern = new freesewing.Pattern().use(plugin);
    pattern.parts.test = new pattern.Part();
    const { macro } = pattern.parts.test.shorthand();
    macro("bust", {
      measurements: {}
    });
    pattern.render();
    expect(pattern.svg.attributes.get("freesewing:plugin-bust")).to.equal(
      version
    );
  });
});
