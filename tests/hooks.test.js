let expect = require("chai").expect;
let freesewing = require("./dist/index.js");

let pattern = new freesewing.Pattern();
let h = pattern.hooks;

it("Should contain all hooks", () => {
  let test = [
    "preDraft",
    "postDraft",
    "preSample",
    "postSample",
    "preRender",
    "postRender",
    "insertText",
    "debug"
  ];
  expect(h.all).to.eql(test);
});

it("Should contain no hooks upon creation", () => {
  let test = {};
  expect(h._hooks).to.eql(test);
});

it("Should return hooks correctly", () => {
  h._hooks = {
    hookA: "testA",
    hookB: "testB"
  };
  expect(h.list("hookA")).to.equal("testA");
  expect(h.list("hookB")).to.equal("testB");
  expect(h.list("hookC")).to.equal(false);
});

it("Should not attach a non-existing hook", () => {
  let obj = {};
  expect(h.attach("no-such-hook", obj)).to.equal(undefined);
});

let count = 0;
let pre = function() {
  count += 5;
};

it("Should attach the preDraft & postDraft hooks", () => {
  count = 0;
  let obj = {
    draft: function() {},
    pre: pre
  };
  h._hooks = {
    preDraft: [
      function(next) {
        next();
      }
    ],
    postDraft: [
      function(next) {
        next();
      }
    ]
  };
  expect(h.attach("preDraft", obj)).to.equal(undefined);
  obj.draft();
  expect(count).to.equal(5);
  expect(h.attach("postDraft", obj)).to.equal(undefined);
  obj.draft();
  expect(count).to.equal(10);
});

it("Should attach the preSample & postSample hooks", () => {
  count = 0;
  let obj = {
    sampleOption: function() {},
    pre: pre
  };
  h._hooks = {
    preSample: [
      function(next) {
        next();
      }
    ],
    postSample: [
      function(next) {
        next();
      }
    ]
  };
  expect(h.attach("preSample", obj)).to.equal(undefined);
  obj.sampleOption();
  expect(count).to.equal(5);
  expect(h.attach("postSample", obj)).to.equal(undefined);
  obj.sampleOption();
  expect(count).to.equal(10);
});

it("Should attach the debug hook", () => {
  count = 0;
  let obj = {
    debug: function() {},
    pre: pre
  };
  h._hooks = {
    debug: [
      function(next) {
        next();
      }
    ]
  };
  expect(h.attach("debug", obj)).to.equal(undefined);
  obj.debug();
  expect(count).to.equal(5);
});
