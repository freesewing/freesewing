let expect = require("chai").expect;
let freesewing = require("../dist/index.js");

it("Should contain all hooks", () => {
  let pattern = new freesewing.Pattern();
  let h = pattern.hooks;
  let test = {
    preDraft: [],
    postDraft: [],
    postLayout: [],
    preSample: [],
    postSample: [],
    preRender: [],
    postRender: [],
    insertText: [],
  };
  expect(h).to.eql(test);
});
