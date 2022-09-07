import chai from "chai"
import { Design } from "./dist/index.mjs"

const expect = chai.expect

describe('Design', () => {
  it("Design constructor should return pattern constructor", () => {
    const design = new Design({
      foo: "bar",
      options: {
        constant: 2,
        percentage: { pct: 30, min: 0, max: 100 }
      }
    });

    const pattern = new design();
    expect(pattern.width).to.equal(0);
    expect(pattern.height).to.equal(0);
    expect(pattern.settings.complete).to.equal(true);
    expect(pattern.parts).to.eql({});
    expect(pattern.settings.units).to.equal("metric");
    expect(pattern.config.foo).to.equal("bar");
    expect(pattern.settings.options.constant).to.equal(2);
    expect(pattern.settings.options.percentage).to.equal(0.3);
  });

  /*
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

  */

  it("Pattern constructor should add default hide() method to options", () => {
    const design = new Design({
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

})

