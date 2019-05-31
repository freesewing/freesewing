let expect = require("chai").expect;
let freesewing = require("./dist");

it("Design constructor should return pattern constructor", () => {
  let design = new freesewing.Design({
    foo: "bar",
    options: {
      constant: 2,
      percentage: { pct: 30, min: 0, max: 100 }
    }
  });

  let pattern = new design();
  expect(pattern.width).to.equal(0);
  expect(pattern.height).to.equal(0);
  expect(pattern.settings.complete).to.equal(true);
  expect(pattern.parts).to.eql({});
  expect(pattern.settings.units).to.equal("metric");
  expect(pattern.config.foo).to.equal("bar");
  expect(pattern.settings.options.constant).to.equal(2);
  expect(pattern.settings.options.percentage).to.equal(0.3);
});

it("Design constructor should load single plugin", () => {
  let plugin = {
    name: "example",
    version: 1,
    hooks: {
      preRender: function(svg, attributes) {
        svg.attributes.add("freesewing:plugin-example", version);
      }
    }
  };

  let design = new freesewing.Design({}, plugin);
  let pattern = new design();
  expect(pattern.hooks.preRender.length).to.equal(1);
});

it("Design constructor should load array of plugins", () => {
  let plugin1 = {
    name: "example1",
    version: 1,
    hooks: {
      preRender: function(svg, attributes) {
        svg.attributes.add("freesewing:plugin-example1", version);
      }
    }
  };
  let plugin2 = {
    name: "example2",
    version: 2,
    hooks: {
      preRender: function(svg, attributes) {
        svg.attributes.add("freesewing:plugin-example2", version);
      }
    }
  };

  let design = new freesewing.Design({}, [plugin1, plugin2]);
  let pattern = new design();
  expect(pattern.hooks.preRender.length).to.equal(2);
});

it("Design constructor should construct basic part order", () => {
  let design = new freesewing.Design({
    dependencies: { step4: "step3" },
    inject: { step4: "step3" },
    parts: ["step1", "step2"]
  });
  let pattern = new design();
  expect(pattern.config.draftOrder[0]).to.equal("step3");
  expect(pattern.config.draftOrder[1]).to.equal("step4");
  expect(pattern.config.draftOrder[2]).to.equal("step1");
  expect(pattern.config.draftOrder[3]).to.equal("step2");
});

it("Design constructor should not require depencies for injected parts", () => {
  let design = new freesewing.Design({
    inject: { step4: "step3" },
    parts: ["step1", "step2"]
  });
  let pattern = new design();
  expect(pattern.config.draftOrder[0]).to.equal("step3");
  expect(pattern.config.draftOrder[1]).to.equal("step4");
  expect(pattern.config.draftOrder[2]).to.equal("step1");
  expect(pattern.config.draftOrder[3]).to.equal("step2");
});

it("Design constructor should handle parts and dependencies overlap", () => {
  let design = new freesewing.Design({
    inject: { step4: "step3" },
    parts: ["step1", "step2", "step3"]
  });
  let pattern = new design();
  expect(pattern.config.draftOrder[0]).to.equal("step3");
  expect(pattern.config.draftOrder[1]).to.equal("step4");
  expect(pattern.config.draftOrder[2]).to.equal("step1");
  expect(pattern.config.draftOrder[3]).to.equal("step2");
});
