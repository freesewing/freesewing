import freesewing from "@freesewing/core";
import { version } from "../package.json";
let chai = require("chai");
let expect = chai.expect;
chai.use(require('chai-string'));
let plugin = require("../dist/index.js");

it("Should set the plugin name:version attribute", () => {
  let pattern = new freesewing.Pattern();
  pattern.use(plugin).draft().render();
  expect(pattern.svg.attributes.get("freesewing:plugin-buttons")).to.equal(
    version
  );
});

it("Draws a button on an anchor point", () => {
  let pattern = new freesewing.Pattern();
  pattern.use(plugin);
  pattern.parts.test = new pattern.Part();
  let { Point, snippets, Snippet } = pattern.parts.test.shorthand();
  snippets.button = new Snippet('button', new Point(10,20));
  pattern.render();
  let c = pattern.svg;
  expect(c.layout.test.svg).to.equal('\n\<use x=\"10\" y=\"20\" xlink:href=\"\#button\" \>\<\/use\>');
});

it("Draws a buttonhole centred on an anchor point", () => {
  let pattern = new freesewing.Pattern();
  pattern.use(plugin);
  pattern.parts.test = new pattern.Part();
  let { Point, snippets, Snippet } = pattern.parts.test.shorthand();
  snippets.button = new Snippet('buttonhole', new Point(10,20));
  pattern.render();
  let c = pattern.svg;
  expect(c.layout.test.svg).to.equal('\n\<use x=\"10\" y=\"20\" xlink:href=\"\#buttonhole\" \>\<\/use\>');
});


it("Draws a buttonhole starting on an anchor point", () => {
  let pattern = new freesewing.Pattern();
  pattern.use(plugin);
  pattern.parts.test = new pattern.Part();
  let { Point, snippets, Snippet } = pattern.parts.test.shorthand();
  snippets.button = new Snippet('buttonhole-start', new Point(10,20));
  pattern.render();
  let c = pattern.svg;
  expect(c.layout.test.svg).to.equal('\n\<use x=\"10\" y=\"20\" xlink:href=\"\#buttonhole-start\" \>\<\/use\>');
});

it("Draws a buttonhole ending on an anchor point", () => {
  let pattern = new freesewing.Pattern();
  pattern.use(plugin);
  pattern.parts.test = new pattern.Part();
  let { Point, snippets, Snippet } = pattern.parts.test.shorthand();
  snippets.button = new Snippet('buttonhole-end', new Point(10,20));
  pattern.render();
  let c = pattern.svg;
  expect(c.layout.test.svg).to.equal('\n\<use x=\"10\" y=\"20\" xlink:href=\"\#buttonhole-end\" \>\<\/use\>');
});


it("Draws a snap-stud on an anchor point", () => {
  let pattern = new freesewing.Pattern();
  pattern.use(plugin);
  pattern.parts.test = new pattern.Part();
  let { Point, snippets, Snippet } = pattern.parts.test.shorthand();
  snippets.button = new Snippet('snap-stud', new Point(10,20));
  pattern.render();
  let c = pattern.svg;
  expect(c.layout.test.svg).to.equal('\n\<use x=\"10\" y=\"20\" xlink:href=\"\#snap-stud\" \>\<\/use\>');
});


it("Draws a snap-socket on an anchor point", () => {
  let pattern = new freesewing.Pattern();
  pattern.use(plugin);
  pattern.parts.test = new pattern.Part();
  let { Point, snippets, Snippet } = pattern.parts.test.shorthand();
  snippets.button = new Snippet('snap-socket', new Point(10,20));
  pattern.render();
  let c = pattern.svg;
  expect(c.layout.test.svg).to.equal('\n\<use x=\"10\" y=\"20\" xlink:href=\"\#snap-socket\" \>\<\/use\>');
});

