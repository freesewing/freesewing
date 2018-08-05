function store() {
  this.data = new Map();
}

/** Sets a value under index key */
store.prototype.set = function(key, value) {
  this.data.set(key, value);
};

/** Sets a value under index key */
store.prototype.setIfUnset = function(key, value) {
  if (!this.data.has(key)) this.data.set(key, value);
};

/** Gets a value under index key */
store.prototype.get = function(key) {
  return this.data.get(key);
};

export default store;
