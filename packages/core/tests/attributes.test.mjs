import { expect } from 'chai'
import { Point } from '../src/index.mjs'

const newAttr = () => new Point(0, 0).attributes

const a = newAttr()

describe('Attributes', () => {
  it('Should set an attribute', () => {
    a.set('hold', 'me')
    expect(a.get('hold')).to.equal('me')
  })

  it('Should remove an attribute', () => {
    a.remove('hold')
    expect(a.get('hold')).to.equal(false)
  })

  it('Should only set an unset attribute', () => {
    a.setIfUnset('hold', 'me')
    expect(a.get('hold')).to.equal('me')
    a.setIfUnset('hold', 'thatDudeOverThere')
    expect(a.get('hold')).to.equal('me')
  })

  it('Should return false when getting an unset attribute', () => {
    let a = newAttr()
    expect(a.get('test')).to.equal(false)
  })

  it('Should render attributes correctly', () => {
    let a = newAttr().set('class', 'test').add('class', 'render').set('transform', 'scale(1)')
    expect(a.render()).to.equal(' class="test render" transform="scale(1)"')
  })

  it('Should render attributes with given prefix only', () => {
    let a = newAttr()
      .set('class', 'test')
      .add('class', 'render')
      .add('data-text', 'foo')
      .add('data-text', 'bar')
      .add('data-mode', 'test')
      .set('transform', 'scale(1)')
    expect(a.renderIfPrefixIs('data-')).to.equal(' text="foo bar" mode="test"')
  })

  it('Should return attributes as array', () => {
    let a = newAttr().set('class', 'test').add('class', 'render')
    expect(JSON.stringify(a.getAsArray('class'))).to.equal(JSON.stringify(['test', 'render']))
    expect(a.getAsArray('nope')).to.equal(false)
  })

  it('Should render attributes as CSS', () => {
    let a = newAttr().set('line-height', 1.2).add('border', '1px solid red')
    expect(a.renderAsCss()).to.equal(' line-height:1.2; border:1px solid red;')
  })

  it('Should return attributes as props and filter a prefix', () => {
    const a = newAttr()
      .set('line-height', 1.2)
      .add('border', '1px solid red')
      .set('data-text', 'This is a test')
      .set('data-text-class', 'center')
    const props = a.asPropsIfPrefixIs('data-')
    expect(props.text).to.equal('This is a test')
    expect(props['text-class']).to.equal('center')
  })

  it('Should return attributes as props and handle special class case', () => {
    const a = newAttr().set('class', 'fabric')
    const props = a.asPropsIfPrefixIs('')
    expect(props.className).to.equal('fabric')
  })

  it('Should clone an attribute', () => {
    const a = newAttr().set('class', 'fabric')
    const b = a.clone()
    const c = a.get('class')
    expect(c).to.equal('fabric')
  })

  it('Should not clone a non-cloneable attribute', () => {
    const a = newAttr().set('class-noclone', 'fabric')
    const b = a.clone()
    const c = a.get('class')
    expect(c).to.equal(false)
  })
})
