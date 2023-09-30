---
title: Store.get()
---

The `Store.get()` method retrieves the data available under `key`.

## Signature

```js
mixed store.get(mixed key, mixed dflt)
```

If `key` is not available, the Store will return the optional second parameter
(a default value).

## Example

```js
const store = new Store()
store.set('example', 'Hi there')
const value = store.get('example')
// value now holds 'Hi there'
```

## Notes

You can get/set nested keys either through dot-notation, or by passing an
array:

```js
const store = new Store()

store.set('my.nested.example', 'Hi there')
store.set(['my', 'other', 'nested', 'example'], 'Oh hi again')

let value
// Dot notation
value = store.get('my.nested.example') // works
value = store.get('my.other.nested.example') // works
// Using an array
value = store.get(['my', 'nested', 'example']) // works
value = store.get(['my', 'other', 'nested', 'example']) // works
// Direct access to the store object
value = store.my.nested.example // Also works
value = store.my.other.nested.example // Also works
```
