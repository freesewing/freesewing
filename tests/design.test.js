let expect = require("chai").expect;
let freesewing = require("./dist/index.js");

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
