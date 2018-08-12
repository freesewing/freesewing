let expect = require("chai").expect;
let freesewing = require("../dist/index.js");

it("Should create a snippet", () => {
  let snip1 = new freesewing.Snippet(
    "test",
    new freesewing.Point(12, 34),
    "this is an example"
  );
  expect(snip1.def).to.equal("test");
  expect(snip1.anchor.x).to.equal(12);
  expect(snip1.anchor.y).to.equal(34);
  expect(snip1.description).to.equal("this is an example");
});

it("Should default to empty description", () => {
  let snip2 = new freesewing.Snippet("test", new freesewing.Point(12, 34));
  expect(snip2.description).to.equal("");
});

it("Should clone a snippet", () => {
  let snip3 = new freesewing.Snippet(
    "boo",
    new freesewing.Point(56, 78),
    "clone me"
  );
  expect(snip3.clone().def).to.equal("boo");
  expect(snip3.clone().anchor.x).to.equal(56);
  expect(snip3.clone().anchor.y).to.equal(78);
  expect(snip3.clone().description).to.equal("clone me");
});
