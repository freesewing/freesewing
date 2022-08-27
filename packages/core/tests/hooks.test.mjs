import chai from "chai"
import { Pattern } from "./dist/index.mjs"

const expect = chai.expect

describe('Hooks', () => {
  it("Should contain all hooks", () => {
    const pattern = new Pattern();
    const h = pattern.hooks;
    const test = {
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
});
