import freesewing from "freesewing";
import { version } from "../package.json";
let chai = require("chai");
let expect = chai.expect;
chai.use(require('chai-string'));
let plugin = require("../dist/index.js");

it("Should set the plugin name:version attribute and import style and defs", () => {
  let pattern = new freesewing.Pattern().with(plugin);
  pattern.render();
  expect(pattern.svg.attributes.get("freesewing:plugin-logo")).to.equal(
    version
  );
  expect(pattern.svg.style).to.equal("path.logo{stroke:none;fill:#000;}");
  expect(pattern.svg.defs).to.startWith('<g id="logo" transform="translate(-23 -36)"><path class="logo"');
});
