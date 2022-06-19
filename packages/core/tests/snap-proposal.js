const expect = require("chai").expect;
const freesewing = require("../dist/index.js");

const measurements = { head: 400 }
const toAbs = (val, { measurements }) => measurements.head * val

it("Should snap a percentage options to equal steps", () => {
  const design = new freesewing.Design({
    options: {
      test: { pct: 30, min: 0, max: 100, snap: 12, toAbs }
    }
  })
  const patternA = new design({ options: { test: 0.13 }, measurements })
  const patternB = new design({ options: { test: 0.27 }, measurements })
  expect(patternA.settings.absoluteOptions.test).to.equal(60)
  expect(patternB.settings.absoluteOptions.test).to.equal(108)
});

it("Should snap a percentage options to the Fibonacci sequence", () => {
  const design = new freesewing.Design({
    options: {
      test: {
        pct: 30, min: 0, max: 100, toAbs,
        snap: [ 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 ],
      }
    }
  })
  const patternA = new design({ options: { test: 0.13 }, measurements })
  const patternB = new design({ options: { test: 0.27 }, measurements })
  const patternC = new design({ options: { test: 0.97 }, measurements })
  expect(patternA.settings.absoluteOptions.test).to.equal(55)
  expect(patternB.settings.absoluteOptions.test).to.equal(89)
  expect(patternC.settings.absoluteOptions.test).to.equal(388)
});

it("Should snap a percentage options to imperial snaps", () => {
  const design = new freesewing.Design({
    options: {
      test: {
        pct: 30, min: 0, max: 100, toAbs,
        snap: {
          metric: [ 25, 50, 75, 100 ],
          imperial: [ 25.4, 50.8, 76.2, 101.6 ],
        }
      }
    }
  })
  const patternA = new design({ options: { test: 0.13 }, measurements, units:'metric' })
  const patternB = new design({ options: { test: 0.27 }, measurements, units:'metric' })
  const patternC = new design({ options: { test: 0.97 }, measurements, units:'metric' })
  const patternD = new design({ options: { test: 0.01 }, measurements, units:'metric' })
  expect(patternA.settings.absoluteOptions.test).to.equal(50)
  expect(patternB.settings.absoluteOptions.test).to.equal(100)
  expect(patternC.settings.absoluteOptions.test).to.equal(388)
  expect(patternD.settings.absoluteOptions.test).to.equal(4)
});

it("Should snap a percentage options to metrics snaps", () => {
  const design = new freesewing.Design({
    options: {
      test: {
        pct: 30, min: 0, max: 100, toAbs,
        snap: {
          metric: [ 25, 50, 75, 100 ],
          imperial: [ 25.4, 50.8, 76.2, 101.6 ],
        }
      }
    }
  })
  const patternA = new design({ options: { test: 0.13 }, measurements, units:'imperial' })
  const patternB = new design({ options: { test: 0.27 }, measurements, units:'imperial' })
  const patternC = new design({ options: { test: 0.97 }, measurements, units:'imperial' })
  const patternD = new design({ options: { test: 0.01 }, measurements, units:'imperial' })
  expect(patternA.settings.absoluteOptions.test).to.equal(50.8)
  expect(patternB.settings.absoluteOptions.test).to.equal(101.6)
  expect(patternC.settings.absoluteOptions.test).to.equal(388)
  expect(patternD.settings.absoluteOptions.test).to.equal(4)
});

