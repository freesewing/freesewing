import { expect } from 'chai'
import { Design } from '@freesewing/core'
import { annotationsPlugin } from '../src/index.mjs'

describe('Logo Plugin Tests', () => {
  it('Should import style and defs', () => {
    const Pattern = new Design({ noCorePlugins: true })
    const pattern = new Pattern().use(annotationsPlugin)
    pattern.draft().render()
    expect(pattern.svg.defs.get('logo')).to.not.equal(false)
  })
})
