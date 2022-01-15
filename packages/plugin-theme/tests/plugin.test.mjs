import chai from 'chai'
import freesewing from '@freesewing/core'
import plugin from '../dist/index.mjs'

const expect = chai.expect

describe('Theme Plugin Tests', () => {
  const pattern = new freesewing.Pattern().use(plugin)
  pattern.apply({ paperless: true })
  pattern.draft().render()

  it("Should load base CSS", () => {
    expect(pattern.svg.style).to.contain('svg.freesewing')
  })

  it("Should load the metric grid for paperless", () => {
    expect(pattern.svg.defs).to.contain('gridline-xs')
    expect(pattern.svg.defs).to.contain('M 10 0 L 10 100 M 20 0 L 20')
  });

  it("Should load the imperial grid for paperless", () => {
    pattern.apply({ units: 'imperial' })
    pattern.draft().render()
    expect(pattern.svg.defs).to.contain('gridline-sm')
    expect(pattern.svg.defs).to.contain('M 12.7 0 L 12.7')
  });

  it("Should apply scale.", () => {
    expect(pattern.svg.style).to.contain('svg.freesewing .text-xxl {\n    font-size: 12px')

    pattern.settings.scale = 2
    pattern.draft().render()

    expect(pattern.svg.style).to.contain('svg.freesewing .text-xxl {\n    font-size: 24px;')
  })

  it("Should round after applying scale.", () => {
    pattern.settings.scale = 1/3
    pattern.draft().render()

    expect(pattern.svg.style).to.contain('svg.freesewing .text-xxl {\n    font-size: 4px')
  })
})
