---
title: Store methods
order: 130
---

FreeSewing plugins can provide store methods, which facilitate data handling
within a pattern.

## Signature

To provide one or more store methods, your plugin should have a `store` property that
is an array where each member is itself an array with two members:

- The first member holds the key to attach the method to (in dot notation)
- The second member holds the method to attach

```mjs
const myPlugin = {
  name: 'example',
  version: '0.0.1',
  store: [
    [
      'log.panic',
      function(store, ...params) {
        store.setIfUnset('logs.panic', new Array())
        store.push(...params)
      }
    ]
  }
}
```

## Arguments

All store methods receive at least two arguments:

- `store`: The store object itself
- `...params`: All additional plugins that were passed to the store method

## Overwriting store methods

You are allowed to overwrite existing store methods.
As it happens, this is how you should implement a custom logging solution,
by overwriting the logging methods under the store's `log` key,

However, the following store methods cannot be overwritten:

- `extend()`
- `get()`
- `push()`
- `set()`
- `setIfUnset()`
- `unset()`

## Return value

Store methods do not need to return anything. If they do, it will be ignored.
