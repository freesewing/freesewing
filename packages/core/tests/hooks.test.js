let expect = require("chai").expect;
let freesewing = require("./dist");

it("Should contain all hooks", () => {
  let pattern = new freesewing.Pattern();
  let h = pattern.hooks;
  let test = {
    preDraft: [],
    postDraft: [],
    preSample: [],
    postSample: [],
    preRender: [],
    postRender: [],
    insertText: [],
  };
  expect(h).to.eql(test);
});
