import freesewing from '@freesewing/core'
import { version } from '../package.json'
import chai from 'chai'
import plugin from '../dist/index.js'

const expect = chai.expect

it('Should set the plugin name:version attribute', () => {
  const pattern = new freesewing.Pattern()
  pattern.use(plugin).draft().render()
  expect(pattern.svg.attributes.get('freesewing:plugin-export-dxf')).to.equal(version);
});
