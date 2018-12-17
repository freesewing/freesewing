import freesewing from "freesewing";
import { version } from "../package.json";
let chai = require("chai");
let expect = chai.expect;
chai.use(require("chai-string"));
let plugin = require("../dist/index.js");

it("Should set the plugin name:version attribute", () => {
  let pattern = new freesewing.Pattern().with(plugin);
  pattern.render();
  expect(pattern.svg.attributes.get("freesewing:plugin-i18n")).to.equal(
    version
  );
});

it("Should translate text on insert", () => {
  let pattern = new freesewing.Pattern().with(plugin);
  pattern.settings.locale = "nl";
  pattern.draft = function() {};
  pattern.with(plugin);
  pattern.parts.test = new pattern.Part();
  pattern.parts.test.points.anchor = new pattern.Point(-12, -34).attr(
    "data-text",
    "cutTwoStripsToFinishTheArmholes"
  );
  let svg = pattern.render();
  expect(svg).to.contain("Knip twee repels om de armsgaten af te werken");
});
