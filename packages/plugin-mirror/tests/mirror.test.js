// These tests haven't been run, stub to fix when plugin testing is added
import freesewing from 'freesewing'
import { version } from '../package.json'
// import reflect, { lineValues, mirrorGen } from '../src/reflect'
let chai = require('chai')
let expect = chai.expect
chai.use(require('chai-string'))
let plugin,
  { lineValues, mirrorGen } = require('../dist/index.js')

it('Should set the plugin name:version attribute', () => {
  let pattern = new freesewing.Pattern().with(plugin)
  pattern.render()
  expect(pattern.svg.attributes.get('freesewing:plugin-mirror')).to.equal(version)
})

describe('mirrorGen(start, end)', () => {
  it('Should reflect points', () => {
    const reflectedPoint1 = new Point(2, 2)
    reflectedPoint1.attributes.set('reflected', true)

    const reflectedPoint2 = new Point(-32, 20)
    reflectedPoint2.attributes.set('reflected', true)

    // Should reflect point along 45deg line
    const gen = mirrorGen(new Point(-1, 1))
    expect([gen(new Point(-2, -2)), gen(new Point(32, -20))]).to.equal([
      reflectedPoint1,
      reflectedPoint2
    ])
  })

  it('lineValues should find the correct values for the line equation', () => {
    expect(lineValues(new Point(-1, 1), new Point(1, -1))).to.equal([-2, -2, 0])
    expect(lineValues(new Point(-2, 1), new Point(2, -1))).to.equal([-4, -2, 0])
    expect(lineValues(new Point(-1, 4), new Point(4, -1))).to.equal([-5, -5, 15])
    expect(lineValues(new Point(-12, -13), new Point(-1, 3))).to.equal([-11, 16, 49])
  })
})
