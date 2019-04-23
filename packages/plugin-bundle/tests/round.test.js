import freesewing from "freesewing";
import { version } from "../node_modules/@freesewing/plugin-round/package.json";
let expect = require("chai").expect;
let plugin = require("../dist/index.js");

it("Should set the plugin name:version attribute", () => {
  let pattern = new freesewing.Pattern().use(plugin);
  pattern.render();
  expect(pattern.svg.attributes.get("freesewing:plugin-round")).to.equal(
    version
  );
});
