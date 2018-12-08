import freesewing from "freesewing";
let expect = require("chai").expect;
let plugin = require("../dist/index.js");
let bundle = [
  "cutonfold",
  "dimension",
  "grainline",
  "logo",
  "title",
  "scalebox"
];

it("Should set the plugins name:version attribute", () => {
  let pattern = new freesewing.Pattern().with(plugin);
  pattern.render();
  for (let plug of bundle) {
    expect(
      typeof pattern.svg.attributes.get("freesewing:plugin-" + plug)
    ).to.equal("string");
  }
});
