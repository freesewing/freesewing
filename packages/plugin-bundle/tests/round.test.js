import freesewing from '@freesewing/core'
import { version } from '../../plugin-round/package.json'
let expect = require('chai').expect
let plugin = require('../dist/index.js')

describe('plugin-round', function () {
  it('Should set the plugin name:version attribute', () => {
    let pattern = new freesewing.Pattern().use(plugin)
    pattern.render()
    expect(pattern.svg.attributes.get('freesewing:plugin-round')).to.equal(version)
  })
})
