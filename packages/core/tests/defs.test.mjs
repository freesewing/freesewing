import chai from 'chai'
import { Defs } from '../src/defs.mjs'

const expect = chai.expect

describe('Defs', () => {
  let defs = new Defs()

  it('Should set a def', () => {
    defs.set('test', 'passed')
    expect(defs.get('test')).to.equal('passed')
  })

  it('Should remove a def', () => {
    defs.remove('test')
    expect(defs.get('test')).to.equal(false)
  })

  it('Should only set an unset def', () => {
    defs.setIfUnset('test', 'passed')
    expect(defs.get('test')).to.equal('passed')
    defs.setIfUnset('test', 'failed')
    expect(defs.get('test')).to.equal('passed')
  })

  it('Should return false when getting an unset def', () => {
    expect(defs.get('doNotTest')).to.equal(false)
  })

  it('Should render defs correctly', () => {
    console.log(defs.render())
    expect(defs.render()).to.equal(' test="passed"')
  })
})
