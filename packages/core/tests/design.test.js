let expect = require("chai").expect;
let freesewing = require("../dist/index.js");

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

it("Design constructor should load single plugin (legacy)", () => {
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

it("Design constructor should load single plugin (2022)", () => {
  let plugin = {
    name: "example",
    version: 1,
    hooks: {
      preRender: function(svg, attributes) {
        svg.attributes.add("freesewing:plugin-example", version);
      }
    }
  };

  let design = new freesewing.Design({plugins: plugin});
  let pattern = new design();
  expect(pattern.hooks.preRender.length).to.equal(1);
});

it("Design constructor should load array of plugins (legacy)", () => {
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

it("Design constructor should load array of plugins (2022)", () => {
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

  let design = new freesewing.Design( { plugins: [plugin1, plugin2] });
  let pattern = new design();
  expect(pattern.hooks.preRender.length).to.equal(2);
});

it("Design constructor should load conditional plugin (legacy)", () => {
  const plugin = {
    name: "example",
    version: 1,
    hooks: {
      preRender: function(svg, attributes) {
        svg.attributes.add("freesewing:plugin-example", version);
      }
    }
  };
  const condition = () => true
  const design = new freesewing.Design({}, [], { plugin, condition });
  const pattern = new design();
  expect(pattern.hooks.preRender.length).to.equal(1);
});

it("Design constructor should load conditional plugin (2022)", () => {
  const plugin = {
    name: "example",
    version: 1,
    hooks: {
      preRender: function(svg, attributes) {
        svg.attributes.add("freesewing:plugin-example", version);
      }
    }
  };
  const condition = () => true
  const design = new freesewing.Design({ conditionalPlugins: { plugin, condition } });
  const pattern = new design();
  expect(pattern.hooks.preRender.length).to.equal(1);
});

it("Design constructor should not load conditional plugin (legacy)", () => {
  const plugin = {
    name: "example",
    version: 1,
    hooks: {
      preRender: function(svg, attributes) {
        svg.attributes.add("freesewing:plugin-example", version);
      }
    }
  };
  const condition = () => false
  const design = new freesewing.Design({}, [], { plugin, condition });
  const pattern = new design();
  expect(pattern.hooks.preRender.length).to.equal(0);
});

it("Design constructor should not load conditional plugin (2022)", () => {
  const plugin = {
    name: "example",
    version: 1,
    hooks: {
      preRender: function(svg, attributes) {
        svg.attributes.add("freesewing:plugin-example", version);
      }
    }
  };
  const condition = () => false
  const design = new freesewing.Design({ conditionalPlugins: { plugin, condition } });
  const pattern = new design();
  expect(pattern.hooks.preRender.length).to.equal(0);
});

it("Design constructor should load multiple conditional plugins (legacy)", () => {
  const plugin = {
    name: "example",
    version: 1,
    hooks: {
      preRender: function(svg, attributes) {
        svg.attributes.add("freesewing:plugin-example", version);
      }
    }
  };
  const condition1 = () => true
  const condition2 = () => false
  const design = new freesewing.Design({}, [], [
    { plugin, condition: condition1 },
    { plugin, condition: condition2 },
  ]);
  const pattern = new design();
  expect(pattern.hooks.preRender.length).to.equal(1);
});

it("Design constructor should load multiple conditional plugins (2022)", () => {
  const plugin = {
    name: "example",
    version: 1,
    hooks: {
      preRender: function(svg, attributes) {
        svg.attributes.add("freesewing:plugin-example", version);
      }
    }
  };
  const condition1 = () => true
  const condition2 = () => false
  const design = new freesewing.Design({ conditionalPlugins:  [
    { plugin, condition: condition1 },
    { plugin, condition: condition2 },
  ]});
  const pattern = new design();
  expect(pattern.hooks.preRender.length).to.equal(1);
});

it("Design constructor should construct basic part order", () => {
  let design = new freesewing.Design({
    dependencies: { step4: "step3" },
    inject: { step4: "step3" },
    parts: ["step1", "step2"]
  });
  let pattern = new design().init();
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
  let pattern = new design().init();
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
  let pattern = new design().init();
  expect(pattern.config.draftOrder[0]).to.equal("step3");
  expect(pattern.config.draftOrder[1]).to.equal("step4");
  expect(pattern.config.draftOrder[2]).to.equal("step1");
  expect(pattern.config.draftOrder[3]).to.equal("step2");
});

it("Design constructor discover all parts", () => {
  let design = new freesewing.Design({
    inject: {
      step4: "step3",
      step5: "step4",
      step6: "step5",
      step7: "step6",
      step8: "step7",
      step9: "step8",
      step10: "step9",
      step11: "step10"
    },
    hide: [],
    parts: ["step1", "step2"]
  });
  let pattern = new design().init();
  expect(pattern.config.draftOrder[0]).to.equal("step3");
  expect(pattern.config.draftOrder[1]).to.equal("step4");
  expect(pattern.config.draftOrder[2]).to.equal("step5");
  expect(pattern.config.draftOrder[3]).to.equal("step6");
  expect(pattern.config.draftOrder[4]).to.equal("step7");
  expect(pattern.config.draftOrder[5]).to.equal("step8");
  expect(pattern.config.draftOrder[6]).to.equal("step9");
  expect(pattern.config.draftOrder[7]).to.equal("step10");
  expect(pattern.config.draftOrder[8]).to.equal("step11");
  expect(pattern.config.draftOrder[9]).to.equal("step1");
  expect(pattern.config.draftOrder[10]).to.equal("step2");
});

it("Design constructor should handle Simon", () => {
  let design = new freesewing.Design({
    dependencies: {
      sleeve: ["front", "back"]
    },
    inject: {
      frontBase: "base",
      backBase: "base",
      back: "backBase",
      front: "frontBase",
      frontRight: "front",
      frontLeft: "front",
      buttonPlacket: "front",
      buttonholePlacket: "front",
      yoke: "backBase",
      sleeve: "sleeveBase"
    },
    parts: [
      "collarStand",
      "collar",
      "sleevePlacketUnderlap",
      "sleevePlacketOverlap",
      "cuff"
    ],
    hide: ["base", "frontBase", "front", "backBase", "sleeveBase"]
  });
  let pattern = new design().init();
});

it("Pattern constructor should add default hide() method to options", () => {
  const design = new freesewing.Design({
    foo: "bar",
    options: {
      constant: 2,
      percentage: { pct: 30, min: 0, max: 100 },
      degree: { deg: 5, min: 0, max: 10 },
      withHide: {
        dflt: 'foo',
        list: ['foo', 'bar'],
        hide: ({ options }) => (options.degree < 6)
      }
    }
  })

  const pattern = new design().init();
  expect(typeof pattern.config.options.constant === 'number').to.be.true
  expect(typeof pattern.config.options.percentage === 'object').to.be.true
  expect(typeof pattern.config.options.degree === 'object').to.be.true
  expect(typeof pattern.config.options.withHide === 'object').to.be.true
  expect(pattern.config.options.percentage.hide()).to.be.false
  expect(pattern.config.options.degree.hide()).to.be.false
  expect(pattern.config.options.withHide.hide(pattern.settings)).to.be.true
})

it("Should warn when passing plugins both as parameter and in the config", () => {
  const design = new freesewing.Design({plugins: [{}]}, {});
  expect(design.config.warnings.length).to.equal(2)
  expect(design.config.warnings[0]).to.equal('Passing plugins to the Design constructor both as a second parameter and in the config is unsupported')
  expect(design.config.warnings[1]).to.equal('Ignoring plugins passed as parameter. Only config.plugins will be used.')
})

it("Should warn when passing conditionalPlugins both as parameter and in the config", () => {
  const design = new freesewing.Design({conditionalPlugins: [{}]}, false, {});
  expect(design.config.warnings.length).to.equal(2)
  expect(design.config.warnings[0]).to.equal('Passing conditionalPlugins to the Design constructor both as a third parameter and in the config is unsupported.')
  expect(design.config.warnings[1]).to.equal('Ignoring conditionalPlugins passes as parameter. Only config.conditionalPlugins will be used.')
})


