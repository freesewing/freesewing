let expect = require("chai").expect;
let freesewing = require("../dist/index.js");

it("Should create a snippet", () => {
  let snip1 = new freesewing.Snippet("test", new freesewing.Point(12, 34));
  expect(snip1.def).to.equal("test");
  expect(snip1.anchor.x).to.equal(12);
  expect(snip1.anchor.y).to.equal(34);
});

it("Should clone a snippet", () => {
  let snip3 = new freesewing.Snippet("boo", new freesewing.Point(56, 78));
  expect(snip3.clone().def).to.equal("boo");
  expect(snip3.clone().anchor.x).to.equal(56);
  expect(snip3.clone().anchor.y).to.equal(78);
});

it("Should set an attribute", () => {
  let s = new freesewing.Snippet("test", new freesewing.Point(12, -34)).attr(
    "class",
    "test"
  );
  expect(s.attributes.get("class")).to.equal("test");
  s.attr("class", "more");
  expect(s.attributes.get("class")).to.equal("test more");
  s.attr("class", "less", true);
  expect(s.attributes.get("class")).to.equal("less");
});

