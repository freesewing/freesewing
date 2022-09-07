import chai from "chai"
import { Pattern } from "./dist/index.mjs"

const expect = chai.expect

const pattern = new Pattern();
const store = pattern.store;

describe('Store', () => {
  it("Store should be a Map", () => {
    expect(store.data.toString()).to.equal("[object Map]");
  });

  it("Should set/get a store value", () => {
    store.set("foo", "bar");
    expect(store.get("foo")).to.equal("bar");
  });

  it("Should set a store value only if unset", () => {
    store.setIfUnset("few", "baz");
    store.setIfUnset("few", "schmoo");
    expect(store.get("few")).to.equal("baz");
  });

  it("Should raise a warning when retrieving a invalid key", () => {
    store.get('nope')
    expect(pattern.events.warning.length).to.equal(1)
    expect(pattern.events.warning[0]).to.equal('Tried to access `nope` in the `store` but it is not set')
  });
});

