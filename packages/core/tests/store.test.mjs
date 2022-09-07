import chai from "chai"
import { Design, Store } from "./dist/index.mjs"

const expect = chai.expect

const store = new Store()

describe('Store', () => {

  it("Should set/get a top-level store value", () => {
    store.set("foo", "bar");
    expect(store.get("foo")).to.equal("bar");
  });

  it("Should set/get a nested store value", () => {
    store.set("some.nested.key.foo", "bar");
    expect(store.get("some.nested.key").foo).to.equal("bar");
  });

  it("Should set a store value only if unset", () => {
    store.setIfUnset("dew.few", "baz");
    store.setIfUnset("dew.few", "schmoo");
    expect(store.get("dew").few).to.equal("baz");
  });

  it("Should push to an array value in the store", () => {
    store.set("dew.few", ["baz", "bar"]);
    // store.push is variadic
    store.push("dew.few", "boz", "bor");
    expect(store.get("dew").few.length).to.equal(4);
  });

  it("Should emit a warning when retrieving a invalid key", () => {
    const events = []
    const warning = msg => events.push(msg)
    const store = new Store([[ "emit.warning", warning]])
    store.get('nope')
    expect(events.length).to.equal(1)
    expect(events[0]).to.equal('Tried to access `nope` in the `store` but it is not set')
  });

  it("Should add methods to the store from a plugin", () => {
    const plugin = {
      name: 'test',
      version: 1,
      store: [
        ['test.example.warning', function(store, msg) {
          store.set('test.message.warning', msg)
        }],
        ['test.example.info', function(store, msg) {
          store.set('test.message.info', msg)
        }],
      ]
    }
    const part = {
      name: 'example.part',
      draft: part => {
        const { store } = part.shorthand()
        store.test.example.warning('hello warning')
        store.test.example.info('hello info')
      }
    }
    const Test = new Design({plugins: [plugin], parts: [ part ]})
    const pattern = new Test()
    pattern.draft()
    expect(pattern.store.get("test.message.warning")).to.equal("hello warning")
    expect(pattern.store.get("test.message.info")).to.equal("hello info")
  });
});

