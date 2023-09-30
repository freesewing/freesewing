---
title: Store.extend()
---

The `Store.extend()` method can be used to extend the store with new
functionality by passing an array of methods and the path to the location in
the store where they should be attached. It is typically not used directly, but
rather through a plugin.

## Signature

```js
Store Store.extend(Array methods=[])
```

<Tip compact>This method is chainable as it returns the `Store` object</Tip>

The single argument should be an Array of methods to add to the
store. Each entry in the array should be an array itself holding a path in
dot notation and a method, as such:

The expected first parameter for the method is the `Store` instance.

```js
function myCustomMethod(store, ...otherArguments) {
 // Do something clever
}

const store = new Store([
  ["path.to.the.method", myCustomMethod ]
])
```  

With the configuration above, you can call `store.path.to.the.method()` and it
will run `myCustomMethod()`.

Stores the value of `value` in the store under key `key`.

## Notes

The Store will not allow you to extend any of the following keys:

- `set`
- `setIfUnset`
- `push`
- `unset`
- `get`
- `extend`


