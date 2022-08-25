import chai from "chai"
import { Pattern } from "./dist/index.mjs"

const expect = chai.expect

it("Should contain all hooks", () => {
  let pattern = new Pattern();
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
