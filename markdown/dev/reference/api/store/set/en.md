---
title: Store.set()
---

The `Store.set()` method stores the value of `value` in the store under key
`key`.

## Signature

```js
Store store.set(mixed key, mixed value)
```

<Tip compact>This method is chainable as it returns the `Store` object</Tip>

## Example

```js
const store = new Store()
store.set('example', 'Hi there')
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

