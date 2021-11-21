import freesewing from '@freesewing/core'
import { version } from '../../plugin-sprinkle/package.json'
let expect = require('chai').expect
let plugin = require('../dist/index.js')

describe('plugin-sprinkle', function () {
  it('Should set the plugin name:version attribute', () => {
    let pattern = new freesewing.Pattern().use(plugin)
    pattern.render()
    expect(pattern.svg.attributes.get('freesewing:plugin-sprinkle')).to.equal(version)
  })
})
