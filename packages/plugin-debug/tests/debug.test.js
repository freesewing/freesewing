import freesewing from "freesewing";
import { version } from "../package.json";
let expect = require("chai").expect;
let debugPlugin = require("../dist/index.js");

let output;
let debug = debugPlugin.hooks.debug;

function next() {}

debugPlugin.log = function(d = "", e = "", b = "", u = "", g = "", gg = "") {
  output = { d, e, b, u, g, gg };
};

it("Should set the plugin name:version attribute", () => {
  let pattern = new freesewing.Pattern().with(debugPlugin);
  pattern.render();
  expect(pattern.svg.attributes.get("freesewing:plugin-debug")).to.equal(
    version
  );
});

it("Should log empty", () => {
  output = {};
  debug(next);
  expect(output.d).to.equal("%cdebug");
  expect(output.e).to.equal("color: Magenta;");
  expect(output.b).to.equal("");
  expect(output.u).to.equal("");
  expect(output.g).to.equal("");
  expect(output.gg).to.equal("");
});

it("Should log default debug", () => {
  output = {};
  debug(next, "Debug message", "more info");
  expect(output.d).to.equal("%cdebug");
  expect(output.e).to.equal("color: Magenta;");
  expect(output.b).to.equal("Debug message");
  expect(output.u).to.equal("more info");
  expect(output.g).to.equal("");
  expect(output.gg).to.equal("");
});

it("Should log styled debug for node", () => {
  output = {};
  debug(next, "debug", "label", "Debug message", "more info");
  expect(output.d).to.equal("%clabel");
  expect(output.e).to.equal("color: Magenta;");
  expect(output.b).to.equal("Debug message");
  expect(output.u).to.equal("more info");
  expect(output.g).to.equal("");
  expect(output.gg).to.equal("");
});

it("Should log styled info for node", () => {
  output = {};
  debug(next, "info", "label", "Debug message", "more info");
  expect(output.d).to.equal("%clabel");
  expect(output.e).to.equal("color: RoyalBlue;");
  expect(output.b).to.equal("Debug message");
  expect(output.u).to.equal("more info");
  expect(output.g).to.equal("");
  expect(output.gg).to.equal("");
});

it("Should log styled success for node", () => {
  output = {};
  debug(next, "success", "label", "Debug message", "more info");
  expect(output.d).to.equal("%clabel");
  expect(output.e).to.equal("color: OliveDrab;");
  expect(output.b).to.equal("Debug message");
  expect(output.u).to.equal("more info");
  expect(output.g).to.equal("");
  expect(output.gg).to.equal("");
  expect(output.g).to.equal("");
});

it("Should log styled warning for node", () => {
  output = {};
  debug(next, "warning", "label", "Debug message", "more info");
  expect(output.d).to.equal("%clabel");
  expect(output.e).to.equal("color: Tomato;");
  expect(output.b).to.equal("Debug message");
  expect(output.u).to.equal("more info");
  expect(output.g).to.equal("");
  expect(output.gg).to.equal("");
});

it("Should log styled error for node", () => {
  output = {};
  debug(next, "error", "label", "Debug message", "more info");
  expect(output.d).to.equal("%clabel");
  expect(output.e).to.equal("color: Red;");
  expect(output.b).to.equal("Debug message");
  expect(output.u).to.equal("more info");
  expect(output.g).to.equal("");
  expect(output.gg).to.equal("");
});
