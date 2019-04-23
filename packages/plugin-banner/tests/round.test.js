import freesewing from "freesewing";
import { version } from "../package.json";
let chai = require("chai");
let expect = chai.expect;
chai.use(require('chai-string'));
let plugin = require("../dist/index.js");

it("Should set the plugin name:version attribute", () => {
  let pattern = new freesewing.Pattern().with(plugin);
  pattern.render();
  expect(pattern.svg.attributes.get("freesewing:plugin-banner")).to.equal(
    version
  );
});
