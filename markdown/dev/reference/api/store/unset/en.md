---
title: Store.unset()
---

The `Store.unset()` value removes a `key` from the store.

## Signature

```js
Store store.unset(string key)
```

<Tip compact>This method is chainable as it returns the `Store` object</Tip>

## Example

```js
const store = new Store()
  .set('example', 'I will be gone before you know it')
  .unset('example')
```
