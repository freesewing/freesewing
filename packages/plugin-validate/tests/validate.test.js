import freesewing from "@freesewing/core";
import { version } from "../package.json";
let expect = require("chai").expect;
const plugin = require("../dist/index.js");

it("Should set the plugin name:version attribute", () => {
  const pattern = new freesewing.Pattern().use(plugin);
  pattern.render();
  expect(pattern.svg.attributes.get("freesewing:plugin-validate")).to.equal(
    version
  );
});

it("Should should throw a missing measurement error", () => {
  const pattern = new freesewing.Pattern({
    measurements: ["chestCircumference"]
  });
  // We need to add the draft method before loading the
  // plugin, or we'll overwrite the hook listener
  // pattern.draft = function() {};
  pattern.use(plugin);
  pattern.settings.measurements = { test: 12 };
  let err = "Missing measurement: chestCircumference";
  expect(() => pattern.draft()).to.throw(err);
});

it("Should throw on an invalid X-coordinate", () => {
  let pattern = new freesewing.Pattern();
  pattern.use(plugin);
  pattern.parts.test = new pattern.Part();
  pattern.parts.test.points.test = new pattern.Point("booo", 12);
  let err = "X-value of point pattern.parts.test.points.test is not a number";
  expect(() => pattern.draft()).to.throw(err);
});

it("Should throw on an invalid Y-coordinate", () => {
  let pattern = new freesewing.Pattern();
  pattern.use(plugin);
  pattern.parts.test = new pattern.Part();
  pattern.parts.test.points.test = new pattern.Point(12, "moooo");
  let err = "Y-value of point pattern.parts.test.points.test is not a number";
  expect(() => pattern.draft()).to.throw(err);
});

it("Should throw on an invalid point object", () => {
  let pattern = new freesewing.Pattern();
  pattern.use(plugin);
  pattern.parts.test = new pattern.Part();
  pattern.parts.test.points.test = "nope";
  let err = "Point pattern.parts.test.points.test is not an object";
  expect(() => pattern.draft()).to.throw(err);
});

it("Should throw on an invalid point attributes object", () => {
  let pattern = new freesewing.Pattern();
  pattern.use(plugin);
  pattern.parts.test = new pattern.Part();
  pattern.parts.test.points.test = new pattern.Point(12, 34);
  pattern.parts.test.points.test.attributes = "fubar";
  let err =
    "attributes property of point pattern.parts.test.points.test is not an object";
  expect(() => pattern.draft()).to.throw(err);
});

it("Should throw on an invalid text type", () => {
  let pattern = new freesewing.Pattern();
  pattern.use(plugin);
  pattern.parts.test = new pattern.Part();
  pattern.parts.test.points.test = new pattern.Point(12, 34).attr(
    "data-text",
    {}
  );
  let err =
    "point pattern.parts.test.points.test has text that is not a string nor a number";
  expect(() => pattern.draft()).to.throw(err);
});

it("Should skip text validation", () => {
  let pattern = new freesewing.Pattern();
  pattern.use(plugin);
  pattern.parts.test = new pattern.Part();
  pattern.parts.test.points.test = new pattern.Point(12, 34)
    .attr("data-text", {})
    .attr("data-validate-skip-text", true);
  expect(() => pattern.draft()).to.not.throw();
});

it("Should throw on possible translation issues", () => {
  let pattern = new freesewing.Pattern();
  pattern.use(plugin);
  pattern.parts.test = new pattern.Part();
  pattern.parts.test.points.test = new pattern.Point(12, 34).attr(
    "data-text",
    "hi :)"
  );
  let err = "point pattern.parts.test.points.test has text containing spaces";
  expect(() => pattern.draft()).to.throw(err);
});

it("Should throw on an invalid path object", () => {
  let pattern = new freesewing.Pattern();
  pattern.use(plugin);
  pattern.parts.test = new pattern.Part();
  pattern.parts.test.paths.test = "nope";
  let err = "Path pattern.parts.test.paths.test is not an object";
  expect(() => pattern.draft()).to.throw(err);
});

it("Should throw on a path object with invalid ops", () => {
  let pattern = new freesewing.Pattern();
  pattern.use(plugin);
  pattern.parts.test = new pattern.Part();
  pattern.parts.test.paths.test = new pattern.Path();
  pattern.parts.test.paths.test.ops = "nope";
  let err =
    "ops property of path pattern.parts.test.paths.test is not an object";
  expect(() => pattern.draft()).to.throw(err);
});

it("Should throw on a path with less than two ops", () => {
  let pattern = new freesewing.Pattern();
  pattern.use(plugin);
  pattern.parts.test = new pattern.Part();
  pattern.parts.test.paths.test = new pattern.Path();
  let err = "Path pattern.parts.test.paths.test does not do anything";
  expect(() => pattern.draft()).to.throw(err);
});

it("Should throw on a path with an invalid point", () => {
  let pattern = new freesewing.Pattern();
  pattern.use(plugin);
  pattern.parts.test = new pattern.Part();
  pattern.parts.test.paths.test = new pattern.Path()
    .move(new pattern.Point(0, 0))
    .line("nope");
  let err = "Point pattern.parts.test.points._unknown_ is not an object";
  expect(() => pattern.draft()).to.throw(err);
});

it("Should throw on a path with an invalid attributes object", () => {
  let pattern = new freesewing.Pattern();
  pattern.use(plugin);
  pattern.parts.test = new pattern.Part();
  pattern.parts.test.points.from = new pattern.Point(12, 34);
  pattern.parts.test.points.to = new pattern.Point(56, 78);
  pattern.parts.test.paths.test = new pattern.Path()
    .move(pattern.parts.test.points.from)
    .line(pattern.parts.test.points.to);
  pattern.parts.test.paths.test.attributes = "nope";
  let err =
    "attributes property of path pattern.parts.test.paths.test is not an object";
  expect(() => pattern.draft()).to.throw(err);
});

it("Should throw on an invalid snippet", () => {
  let pattern = new freesewing.Pattern();
  pattern.use(plugin);
  pattern.parts.test = new pattern.Part();
  pattern.parts.test.points.from = new pattern.Point(12, 34);
  pattern.parts.test.snippets.test = "nope";
  let err = "pattern.parts.test.snippets.test is not a valid Snippet object";
  expect(() => pattern.draft()).to.throw(err);
});

it("Should throw for an snippet anchored on an invalid point", () => {
  let pattern = new freesewing.Pattern();
  pattern.use(plugin);
  pattern.parts.test = new pattern.Part();
  pattern.parts.test.snippets.test = new pattern.Snippet("notch", "nope");
  let err = "Point pattern.parts.test.points._unknown_ is not an object";
  expect(() => pattern.draft()).to.throw(err);
});
