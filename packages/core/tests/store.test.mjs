import chai from 'chai'
import { Design, Store } from '../src/index.mjs'

const expect = chai.expect

const store = new Store()

describe('Store', () => {
  it('Should set/get a top-level store value', () => {
    store.set('foo', 'bar')
    expect(store.get('foo')).to.equal('bar')
  })

  it('Should set/get a nested store value', () => {
    store.set('some.nested.key.foo', 'bar')
    expect(store.get('some.nested.key').foo).to.equal('bar')
  })

  it('Should set a store value only if unset', () => {
    store.setIfUnset('dew.few', 'baz')
    store.setIfUnset('dew.few', 'schmoo')
    expect(store.get('dew').few).to.equal('baz')
  })

  it('Should push to an array value in the store', () => {
    store.set('dew.few', ['baz', 'bar'])
    // store.push is variadic
    store.push('dew.few', 'boz', 'bor')
    expect(store.get('dew').few.length).to.equal(4)
  })

  it('Should emit a warning when retrieving a invalid key', () => {
    const warning = (msg) => events.push(msg)
    const store = new Store()
    store.get('nope')
    expect(store.get('logs.warning').length).to.equal(1)
    expect(store.get('logs.warning')[0]).to.equal(
      'Store.get(key) on key `nope`, which is undefined'
    )
  })

  it('Should add methods to the store from a plugin', () => {
    const plugin = {
      name: 'test',
      version: 1,
      store: [
        [
          'test.example.warning',
          function (store, msg) {
            store.set('test.message.warning', msg)
          },
        ],
        [
          'test.example.info',
          function (store, msg) {
            store.set('test.message.info', msg)
          },
        ],
      ],
    }
    const part = {
      name: 'example.part',
      draft: ({ store, part }) => {
        store.test.example.warning('hello warning')
        store.test.example.info('hello info')
      },
    }
    const Test = new Design({ plugins: [plugin], parts: [part] })
    const pattern = new Test()
    pattern.draft()
    expect(pattern.store.get('test.message.warning')).to.equal('hello warning')
    expect(pattern.store.get('test.message.info')).to.equal('hello info')
  })

  it('Should make top-level plugin methods available via shorthand', () => {
    const plugin = {
      name: 'test',
      version: 1,
      store: [
        [
          'methodA',
          function (store, name, msg) {
            store.set(['test', name, 'a'], msg)
          },
        ],
        [
          'methodB',
          function (store, name, msg) {
            store.set(['test', name, 'b'], msg)
          },
        ],
      ],
    }
    const part = {
      name: 'example_part',
      draft: ({ methodA, methodB, part }) => {
        methodA('hello A')
        methodB('hello B')
        return part
      },
    }
    const Test = new Design({ plugins: [plugin], parts: [part] })
    const pattern = new Test()
    pattern.draft()
    expect(pattern.store.get('test.example_part.a')).to.equal('hello A')
    expect(pattern.store.get('test.example_part.b')).to.equal('hello B')
  })
})
