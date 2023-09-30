---
title: Store.setIfUnset()
---

The `Store.set()` method stores the value of `value` in the store under key
`key`, but only if that key does not already hold a value.

## Signature

```js
Store store.set(mixed key, mixed value)
```

<Tip compact>This method is chainable as it returns the `Store` object</Tip>

## Example

```js
const store = new Store()
store.set('example', 'Hi there')
store.setIfUnset('example', 'Hi again') // This has no effect
```

