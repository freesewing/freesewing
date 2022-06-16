import chai from 'chai'
import freesewing from '@freesewing/core'
import plugin from '../dist/index.mjs'

const expect = chai.expect
const round = freesewing.utils.round

describe('Scalebox Plugin Tests', () => {
  it("Should run the default scalebox macro", () => {
    const pattern = new freesewing.Pattern().use(plugin)
    pattern.parts.test = new pattern.Part();
    pattern.parts.test.points.anchor = new pattern.Point(100, 200);
    const { macro } = pattern.parts.test.shorthand()
    macro("scalebox", {
      at: pattern.parts.test.points.anchor
    });
    let p = pattern.parts.test.points;
    expect(p.__scaleboxMetricTopLeft.x).to.equal(50);
    expect(p.__scaleboxMetricTopLeft.y).to.equal(175);
    expect(p.__scaleboxMetricTopRight.x).to.equal(150);
    expect(p.__scaleboxMetricTopRight.y).to.equal(175);
    expect(p.__scaleboxMetricBottomLeft.x).to.equal(50);
    expect(p.__scaleboxMetricBottomLeft.y).to.equal(225);
    expect(p.__scaleboxMetricBottomRight.x).to.equal(150);
    expect(p.__scaleboxMetricBottomRight.y).to.equal(225);
    expect(p.__scaleboxImperialTopLeft.x).to.equal(49.2);
    expect(p.__scaleboxImperialTopLeft.y).to.equal(174.6);
    expect(p.__scaleboxImperialTopRight.x).to.equal(150.8);
    expect(p.__scaleboxImperialTopRight.y).to.equal(174.6);
    expect(p.__scaleboxImperialBottomLeft.x).to.equal(49.2);
    expect(p.__scaleboxImperialBottomLeft.y).to.equal(225.4);
    expect(p.__scaleboxImperialBottomRight.x).to.equal(150.8);
    expect(p.__scaleboxImperialBottomRight.y).to.equal(225.4);
    expect(p.__scaleboxLead.x).to.equal(55);
    expect(p.__scaleboxLead.y).to.equal(185);
    expect(p.__scaleboxTitle.x).to.equal(55);
    expect(p.__scaleboxTitle.y).to.equal(195);
    expect(p.__scaleboxText.x).to.equal(55);
    expect(p.__scaleboxText.y).to.equal(207);
    expect(p.__scaleboxLink.x).to.equal(55);
    expect(p.__scaleboxLink.y).to.equal(212);
    expect(p.__scaleboxMetric.x).to.equal(100);
    expect(p.__scaleboxMetric.y).to.equal(220);
    expect(p.__scaleboxImperial.x).to.equal(100);
    expect(p.__scaleboxImperial.y).to.equal(224);
    p = pattern.parts.test.paths.__scaleboxMetric;
    expect(p.ops[0].type).to.equal("move");
    expect(p.ops[1].type).to.equal("line");
    expect(p.ops[2].type).to.equal("line");
    expect(p.ops[3].type).to.equal("line");
    expect(p.ops[4].type).to.equal("close");
    expect(p.ops[0].to.x).to.equal(50);
    expect(p.ops[0].to.y).to.equal(175);
    expect(p.ops[1].to.x).to.equal(50);
    expect(p.ops[1].to.y).to.equal(225);
    expect(p.ops[2].to.x).to.equal(150);
    expect(p.ops[2].to.y).to.equal(225);
    expect(p.ops[3].to.x).to.equal(150);
    expect(p.ops[3].to.y).to.equal(175);
    p = pattern.parts.test.paths.__scaleboxImperial;
    expect(p.ops[0].type).to.equal("move");
    expect(p.ops[1].type).to.equal("line");
    expect(p.ops[2].type).to.equal("line");
    expect(p.ops[3].type).to.equal("line");
    expect(p.ops[4].type).to.equal("close");
    expect(p.ops[0].to.x).to.equal(49.2);
    expect(p.ops[0].to.y).to.equal(174.6);
    expect(p.ops[1].to.x).to.equal(49.2);
    expect(p.ops[1].to.y).to.equal(225.4);
    expect(p.ops[2].to.x).to.equal(150.8);
    expect(p.ops[2].to.y).to.equal(225.4);
    expect(p.ops[3].to.x).to.equal(150.8);
    expect(p.ops[3].to.y).to.equal(174.6);
  });

  it("Should run the scalebox macro with rotation", () => {
    const pattern = new freesewing.Pattern().use(plugin)
    pattern.parts.test = new pattern.Part();
    pattern.parts.test.points.anchor = new pattern.Point(100, 200);
    const { macro } = pattern.parts.test.shorthand()
    macro("scalebox", {
      at: pattern.parts.test.points.anchor,
      rotate: 90
    });
    const p = pattern.parts.test.points;
    expect(round(p.__scaleboxMetricTopLeft.x)).to.equal(75);
    expect(round(p.__scaleboxMetricTopLeft.y)).to.equal(250);
    expect(round(p.__scaleboxMetricTopRight.x)).to.equal(75);
    expect(round(p.__scaleboxMetricTopRight.y)).to.equal(150);
    expect(round(p.__scaleboxMetricBottomLeft.x)).to.equal(125);
    expect(round(p.__scaleboxMetricBottomLeft.y)).to.equal(250);
    expect(round(p.__scaleboxMetricBottomRight.x)).to.equal(125);
    expect(round(p.__scaleboxMetricBottomRight.y)).to.equal(150);
    expect(round(p.__scaleboxImperialTopLeft.x)).to.equal(74.6);
    expect(round(p.__scaleboxImperialTopLeft.y)).to.equal(250.8);
    expect(round(p.__scaleboxImperialTopRight.x)).to.equal(74.6);
    expect(round(p.__scaleboxImperialTopRight.y)).to.equal(149.2);
    expect(round(p.__scaleboxImperialBottomLeft.x)).to.equal(125.4);
    expect(round(p.__scaleboxImperialBottomLeft.y)).to.equal(250.8);
    expect(round(p.__scaleboxImperialBottomRight.x)).to.equal(125.4);
    expect(round(p.__scaleboxImperialBottomRight.y)).to.equal(149.2);
    expect(round(p.__scaleboxLead.x)).to.equal(85);
    expect(round(p.__scaleboxLead.y)).to.equal(245);
    expect(round(p.__scaleboxTitle.x)).to.equal(95);
    expect(round(p.__scaleboxTitle.y)).to.equal(245);
    expect(round(p.__scaleboxText.x)).to.equal(107);
    expect(round(p.__scaleboxText.y)).to.equal(245);
    expect(round(p.__scaleboxLink.x)).to.equal(112);
    expect(round(p.__scaleboxLink.y)).to.equal(245);
    expect(round(p.__scaleboxMetric.x)).to.equal(120);
    expect(round(p.__scaleboxMetric.y)).to.equal(200);
    expect(round(p.__scaleboxImperial.x)).to.equal(124);
    expect(round(p.__scaleboxImperial.y)).to.equal(200);
  });

  it("Should run the scalebox macro with default text", () => {
    const pattern = new freesewing.Pattern().use(plugin)
    pattern.parts.test = new pattern.Part();
    pattern.parts.test.points.anchor = new pattern.Point(100, 200);
    const { macro } = pattern.parts.test.shorthand()
    macro("scalebox", {
      at: pattern.parts.test.points.anchor
    });
    let p = pattern.parts.test.points.__scaleboxLead.attributes;
    expect(p.get("data-text")).to.equal("FreeSewing");
    expect(p.get("data-text-class")).to.equal("text-sm");
    p = pattern.parts.test.points.__scaleboxTitle.attributes;
    expect(p.get("data-text")).to.equal(" vundefined");
    expect(p.get("data-text-class")).to.equal("text-lg");
    p = pattern.parts.test.points.__scaleboxText.attributes;
    expect(p.get("data-text-class")).to.equal("text-xs");
    expect(p.get("data-text-lineheight")).to.equal("4");
    expect(p.list["data-text"][0]).to.equal("supportFreesewingBecomeAPatron")
  });

  it("Should run the scalebox macro with custom text", () => {
    const pattern = new freesewing.Pattern().use(plugin)
    pattern.parts.test = new pattern.Part();
    pattern.parts.test.points.anchor = new pattern.Point(100, 200);
    const { macro } = pattern.parts.test.shorthand()
    macro("scalebox", {
      at: pattern.parts.test.points.anchor,
      lead: "theLead",
      title: "theTitle",
      text: "theText"
    });
    let p = pattern.parts.test.points.__scaleboxLead.attributes;
    expect(p.get("data-text")).to.equal("theLead");
    expect(p.get("data-text-class")).to.equal("text-sm");
    p = pattern.parts.test.points.__scaleboxTitle.attributes;
    expect(p.get("data-text")).to.equal("theTitle");
    expect(p.get("data-text-class")).to.equal("text-lg");
    p = pattern.parts.test.points.__scaleboxText.attributes;
    expect(p.get("data-text")).to.equal("theText");
    expect(p.get("data-text-class")).to.equal("text-xs");
    expect(p.get("data-text-lineheight")).to.equal("4");
  })

  it("Should apply scale to the scalebox macro", () => {
    const pattern = new freesewing.Pattern().use(plugin)
    pattern.settings.scale = 0.5
    pattern.parts.test = new pattern.Part();
    pattern.parts.test.points.anchor = new pattern.Point(100, 200);
    const { macro } = pattern.parts.test.shorthand()
    macro("scalebox", {
      at: pattern.parts.test.points.anchor
    });
    let p = pattern.parts.test.points;
    expect(p.__scaleboxMetricTopLeft.x).to.equal(75);
    expect(p.__scaleboxMetricTopLeft.y).to.equal(187.5);
    expect(p.__scaleboxMetricTopRight.x).to.equal(125);
    expect(p.__scaleboxMetricTopRight.y).to.equal(187.5);
    expect(p.__scaleboxMetricBottomLeft.x).to.equal(75);
    expect(p.__scaleboxMetricBottomLeft.y).to.equal(212.5);
    expect(p.__scaleboxMetricBottomRight.x).to.equal(125);
    expect(p.__scaleboxMetricBottomRight.y).to.equal(212.5);
    expect(p.__scaleboxImperialTopLeft.x).to.equal(74.6);
    expect(p.__scaleboxImperialTopLeft.y).to.equal(187.3);
    expect(p.__scaleboxImperialTopRight.x).to.equal(125.4);
    expect(p.__scaleboxImperialTopRight.y).to.equal(187.3);
    expect(p.__scaleboxImperialBottomLeft.x).to.equal(74.6);
    expect(p.__scaleboxImperialBottomLeft.y).to.equal(212.7);
    expect(p.__scaleboxImperialBottomRight.x).to.equal(125.4);
    expect(p.__scaleboxImperialBottomRight.y).to.equal(212.7);
    expect(p.__scaleboxMetric.attributes.get('data-text'))
      .to.equal("theWhiteInsideOfThisBoxShouldMeasure 5cm x 2.5cm")
    expect(p.__scaleboxImperial.attributes.get('data-text'))
      .to.equal("theBlackOutsideOfThisBoxShouldMeasure 2″ x 1″")
  });

  it("Should apply scale to the miniscale macro", () => {
    const pattern = new freesewing.Pattern().use(plugin)
    pattern.settings.scale = 0.5
    pattern.parts.test = new pattern.Part();
    pattern.parts.test.points.anchor = new pattern.Point(100, 200);
    const { macro } = pattern.parts.test.shorthand()
    macro("miniscale", {
      at: pattern.parts.test.points.anchor
    });
    let p = pattern.parts.test.points;
    expect(p.__miniscaleMetricTopLeft.x).to.equal(92);
    expect(p.__miniscaleMetricTopLeft.y).to.equal(192);
    expect(p.__miniscaleMetricTopRight.x).to.equal(108);
    expect(p.__miniscaleMetricTopRight.y).to.equal(192);
    expect(p.__miniscaleMetricBottomLeft.x).to.equal(92);
    expect(p.__miniscaleMetricBottomLeft.y).to.equal(208);
    expect(p.__miniscaleMetricBottomRight.x).to.equal(108);
    expect(p.__miniscaleMetricBottomRight.y).to.equal(208);
    expect(p.__miniscaleImperialTopLeft.x).to.equal(92.0625);
    expect(p.__miniscaleImperialTopLeft.y).to.equal(192.0625);
    expect(p.__miniscaleImperialTopRight.x).to.equal(107.9375);
    expect(p.__miniscaleImperialTopRight.y).to.equal(192.0625);
    expect(p.__miniscaleImperialBottomLeft.x).to.equal(92.0625);
    expect(p.__miniscaleImperialBottomLeft.y).to.equal(207.9375);
    expect(p.__miniscaleImperialBottomRight.x).to.equal(107.9375);
    expect(p.__miniscaleImperialBottomRight.y).to.equal(207.9375);
    expect(p.__miniscaleMetric.attributes.get('data-text')).to.equal("1.6cm x 1.6cm")
    expect(p.__miniscaleImperial.attributes.get('data-text')).to.equal("⅝″ x ⅝″")
  });
})
